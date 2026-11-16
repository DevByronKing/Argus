const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '../../public/instagram-kit');
const VIDEOS_DIR = path.join(OUT_DIR, '4-videos-gravados-9x16');
fs.mkdirSync(VIDEOS_DIR, { recursive: true });

const FFMPEG_PATH = 'C:\\Users\\jovap\\AppData\\Local\\ms-playwright\\ffmpeg-1011\\ffmpeg-win64.exe';

function convertWebmToMp4(webmPath, mp4Path) {
  if (!fs.existsSync(FFMPEG_PATH)) {
    console.log('FFmpeg binary not found at expected path, keeping webm:', webmPath);
    return;
  }
  execFileSync(FFMPEG_PATH, [
    '-y',
    '-i', webmPath,
    '-vf', 'scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:black',
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-preset', 'fast',
    '-crf', '22',
    '-movflags', '+faststart',
    mp4Path,
  ]);
  console.log(`✓ Convertido para MP4 (Instagram-ready): ${path.basename(mp4Path)}`);
}

async function setupStorage(page) {
  await page.addInitScript(() => {
    localStorage.setItem('argus_cookie_consent', 'accepted');
    localStorage.setItem('argus_theme', 'dark');
    localStorage.setItem('learning_ai_theme', 'dark');
    localStorage.setItem('argus_plan', 'elite');
    window.__E2E__ = true;
  });
}

async function forceDark(page) {
  await page.evaluate(() => {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', 'dark');
    if (document.body) {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      document.body.setAttribute('data-theme', 'dark');
    }
  });
}

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  // 1. Vídeo 1: Destaque "O Sistema" (Splash + Landing + Onboarding Anamnese)
  console.log('Gravando Vídeo 1: O Sistema...');
  {
    const ctx = await browser.newContext({
      viewport: { width: 430, height: 764 },
      recordVideo: { dir: VIDEOS_DIR, size: { width: 540, height: 960 } },
    });
    const page = await ctx.newPage();
    await setupStorage(page);
    await page.goto('http://localhost:3099/?test=1', { waitUntil: 'networkidle' });
    await forceDark(page);
    await page.waitForTimeout(1500);
    await page.mouse.wheel(0, 450);
    await page.waitForTimeout(1200);
    await page.mouse.wheel(0, 450);
    await page.waitForTimeout(1200);
    await page.mouse.wheel(0, -900);
    await page.waitForTimeout(800);
    const diagBtn = await page.$('button:has-text("Testar Onboarding"), button:has-text("Fazer Diagnóstico"), button:has-text("Diagnóstico")');
    if (diagBtn) {
      await diagBtn.click();
      await page.waitForTimeout(1500);
      const nextBtn = await page.$('button:has-text("Mapear Campo de Batalha")');
      if (nextBtn) {
        await nextBtn.click();
        await page.waitForTimeout(1500);
      }
    }
    const vPath = await page.video().path();
    await ctx.close();
    const webmTarget = path.join(VIDEOS_DIR, '01_video_destaque_o_sistema.webm');
    const mp4Target = path.join(VIDEOS_DIR, '01_video_destaque_o_sistema.mp4');
    if (fs.existsSync(vPath)) {
      fs.renameSync(vPath, webmTarget);
      convertWebmToMp4(webmTarget, mp4Target);
    }
  }

  // 2. Vídeo 2: Destaque "Recursos" (Simulador + Smart Vade Mecum + Flashcards + Redação)
  console.log('Gravando Vídeo 2: Recursos...');
  {
    const ctx = await browser.newContext({
      viewport: { width: 430, height: 764 },
      recordVideo: { dir: VIDEOS_DIR, size: { width: 540, height: 960 } },
    });
    const page = await ctx.newPage();
    await setupStorage(page);
    const urls = [
      'http://localhost:3099/?tab=simulator&test=1',
      'http://localhost:3099/?tab=vademecum&test=1',
      'http://localhost:3099/?tab=flashcards&test=1',
      'http://localhost:3099/?tab=discursivas&test=1',
    ];
    for (const u of urls) {
      await page.goto(u, { waitUntil: 'networkidle' });
      await forceDark(page);
      await page.waitForTimeout(1600);
      await page.mouse.wheel(0, 320);
      await page.waitForTimeout(1000);
    }
    const vPath = await page.video().path();
    await ctx.close();
    const webmTarget = path.join(VIDEOS_DIR, '02_video_destaque_recursos.webm');
    const mp4Target = path.join(VIDEOS_DIR, '02_video_destaque_recursos.mp4');
    if (fs.existsSync(vPath)) {
      fs.renameSync(vPath, webmTarget);
      convertWebmToMp4(webmTarget, mp4Target);
    }
  }

  // 3. Vídeo 3: Destaque "Vantagens" (Cockpit Dashboard + Psicometria TRI + Caderno de Erros)
  console.log('Gravando Vídeo 3: Vantagens...');
  {
    const ctx = await browser.newContext({
      viewport: { width: 430, height: 764 },
      recordVideo: { dir: VIDEOS_DIR, size: { width: 540, height: 960 } },
    });
    const page = await ctx.newPage();
    await setupStorage(page);
    const urls = [
      'http://localhost:3099/?tab=dashboard&test=1',
      'http://localhost:3099/?tab=psychometrics&test=1',
      'http://localhost:3099/?tab=mistakes&test=1',
    ];
    for (const u of urls) {
      await page.goto(u, { waitUntil: 'networkidle' });
      await forceDark(page);
      await page.waitForTimeout(1800);
      await page.mouse.wheel(0, 380);
      await page.waitForTimeout(1100);
    }
    const vPath = await page.video().path();
    await ctx.close();
    const webmTarget = path.join(VIDEOS_DIR, '03_video_destaque_vantagens.webm');
    const mp4Target = path.join(VIDEOS_DIR, '03_video_destaque_vantagens.mp4');
    if (fs.existsSync(vPath)) {
      fs.renameSync(vPath, webmTarget);
      convertWebmToMp4(webmTarget, mp4Target);
    }
  }

  // 4. Vídeo 4: Reels Oficial de Lançamento 9:16 (reels-launch.html)
  console.log('Gravando Vídeo 4: Reels Lançamento (reels-launch.html)...');
  {
    const ctx = await browser.newContext({
      viewport: { width: 540, height: 960 },
      recordVideo: { dir: VIDEOS_DIR, size: { width: 540, height: 960 } },
    });
    const page = await ctx.newPage();
    await page.goto('http://localhost:3099/reels-launch.html', { waitUntil: 'networkidle' });
    // Esconder barra de topo de configuração para ficar 100% limpo no Reels
    await page.evaluate(() => {
      const topBar = document.getElementById('top-bar');
      const bottomCtrl = document.getElementById('bottom-controls');
      if (topBar) topBar.style.display = 'none';
      if (bottomCtrl) bottomCtrl.style.display = 'none';
    });
    await page.waitForTimeout(15000);
    const vPath = await page.video().path();
    await ctx.close();
    const webmTarget = path.join(VIDEOS_DIR, '04_video_reels_lancamento_9x16.webm');
    const mp4Target = path.join(VIDEOS_DIR, '04_video_reels_lancamento_9x16.mp4');
    if (fs.existsSync(vPath)) {
      fs.renameSync(vPath, webmTarget);
      convertWebmToMp4(webmTarget, mp4Target);
    }
  }

  await browser.close();
  console.log('Todos os 4 vídeos gravados e convertidos para MP4 com sucesso!');
})();
