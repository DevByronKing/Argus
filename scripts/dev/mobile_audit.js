const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\jovap\\.gemini\\antigravity\\brain\\1aec5508-9c4d-472c-ad8a-be70d5889cd5\\mobile_audit';
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

const tabsToTest = [
  'landing',
  'edital',
  'cycle',
  'simulator',
  'flashcards',
  'mistakes',
  'vademecum',
  'discursivas',
  'dashboard',
  'questions',
  'psychometrics',
  'radar',
  'settings',
  'pricing-plans',
  'welcome-success',
  'help'
];

async function runAudit() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // iPhone 14
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
  });

  await context.addInitScript(() => {
    localStorage.setItem('argus_cookie_consent', 'accepted');
    localStorage.setItem('argus_onboarding_completed', 'true');
    localStorage.setItem('argus_plan', 'elite');
    localStorage.setItem('argus_splash_dismissed', 'true');
    window.__E2E__ = true;
  });

  const page = await context.newPage();
  const report = [];

  for (const tab of tabsToTest) {
    console.log(`Auditing tab: ${tab}...`);
    try {
      await page.goto(`http://localhost:3000/?tab=${tab}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(1500);

      // Check overflow
      const audit = await page.evaluate((tName) => {
        const docWidth = document.documentElement.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const bodyScrollWidth = document.body ? document.body.scrollWidth : docWidth;
        const maxScroll = Math.max(scrollWidth, bodyScrollWidth);
        const overflows = [];

        const all = document.querySelectorAll('body *');
        for (const el of all) {
          // Ignore fixed or absolute background decorative blobs with pointer-events-none or blur
          const style = window.getComputedStyle(el);
          if (style.pointerEvents === 'none' && (style.position === 'absolute' || style.position === 'fixed')) {
            continue;
          }
          if (el.classList.contains('pointer-events-none')) continue;

          const rect = el.getBoundingClientRect();
          if (rect.right > docWidth + 3 || rect.left < -3) {
            overflows.push({
              tag: el.tagName,
              id: el.id,
              classes: (el.className || '').toString().slice(0, 80),
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              width: Math.round(rect.width),
              textSnippet: (el.innerText || '').slice(0, 40).replace(/\s+/g, ' ')
            });
          }
        }

        return {
          tab: tName,
          docWidth,
          maxScroll,
          hasScroll: maxScroll > docWidth + 1,
          overflowCount: overflows.length,
          overflows: overflows.slice(0, 10)
        };
      }, tab);

      await page.screenshot({ path: path.join(ARTIFACT_DIR, `${tab}.png`), fullPage: false });
      report.push(audit);
      console.log(`Tab ${tab}: hasScroll=${audit.hasScroll} (scroll=${audit.maxScroll} vs doc=${audit.docWidth}), overflows=${audit.overflowCount}`);
      if (audit.overflows.length > 0) {
        console.log('Sample overflowing elements:', JSON.stringify(audit.overflows.slice(0, 3), null, 2));
      }
    } catch (e) {
      console.error(`Error on tab ${tab}:`, e.message);
    }
  }

  fs.writeFileSync(path.join(ARTIFACT_DIR, 'detailed_report.json'), JSON.stringify(report, null, 2));
  console.log('Finished full audit!');
  await browser.close();
}

runAudit().catch(console.error);
