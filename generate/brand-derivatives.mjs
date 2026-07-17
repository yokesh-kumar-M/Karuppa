/**
 * brand-derivatives.mjs — bakes every icon + social image from the two brush
 * wordmarks in /public/img/brand (plan.md §11: the blood seam; §13: phase 7).
 *
 * Outputs (all committed, zero runtime cost):
 *   app/icon.png                  512² favicon (Next serves + links it)
 *   app/apple-icon.png            180² apple-touch icon
 *   app/favicon.ico               PNG-in-ICO for legacy /favicon.ico probes
 *   public/icons/icon-192.png     PWA manifest icon (maskable-safe padding)
 *   public/icons/icon-512.png     PWA manifest icon (maskable-safe padding)
 *   app/opengraph-image.png       1200×630 site-wide OG/Twitter card
 *   public/og/<id>.jpg            1200×630 per-sanctum OG card, one per god
 *
 * Run:  node generate/brand-derivatives.mjs
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BRAND = join(ROOT, "public", "img", "brand");
const STILLS = join(ROOT, "public", "img", "forms");
const ICONS_DIR = join(ROOT, "public", "icons");
const OG_DIR = join(ROOT, "public", "og");
const APP_DIR = join(ROOT, "app");

const WORDMARK_EN = join(BRAND, "karuppu-english-wordmark.png");
const WORDMARK_TA = join(BRAND, "karuppu-tamil-wordmark.png");

const VOID = { r: 4, g: 4, b: 4 };
const ASH = "#eee8dd";
const FIRE = "#ff1814";

/** Keep in sync with services/karuppu/<id>/manifest.ts (like optimize-images.mjs). */
const FORMS = [
  { id: "sangili", num: "01", name: "Sangili Karuppan", epithet: "The chain-bound protector" },
  { id: "periya", num: "02", name: "Periya Karuppu", epithet: "The great elder" },
  { id: "chinna", num: "03", name: "Chinna Karuppu", epithet: "The young and swift" },
  { id: "mangadu", num: "04", name: "Mangadu Karuppu", epithet: "Guardian of the grove" },
  { id: "sangani", num: "05", name: "Sangani Baba", epithet: "The ocean-crossed" },
  { id: "vettai", num: "06", name: "Vettai Karuppu", epithet: "The divine hunter" },
];

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

function voidCanvas(width, height) {
  return sharp({
    create: { width, height, channels: 4, background: { ...VOID, alpha: 1 } },
  });
}

/** The wordmark resized to fit a box, returned as a composite-ready buffer. */
async function mark(src, maxW, maxH) {
  const buf = await sharp(src)
    .resize({ width: maxW, height: maxH, fit: "inside" })
    .png()
    .toBuffer();
  const meta = await sharp(buf).metadata();
  return { buf, width: meta.width, height: meta.height };
}

/** A square icon: the Tamil brush mark centred on the void. */
async function icon(outPath, size, markScale) {
  const m = await mark(WORDMARK_TA, Math.round(size * markScale), Math.round(size * markScale));
  const png = await voidCanvas(size, size)
    .composite([
      {
        input: m.buf,
        left: Math.round((size - m.width) / 2),
        top: Math.round((size - m.height) / 2),
      },
    ])
    .png()
    .toBuffer();
  await writeFile(outPath, png);
  console.log(`  ✓ ${outPath.replace(ROOT, "").slice(1).padEnd(34)} ${kb(png.length).padStart(7)}`);
  return png;
}

/** Wrap a PNG in a single-image .ico container (PNG-in-ICO, Vista+). */
function pngToIco(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // one image
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 = 256)
  entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2); // palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8); // image size
  entry.writeUInt32LE(22, 12); // offset (6 + 16)
  return Buffer.concat([header, entry, png]);
}

