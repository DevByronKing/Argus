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

const BASE_URL = 'http://localhost:3099';

async function setupStorage(page) {
  await page.addInitScript(() => {
    localStorage.setItem('argus_cookie_consent', 'accepted');
    localStorage.setItem('argus_theme', 'dark');
    localStorage.setItem('learning_ai_theme', 'dark');
    localStorage.setItem('argus_plan', 'elite');
    window.__E2E__ = true;
  });
}

async function forceDarkAndClean(page) {
  await page.evaluate(() => {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', 'dark');
    if (document.body) {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      document.body.setAttribute('data-theme', 'dark');
    }
  });
}

(async () => {
  console.log('Iniciando captura das telas reais do Sistema Argus...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  // 1. Capturar Telas Desktop (1440x900) e Mobile (430x932)
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  // Capturar Splash Screen antes do setupStorage
  await page.goto(`${BASE_URL}/?test=1`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(RAW_DIR, '00_splash_screen.png') });
  console.log('✓ 00_splash_screen.png');

  await setupStorage(page);

  const tabsToCapture = [
    { name: '01_landing_hero', url: '/?test=1', wait: 2200 },
    { name: '02_cockpit_dashboard', url: '/?tab=dashboard&test=1', wait: 2200 },
    { name: '03_simulador_arena', url: '/?tab=simulator&test=1', wait: 2200 },
    { name: '04_smart_vademecum', url: '/?tab=vademecum&test=1', wait: 2200 },
    { name: '05_flashcards_srs', url: '/?tab=flashcards&test=1', wait: 2200 },
    { name: '06_caderno_erros', url: '/?tab=mistakes&test=1', wait: 2200 },
    { name: '07_estudio_redacao', url: '/?tab=discursivas&test=1', wait: 2200 },
    { name: '08_edital_verticalizado', url: '/?tab=edital&test=1', wait: 2200 },
    { name: '09_ciclo_meirelles', url: '/?tab=cycle&test=1', wait: 2200 },
    { name: '10_radar_concursos', url: '/?tab=radar&test=1', wait: 2200 },
    { name: '11_psicometria_tri', url: '/?tab=psychometrics&test=1', wait: 2200 },
    { name: '12_planos_assinatura', url: '/?tab=pricing-plans&test=1', wait: 2200 },
  ];

  for (const item of tabsToCapture) {
    await page.goto(`${BASE_URL}${item.url}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(item.wait);
    await forceDarkAndClean(page);
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(RAW_DIR, `${item.name}.png`), fullPage: false });
    console.log(`✓ ${item.name}.png`);
  }

  // Capturar Onboarding / Anamnese Cognitiva
  await page.goto(`${BASE_URL}/?test=1`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await forceDarkAndClean(page);
  const diagBtn = await page.$('button:has-text("Testar Onboarding"), button:has-text("Fazer Diagnóstico"), button:has-text("Diagnóstico")');
  if (diagBtn) {
    await diagBtn.click();
    await page.waitForTimeout(700);
    await forceDarkAndClean(page);
    await page.screenshot({ path: path.join(RAW_DIR, '13_onboarding_anamnese_step1.png') });
    console.log('✓ 13_onboarding_anamnese_step1.png');

    const nextBtn = await page.$('button:has-text("Mapear Campo de Batalha")');
    if (nextBtn) {
      await nextBtn.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(RAW_DIR, '14_onboarding_anamnese_step2.png') });
      console.log('✓ 14_onboarding_anamnese_step2.png');
    }

    const nextBtn2 = await page.$('button:has-text("Mapear Calcanhar de Aquiles")');
    if (nextBtn2) {
      await nextBtn2.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(RAW_DIR, '15_onboarding_anamnese_step3.png') });
      console.log('✓ 15_onboarding_anamnese_step3.png');
    }

    const nextBtn3 = await page.$('button:has-text("Conhecer Seu Guardião")');
    if (nextBtn3) {
      await nextBtn3.click();
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(RAW_DIR, '16_onboarding_guardiao.png') });
      console.log('✓ 16_onboarding_guardiao.png');
    }
  }

  await context.close();
  await browser.close();
  console.log('Todas as telas reais capturadas com sucesso!');
})();
