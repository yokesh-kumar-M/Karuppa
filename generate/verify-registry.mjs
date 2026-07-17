#!/usr/bin/env node
/**
 * Registry integrity — the shrine's build gate.
 *
 * Runs before every `next build` (npm "prebuild") and on demand as
 * `npm run doctor`. The site is generated from the god manifests, so a broken
 * manifest is a broken shrine: this script refuses the build rather than ship
 * a dangling image, a duplicate number, an unregistered god, or a room colour
 * that fails contrast on the void.
 *
 * Checks, per god folder under services/karuppu/<id>/:
 *   · id matches its folder; num is two digits and unique
 *   · image / veil files exist in /public; the OG card exists in /public/og
 *   · any local "/video/…" path points at a real file (the §12 drop-in)
 *   · theme.accent is #rrggbb, unique, and ≥ 4.5:1 on the void (WCAG AA)
 *   · theme.glow is an rgba() bloom; exactly three aspects are declared
 *   · the god is imported by registry.ts
 *
 * Deliberately dependency-free: the manifests are small, uniform, hand-written
 * TS object literals, so plain-text extraction is reliable here. Type shape is
 * separately enforced by tsc during the build itself.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const servicesDir = join(root, "services", "karuppu");
const publicDir = join(root, "public");

const problems = [];

/** First `key: "value"` string field in a manifest source. */
const field = (src, key) => {
  const m = src.match(new RegExp(`\\b${key}\\s*:\\s*"([^"]+)"`));
  return m ? m[1] : undefined;
};

/** WCAG relative luminance of a #rrggbb colour. */
const relLum = (hex) => {
  const int = parseInt(hex.slice(1), 16);
  const chan = (v) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return (
    0.2126 * chan((int >> 16) & 255) +
    0.7152 * chan((int >> 8) & 255) +
    0.0722 * chan(int & 255)
  );
};
const VOID_LUM = relLum("#040404");
const contrastOnVoid = (hex) => (relLum(hex) + 0.05) / (VOID_LUM + 0.05);

const godDirs = readdirSync(servicesDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .filter((name) => existsSync(join(servicesDir, name, "manifest.ts")))
  .sort();

if (godDirs.length === 0) {
  console.error("✗ no god manifests found under services/karuppu/*/manifest.ts");
  process.exit(1);
}

const registry = readFileSync(join(servicesDir, "registry.ts"), "utf8");
const nums = new Map();
const accents = new Map();
const lines = [];

for (const id of godDirs) {
  const src = readFileSync(join(servicesDir, id, "manifest.ts"), "utf8");
  const where = `services/karuppu/${id}/manifest.ts`;
  const before = problems.length;

  const mid = field(src, "id");
  if (mid !== id) {
    problems.push(`${where}: id "${mid}" does not match its folder "${id}"`);
  }

  const num = field(src, "num");
  if (!num || !/^\d{2}$/.test(num)) {
    problems.push(`${where}: num must be two digits, got "${num}"`);
  } else if (nums.has(num)) {
    problems.push(`${where}: num "${num}" already belongs to ${nums.get(num)}`);
  } else {
    nums.set(num, id);
  }

  for (const key of ["image", "veil"]) {
    const p = field(src, key);
    if (!p) {
      problems.push(`${where}: missing ${key}`);
    } else if (!existsSync(join(publicDir, p))) {
      problems.push(`${where}: ${key} "${p}" not found in /public`);
    }
  }

  if (!existsSync(join(publicDir, "og", `${id}.jpg`))) {
    problems.push(
      `${where}: OG card public/og/${id}.jpg missing (run generate/brand-derivatives.mjs)`
    );
  }

  for (const m of src.matchAll(/"(\/video\/[^"]+)"/g)) {
    if (!existsSync(join(publicDir, m[1]))) {
      problems.push(`${where}: video "${m[1]}" not found in /public`);
    }
  }

  const accent = field(src, "accent");
  let contrast = 0;
  if (!accent || !/^#[0-9a-f]{6}$/i.test(accent)) {
    problems.push(`${where}: theme.accent must be a #rrggbb hex, got "${accent}"`);
  } else {
    contrast = contrastOnVoid(accent);
    if (contrast < 4.5) {
      problems.push(
        `${where}: theme.accent ${accent} is ${contrast.toFixed(2)}:1 on the void — below WCAG AA (4.5:1)`
      );
    }
    const clash = accents.get(accent.toLowerCase());
    if (clash) {
      problems.push(`${where}: theme.accent ${accent} already belongs to ${clash} — every room needs its own light`);
    } else {
      accents.set(accent.toLowerCase(), id);
    }
  }

  const glow = field(src, "glow");
  if (!glow || !/^rgba\(/.test(glow)) {
    problems.push(`${where}: theme.glow must be an rgba() bloom, got "${glow}"`);
  }

  const aspects = (src.match(/\btitle\s*:/g) || []).length;
  if (aspects !== 3) {
    problems.push(`${where}: expected exactly 3 aspects, found ${aspects}`);
  }

  if (!new RegExp(`from\\s+"\\./${id}/manifest"`).test(registry)) {
    problems.push(`services/karuppu/registry.ts: ${id} is not imported — the fire is unlit`);
  }

  if (problems.length === before) {
    lines.push(
      `  ✓ ${num} ${id.padEnd(8)} ${accent} ${contrast.toFixed(1)}:1 · ${field(src, "atmosphere")}`
    );
  }
}

if (problems.length) {
  console.error(`✗ registry integrity — ${problems.length} problem(s):\n`);
  for (const p of problems) console.error(`  ✗ ${p}`);
  console.error("\nThe build was refused. Fix the manifests and run `npm run doctor`.");
  process.exit(1);
}

console.log(`✓ registry integrity — ${godDirs.length} fires, every door sound:`);
for (const line of lines.sort()) console.log(line);