/** The site-wide OG card — the void, one hairline, the wordmark, the vow. */
async function ogMain(outPath) {
  const W = 1200;
  const H = 630;
  const m = await mark(WORDMARK_EN, 660, 430);

  const overlay = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hair" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="${FIRE}" stop-opacity="0"/>
        <stop offset="0.5" stop-color="${FIRE}" stop-opacity="0.55"/>
        <stop offset="1" stop-color="${FIRE}" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect x="0" y="74" width="${W}" height="2" fill="url(#hair)"/>
    <rect x="0" y="${H - 76}" width="${W}" height="2" fill="url(#hair)"/>
    <text x="${W / 2}" y="${H - 106}" text-anchor="middle"
      font-family="Georgia, 'Times New Roman', serif" font-size="27"
      letter-spacing="7" fill="${ASH}" fill-opacity="0.78">KAVAL DEIVAM — THE GUARDIAN OF JUSTICE</text>
  </svg>`);

  const png = await voidCanvas(W, H)
    .composite([
      {
        input: m.buf,
        left: Math.round((W - m.width) / 2),
        top: Math.round((H - m.height) / 2) - 34,
      },
      { input: overlay, left: 0, top: 0 },
    ])
    .png()
    .toBuffer();
  await writeFile(outPath, png);
  console.log(`  ✓ ${outPath.replace(ROOT, "").slice(1).padEnd(34)} ${kb(png.length).padStart(7)}`);
}

/** A sanctum OG card — the god (greyscale, darkened) on the right, named. */
async function ogForm(form) {
  const W = 1200;
  const H = 630;
  const STILL_W = 640;

  const still = await sharp(join(STILLS, `${form.id}.webp`))
    .grayscale()
    .modulate({ brightness: 0.74 })
    .resize({ width: STILL_W, height: H, fit: "cover", position: "attention" })
    .toBuffer();

  const m = await mark(WORDMARK_EN, 216, 140);

  const overlay = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="melt" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#040404" stop-opacity="1"/>
        <stop offset="0.46" stop-color="#040404" stop-opacity="1"/>
        <stop offset="0.68" stop-color="#040404" stop-opacity="0.45"/>
        <stop offset="1" stop-color="#040404" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="floor" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stop-color="#040404" stop-opacity="0.85"/>
        <stop offset="0.28" stop-color="#040404" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="${W}" height="${H}" fill="url(#melt)"/>
    <rect x="0" y="0" width="${W}" height="${H}" fill="url(#floor)"/>
    <text x="76" y="330" font-family="'Courier New', monospace" font-size="22"
      letter-spacing="9" fill="${FIRE}">${form.num} · KAVAL DEIVAM</text>
    <text x="76" y="408" font-family="Georgia, 'Times New Roman', serif"
      font-size="62" fill="${ASH}">${form.name}</text>
    <text x="76" y="462" font-family="Georgia, 'Times New Roman', serif"
      font-size="30" font-style="italic" fill="${ASH}" fill-opacity="0.62">${form.epithet}</text>
  </svg>`);

  const out = join(OG_DIR, `${form.id}.jpg`);
  const jpg = await voidCanvas(W, H)
    .composite([
      { input: still, left: W - STILL_W, top: 0 },
      { input: overlay, left: 0, top: 0 },
      { input: m.buf, left: 76, top: 64 },
    ])
    .flatten({ background: VOID })
    .jpeg({ quality: 84, mozjpeg: true })
    .toBuffer();
  await writeFile(out, jpg);
  console.log(`  ✓ ${out.replace(ROOT, "").slice(1).padEnd(34)} ${kb(jpg.length).padStart(7)}`);
}

async function main() {
  await mkdir(ICONS_DIR, { recursive: true });
  await mkdir(OG_DIR, { recursive: true });

  console.log("Baking brand derivatives from the brush wordmarks …\n");

  await icon(join(APP_DIR, "icon.png"), 512, 0.78);
  await icon(join(APP_DIR, "apple-icon.png"), 180, 0.7);
  await icon(join(ICONS_DIR, "icon-192.png"), 192, 0.58);
  await icon(join(ICONS_DIR, "icon-512.png"), 512, 0.58);

  const fav = await sharp(join(APP_DIR, "icon.png")).resize(48, 48).png().toBuffer();
  const ico = pngToIco(fav, 48);
  await writeFile(join(APP_DIR, "favicon.ico"), ico);
  console.log(`  ✓ app/favicon.ico${" ".repeat(19)}${kb(ico.length).padStart(7)}`);

  await ogMain(join(APP_DIR, "opengraph-image.png"));
  for (const form of FORMS) await ogForm(form);

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
