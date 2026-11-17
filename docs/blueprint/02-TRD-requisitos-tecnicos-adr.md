# 02 — TRD (Requisitos Técnicos & Architecture Decision Records) — Argus

> **Documento 02 de 06 — Blueprint Fundacional do Produto**  
> **Escopo:** Inventário completo das peças técnicas (framework, estado, banco, autenticação, IA, pagamentos, mobile, segurança e QA) e decisões arquiteturais (ADRs).  
> **Referência Estrutural:** [`ARCHITECTURE.md`](../ARCHITECTURE.md) • [`package.json`](../../package.json) • [`.env.example`](../../.env.example)

---

## 1. Mapa de Peças Técnicas (Stack Real do Repositório)

| Domínio | Tecnologia / Implementação Real | Arquivos de Referência |
| :--- | :--- | :--- |
| **Framework Web** | Next.js `^14.2.24` (App Router) + React `^18.3.1` | `package.json`, `next.config.mjs`, `src/app/` |
| **Linguagem** | TypeScript `^5.7.3` (`strict` via `npx tsc --noEmit`) | `tsconfig.json` |
| **Estilização & UI** | Tailwind CSS `^3.4.17` + CSS Custom Properties + `lucide-react` + `recharts` `^2.15.1` | `src/styles/tokens.css`, `src/components/ui/`, `tailwind.config.js` |
| **Estado Client-Side** | Zustand `^5.0.15` com `persist` (`localStorage`) + `argus_onboarding_draft` | `src/store/useAuthStore.ts`, `src/store/useStudyStore.ts` |
| **Banco de Dados** | Supabase PostgreSQL (`@supabase/supabase-js` `^2.115.0`) + extensões `uuid-ossp`, `vector`, `pg_trgm` + RLS nativo | `supabase/schema.sql`, `src/lib/supabase.ts`, `src/lib/supabaseService.ts` |
| **Autenticação** | Supabase Auth (Email/Senha, Magic Link OTP, Google OAuth) + Cookie/JWT + fallback offline/mock quando sem `.env` | `src/app/api/auth/*`, `src/app/auth/callback/page.tsx` |
| **Motor de IA** | Google Gemini (`GEMINI_API_KEY`, padrão `GEMINI_MODEL=gemini-2.0-flash`) + Cache L1/L2 + fallback determinístico | `src/lib/aiEngine.ts`, `.env.example`, `/api/diagnosis`, `/api/copilot`, `/api/discursive`, `/api/edital` |
| **Pagamentos** | Asaas v3 (Pix cobrança & QR Code EMVCo) + suporte a webhooks Asaas (`asaas-access-token`) e Stripe (`stripe-signature`) + store `TransactionManager` | `src/lib/paymentGateways.ts`, `src/lib/transactions.ts`, `/api/checkout`, `/api/webhooks/payment` |
| **E-mail Transacional** | Resend (`RESEND_API_KEY`) para boas-vindas e avisos de renovação/retenção | `src/lib/email/welcomeEmail.ts`, `/api/welcome-email` |
| **Mobile Nativo** | Capacitor `^8.5.3` (`@capacitor/android`, `@capacitor/ios`, `haptics`, `keyboard`, `status-bar`) | `capacitor.config.ts` (`appId: br.com.argus.app`) |
| **WAF & Segurança** | Middleware de Edge/Next.js: IP Jail, Honeypot Bot Traps, SQLi/XSS/Path Traversal sanitizers, CSRF check (`/api/admin`), CSP/HSTS + SIEM + Guardrails SQL | `src/middleware.ts`, `src/lib/rateLimiter.ts`, `src/lib/securitySanitizer.ts`, `src/lib/siemEngine.ts`, `src/lib/guardrails.ts` |
| **Testes & QA** | Vitest `^5.0.1` (22 suítes em `src/__tests__/`), `@testing-library/react`, Playwright `^1.63.0` + `@axe-core/playwright` (`e2e/`), ESLint `^8.57.1` | `vitest.config.mjs`, `playwright.config.ts`, `src/__tests__/`, `e2e/` |
| **Telemetria & Growth** | Meta Pixel (`NEXT_PUBLIC_META_PIXEL_ID`), Google Analytics (`NEXT_PUBLIC_GA_MEASUREMENT_ID`), A/B engine | `src/components/TrackingScripts.tsx`, `src/lib/analytics.ts`, `src/lib/abTesting.ts` |

---

## 2. Variáveis de Ambiente & Fronteira Client/Server

Regra inviolável (`.agents/skills/sdd-tdd-guardrails-agent-rules/SKILL.md` e `docs/ARCHITECTURE.md`):
- **Somente prefixo `NEXT_PUBLIC_`** pode ser lido em código `'use client'` (`NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`).
- **Estritamente Server-Only (nunca expor ao bundle client):** `SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`, `ASAAS_API_KEY`, `ASAAS_WEBHOOK_SECRET`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, `ADMIN_API_KEY`.

---

## 3. Architecture Decision Records (ADRs)

### ADR-001 — SPA Modular em Next.js 14 App Router com Dynamic Code-Splitting
- **Contexto:** O Argus possui mais de 14 módulos interativos (Simulador, Flashcards, Vade Mecum, Discursivas, Psicometria, Analytics, Radar, Edital, etc.) e precisa manter Time-to-Interactive rápido em 4G mobile e compatibilidade com Capacitor.
- **Decisão:** Manter páginas públicas e SEO em rotas App Router (`/`, `/edital/[slug]`, `/obrigado`, `/privacidade`, `/termos`, `/auth/callback`) e orquestrar o workspace do estudante em `ArgusApp.tsx` via `next/dynamic(..., { ssr: false })` para carregar cada aba sob demanda.
- **Consequências:** Reduz o bundle inicial da Landing Page e acelera trocas de aba após pré-carregamento; exige manutenção estrita de histórico de navegação (`tabHistory` + `ScrollToTop`) e detecção de modais para a dock móvel.

