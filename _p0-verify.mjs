import { chromium } from 'playwright';
import { pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs';

const fileUrl = pathToFileURL(path.join(process.cwd(), 'index.html')).href;
const outDir = path.join(process.cwd(), 'audit-p0-repair');
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const consoleLogs = [];
const page = await browser.newPage();

page.on('console', (msg) => {
  if (msg.type() === 'error' || msg.type() === 'warning') {
    consoleLogs.push({ type: msg.type(), text: msg.text() });
  }
});
page.on('pageerror', (err) => consoleLogs.push({ type: 'pageerror', text: err.message }));

async function runViewport(name, width, height) {
  await page.setViewportSize({ width, height });
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    const p = document.querySelector('.welcome-popup');
    p.classList.add('welcome-popup--visible');
    p.setAttribute('aria-hidden', 'false');
  });
  await page.waitForTimeout(400);

  const dom = await page.evaluate(() => {
    const q = (sel) => document.querySelector(sel);
    const close = q('.welcome-popup__close');
    const wrapper = q('.brochure-wrapper');
    const hero = q('.brochure-hero');
    const grid = q('.brochure-grid');
    const cta = q('.brochure-cta-wrapper');
    const modal = q('.welcome-popup__modal');
    return {
      wrapperExists: !!wrapper,
      wrapperParent: wrapper?.parentElement?.className,
      heroParent: hero?.parentElement?.className,
      gridParent: grid?.parentElement?.className,
      ctaParent: cta?.parentElement?.className,
      closeChildTags: close ? [...close.children].map((c) => c.tagName) : [],
      closeBrochureInside: close
        ? close.querySelector('.brochure-hero, .brochure-grid, .brochure-wrapper') !== null
        : null,
      modalChildren: modal
        ? [...modal.children].map((c) => ({ tag: c.tagName, class: c.className }))
        : [],
      popupChildren: [...document.querySelector('.welcome-popup').children].map((c) => ({
        class: c.className,
      })),
    };
  });

  const cs = await page.evaluate(() => {
    const pick = (sel, keys) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const o = { rectW: Math.round(r.width * 10) / 10, rectH: Math.round(r.height * 10) / 10 };
      for (const k of keys) o[k] = s[k];
      return o;
    };
    return {
      welcomePopup: pick('.welcome-popup', [
        'width',
        'height',
        'display',
        'flexDirection',
        'overflow',
      ]),
      modal: pick('.welcome-popup__modal', [
        'width',
        'height',
        'maxWidth',
        'overflow',
        'display',
      ]),
      wrapper: pick('.brochure-wrapper', ['width', 'height', 'display']),
      grid: pick('.brochure-grid', ['width', 'gridTemplateColumns']),
      softwareCard: pick('.brochure-card--software', ['width', 'height']),
    };
  });

  await page.screenshot({ path: path.join(outDir, `popup-${name}.png`), fullPage: false });
  return { name, dom, cs };
}

const desktop = await runViewport('desktop', 1440, 900);
const tablet = await runViewport('tablet', 834, 1194);
const mobile = await runViewport('mobile', 390, 844);

await browser.close();

const report = { consoleLogs, desktop, tablet, mobile };
fs.writeFileSync(path.join(outDir, 'verification.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
