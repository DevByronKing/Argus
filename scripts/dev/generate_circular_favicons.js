const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const svgContent = fs.readFileSync('public/favicon.svg', 'utf-8');

  const sizes = [
    { name: 'public/favicon-16x16.png', size: 16 },
    { name: 'public/favicon-32x32.png', size: 32 },
    { name: 'public/favicon-48x48.png', size: 48 },
    { name: 'public/apple-touch-icon.png', size: 180 },
    { name: 'public/app-icon.png', size: 192 },
    { name: 'public/logo-512.png', size: 512 },
    { name: 'src/app/icon.png', size: 512 }
  ];

  for (const item of sizes) {
    const page = await browser.newPage({ 
      viewport: { width: item.size, height: item.size },
      deviceScaleFactor: 1
    });

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            html, body { width: 100%; height: 100%; background: transparent; overflow: hidden; }
            svg { width: 100%; height: 100%; display: block; }
          </style>
        </head>
        <body>
          ${svgContent}
        </body>
      </html>
    `;

    await page.setContent(html);
    await page.screenshot({ 
      path: item.name, 
      omitBackground: true 
    });
    console.log(`Generated: ${item.name} (${item.size}x${item.size})`);
    await page.close();
  }

  // Also create favicon.ico as a copy of 32x32 png
  fs.copyFileSync('public/favicon-32x32.png', 'public/favicon.ico');
  console.log('Updated public/favicon.ico');

  await browser.close();
  console.log('All favicons generated successfully!');
})();
