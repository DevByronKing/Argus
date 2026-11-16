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

  // 1. Initial view screenshot
  await page.screenshot({ path: 'C:/Users/jovap/.gemini/antigravity/brain/1aec5508-9c4d-472c-ad8a-be70d5889cd5/mobile_audit/arena_initial.png' });

  // Select first option
  const options = await page.locator('div.cursor-pointer').all();
  for (const opt of options) {
    const text = await opt.innerText();
    if (text.includes('A') || text.includes('Certo') || text.includes('Errado')) {
      await opt.click();
      break;
    }
  }
  await page.waitForTimeout(500);

  // Click Confirmar Resposta
  const confirmBtn = page.getByRole('button', { name: /Confirmar Resposta/i });
  if (await confirmBtn.isVisible()) {
    await confirmBtn.click();
    await page.waitForTimeout(1000);
  }

  // 2. Answered view screenshot
  await page.screenshot({ path: 'C:/Users/jovap/.gemini/antigravity/brain/1aec5508-9c4d-472c-ad8a-be70d5889cd5/mobile_audit/arena_answered.png', fullPage: true });

  // 3. Open Zen Mode
  await page.keyboard.press('f');
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'C:/Users/jovap/.gemini/antigravity/brain/1aec5508-9c4d-472c-ad8a-be70d5889cd5/mobile_audit/arena_zen.png' });

  await browser.close();
  console.log('Screenshots taken successfully!');
})();
