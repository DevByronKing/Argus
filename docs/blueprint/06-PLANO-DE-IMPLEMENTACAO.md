# 06 — Plano de Implementação Incremental, DoD & Quality Gates — Argus

> **Documento 06 de 06 — Blueprint Fundacional do Produto**  
> **Escopo:** Ordem incremental de construção e evolução em 6 estágios verificáveis (do deploy inicial à observabilidade/retenção), critérios de conclusão (*Definition of Done*) e gates automatizados que validam cada etapa antes da próxima.  
> **Comandos & Pipeline Verificados:** [`package.json`](../../package.json) • [`CLAUDE.md`](../../CLAUDE.md) • [`AGENTS.md`](../../AGENTS.md)

---

## 1. Regra de Execução em Etapas Pequenas

Nenhuma funcionalidade complexa ou novo módulo deve ser implementado "em bloco único sem verificação":
1. **Ler/Atualizar o Blueprint & Spec:** Confirmar alinhamento nos documentos `01`–`05` e criar/atualizar spec em `specs/PRD-*.md` quando houver novos critérios de aceite.
2. **TDD Primeiro ou Paralelo:** Escrever/atualizar testes em `src/__tests__/` cobrindo regras de negócio, limites de plano, segurança e estado.
3. **Implementar em Passos Atômicos:** Alterar um módulo/etapa por vez mantendo tokens CSS e API Routes server-only.
4. **Rodar os Gates Antes de Avançar:** Não iniciar a etapa seguinte com `tsc --noEmit` ou `npm test` falhando.

---

## 2. Roadmap em 6 Estágios Verificáveis (Mapeado ao Argus)

| Estágio | Objetivo | Entregáveis-Chave no Repositório | Gate de Verificação da Etapa |
| :--- | :--- | :--- | :--- |
| **01 — Projeto no Ar & Fundação Visual/Edge** | Shell Next.js, Design Tokens e WAF ativos | `src/app/layout.tsx` (`Plus Jakarta Sans`), `src/styles/tokens.css`, `src/components/ui/*`, `src/middleware.ts` (Headers/Honeypot/Rate Limit), Landing `/` e `/edital/[slug]`. | `npx tsc --noEmit` + render `/` + contraste WCAG (`npm run test:a11y`). |
| **02 — Banco, Schemas, RLS & Autenticação** | Isolamento de dados e identidade real + contingência | `supabase/schema.sql` (9 tabelas, 2 triggers, 10 índices, RLS), `src/lib/supabase.ts`, `src/lib/supabaseService.ts`, `/api/auth/*`, `/auth/callback`, `useAuthStore`, `src/lib/guardrails.ts`. | `npm test -- authFlow.test.ts guardrailsEngine.test.ts` + verificação RLS/triggers. |
| **03 — Caminho Principal (D0 -> Estudo Ativo)** | Loop central onboarding -> edital -> simulador | `UserOnboardingModal.tsx` (draft 4G), `EditalParser.tsx` (`/api/edital*`), `StudyCycleManager.tsx`, `QuizSimulator.tsx` (`/api/diagnosis` + L1/L2 cache). | `npm test -- onboardingData.test.ts userOnboarding.test.ts studyCycleAlgorithm.test.ts uxUsabilitySuite.test.ts`. |
| **04 — Módulos Pedagógicos & Mobile Capacitor** | Retenção pedagógica profunda e wrapper nativo | `MistakesNotebook.tsx`, `SRSFlashcardPlayer.tsx`, `SmartVadeMecum.tsx`, `BancaPsychometrics.tsx`, `DiscursiveStudio.tsx` (`/api/discursive`), `AICopilotDrawer.tsx`, `ConcursosRadarTab.tsx`, `capacitor.config.ts`. | `npm test -- srsAlgorithm.test.ts psychometrics.test.ts examAdaptation.test.ts examScoring.test.ts saasModules.test.ts`. |
| **05 — Monetização, Erros & Blindagem Security** | Conversão Pix/Cartão segura e testes de ataque | `PricingPlansTab.tsx`, `CheckoutCartTab.tsx` (`/api/checkout`), `src/lib/paymentGateways.ts`, `src/lib/transactions.ts`, `/api/webhooks/payment`, `abTesting.ts`, `takedown`, `/privacidade`, `/termos`. | `npm test -- webhooksLifecycle.test.ts backendSecurity.test.ts penetrationTesting.test.ts securitySuite.test.ts rateLimiter.test.ts`. |
| **06 — Lançamento, Retenção & Observabilidade** | Escala, E2E e estabilidade em produção | `/api/leads`, `/api/welcome-email`, `/api/retention/inactivity-check`, `/api/subscription/renewal-notice`, `TrackingScripts.tsx`, `siemEngine.ts`, `scripts/load/k6-argus-1000-users.js` e alerta `> 1s`. | `npx tsc --noEmit` + `npm test` (22 suítes) + `npm run test:a11y` + `npm run build` + `k6` (`p95 < 1000 ms` até 1.000 VUs). |

