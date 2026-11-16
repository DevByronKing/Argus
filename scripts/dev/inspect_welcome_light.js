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

  await page.goto('http://localhost:3000/?tab=welcome-success');
  await page.waitForLoadState('networkidle');

  // Dismiss splash if present
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  await page.keyboard.press('Escape');

  // Ensure theme is light
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  });

  await page.waitForTimeout(1000);

  // Take screenshot
  await page.screenshot({ path: 'C:/Users/jovap/.gemini/antigravity/brain/1aec5508-9c4d-472c-ad8a-be70d5889cd5/mobile_audit/inspect_welcome_light.png', fullPage: true });

  // Inspect h1 styles and classes
  const info = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    if (!h1) return { error: 'h1 not found' };

    const computed = window.getComputedStyle(h1);
    const textNode = h1.firstChild; // "Parabéns, Guerreiro(a)!"
    
    // Also check the receipt button
    const shareBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Compartilhar'));
    const shareBtnComputed = shareBtn ? window.getComputedStyle(shareBtn) : null;

    return {
      tagName: h1.tagName,
      className: h1.className,
      color: computed.color,
      backgroundColor: computed.backgroundColor,
      parentClassName: h1.parentElement?.className,
      shareBtn: shareBtnComputed ? {
        bg: shareBtnComputed.backgroundColor,
        color: shareBtnComputed.color,
        border: shareBtnComputed.borderColor
      } : null
    };
  });

  console.log(JSON.stringify(info, null, 2));

  await browser.close();
})();
