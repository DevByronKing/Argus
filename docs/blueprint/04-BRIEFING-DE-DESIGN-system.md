# 04 — Briefing de Design & Design System — Argus

> **Documento 04 de 06 — Blueprint Fundacional do Produto**  
> **Escopo:** Consistência visual absoluta entre web e mobile (cores Light/Dark, tipografia, escala de espaçamento, raios de borda, biblioteca UI e leis de UX).  
> **Fonte da Verdade de Código:** [`src/styles/tokens.css`](../../src/styles/tokens.css) • [`src/app/layout.tsx`](../../src/app/layout.tsx) • [`src/components/ui/`](../../src/components/ui/index.ts) • [`DESIGN.md`](../DESIGN.md)

---

## 1. Direção Visual & Regra de Ouro

- **Identidade Estética:** **Minimalismo Técnico de Alto Contraste** em modo dual:
  - **Modo Escuro ("Obsidian & Cyber-Academic"):** padrão de foco profundo anti-fadiga (`#090D16`), projetado para sessões de 4 a 10 horas diárias.
  - **Modo Claro ("Papel Frio"):** fundo off-white suave (`#F8FAFC`) evitando ofuscamento de branco puro.
- **Tom de Voz Visual & Textual:** Direto, cirúrgico e anti-banca ([Manifesto de Marca](../BRAND_AND_VOICE_MANIFESTO.md)). A interface permanece neutra na maior parte do tempo, reservando destaque de cor para ação primária (Índigo) e avanço pedagógico / *Aha Moment* (Esmeralda).
- **Regra Inviolável:** Nenhum componente novo ou refatorado pode hardcodar cores hex soltas fora dos tokens de `src/styles/tokens.css` (ou classes Tailwind semanticamente mapeadas a esses tokens), nem violar contraste mínimo **WCAG 2.1 AA (4.5:1)** / **AAA (7:1 em títulos)** verificável via `npm run test:a11y`.

---

## 2. Tokens de Cores & Contraste (`src/styles/tokens.css`)

Alternância controlada por `[data-theme="light"]` / `html.light` e `[data-theme="dark"]` / `html.dark`:

### 2.1. Marca & Ação Pedagógica

| Token CSS | Light Mode | Dark Mode | Uso Obrigatório |
| :--- | :--- | :--- | :--- |
| `--brand-primary` | `#4338CA` (7.8:1 AAA) | `#818CF8` (5.9:1–6.5:1) | CTA primário da seção, link ativo e destaque institucional. |
| `--brand-primary-hover` | `#3730A3` | `#A5B4FC` | Estado hover/focus de ação primária. |
| `--brand-primary-active` | `#312E81` | `#6366F1` | Estado pressionado (`active`). |
| `--brand-primary-muted` | `rgba(67, 56, 202, 0.12)` | `rgba(129, 140, 248, 0.18)` | Fundo sutil de abas ativas e badges secundários. |
| `--brand-primary-subtle` | `#EEF2FF` | `rgba(129, 140, 248, 0.08)` | Realce leve de contêineres selecionados. |
| `--brand-accent` | `#047857` (5.35:1 AA+) | `#34D399` (8.5:1 AAA) | Barras de progresso, metas concluídas, validação pedagógica e *Aha Moment*. |
| `--brand-accent-hover` | `#065F46` | `#6EE7B7` | Hover em progressão positiva. |
| `--brand-accent-muted` | `rgba(4, 120, 87, 0.12)` | `rgba(52, 211, 153, 0.18)` | Badges positivos e feedback de acerto. |
| `--brand-accent-subtle` | `#ECFDF5` | `rgba(52, 211, 153, 0.08)` | Painéis de celebração de marco. |

### 2.2. Superfícies, Texto, Bordas & Semântica

| Grupo | Token CSS | Light Mode | Dark Mode |
| :--- | :--- | :--- | :--- |
| **Superfícies** | `--surface-bg` | `#F8FAFC` | `#090D16` |
| | `--surface-card` | `#FFFFFF` | `#111827` |
| | `--surface-elevated` | `#F1F5F9` | `#1E293B` |
| | `--surface-overlay` | `rgba(241, 245, 249, 0.96)` | `rgba(4, 7, 13, 0.96)` |
| **Tipografia** | `--text-primary` | `#0F172A` (16.5:1 AAA) | `#F9FAFB` (17.8:1 AAA) |
| | `--text-secondary` | `#334155` (7.5:1 AAA) | `#E2E8F0` (12:1 AAA) |
| | `--text-muted` | `#475569` (5.5:1 AA) | `#94A3B8` (5.6:1 AA) |
| | `--text-on-brand` | `#FFFFFF` | `#090D16` |
| **Bordas** | `--border-subtle` | `#E2E8F0` | `#1F2937` |
| | `--border-strong` | `#CBD5E1` | `#374151` |
| | `--border-focus` | `#4338CA` | `#818CF8` |
| **Feedback** | `--status-success` / `-bg` | `#15803D` / `#DCFCE7` | `#4ADE80` / `rgba(74, 222, 128, 0.12)` |
| | `--status-warning` / `-bg` | `#B45309` / `#FEF3C7` | `#FBBF24` / `rgba(251, 191, 36, 0.12)` |
| | `--status-error` / `-bg` | `#DC2626` / `#FEE2E2` | `#F87171` / `rgba(248, 113, 113, 0.12)` |