---

## 3. Catálogo de Comandos de Verificação (`package.json` & `scripts/load/`)

| Gate | Comando Exato | Quando Executar |
| :--- | :--- | :--- |
| **Gate 1 — Typecheck** | `npx tsc --noEmit` | Após qualquer alteração em `.ts` / `.tsx`. |
| **Gate 2 — Suíte Unitária & Segurança** | `npm test` (`vitest run`, 22 suítes em `src/__tests__/`) | Obrigatório antes de concluir qualquer etapa ou PR. |
| **Gate 2b — Auditoria Ofensiva & Estresse In-Memory** | `npm run security:audit` / `npm run test:stress` | Alterações em WAF, sanitizers, pagamentos, rate limit ou queue. |
| **Gate 2c — Carga HTTP Real `k6` (100→1.000 VUs)** | `k6 run -e BASE_URL=http://127.0.0.1:3000 -e LOAD_PROFILE=stage100 scripts/load/k6-argus-1000-users.js` (e `LOAD_PROFILE=peak1000` para pico) | Antes de promoção para produção ou após mudanças em `/api/questions`, `/`, `/edital/[slug]`, cache ou índices SQL. |
| **Gate 3 — Build de Produção** | `npm run build` | Antes de release/merge final e deploy na Vercel. |
| **Gate 4 — Acessibilidade & E2E** | `npm run test:a11y` e `npm run test:e2e` | Alterações de fluxo UI, contraste, navegação ou modais. |
| **Gate Lint** | `npm run lint` | Verificação de regras ESLint/Next.js. |
| **Sync Mobile** | `npm run cap:sync` | Após build web quando atualizar pacotes Android/iOS (`capacitor.config.ts`). |

---

## 4. Definition of Done (DoD) por Feature / Etapa

Uma tarefa só pode ser considerada **concluída** quando cumprir simultaneamente:

- [ ] **Blueprint & Spec alinhados:** Sem violação de `OUT-OF-SCOPE` (`01`), ADRs/env (`02`), fluxo sem tela morta (`03`), tokens CSS (`04`) ou esquema/RLS (`05`).
- [ ] **Segurança & Privacidade:** Nenhuma chave server-only em código client; rotas admin com JWT + CSRF; tabelas novas com RLS + policy; sem hard delete em `PROTECTED_ENTITIES`.
- [ ] **Escala, Índices, Cache & Latência `< 1s`:** Queries frequentes cobertas por índice (sem `%ilike%` sem GIN), leituras compartilhadas cacheadas, alerta automático acima de `1.000 ms` e carga `k6` verde (`p95 < 1000 ms`).
- [ ] **UX & Acessibilidade:** CTAs primários `>= 48px`, botão primário único por seção (Von Restorff), sem quebra de contraste AA/AAA nem modal ocultado por dock mobile.
- [ ] **Verificação Verde após última edição:** `npx tsc --noEmit` e `npm test` passando sem testes pulados/afrouxados (e `npm run build` / `npm run test:a11y` quando aplicável).
- [ ] **Git & Conventional Commits (`AGENTS.md`):** Commit limpo e escopado em branch/trunk (`feat(...)`, `fix(...)`, `docs(...)`, `test(...)`, `refactor(...)`).
