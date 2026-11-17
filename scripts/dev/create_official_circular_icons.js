const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const logoPath = path.resolve(__dirname, '../../public/argus-logo.png');
  const logoBase64 = fs.readFileSync(logoPath).toString('base64');
  const dataUrl = `data:image/png;base64,${logoBase64}`;

  // 1. Generate SVG with circular clipPath around the official neural eye (centering the iris at 50% 38% and clipping out the bottom text and square corners)
  const circularSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <clipPath id="irisCircleClip">
      <circle cx="256" cy="256" r="244" />
    </clipPath>
    <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#6366f1" />
      <stop offset="100%" stop-color="#10b981" />
    </linearGradient>
  </defs>
  <g clip-path="url(#irisCircleClip)">
    <circle cx="256" cy="256" r="244" fill="#0c1220" />
    <image href="${dataUrl}" x="-96" y="-24" width="704" height="704" preserveAspectRatio="xMidYMid slice" />
    <rect x="0" y="472" width="512" height="50" fill="#0d1322" />
  </g>
  <circle cx="256" cy="256" r="244" fill="none" stroke="url(#rimGrad)" stroke-width="12" />
  <circle cx="256" cy="256" r="232" fill="none" stroke="#38bdf8" stroke-opacity="0.35" stroke-width="2" />
</svg>`;

  fs.writeFileSync(path.resolve(__dirname, '../../public/favicon.svg'), circularSvg);
  fs.writeFileSync(path.resolve(__dirname, '../../src/app/icon.svg'), circularSvg);
  console.log('Generated circular SVG favicons with official neural eye.');

  const browser = await chromium.launch({ channel: 'chrome', args: ['--headless=new'] });
  const page = await browser.newPage();

  const sizes = [
    { name: 'public/favicon-16x16.png', size: 16 },
    { name: 'public/favicon-32x32.png', size: 32 },
    { name: 'public/favicon-48x48.png', size: 48 },
    { name: 'public/apple-touch-icon.png', size: 180 },
    { name: 'public/app-icon.png', size: 192 },
    { name: 'public/logo-512.png', size: 512 },
    { name: 'public/argus-iris-circle.png', size: 512 },
    { name: 'src/app/icon.png', size: 512 },
  ];

  for (const item of sizes) {
    const s = item.size;
    await page.setViewportSize({ width: s, height: s });
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            html, body {
              width: ${s}px;
              height: ${s}px;
              background: transparent !important;
              overflow: hidden;
            }
            svg {
              width: ${s}px;
              height: ${s}px;
              display: block;
            }
          </style>
        </head>
        <body>
          ${circularSvg}
        </body>
      </html>
    `);

    const outPath = path.resolve(__dirname, '../../', item.name);
    await page.screenshot({
      path: outPath,
      omitBackground: true,
    });
    console.log('Generated circular transparent PNG:', item.name);
  }

  // Create valid ICO file from 32x32 PNG
  const png32 = fs.readFileSync(path.resolve(__dirname, '../../public/favicon-32x32.png'));
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0);
  icoHeader.writeUInt16LE(1, 2);
  icoHeader.writeUInt16LE(1, 4);

  const icoDir = Buffer.alloc(16);
  icoDir.writeUInt8(32, 0);
  icoDir.writeUInt8(32, 1);
  icoDir.writeUInt8(0, 2);
  icoDir.writeUInt8(0, 3);
  icoDir.writeUInt16LE(1, 4);
  icoDir.writeUInt16LE(32, 6);
  icoDir.writeUInt32LE(png32.length, 8);
  icoDir.writeUInt32LE(22, 12);

  const icoBuffer = Buffer.concat([icoHeader, icoDir, png32]);
  fs.writeFileSync(path.resolve(__dirname, '../../public/favicon.ico'), icoBuffer);
  console.log('Generated public/favicon.ico');

  await browser.close();
})();
