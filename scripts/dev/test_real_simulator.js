const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 850 } });
  await context.addInitScript(() => {
    localStorage.setItem('argus_theme', 'light');
    localStorage.setItem('argus_plan', 'pro');
    localStorage.setItem('argus_cookie_consent', 'accepted');
    localStorage.setItem('argus_onboarding_completed', 'true');
    window.__E2E__ = true;
  });
  const page = await context.newPage();
  await page.goto('http://localhost:3000?tab=simulator&test=1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);

  // 1. Open Zen Mode initially
  const focoBtn = page.getByRole('button', { name: 'Ativar Modo Foco Zen [F]' });
  await focoBtn.click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'C:/Users/jovap/.gemini/antigravity/brain/1aec5508-9c4d-472c-ad8a-be70d5889cd5/mobile_audit/zen_fresh.png' });

  // 2. Select option in Zen Mode
  const optCerto = page.locator('text=CERTO').first();
  await optCerto.click();
  await page.waitForTimeout(400);

  // 3. Confirm answer in Zen Mode
  const confirmBtn = page.getByRole('button', { name: /Confirmar Resposta/i });
  await confirmBtn.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'C:/Users/jovap/.gemini/antigravity/brain/1aec5508-9c4d-472c-ad8a-be70d5889cd5/mobile_audit/zen_answered.png', fullPage: true });

  await browser.close();
  console.log('Zen screenshots saved successfully!');
})();
