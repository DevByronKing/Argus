const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  // Light mode fullpage
  const ctxLight = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await ctxLight.addInitScript(() => {
    localStorage.setItem('argus_theme', 'light');
    localStorage.setItem('argus_plan', 'elite');
    localStorage.setItem('argus_cookie_consent', 'accepted');
    localStorage.setItem('argus_onboarding_completed', 'true');
    window.__E2E__ = true;
  });
  const pageLight = await ctxLight.newPage();
  await pageLight.goto('http://localhost:3000?tab=welcome-success&test=1', { waitUntil: 'networkidle' });
  
  await pageLight.waitForTimeout(2500); // Wait for splash to fade
  await pageLight.screenshot({ path: 'C:/Users/jovap/.gemini/antigravity/brain/1aec5508-9c4d-472c-ad8a-be70d5889cd5/mobile_audit/welcome_full_light_clean.png', fullPage: true });

  // Dark mode fullpage
  const ctxDark = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await ctxDark.addInitScript(() => {
    localStorage.setItem('argus_theme', 'dark');
    localStorage.setItem('argus_plan', 'elite');
    localStorage.setItem('argus_cookie_consent', 'accepted');
    localStorage.setItem('argus_onboarding_completed', 'true');
    window.__E2E__ = true;
  });
  const pageDark = await ctxDark.newPage();
  await pageDark.goto('http://localhost:3000?tab=welcome-success&test=1', { waitUntil: 'networkidle' });
  await pageDark.waitForTimeout(2500);
  await pageDark.screenshot({ path: 'C:/Users/jovap/.gemini/antigravity/brain/1aec5508-9c4d-472c-ad8a-be70d5889cd5/mobile_audit/welcome_full_dark_clean.png', fullPage: true });

  await browser.close();
  console.log('Clean fullpage screenshots saved successfully!');
})();
