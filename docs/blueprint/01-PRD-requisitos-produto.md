# 01 — PRD (Documento de Requisitos do Produto) — Argus

> **Documento 01 de 06 — Blueprint Fundacional do Produto**  
> **Escopo:** Definição do problema, público-alvo, escopo funcional (`IN-SCOPE`), métricas de ativação e fronteiras explícitas de exclusão (`OUT-OF-SCOPE / Explicitly Rejected`).  
> **Specs Modulares Complementares:** [`PRD-01` (Simulador)](../../specs/PRD-01-study-simulator.md) • [`PRD-02` (Onboarding)](../../specs/PRD-02-onboarding-activation.md) • [`PRD-03` (Guardrails)](../../specs/PRD-03-guardrails-data-safety.md)

---

## 1. Visão do Produto & Problema Resolvido

- **Nome oficial:** **Argus** (`br.com.argus.app` / Copiloto Cognitivo para Concursos, OAB e Carreiras Jurídicas).
- **Posicionamento:** *"O algoritmo que descobre o que você vai errar antes do dia da prova."* ([Manifesto de Marca](../BRAND_AND_VOICE_MANIFESTO.md))
- **Problema central:** Candidatos estudam horas por PDFs extensos e videoaulas passivas, mas reprovam por **4 falhas estruturais** (mapeadas em `src/components/UserOnboardingModal.tsx`):
  1. **Cilada das Pegadinhas & Distratores:** domínio teórico sem vacinação contra trocas semânticas da banca.
  2. **Sobrecarga de Editais:** tentativa linear de cobrir 100% do edital sem priorização 80/20.
  3. **Muro dos 60–70% (Platô):** prática sem diagnóstico de causa-raiz dos erros.
  4. **Curva do Esquecimento:** ausência de repetição espaçada programada no ponto de decaimento.

---

## 2. Público-Alvo (Personas)

| Persona | Perfil Principal | Necessidade Crítica no Argus |
| :--- | :--- | :--- |
| **Concurseiro Tático** | Carreiras Policiais, Fiscais, Tribunais (TRTs/TRFs/TJs) e Administrativas (INSS, Banco, etc.) | Edital verticalizado 80/20, Arena 60/40, ciclo de estudos por horas livres e psicometria da banca (Cebraspe, FGV, FCC, Vunesp, Cesgranrio). |
| **Examinando OAB** | Estudantes e bacharéis de Direito preparando 1ª fase objetiva e 2ª fase (peças práticas) | Smart Vade Mecum com artigos mais cobrados, simulador com fundamentação legal (`codeCitation`) e correção estruturada no `DiscursiveStudio`. |
| **Reincidente em Platô** | Candidato que já domina teoria básica, mas trava nos 65–72% de acerto | Caderno de Erros Ativo (Modo Revanche), diagnóstico de erro cognitivo (`pegadinha_banca`, `lacuna_teorica`, `leitura_apressada`, `curva_esquecimento`) e flashcards SM-2 automáticos. |

---

## 3. Escopo do Produto (`IN-SCOPE`)

### 3.1. Módulos Canônicos Implementados (`CANONICAL_MODULES` em `src/lib/types.ts`)

| ID do Módulo | Nome na Plataforma | Função Principal |
| :--- | :--- | :--- |
| `edital` | **Meu Edital Organizado / Edital IA** | Verticalização de editais por peso/frequência da banca e rota 80/20 (`/api/edital`, `/api/edital/jobs`). |
| `simulator` | **Simulador de Questões (Arena 60/40)** | Resolução rápida com risco de distratores (`strikethrough`), ajuste `A-/A+`, citação legal inline e feedback imediato (`/api/diagnosis`). |
| `mistakes` | **Caderno de Erros (Modo Revanche)** | Reagrupamento de erros com anotações pessoais, contagem de revanches e status `isOvercome`. |
| `vademecum` | **Smart Vade Mecum** | Consulta direta à lei seca, artigos quentes e súmulas vinculadas à banca. |
| `discursivas` | **Redação & Discursivas / Peças OAB** | Estúdio de redação com contagem de linhas e correção por critérios e erros linha-a-linha (`/api/discursive`). |
| `cycle` | **Plano de Estudos Diário / Ciclos** | Geração automática de blocos diários conforme horas disponíveis e metodologia (`ciclo_meirelles`, `ebbinghaus_srs`, `estudo_reverso`, `pomodoro_pro`). |
| `flashcards` | **Cartões de Memorização (SRS)** | Algoritmo SM-2 / Curva de Ebbinghaus (`intervalDays`, `easeFactor`, `repetitions`, `nextReviewDate`). |
| `radar` | **Radar de Concursos** | Acompanhamento de certames com status `publicado`, `confirmado`, `previsto` e `rumor`. |
| `analytics` | **Cockpit de Dados / Desempenho** | Acurácia global, probabilidade de aprovação estimada, streak, heatmap de consistência e alinhamento por banca. |
| `copilot` | **Tutor IA (Gaveta Global)** | Copiloto contextual para dúvidas rápidas sobre lei seca, questões e estratégia (`/api/copilot`). |

