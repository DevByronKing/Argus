const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });

  // 1. Desktop Light Mode
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 1200 } });
    await page.addInitScript(() => {
      localStorage.setItem('argus_theme', 'light');
      localStorage.setItem('learning_ai_theme', 'light');
      localStorage.setItem('argus_lgpd_consent', 'true');
      localStorage.setItem('argus_onboarding_completed', 'true');
      localStorage.setItem('argus_onboarding_done', 'true');
      localStorage.setItem('argus_target_exam', 'INSS 2026 - Técnico do Seguro Social');
      localStorage.setItem('argus_plan', 'elite');
    });

    await page.goto('http://localhost:3000/?tab=welcome-success');
    await page.waitForLoadState('networkidle');

    // Dismiss splash / lgpd
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);

    const acceptBtn = page.locator('button:has-text("Aceitar Todos")');
    if (await acceptBtn.isVisible()) {
      await acceptBtn.click();
      await page.waitForTimeout(300);
    }

    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    });
    await page.waitForTimeout(500);

    await page.screenshot({ path: 'C:/Users/jovap/.gemini/antigravity/brain/1aec5508-9c4d-472c-ad8a-be70d5889cd5/mobile_audit/welcome_clean_light.png', fullPage: true });
    await page.close();
  }

  // 2. Desktop Dark Mode
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 1200 } });
    await page.addInitScript(() => {
      localStorage.setItem('argus_theme', 'dark');
      localStorage.setItem('learning_ai_theme', 'dark');
      localStorage.setItem('argus_lgpd_consent', 'true');
      localStorage.setItem('argus_onboarding_completed', 'true');
      localStorage.setItem('argus_onboarding_done', 'true');
      localStorage.setItem('argus_target_exam', 'INSS 2026 - Técnico do Seguro Social');
      localStorage.setItem('argus_plan', 'elite');
    });

    await page.goto('http://localhost:3000/?tab=welcome-success');
    await page.waitForLoadState('networkidle');

    // Dismiss splash / lgpd
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);

    const acceptBtn = page.locator('button:has-text("Aceitar Todos")');
    if (await acceptBtn.isVisible()) {
      await acceptBtn.click();
      await page.waitForTimeout(300);
    }

    await page.waitForTimeout(500);

    await page.screenshot({ path: 'C:/Users/jovap/.gemini/antigravity/brain/1aec5508-9c4d-472c-ad8a-be70d5889cd5/mobile_audit/welcome_clean_dark.png', fullPage: true });
    await page.close();
  }

  // 3. Mobile Light Mode
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
    await page.addInitScript(() => {
      localStorage.setItem('argus_theme', 'light');
      localStorage.setItem('learning_ai_theme', 'light');
      localStorage.setItem('argus_lgpd_consent', 'true');
      localStorage.setItem('argus_onboarding_completed', 'true');
      localStorage.setItem('argus_onboarding_done', 'true');
      localStorage.setItem('argus_target_exam', 'INSS 2026 - Técnico do Seguro Social');
      localStorage.setItem('argus_plan', 'elite');
    });

    await page.goto('http://localhost:3000/?tab=welcome-success');
    await page.waitForLoadState('networkidle');

    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);

    const acceptBtn = page.locator('button:has-text("Aceitar Todos")');
    if (await acceptBtn.isVisible()) {
      await acceptBtn.click();
      await page.waitForTimeout(300);
    }

    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    });
    await page.waitForTimeout(500);

    await page.screenshot({ path: 'C:/Users/jovap/.gemini/antigravity/brain/1aec5508-9c4d-472c-ad8a-be70d5889cd5/mobile_audit/welcome_mobile_light.png', fullPage: true });
    await page.close();
  }

  console.log('Screenshots generated successfully!');
  await browser.close();
})();
