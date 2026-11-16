const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '../../public/instagram-kit');
const RAW_DIR = path.join(OUT_DIR, '1-telas-reais');
const STORIES_DIR = path.join(OUT_DIR, '2-stories-prontos-9x16');
const COVERS_DIR = path.join(OUT_DIR, '3-capas-destaques');
const VIDEOS_DIR = path.join(OUT_DIR, '4-videos-gravados-9x16');

for (const dir of [OUT_DIR, RAW_DIR, STORIES_DIR, COVERS_DIR, VIDEOS_DIR]) {
  fs.mkdirSync(dir, { recursive: true });
}

function imgToDataUri(filename) {
  const filePath = path.join(RAW_DIR, filename);
  if (!fs.existsSync(filePath)) return '';
  const buf = fs.readFileSync(filePath);
  return `data:image/png;base64,${buf.toString('base64')}`;
}

function logoToDataUri() {
  const svgPath = path.join(__dirname, '../../public/favicon.svg');
  if (fs.existsSync(svgPath)) {
    const buf = fs.readFileSync(svgPath);
    return `data:image/svg+xml;base64,${buf.toString('base64')}`;
  }
  return '';
}

function buildCoverHtml({ title, subtitle, iconSvg, accentColor }) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1080px;
    height: 1080px;
    background: radial-gradient(circle at 50% 35%, #111c38 0%, #050811 70%, #020409 100%);
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    color: #fff;
  }
  .ring-outer {
    width: 760px;
    height: 760px;
    border-radius: 50%;
    border: 4px solid rgba(56, 189, 248, 0.22);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 120px ${accentColor}33, inset 0 0 80px ${accentColor}22;
    position: relative;
  }
  .ring-inner {
    width: 660px;
    height: 660px;
    border-radius: 50%;
    border: 2px dashed rgba(129, 140, 248, 0.35);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 28px;
    background: rgba(9, 14, 28, 0.75);
    backdrop-filter: blur(20px);
    padding: 40px;
    text-align: center;
  }
  .icon-box {
    width: 210px;
    height: 210px;
    border-radius: 48px;
    background: linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95));
    border: 3px solid ${accentColor};
    box-shadow: 0 0 55px ${accentColor}55;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .title {
    font-size: 54px;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    background: linear-gradient(135deg, #ffffff 30%, ${accentColor} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .subtitle {
    font-size: 24px;
    font-weight: 700;
    color: #94A3B8;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
</style>
</head>
<body>
  <div class="ring-outer">
    <div class="ring-inner">
      <div class="icon-box">${iconSvg}</div>
      <div>
        <div class="title">${title}</div>
        <div class="subtitle">${subtitle}</div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function buildStoryHtml({
  highlightBadge,
  stepLabel,
  headlineHtml,
  subheadline,
  primaryImg,
  secondaryImg,
  bullets,
  ctaText,
  accent = '#38BDF8',
}) {
  const bulletsHtml = (bullets || [])
    .map(
      (b) => `
      <div class="bullet-item">
        <div class="bullet-dot" style="background:${accent}; box-shadow: 0 0 16px ${accent};">✓</div>
        <div class="bullet-text">${b}</div>
      </div>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800;900&family=JetBrains+Mono:wght@700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1080px;
    height: 1920px;
    background: radial-gradient(circle at 50% 15%, #132042 0%, #070B16 55%, #03060C 100%);
    color: #F8FAFC;
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 110px 64px 110px;
    position: relative;
    overflow: hidden;
  }
  .grid-bg {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.07) 1.5px, transparent 1.5px);
    background-size: 36px 36px;
    opacity: 0.45;
    pointer-events: none;
  }
  .glow-top {
    position: absolute;
    top: -120px;
    left: 50%;
    transform: translateX(-50%);
    width: 720px;
    height: 420px;
    background: ${accent};
    opacity: 0.18;
    filter: blur(130px);
    border-radius: 50%;
    pointer-events: none;
  }
  .top-header {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .brand-pill {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    background: rgba(15, 23, 42, 0.85);
    border: 1.5px solid rgba(255,255,255,0.14);
    padding: 12px 24px;
    border-radius: 999px;
    font-weight: 800;
    font-size: 22px;
    letter-spacing: 0.04em;
  }
  .brand-dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${accent};
    box-shadow: 0 0 14px ${accent};
  }
  .step-pill {
    font-family: 'JetBrains Mono', monospace;
    font-size: 20px;
    font-weight: 700;
    color: ${accent};
    background: rgba(15, 23, 42, 0.85);
    border: 1.5px solid ${accent}55;
    padding: 10px 22px;
    border-radius: 999px;
  }
  .hero-copy {
    position: relative;
    z-index: 10;
    margin-top: 28px;
    text-align: left;
  }
  .tag-badge {
    display: inline-block;
    font-size: 20px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: ${accent};
    background: ${accent}1F;
    border: 1.5px solid ${accent}55;
    padding: 8px 20px;
    border-radius: 12px;
    margin-bottom: 20px;
  }
  h1 {
    font-size: 56px;
    font-weight: 900;
    line-height: 1.12;
    letter-spacing: -0.025em;
    margin-bottom: 18px;
  }
  .subheadline {
    font-size: 27px;
    line-height: 1.42;
    color: #94A3B8;
    font-weight: 600;
  }
  .screens-stage {
    position: relative;
    z-index: 10;
    margin: 26px 0;
    display: flex;
    flex-direction: column;
    gap: 22px;
  }
  .browser-frame {
    background: #0B1120;
    border: 2px solid rgba(255,255,255,0.16);
    border-radius: 26px;
    overflow: hidden;
    box-shadow: 0 30px 70px rgba(0,0,0,0.85), 0 0 40px ${accent}22;
  }
  .browser-bar {
    height: 42px;
    background: #111827;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    display: flex;
    align-items: center;
    padding: 0 18px;
    gap: 10px;
  }
  .dot-r { width: 12px; height: 12px; border-radius: 50%; background: #F87171; }
  .dot-y { width: 12px; height: 12px; border-radius: 50%; background: #FBBF24; }
  .dot-g { width: 12px; height: 12px; border-radius: 50%; background: #34D399; }
  .url-bar {
    margin-left: 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 15px;
    color: #64748B;
  }
  .screen-img {
    width: 100%;
    display: block;
    object-fit: cover;
    max-height: ${secondaryImg ? '390px' : '580px'};
    object-position: top center;
  }
  .bullets-wrap {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .bullet-item {
    display: flex;
    align-items: center;
    gap: 18px;
    background: rgba(15, 23, 42, 0.78);
    border: 1.5px solid rgba(255,255,255,0.1);
    padding: 18px 24px;
    border-radius: 20px;
  }
  .bullet-dot {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: 22px;
    color: #040814;
    flex-shrink: 0;
  }
  .bullet-text {
    font-size: 25px;
    font-weight: 700;
    color: #E2E8F0;
    line-height: 1.3;
  }
  .footer-cta {
    position: relative;
    z-index: 10;
    background: linear-gradient(135deg, ${accent}, #4F46E5);
    color: #FFFFFF;
    padding: 26px 34px;
    border-radius: 24px;
    font-size: 27px;
    font-weight: 900;
    text-align: center;
    box-shadow: 0 20px 45px ${accent}44;
    letter-spacing: 0.01em;
  }
</style>
</head>
<body>
  <div class="grid-bg"></div>
  <div class="glow-top"></div>

  <div class="top-header">
    <div class="brand-pill">
      <span class="brand-dot"></span>
      <span>@argus_education • ARGUS AI</span>
    </div>
    <div class="step-pill">${stepLabel}</div>
  </div>

  <div class="hero-copy">
    <div class="tag-badge">${highlightBadge}</div>
    <h1>${headlineHtml}</h1>
    <p class="subheadline">${subheadline}</p>
  </div>

  <div class="screens-stage">
    ${
      primaryImg
        ? `<div class="browser-frame">
            <div class="browser-bar">
              <span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span>
              <span class="url-bar">argus.app — Interface Real do Sistema</span>
            </div>
            <img class="screen-img" src="${primaryImg}" />
          </div>`
        : ''
    }
    ${
      secondaryImg
        ? `<div class="browser-frame">
            <div class="browser-bar">
              <span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span>
              <span class="url-bar">argus.app — Módulo Integrado</span>
            </div>
            <img class="screen-img" src="${secondaryImg}" />
          </div>`
        : ''
    }
  </div>

  <div class="bullets-wrap">
    ${bulletsHtml}
  </div>

  <div class="footer-cta">${ctaText}</div>
</body>
</html>`;
}

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  // 1. Gerar as 4 Capas dos Destaques (1080x1080)
  console.log('Gerando Capas dos Destaques (1080x1080)...');
  const coverPage = await browser.newPage({ viewport: { width: 1080, height: 1080 } });

  const covers = [
    {
      file: 'capa_01_o_sistema.png',
      title: 'O SISTEMA',
      subtitle: 'ARGUS AI',
      accentColor: '#38BDF8',
      iconSvg: `<svg width="110" height="110" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
    },
    {
      file: 'capa_02_recursos.png',
      title: 'RECURSOS',
      subtitle: 'MÓDULOS & IA',
      accentColor: '#818CF8',
      iconSvg: `<svg width="110" height="110" viewBox="0 0 24 24" fill="none" stroke="#818CF8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>`,
    },
    {
      file: 'capa_03_vantagens.png',
      title: 'VANTAGENS',
      subtitle: 'ALTA PERFORMANCE',
      accentColor: '#34D399',
      iconSvg: `<svg width="110" height="110" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
    },
    {
      file: 'capa_04_demonstracao.png',
      title: 'DEMONSTRAÇÃO',
      subtitle: 'TESTE GRÁTIS',
      accentColor: '#FBBF24',
      iconSvg: `<svg width="110" height="110" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
    },
  ];

  for (const c of covers) {
    await coverPage.setContent(buildCoverHtml(c), { waitUntil: 'networkidle' });
    await coverPage.screenshot({ path: path.join(COVERS_DIR, c.file) });
    console.log(`✓ Capa gerada: ${c.file}`);
  }
  await coverPage.close();

  // 2. Gerar os 13 Stories 9:16 (1080x1920) com as telas reais do Argus
  console.log('Gerando 13 Stories 9:16 com prints reais do Sistema Argus...');
  const storyPage = await browser.newPage({ viewport: { width: 1080, height: 1920 } });

  const stories = [
    // DESTAQUE 1: O SISTEMA
    {
      file: 'destaque1_o_sistema_01_proposito.png',
      highlightBadge: '👁️ DESTAQUE 1 • O SISTEMA',
      stepLabel: '01 / 03',
      headlineHtml: 'O Copiloto Cognitivo da <span style="color:#38BDF8">Sua Aprovação</span>.',
      subheadline: 'O Argus AI une psicometria TRI, repetição espaçada e inteligência artificial para Concursos Públicos, OAB e Carreiras Jurídicas.',
      primaryImg: imgToDataUri('01_landing_hero.png'),
      bullets: [
        'Substitui o estudo passivo de PDFs intermináveis por treino ativo cirúrgico',
        'Identifica seus pontos cegos antes do dia da prova oficial',
      ],
      ctaText: '👉 Passe para o lado para ver como funciona',
      accent: '#38BDF8',
    },
    {
      file: 'destaque1_o_sistema_02_anamnese.png',
      highlightBadge: '👁️ DESTAQUE 1 • O SISTEMA',
      stepLabel: '02 / 03',
      headlineHtml: 'Anamnese Cognitiva & <span style="color:#818CF8">Plano de Guerra</span>.',
      subheadline: 'Em 60 segundos, o Argus mapeia seu concurso-alvo, seu Calcanhar de Aquiles e calibra seu Guardião IA.',
      primaryImg: imgToDataUri('13_onboarding_anamnese_step1.png'),
      secondaryImg: imgToDataUri('14_onboarding_anamnese_step2.png'),
      bullets: [
        'Calibrado para Cebraspe, FGV, FCC, Vunesp e Exame da OAB',
        'Passaporte Cognitivo personalizado para a sua rotina diária',
      ],
      ctaText: '⚡ Tudo adaptado ao seu nível real de preparação',
      accent: '#818CF8',
    },
    {
      file: 'destaque1_o_sistema_03_arquitetura.png',
      highlightBadge: '👁️ DESTAQUE 1 • O SISTEMA',
      stepLabel: '03 / 03',
      headlineHtml: 'Do Edital Verticalizado ao <span style="color:#34D399">Ciclo Adaptativo</span>.',
      subheadline: 'A IA disseca o edital, calcula o peso estatístico de cada disciplina e monta seu Ciclo de Estudos Meirelles.',
      primaryImg: imgToDataUri('08_edital_verticalizado.png'),
      secondaryImg: imgToDataUri('09_ciclo_meirelles.png'),
      bullets: [
        'Priorização automática das matérias de maior custo-benefício',
        'Cronômetro Pomodoro integrado e sincronização Web + Mobile',
      ],
      ctaText: '🚀 Veja a seguir os Recursos na prática →',
      accent: '#34D399',
    },

    // DESTAQUE 2: RECURSOS
    {
      file: 'destaque2_recursos_01_simulador.png',
      highlightBadge: '⚙️ DESTAQUE 2 • RECURSOS',
      stepLabel: '01 / 04',
      headlineHtml: 'Arena de Combate & <span style="color:#818CF8">Diagnóstico de Erros</span>.',
      subheadline: 'Risque alternativas com 1 toque e descubra a causa-raiz exata de cada erro cometido no simulado.',
      primaryImg: imgToDataUri('03_simulador_arena.png'),
      bullets: [
        'Classifica seus erros em: Pegadinha da Banca, Lacuna Teórica, Leitura Apressada ou Esquecimento',
        'Fundamentação em Lei Seca e súmulas exibida instantaneamente',
      ],
      ctaText: '🎯 Treine com a mesma pressão da prova real',
      accent: '#818CF8',
    },
    {
      file: 'destaque2_recursos_02_vademecum.png',
      highlightBadge: '⚙️ DESTAQUE 2 • RECURSOS',
      stepLabel: '02 / 04',
      headlineHtml: 'Smart Vade Mecum & <span style="color:#38BDF8">Lei Seca Inteligente</span>.',
      subheadline: 'Navegue pela CF/88, Lei 8.112, Nova Lei de Licitações (14.133/21) e LIA cruzadas com questões reais.',
      primaryImg: imgToDataUri('04_smart_vademecum.png'),
      bullets: [
        'Destaque imediato dos artigos e incisos mais cobrados pela sua banca',
        'Alerta automático de legislação revogada ou atualizada',
      ],
      ctaText: '⚖️ Estude a Lei Seca com visão de examinador',
      accent: '#38BDF8',
    },
    {
      file: 'destaque2_recursos_03_flashcards_erros.png',
      highlightBadge: '⚙️ DESTAQUE 2 • RECURSOS',
      stepLabel: '03 / 04',
      headlineHtml: 'Flashcards SM-2 & <span style="color:#34D399">Caderno de Erros</span>.',
      subheadline: 'Nunca mais esqueça o que estudou nem erre a mesma questão duas vezes na prova.',
      primaryImg: imgToDataUri('05_flashcards_srs.png'),
      secondaryImg: imgToDataUri('06_caderno_erros.png'),
      bullets: [
        'Player 3D de Repetição Espaçada (algoritmo SM-2 + exportação nativa Anki)',
        'Modo Revanche: questões que você errou voltam até virarem domínio absoluto',
      ],
      ctaText: '🧠 Blindagem contra a Curva do Esquecimento',
      accent: '#34D399',
    },
    {
      file: 'destaque2_recursos_04_redacao_radar.png',
      highlightBadge: '⚙️ DESTAQUE 2 • RECURSOS',
      stepLabel: '04 / 04',
      headlineHtml: 'Estúdio de Discursivas & <span style="color:#FBBF24">Radar de Concursos</span>.',
      subheadline: 'Correção de redações e peças OAB por IA seguindo o espelho da banca + Mapa nacional de editais.',
      primaryImg: imgToDataUri('07_estudio_redacao.png'),
      secondaryImg: imgToDataUri('10_radar_concursos.png'),
      bullets: [
        'Nota analítica linha a linha + espelho nota 100 reescrito pela IA',
        'Radar interativo do Brasil com vagas, salários e editais previstos',
      ],
      ctaText: '✨ Um ecossistema completo em uma única assinatura',
      accent: '#FBBF24',
    },

    // DESTAQUE 3: VANTAGENS
    {
      file: 'destaque3_vantagens_01_cockpit.png',
      highlightBadge: '🚀 DESTAQUE 3 • VANTAGENS',
      stepLabel: '01 / 03',
      headlineHtml: 'Cockpit de Dados & <span style="color:#34D399">Predição de Posse</span>.',
      subheadline: 'Saiba exatamente sua probabilidade real de aprovação antes do dia do exame.',
      primaryImg: imgToDataUri('02_cockpit_dashboard.png'),
      bullets: [
        'Heatmap de consistência de 365 dias estilo GitHub para manter sua ofensiva',
        'Métricas em tempo real de acurácia global e evolução por disciplina',
      ],
      ctaText: '📈 Controle absoluto sobre a sua evolução',
      accent: '#34D399',
    },
    {
      file: 'destaque3_vantagens_02_psicometria.png',
      highlightBadge: '🚀 DESTAQUE 3 • VANTAGENS',
      stepLabel: '02 / 03',
      headlineHtml: 'Psicometria TRI: <span style="color:#38BDF8">Antecipe a Sua Banca</span>.',
      subheadline: 'Entenda o padrão de cobrança da FGV, Cebraspe, FCC e Vunesp sem desperdiçar meses em tópicos irrelevantes.',
      primaryImg: imgToDataUri('11_psicometria_tri.png'),
      bullets: [
        'Economia de até 70% do tempo gasto em resumos manuais e planilhas',
        'Foco cirúrgico nos 20% do edital que concentram 80% das questões',
      ],
      ctaText: '⏱️ Mais acertos líquidos em menos horas de estudo',
      accent: '#38BDF8',
    },
    {
      file: 'destaque3_vantagens_03_comparativo.png',
      highlightBadge: '🚀 DESTAQUE 3 • VANTAGENS',
      stepLabel: '03 / 03',
      headlineHtml: 'Por que concurseiros de elite <span style="color:#818CF8">migram para o Argus?</span>',
      subheadline: 'Compare o estudo tradicional passivo com a engenharia cognitiva do Sistema Argus:',
      primaryImg: imgToDataUri('00_splash_screen.png'),
      bullets: [
        '❌ Sem Argus: PDFs de 200 págs, planilhas manuais e esquecimento em 14 dias',
        '✅ Com Argus: Diagnóstico IA, Riscador 1-Clique, SM-2 e Modo Revanche',
        '✅ Resultado: Estudo direcionado para garantir a sua nomeação',
      ],
      ctaText: '🔥 Veja no próximo destaque como testar grátis!',
      accent: '#818CF8',
    },

    // DESTAQUE 4: DEMONSTRAÇÃO
    {
      file: 'destaque4_demonstracao_01_convite.png',
      highlightBadge: '📅 DESTAQUE 4 • DEMONSTRAÇÃO',
      stepLabel: '01 / 03',
      headlineHtml: 'Experimente o <span style="color:#FBBF24">Argus AI</span> Agora Mesmo.',
      subheadline: 'Faça seu Diagnóstico Cognitivo gratuito e veja a plataforma calibrada para o seu edital.',
      primaryImg: imgToDataUri('14_onboarding_anamnese_step2.png'),
      bullets: [
        '100% Online e Imediato — comece no computador ou celular',
        'Mapeamento instantâneo do seu edital e das suas matérias críticas',
      ],
      ctaText: '👇 Veja como liberar seu acesso em 3 passos',
      accent: '#FBBF24',
    },
    {
      file: 'destaque4_demonstracao_02_passos.png',
      highlightBadge: '📅 DESTAQUE 4 • DEMONSTRAÇÃO',
      stepLabel: '02 / 03',
      headlineHtml: 'Como Fazer Seu <span style="color:#34D399">Diagnóstico Gratuito</span>:',
      subheadline: 'Leva menos de 2 minutos para gerar seu Passaporte Cognitivo e testar a Arena de Questões.',
      primaryImg: imgToDataUri('03_simulador_arena.png'),
      bullets: [
        '1️⃣ Clique no Link da Bio ou envie "ARGUS" no nosso Direct',
        '2️⃣ Escolha sua carreira-alvo e banca examinadora na Anamnese',
        '3️⃣ Receba seu Plano de Guerra e resolva questões com IA na hora!',
      ],
      ctaText: '⚡ Sem burocracia • Acesso imediato ao Plano Aspirante',
      accent: '#34D399',
    },
    {
      file: 'destaque4_demonstracao_03_cta_final.png',
      highlightBadge: '📅 DESTAQUE 4 • DEMONSTRAÇÃO',
      stepLabel: '03 / 03',
      headlineHtml: 'Não dispute vagas. <span style="color:#38BDF8">Garanta a sua posse.</span>',
      subheadline: 'Planos acessíveis com PIX ou Cartão e garantia total para você acelerar sua aprovação.',
      primaryImg: imgToDataUri('12_planos_assinatura.png'),
      bullets: [
        '🔗 Toque no Link da Bio para acessar a plataforma agora',
        '📩 Ou mande "QUERO" no Direct para receber o link direto!',
      ],
      ctaText: '🚀 LINK NA BIO — COMECE SEU DIAGNÓSTICO GRÁTIS',
      accent: '#38BDF8',
    },
  ];

  for (const s of stories) {
    await storyPage.setContent(buildStoryHtml(s), { waitUntil: 'networkidle' });
    await storyPage.waitForTimeout(200);
    await storyPage.screenshot({ path: path.join(STORIES_DIR, s.file) });
    console.log(`✓ Story gerado: ${s.file}`);
  }
  await storyPage.close();

  // 3. Gravar vídeos 9:16 reais do sistema em ação
  console.log('Gravando vídeos 9:16 (.webm) navegando pelo sistema...');

  // Vídeo 1: O Reels de Lançamento (reels-launch.html)
  const reelCtx = await browser.newContext({
    viewport: { width: 540, height: 960 },
    recordVideo: { dir: VIDEOS_DIR, size: { width: 540, height: 960 } },
  });
  const reelPage = await reelCtx.newPage();
  await reelPage.goto('http://localhost:3099/reels-launch.html', { waitUntil: 'networkidle' });
  await reelPage.waitForTimeout(12000); // Grava 12s das cenas principais do Reels
  const reelVideoPath = await reelPage.video().path();
  await reelCtx.close();
  const targetReelVideo = path.join(VIDEOS_DIR, 'video_reels_lancamento_9x16.webm');
  if (fs.existsSync(reelVideoPath)) {
    fs.renameSync(reelVideoPath, targetReelVideo);
    console.log('✓ Vídeo gravado: video_reels_lancamento_9x16.webm');
  }

  // Vídeo 2: Tour interativo nas telas reais do Argus em formato mobile 9:16
  const tourCtx = await browser.newContext({
    viewport: { width: 430, height: 764 },
    recordVideo: { dir: VIDEOS_DIR, size: { width: 540, height: 960 } },
  });
  const tourPage = await tourCtx.newPage();
  await tourPage.addInitScript(() => {
    localStorage.setItem('argus_cookie_consent', 'accepted');
    localStorage.setItem('argus_theme', 'dark');
    localStorage.setItem('learning_ai_theme', 'dark');
    localStorage.setItem('argus_plan', 'elite');
    window.__E2E__ = true;
  });

  const tourUrls = [
    'http://localhost:3099/?test=1',
    'http://localhost:3099/?tab=dashboard&test=1',
    'http://localhost:3099/?tab=simulator&test=1',
    'http://localhost:3099/?tab=vademecum&test=1',
    'http://localhost:3099/?tab=flashcards&test=1',
  ];

  for (const u of tourUrls) {
    await tourPage.goto(u, { waitUntil: 'networkidle' });
    await tourPage.evaluate(() => {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    });
    await tourPage.waitForTimeout(1800);
    await tourPage.mouse.wheel(0, 350);
    await tourPage.waitForTimeout(1000);
  }
  const tourVideoPath = await tourPage.video().path();
  await tourCtx.close();
  const targetTourVideo = path.join(VIDEOS_DIR, 'video_tour_sistema_argus_9x16.webm');
  if (fs.existsSync(tourVideoPath)) {
    fs.renameSync(tourVideoPath, targetTourVideo);
    console.log('✓ Vídeo gravado: video_tour_sistema_argus_9x16.webm');
  }

  await browser.close();
  console.log('Kit completo do Instagram gerado com sucesso!');
})();
