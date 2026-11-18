---
name: six-docs-app-blueprint
description: Mandatory 6-document product & engineering blueprint workflow for Argus (PRD + Out-of-Scope, TRD/ADRs, App Flow/Wireframes, Design Briefing/System, Backend Schema + RLS, and Phased Implementation Plan + DoD). Apply before planning, building, or refactoring features, schemas, screens, or API routes.
---

# Six-Document App Blueprint (`docs/blueprint/`)

Antes de implementar novas funcionalidades, rotas, tabelas, telas ou integrações no **Argus**, consulte e mantenha sincronizados os **6 documentos fundacionais** em `docs/blueprint/`:

| Ordem | Documento | O que define | Quando consultar / atualizar |
| :--- | :--- | :--- | :--- |
| **01** | [`docs/blueprint/01-PRD-requisitos-produto.md`](../../../docs/blueprint/01-PRD-requisitos-produto.md) | Problema, personas, escopo `IN-SCOPE`, planos e lista explícita `OUT-OF-SCOPE / Explicitly Rejected` | Antes de aprovar ou iniciar qualquer nova feature ou mudança de produto/monetização. |
| **02** | [`docs/blueprint/02-TRD-requisitos-tecnicos-adr.md`](../../../docs/blueprint/02-TRD-requisitos-tecnicos-adr.md) | Stack real, fronteira client/server de env vars e ADRs (Next 14, Supabase, Gemini L1/L2, Asaas/Stripe, Capacitor, WAF) | Antes de adicionar dependências, alterar providers, variáveis `.env` ou arquitetura. |
| **03** | [`docs/blueprint/03-FLUXO-DO-APP-wireframes.md`](../../../docs/blueprint/03-FLUXO-DO-APP-wireframes.md) | Todas as rotas App Router, abas de `ArgusApp`, modais, fluxo de onboarding 5 etapas e ação por clique | Antes de criar/alterar telas, fluxos de navegação, CTAs, paywalls ou redirects. |
| **04** | [`docs/blueprint/04-BRIEFING-DE-DESIGN-system.md`](../../../docs/blueprint/04-BRIEFING-DE-DESIGN-system.md) | Tokens (`src/styles/tokens.css`), tipografia `Plus Jakarta Sans`, escalas, `src/components/ui/` e as 7 Leis de UX | Antes de estilizar interfaces, criar componentes ou mexer em temas Light/Dark. |
| **05** | [`docs/blueprint/05-ESQUEMA-BACKEND-rls.md`](../../../docs/blueprint/05-ESQUEMA-BACKEND-rls.md) | Tabelas, FKs, triggers, 10 índices, matriz RLS (`supabase/schema.sql`), mapa `/api/*` e guardrails SQL | Antes de alterar schema SQL, policies RLS, rotas API ou regras de segurança. |
| **06** | [`docs/blueprint/06-PLANO-DE-IMPLEMENTACAO.md`](../../../docs/blueprint/06-PLANO-DE-IMPLEMENTACAO.md) | Ordem incremental em 6 estágios verificáveis, Definition of Done (DoD) e Quality Gates | Antes de executar o plano de build e antes de declarar qualquer tarefa concluída. |

## Regras Operacionais Obrigatórias para Agentes

1. **Zero Feature `OUT-OF-SCOPE`:** Nunca implemente itens rejeitados em `01-PRD-requisitos-produto.md` (ex.: videoaulas passivas, rede social aberta, liberação de assinatura no client ou hard-delete em `PROTECTED_ENTITIES`).
2. **Construção em Etapas Pequenas & Verificadas:** Implemente uma etapa/módulo por vez seguindo `06-PLANO-DE-IMPLEMENTACAO.md` e valide `npx tsc --noEmit` + `npm test` antes de avançar.
3. **Alinhamento Contínuo (Docs as Source of Truth):** Se uma mudança alterar contrato de API, tabela, policy RLS, token visual ou rota/aba, atualize o documento correspondente (`01`–`06`) no mesmo ciclo.
4. **Coerência Modular:** Mantenha os arquivos curtos e objetivos (`01`–`06` para visão macro; `specs/PRD-*.md` para critérios de aceite granulares por feature).