---

## 3. Tipografia, Raios de Borda, Espaçamento & Movimento

### 3.1. Família Tipográfica Real (`src/app/layout.tsx` + `src/styles/tokens.css`)
- **Fonte oficial em produção:** **`Plus Jakarta Sans`** carregada via `next/font/google` (`weights: ['400', '500', '600', '700', '800']`, CSS var `--font-plus-jakarta`) e registrada em `--font-family-sans`.
  > *Nota de governança:* Documentos legados mencionam "Outfit" e `/design-system` (originados na fase anterior Learning-AI); **a fonte ativa e vinculante do Argus é `Plus Jakarta Sans`**.
- **Escala tipográfica:** `xs` (`12px`), `sm` (`14px`), `base` (`16px`), `lg` (`18px`), `xl` (`20px`), `2xl` (`24px`), `3xl` (`30px`), `4xl` (`36px`), `5xl` (`48px`).
- **Pesos e entrelinhas:** Regular (`400`), Medium (`500`), Bold (`700`), Black (`800`); alturas `tight` (`1.15`), `snug` (`1.3`), `normal` (`1.5`), `relaxed` (`1.6`); tracking `tight` (`-0.02em`), `normal` (`0em`), `wide` (`0.04em`).

### 3.2. Escala de Espaçamento (Base 4px / 8px) e Raios
- **Espaçamento:** `--space-xs` (`4px`), `--space-sm` (`8px`), `--space-md` (`16px`), `--space-lg` (`24px`), `--space-xl` (`32px`), `--space-2xl` (`40px`), `--space-3xl` (`48px`).
- **Raios de borda:**
  - `--radius-xs`: `4px` (micro-tags)
  - `--radius-md`: `8px` (**padrão de Botões e Inputs**)
  - `--radius-lg`: `12px` (**padrão de Cards de Aula e Painéis Interativos**)
  - `--radius-xl`: `16px` (**Modais e Contêineres Primários**)
  - `--radius-2xl`: `24px` (Hero sections e destaques)
  - `--radius-full`: `9999px` (Badges, Toggles e Avatares circulares)
- **Transições:** `--transition-fast` (`150ms`), `--transition-normal` (`250ms`), `--transition-slow` (`350ms`) com `cubic-bezier(0.4, 0, 0.2, 1)`.

---

## 4. Componentes Base (`src/components/ui/`) & As 7 Leis de UX

### 4.1. Componentes Reutilizáveis Registrados
`Avatar.tsx`, `Badge.tsx`, `Button.tsx`, `Input.tsx`, `LessonCard.tsx`, `ProgressBar.tsx`, `ToggleSwitch.tsx`, exportados por `src/components/ui/index.ts`. Antes de criar qualquer botão, input, badge, switch ou barra de progresso manual em módulos novos, reutilize estes componentes.

### 4.2. Checklist Obrigatório das 7 Leis de UX (`.agents/skills/sete-leis-ux-arquitetura-tela/SKILL.md`)

1. **Lei de Fitts:** CTA principal com altura mínima `>= 48px` (`size="lg"` / touch target confortável no mobile/Capacitor) na zona natural do polegar/foco.
2. **Lei de Hick:** Máximo 2–3 escolhas/planos em destaque e 3–4 ações rápidas por card; filtros avançados ficam recolhidos (*Progressive Disclosure*).
3. **Efeito Zeigarnik:** Onboarding e fluxos de ativação sempre exibem checklist de passos restantes (com primeiro passo pré-marcado quando aplicável).
4. **Lei de Jakob:** Padrões universais preservados (busca com lupa no topo, configurações no cabeçalho/rodapé lateral, navegação previsível).
5. **Efeito Goal-Gradient:** Jornadas multi-etapas exibem barra contínua (`ProgressBar`) e reforço motivacional dinâmico a partir de `>= 75%` de conclusão.
6. **Efeito Von Restorff:** Apenas **1 botão de variante primária** (preenchimento de destaque) por seção visual; ações secundárias usam `secondary`, `outline` ou `ghost`.
7. **Lei de Miller:** Agrupar métricas, links e controles em **3 a 4 categorias claras** com cabeçalhos distintos (nunca listas planas > 7 itens com mesmo peso visual).