### ADR-002 — PostgreSQL (Supabase) com RLS + Contingência Offline/Mock Segura
- **Contexto:** Ambientes locais de desenvolvimento e testes automatizados (CI/CD sem segredos de produção) precisam rodar sem erro fatal quando credenciais Supabase não estiverem preenchidas.
- **Decisão:** `src/lib/supabase.ts` (`isSupabaseConfigured()`) e `src/lib/supabaseService.ts` operam em modo dual: persistência real com RLS e `service_role` (apenas backend) quando configurado, ou contingência determinística local (`Zustand persist` + `mockData.ts`) quando ausente.
- **Consequências:** Garante `npm test` e `npm run build` verdes em qualquer máquina, mas exige que rotas críticas de pagamento e auth verifiquem `NODE_ENV === 'production'` (como feito em `src/app/api/webhooks/payment/route.ts`).

### ADR-003 — Motor de IA Resiliente (Quota -> Cache L1/L2 -> Timeout -> Fallback)
- **Contexto:** Chamadas diretas ao Gemini por cada clique de aluno inviabilizariam a margem unitária e quebrariam o fluxo em falhas de rede/rate limit da API.
- **Decisão:** Centralizar prompts e chamadas no servidor (`src/app/api/*` + `src/lib/aiEngine.ts`), consultando primeiro cache em memória (L1) e tabela `public.ai_diagnostic_cache` (L2 no PostgreSQL), aplicando quotas por `SubscriptionPlan` e fallback pedagógico estruturado em caso de indisponibilidade.
- **Consequências:** Economia substancial de tokens em questões repetidas e resposta garantida mesmo sem `GEMINI_API_KEY` configurada.

### ADR-004 — Dual Payment Gateway (Asaas Pix Primário + Stripe) com Webhooks Idempotentes
- **Contexto:** No mercado brasileiro de concursos/OAB, conversão via **Pix instantâneo** é determinante; assinaturas recorrentes em cartão demandam compatibilidade com Stripe.
- **Decisão:** `PaymentGateway.createPixCharge()` (`src/lib/paymentGateways.ts`) integra Asaas v3 (com contorno documentado para variáveis iniciadas por `$` em `.env.local` e CPF/valor mínimo em produção, além de fallback EMVCo BACEN fora de produção) + `TransactionManager` (`src/lib/transactions.ts`) persistindo transações na tabela `public.transactions` via `service_role` e deduplicando webhooks por `eventId`.
- **Consequências:** Impede dupla confirmação de webhook e mantém polling seguro de status (`GET /api/checkout`). Em produção, simulações (`simulate_confirmation`) retornam `403`.

### ADR-005 — Empacotamento Mobile Híbrido via Capacitor 8
- **Contexto:** Alunos utilizam o Argus no trajeto diário e precisam de resposta tátil (`haptics`), controle de teclado virtual e barra de status nativa no Android e iOS sem duplicar base de código.
- **Decisão:** Usar `@capacitor/core` `^8.5.3` (`capacitor.config.ts`) sobre a mesma aplicação Next.js/React, com targets mínimos de toque `>= 48px` (Lei de Fitts).
- **Consequências:** Reduz custo de manutenção para equipe enxuta, exigindo atenção contínua a Safe Areas, overlays móveis e offline resilience.

### ADR-006 — Defesa em Profundidade no Middleware + Guardrails de Dados
- **Contexto:** APIs públicas, rotas admin (`/api/admin/*`) e dados de alunos estão expostos a bots scanners, brute force, CSRF e comandos destrutivos.
- **Decisão:** `src/middleware.ts` aplica WAF em camada de borda (Honeypot para `/wp-admin`, `.env`, `.sql`, IP Jail, Rate Limiter, CSRF validation, headers CSP/HSTS/DENY) enquanto `src/lib/guardrails.ts` bloqueia SQL destrutivo e exige Soft Delete em entidades críticas.
- **Consequências:** Bloqueio imediato de varreduras comuns e proteção contra acidentes de código autônomo ou humano.

### ADR-007 — Engenharia de Escala (k6 100→1.000 VUs, Índices Anti-Scan, Cache Compartilhado e SLA `< 1s`)
- **Contexto:** Cliques manuais e testes concorrentes em memória (`src/__tests__/stressTesting.test.ts`) não garantem comportamento sob 100–1.000 requisições HTTP simultâneas em produção (Next.js + Supabase).
- **Decisão:** Adotar a escada de 5 degraus (`scale-load-testing-sla`): (1) carga HTTP real via `k6` em `scripts/load/k6-argus-1000-users.js` (`stage100` -> `peak1000`); (2) eliminação de sequential scans em `/api/questions` com `.ilike(col, termo)` sem `%...%` e índices GIN `pg_trgm` / B-Tree em `supabase/schema.sql`; (3) cache compartilhado de leitura pública (`/edital/[slug]` SSG, `ai_diagnostic_cache`, e cache L1 `src/lib/questionsCache.ts` + `Cache-Control: public, s-maxage=300, stale-while-revalidate=600` em `/api/questions`); e (4) alerta automático via `recordLatencySLA` / `measureLatency` (`src/lib/logger.ts`) emitindo `SLA_LATENCY_BREACH` sempre que `durationMs > 1000`.
- **Consequências:** Gargalos de banco e latência `> 1s` passam a ser detectáveis de forma objetiva antes de impactarem os alunos.
