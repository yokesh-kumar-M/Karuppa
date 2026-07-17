/**
 * optimize-images.mjs — the local asset pipeline (plan.md §8, "organize the files").
 *
 * Takes the heavy, full-colour source portraits in /assets/img-V1 (2.5–3.3 MB each,
 * never shipped) and derives two lightweight web assets per god:
 *
 *   public/img/forms/<id>.webp   the COLOUR showcase/reveal still. Hue is kept so
 *                                CSS can dial "a little colour" per use (the
 *                                backgrounds carry a restrained, mostly-desaturated
 *                                tint; the sanctum reveal stays greyscale via CSS).
 *   public/img/veil/<id>.webp    a tiny GREYSCALE blurred-BACKDROP source — the
 *                                "glimpse," only ever seen through a 48px blur.
 *
 * Run:  node generate/optimize-images.mjs
 */
import sharp from "sharp";
import { mkdir, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = join(ROOT, "assets", "img-V1");
const STILL_DIR = join(ROOT, "public", "img", "forms");
const VEIL_DIR = join(ROOT, "public", "img", "veil");

/** id → source filename in assets/img-V1 (the correctly-named canonical set). */
const SOURCES = {
  sangili: "sangili-karuppu.jpeg",
  periya: "periya-karuppu.jpeg",
  chinna: "chinna-karuppu.jpeg",
  mangadu: "mangadu-karuppu.jpeg",
  sangani: "sangani-baba.jpeg",
  vettai: "vettai-karuppu.jpeg",
};

/** The clear reveal — sharp enough for the sanctum, small enough to ship. */
const STILL = { box: { width: 1200, height: 1600 }, quality: 72 };
/** The glimpse — seen only through heavy blur, so kept deliberately tiny. */
const VEIL = { box: { width: 768, height: 768 }, quality: 42 };

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

async function derive(id, file) {
  const src = join(SRC_DIR, file);
  if (!existsSync(src)) {
    console.warn(`  ! missing source for ${id}: ${file}`);
    return;
  }
  const stillOut = join(STILL_DIR, `${id}.webp`);
  const veilOut = join(VEIL_DIR, `${id}.webp`);

  // Showcase/reveal still — full COLOUR (CSS controls how much hue shows), webp.
  await sharp(src)
    .rotate() // honour EXIF orientation
    .resize({ ...STILL.box, fit: "inside", withoutEnlargement: true })
    .webp({ quality: STILL.quality, effort: 5 })
    .toFile(stillOut);

  // Veil backdrop — greyscale, tiny, webp. Blur is applied in CSS, not baked,
  // so the same source can be lifted to "near" clarity by the component.
  await sharp(src)
    .rotate()
    .grayscale()
    .resize({ ...VEIL.box, fit: "inside", withoutEnlargement: true })
    .webp({ quality: VEIL.quality, effort: 5 })
    .toFile(veilOut);

  const [s, v] = await Promise.all([stat(stillOut), stat(veilOut)]);
  console.log(`  ✓ ${id.padEnd(8)} still ${kb(s.size).padStart(7)}   veil ${kb(v.size).padStart(7)}`);
}

async function main() {
  await mkdir(STILL_DIR, { recursive: true });
  await mkdir(VEIL_DIR, { recursive: true });

  console.log("Deriving web assets (colour still + greyscale veil) from assets/img-V1 …\n");
  for (const [id, file] of Object.entries(SOURCES)) {
    await derive(id, file);
  }

  // Report any stray heavy originals still sitting in /public.
  const heavy = (await readdir(STILL_DIR)).filter((f) => /\.jpe?g$/i.test(f));
  if (heavy.length) {
    console.log(`\n  note: ${heavy.length} heavy jpeg(s) still in public/img/forms — safe to delete:`);
    for (const f of heavy) console.log(`        ${f}`);
  }
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
