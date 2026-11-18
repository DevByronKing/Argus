---
name: scale-load-testing-sla
description: Scale, concurrency load testing (k6 100 to 1,000 VUs), PostgreSQL index discipline, shared catalog caching, and >1s latency alerting rules adapted for Argus. Apply when tuning performance, writing API routes, modifying Supabase queries/indexes, or validating scalability.
---

# Scale, Load Testing & Latency SLA (`> 1s` Alert) — Argus

Adaptado da metodologia **"Teu App Aguenta 1.000 Usuários?"** para o ecossistema **Argus** (Next.js 14 + Supabase PostgreSQL + Vitest + k6):

## A Escada de 5 Degraus para Escalar o Argus

1. **Degrau 1 → 2 (`100 VUs` por 10min com `k6`):**
   - Não depender apenas de cliques manuais ou testes unitários em memória (`src/__tests__/stressTesting.test.ts`).
   - Rodar carga HTTP real contra `/`, `/edital/inss-tecnico-seguro-social-2026` e `/api/questions` usando [`scripts/load/k6-argus-1000-users.js`](../../../scripts/load/k6-argus-1000-users.js).
2. **Degrau 3 (`1.000 VUs` + Eliminação de Gargalo de Banco Sem Índice):**
   - Elevar a carga de `100` para `1.000` usuários simultâneos e inspecionar qual endpoint degradou.
   - **Regra SQL no Argus (`supabase/schema.sql`):** Nenhuma query frequente pode causar sequential scan. Evite `ILIKE '%termo%'` com wildcard à esquerda em colunas sem índice GIN `pg_trgm` (como `banca` e `subject_name` em `src/app/api/questions/route.ts`, que hoje ignoram o B-Tree `idx_questions_banca_subject`), e mantenha índices em colunas de lookup (`transactions(external_id)`, `profiles(email)`).
3. **Degrau 4 (Cache Compartilhado — "1 consulta em vez de 1.000"):**
   - Respostas idênticas para todos os usuários devem ser cacheadas em vez de repetirem `SELECT` no PostgreSQL:
     - Páginas públicas de editais (`/edital/[slug]/page.tsx`) via SSG (`generateStaticParams`).
     - Diagnósticos repetidos de IA (`/api/diagnosis`) via Cache L1 + L2 (`ai_diagnostic_cache`).
     - Catálogo público de questões (`/api/questions`) com cache HTTP (`Cache-Control: public, s-maxage=300, stale-while-revalidate=600`) ou camada L1 por filtro (`banca:subject:limit`).
4. **Degrau 5 (Alerta Automático de Latência `> 1.000 ms`):**
   - Medir `durationMs = Date.now() - startedAt` em API Routes críticas e emitir alerta via `logger.metric` + `logger.warn('SLA_LATENCY_BREACH', ...)` (`src/lib/logger.ts`) sempre que **`durationMs > 1000`** (`1 segundo`), detectando degradação antes do aluno.

## Critério de Aceite de Escala
- **p95 `< 1.000 ms`** sob carga alvo (`100` VUs baseline / `1.000` VUs pico) e taxa de erro HTTP `< 1%` (`http_req_failed < 0.01`).
- Toda nova API Route ou query Supabase em `src/app/api/` deve documentar estratégia de índice (`05-ESQUEMA-BACKEND-rls.md`) e política de cache (`02-TRD-requisitos-tecnicos-adr.md`).