### 3.2. Planos e Empacotamento (`src/lib/types.ts` & `src/components/PricingPlansTab.tsx`)

| Plano (`SubscriptionPlan`) | Modelo | Proposta de Valor Principal |
| :--- | :--- | :--- |
| `aspirante` | Gratuito / Entrada | Degustação inicial, onboarding completo e quotas diárias reduzidas (`PLAN_LIMITS`). |
| `lancamento` | **Passe 30 Dias** (Pagamento único) | Acesso focado até a prova para 1 concurso travado com Banco de Questões, Edital 80/20, Caderno de Erros SM-2 e Vade Mecum. |
| `pro` | **Plano PRO** (Mensal / Anual) | Editais ilimitados, banco completo de questões, diagnósticos ilimitados, cronograma e Radar de Concursos. |
| `elite` | **ELITE VIP** (Mensal / Anual) | Inclui tudo do PRO + módulo de Psicometria TRI, correções de peças OAB/discursivas e suporte VIP. |
| `black` | **BLACK VITALÍCIO** (Vitalício / Anual) | Acesso perpétuo até a posse, correções ilimitadas de discursivas/OAB, importação custom de editais, Animal Guardião Fênix Dourada. |

---

## 4. Critérios de Sucesso & Telemetria

- **Ativação D0 (`specs/PRD-02`):** Candidato conclui o onboarding de 5 etapas (com persistência contra queda de 4G em `argus_onboarding_draft`) e inicia a primeira sessão ativa (`simulator` ou `cycle`) sem tela vazia.
- **Eficiência Cognitiva & Custo de IA:** Cache de diagnósticos em dois níveis (L1 memória + L2 PostgreSQL `ai_diagnostic_cache`) + fallback determinístico quando chaves externas não estiverem disponíveis.
- **Retenção Ativa:** Acompanhamento de `streakDays`, revisões pendentes no SRS (`flashcards`), erros vencidos no Modo Revanche (`mistakes_notebook`) e gatilhos de inatividade (`/api/retention/inactivity-check`).

---

## 5. `OUT-OF-SCOPE` / `Explicitly Rejected` (O que o Argus NÃO Faz)

Para proteger o foco do produto e evitar *scope creep* por agentes de IA ou humanos, os itens abaixo estão **explicitamente fora de escopo**:

1. **Streaming de videoaulas longas passivas ou apostilas PDF estáticas de milhares de páginas:** O método do Argus é ativo (questões, lei seca destacada, flashcards e diagnóstico de erro), nunca consumo passivo de aulas gravadas.
2. **Rede social aberta entre candidatos:** Sem feed público, chat aberto entre alunos, comentários anárquicos ou ranking social que gere distração durante o estudo.
3. **Marketplace de terceiros:** Não hospedamos cursos de infoprodutores externos nem venda de materiais avulsos fora dos planos oficiais do Argus.
4. **Liberação de assinatura ou bypass de quotas no client-side:** O cliente (`'use client'`) nunca altera `subscription_tier` ou `subscription_status` diretamente no banco; apenas webhooks autenticados/backend (`service_role`) validam pagamentos (ver `trg_protect_profile_subscription` em `supabase/schema.sql`).
5. **Deleção física (`Hard Delete`) de entidades críticas:** É proibido executar `DELETE` físico ou `DROP/TRUNCATE` em tabelas centrais (`questions`, `student_profiles`, `exam_notices`, `audit_logs`, `question_attempts`, `payment_transactions`). Toda remoção exige Soft Delete (`src/lib/guardrails.ts`).
6. **Exames internacionais fora do ecossistema brasileiro:** Sem suporte na v1.x a provas estrangeiras (USMLE, SAT, GMAT, US Bar).
