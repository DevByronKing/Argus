const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  await page.addInitScript(() => {
    localStorage.setItem('theme', 'light');
    localStorage.setItem('argus_lgpd_consent', 'true');
    localStorage.setItem('argus_onboarding_completed', 'true');
    localStorage.setItem('argus_onboarding_done', 'true');
    localStorage.setItem('argus_target_exam', 'INSS 2026 - Técnico do Seguro Social');
    localStorage.setItem('argus_plan', 'elite');
  });

  console.log('Navigating to Edital Verticalizado...');
  await page.goto('http://localhost:3000/?tab=edital');
  await page.waitForLoadState('networkidle');

  // Dismiss splash/onboarding if any
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(1000);

  // Capture Edital tab showing universal nav + uncompressed stats + copilot
  await page.screenshot({ 
    path: 'C:/Users/jovap/.gemini/antigravity/brain/1aec5508-9c4d-472c-ad8a-be70d5889cd5/mobile_audit/verified_edital_stats_light.png', 
    fullPage: false 
  });
  console.log('Saved verified_edital_stats_light.png');

  // Test Ask Question in Edital Copilot
  const input = await page.$('input[placeholder*="Pergunte algo sobre o edital"]');
  if (input) {
    await input.fill('Qual o salário e vagas no TRT 2?');
    const sendBtn = await page.$('button[type="submit"]');
    if (sendBtn) {
      await sendBtn.click();
      console.log('Asked question about TRT 2');
      await page.waitForTimeout(2000);
      await page.screenshot({ 
        path: 'C:/Users/jovap/.gemini/antigravity/brain/1aec5508-9c4d-472c-ad8a-be70d5889cd5/mobile_audit/verified_edital_chat_adaptive.png', 
        fullPage: false 
      });
      console.log('Saved verified_edital_chat_adaptive.png');
    }
  }

  // Open Auth Modal
  console.log('Opening Auth Modal...');
  const loginBtn = await page.$('button:has-text("Entrar"), button:has-text("Login"), button:has-text("Acessar")');
  if (loginBtn) {
    await loginBtn.click();
    await page.waitForTimeout(600);
  } else {
    // Trigger via window dispatch
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('argus_open_auth'));
    });
    await page.waitForTimeout(600);
  }

  await page.screenshot({ 
    path: 'C:/Users/jovap/.gemini/antigravity/brain/1aec5508-9c4d-472c-ad8a-be70d5889cd5/mobile_audit/verified_auth_modal_luxury.png', 
    fullPage: false 
  });
  console.log('Saved verified_auth_modal_luxury.png');

  await browser.close();
})();
