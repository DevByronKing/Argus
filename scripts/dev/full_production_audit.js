const { chromium } = require('playwright');
const path = require('path');

const OUT_DIR = 'C:/Users/jovap/.gemini/antigravity/brain/1aec5508-9c4d-472c-ad8a-be70d5889cd5/mobile_audit';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', args: ['--headless=new'] });

  // 1. Capture Splash Screen on fresh load
  const splashPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await splashPage.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await splashPage.waitForTimeout(300);
  await splashPage.screenshot({ path: path.join(OUT_DIR, 'audit_01_splash.png') });
  console.log('Captured audit_01_splash.png');
  await splashPage.close();

  // 2. Desktop Light Mode Full Audit
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.addInitScript(() => {
    localStorage.setItem('argus_theme', 'light');
    localStorage.setItem('argus_cookie_consent', JSON.stringify({ necessary: true, analytics: true, marketing: true, timestamp: new Date().toISOString() }));
    localStorage.setItem('argus_lgpd_consent', 'true');
    localStorage.setItem('argus_onboarding_completed', 'true');
    localStorage.setItem('argus_onboarding_done', 'true');
    localStorage.setItem('argus_target_exam', 'INSS 2026 - Técnico do Seguro Social');
    localStorage.setItem('argus_plan', 'aspirante');
  });

  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(600);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);

  // Capture Landing Hero
  await page.screenshot({ path: path.join(OUT_DIR, 'audit_02_landing_light.png') });
  console.log('Captured audit_02_landing_light.png');

  // Click "Entrar" button in Navbar to open Auth Modal
  const entrarBtn = await page.$('button:has-text("Entrar")');
  if (entrarBtn) {
    await entrarBtn.click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(OUT_DIR, 'audit_03_auth_modal.png') });
    console.log('Captured audit_03_auth_modal.png');
    const closeAuth = await page.$('button[aria-label="Fechar modal de login"]');
    if (closeAuth) await closeAuth.click();
    await page.waitForTimeout(300);
  }

  // 3. Navigate to Edital Verticalizado
  await page.goto('http://localhost:3000/?tab=edital', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(600);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);

  // Scroll to see Overview + Statistical Distribution + Chat
  await page.evaluate(() => window.scrollTo(0, 480));
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT_DIR, 'audit_04_edital_stats_chat.png') });
  console.log('Captured audit_04_edital_stats_chat.png');

  // 4. Navigate to Simulator & Test Modo Foco Zen
  await page.goto('http://localhost:3000/?tab=simulator', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(600);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);

  const zenBtn = await page.$('button:has-text("Ativar Modo Foco Zen")');
  if (zenBtn) {
    await zenBtn.click();
    await page.waitForTimeout(400);
    // Select first option (A) and Confirm in Zen Mode
    await page.keyboard.press('a');
    await page.waitForTimeout(200);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(OUT_DIR, 'audit_05_zen_mode_answered.png') });
    console.log('Captured audit_05_zen_mode_answered.png');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
  }

  // 5. Navigate to Question Bank (Cadernos de Últimas Provas Oficiais)
  await page.goto('http://localhost:3000/?tab=questions', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(600);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT_DIR, 'audit_06_question_bank.png') });
  console.log('Captured audit_06_question_bank.png');

  // 6. Navigate to Radar & Click Especial TRTs
  await page.goto('http://localhost:3000/?tab=radar', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(600);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);
  const trtBtn = await page.$('button:has-text("Especial TRTs")');
  if (trtBtn) {
    await trtBtn.click();
    await page.waitForTimeout(400);
  }
  await page.evaluate(() => window.scrollTo(0, 320));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(OUT_DIR, 'audit_07_radar_trts_adsense.png') });
  console.log('Captured audit_07_radar_trts_adsense.png');

  // 7. Mobile Viewport Audit (390x844)
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/?tab=edital', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(600);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT_DIR, 'audit_08_mobile_edital.png') });
  console.log('Captured audit_08_mobile_edital.png');

  await browser.close();
})();
