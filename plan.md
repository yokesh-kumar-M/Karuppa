# Karuppa — Build Plan

> **Direction:** A near-black monochrome digital shrine for Karuppu Swamy where only **three instruments** are allowed to express anything — **text, video motion, and photo-blur**. Everything else (accent colors, gold, fire gradients, colored particles, cursor glow, per-form theming) is **removed, not muted**. The discipline is subtraction.

This plan refines an existing Next.js 15 / React 19 / Tailwind v4 build — it is not a from-scratch rebuild. All 11 routes, the content model, the `MotionSlot` video socket, and the atmosphere components already exist. The work is mostly cutting color and wiring the film type.

---

## 1. The core idea

**Karuppa is a black room.** You don't decorate it. You let exactly three instruments speak, and you forbid everything else:

| Instrument | What it carries | Where it lives |
|---|---|---|
| **Text** | All meaning, hierarchy, reverence | The *Karuppu* wordmark + Tamil/English names + sparse prose |
| **Video motion** | The god himself — only ever as *motion*, never a static portrait | `MotionSlot` sockets |
| **Photo blur** | Presence without disclosure — a form you sense but can't resolve | Blurred stills behind the threshold/veils |

The signature narrative gradient is **blur → motion**: on the landing and gallery the god is blurred (presence); on his own route the video plays clear (revelation).

---

## 2. The monochrome law (strip vs. keep)

Color currently lives in `app/globals.css` and `content/forms.ts`.

### Remove
- The whole palette except void + ash: `--color-fire`, `--ember`, `--ashgold`, `--blood`, `--karuppu`, `--stone` as visible colors.
- All six `[data-form="…"]` accent themes (`globals.css`) and the `accent` / `glow` fields in `content/forms.ts`. Gods stop having colors — they have **names and motion**.
- `.fire-text` gradient, `.aura` breathing glow, the color in the ember-rise particle.
- `components/atmosphere/CursorEmber.tsx` (no cursor glow) and the colored `components/motion/EmberField.tsx`.
- `::selection { background: fire }` → ash-on-black.

### Reduce to a 4-token greyscale
```css
--void:  #050505;                    /* near-black, not pure #000 (prevents banding on video/photo) */
--ash:   #e7e3da;                    /* the only "light" — text */
--dim:   rgba(231,227,218,0.55);     /* secondary text */
--faint: rgba(231,227,218,0.14);     /* hairlines, borders, 1px progress line */
```
No hue anywhere in the UI chrome.

### Keep, but near-invisible ("very subtle" layer)
- Film grain (`GrainVignette`) at very low opacity — keeps the black from looking dead. Reads as cinema, not decoration.
- One hairline scroll-progress line, ash at ~14%.
- All reduced-motion fallbacks (already present).

### Elevate (the three instruments)
- `MotionSlot` stays the centerpiece — plays a still today, a video the moment a path is dropped in.
- Standardize a **blur scale** so blur itself signals proximity: threshold = 48px, veil-lift = 24px, near-reveal = 8px.

---

## 3. The *Karuppu* movie font

There is **no official, distributable "Karuppu" font** — the film title is a custom hand-lettered logotype. Three real paths:

- **Path A — recreate the wordmark as SVG (recommended).** Hand-trace the *Karuppu / கருப்பு* lettering once → `public/brand/karuppa-wordmark.svg`, used **only** as masthead logo + hero title (never body text). Most faithful, scales perfectly, no font licensing. Treat as reverent homage; keep to the wordmark, imply no official affiliation.
- **Path B — closest free fonts, then distress.** Headings only: Tamil display `Anek Tamil` (heavy) or `Kavivanar` (brush/folk); Latin display a heavy condensed cut (`Anton` / carved slab). Apply a light SVG `feTurbulence` / `feDisplacementMap` "carved edge" filter. Keep a clean Tamil face for body legibility.
- **Path C — license / commission.** Buy a matching display face or commission a custom wordmark. Highest fidelity, has a cost.

**Recommendation:** A for the title, B for headings, existing Tamil body font for reading.

> **This is the one decision that gates the build.** Everything else is unblocked.

---

## 4. Information architecture (keep routes, reframe minimal)

The 11 routes survive — they shed color and ornament. Each page = **one motion/blur moment + sparse text + a quiet exit.**

```
/            The Threshold — blurred presence, the wordmark, "enter"
/guardian    Who Karuppu is — text-led, one blurred still
/forms       The forms — sigils/names only; motion on the god's own route
/forms/[id]  A single god — his clip plays CLEAR here (the payoff)
/powers      Six powers — text + one motion sigil each
/iconography The symbols — text hotspots, no colored diagram
/worship     Rituals / offerings — factual text
/festivals   The 3-day flow — text sequence + one clip
/temples     Temple list — typographic atlas (drop the colored map)
/diaspora    The crossing — names across the world, text-led
/gallery     The motion archive — blurred grid, clears on play
/about       Sources + belief/fact disclaimer (ethics anchor — keep)
```

---

## 5. Signature interactions, monochrome

- **Threshold (`/`):** near-black, deeply blurred `MotionSlot` backdrop, the *Karuppu* wordmark igniting in **brightness/blur only — no color** (rewrite `.ignite` to drop the fire tint). Scroll descends past each form as a *name in the dark*, not a colored seal.
- **Per-god route (`/forms/[id]`):** the one place the clip resolves to full clarity and the photo stops being blurred. The only "bright" moment — the emotional payoff.
- **Forms gallery → sigils:** gods lose color, so the differentiator is a **monochrome line-glyph** (`components/iconography/glyphs.tsx` / `PowerSigil`) + the Tamil name. Hover lifts blur a touch; click enters and motion plays.
- **Transitions:** keep `SanctumVeil`, recolor to a pure black wipe (no blood-red).

---

## 6. Tech stack (already correct — minimal change)

Next.js 15 App Router + React 19 + Tailwind v4 + Lenis. No rebuild.

- **Video:** as god clips arrive, host on a streaming provider (Mux / Cloudinary, or Vercel Blob for a few) instead of self-hosting big MP4s — `MotionSlot` already takes a `video` URL, so this is config, not code. Ship `H.264 MP4 + WebM`, muted/autoplay/`playsinline`, poster = blurred still, lazy below the fold.
- **Drop** the planned Mapbox/Leaflet map for `/temples` — a colored interactive map fights the monochrome law. Replace with a typographic temple list/atlas.
- Keep Lenis smooth scroll + the reduced-motion baseline.

---

## 7. Data model cleanup

In `content/forms.ts`: remove `accent`, `glow`, `theme`; keep `id, num, name, tamil, epithet, region, image, description, act, video?, verify?`. The `act` field (the divine motion) becomes the **brief for each god's video clip** — already written for all six. That is the shot list.

---

## 8. Video-motion production pipeline

Motion is one of only three instruments, so the clips matter. Per god (six `act` descriptions ready):

1. Generate a **loopable, near-black, monochrome** clip (Veo/Flow or any generator) — *no color grade*, just light and smoke on black, matching each `act`.
2. Export → compress (MP4 + WebM) → poster = the blurred frame.
3. Drop the path into the form's `video` field. `MotionSlot` does the rest: blurred on the landing, clear on the route.

Until clips exist, the blurred **photo** stands in — satisfying the "photo blur should be visible" requirement, so the site is complete and on-theme *before* any video is made.

---

## 9. Accessibility, performance, ethics

- **Contrast:** ash `#e7e3da` on `#050505` is well past AA. Verify dim/faint tiers on real text.
- **Reduced motion:** every clip needs a static blurred-poster fallback (system already honors `prefers-reduced-motion`).
- **Performance:** lazy-load video, `next/image` for stills, LCP < 2.5s; the blurred hero still is the LCP, not a video.
- **Ethics:** a living faith. Keep the `/about` belief-vs-fact disclaimer, keep `verify` flags on Sangani / Vettai claims, handle offerings factually. Minimalism reinforces reverence — no sensationalism.

---

## 10. Phased roadmap (mapped to actual files)

| Phase | Work | Touches | Status |
|---|---|---|---|
| **0 — Font decision** | Pick Path A/B/C; if A, trace the wordmark SVG | *blocks nothing else* | ✅ done — brush wordmarks traced as PNGs (`public/img/brand`), wired via `KaruppuWordmark`; they arrived **red** → see §11, the blood seam |
| **1 — Monochrome refactor** | Gut palette to 4 tokens; delete per-form themes, fire-text, aura, CursorEmber, colored EmberField | `app/globals.css`, `content/forms.ts`, `lib/fonts.ts` | ✅ done |
| **2 — Type system** | Wire wordmark + display font; rebuild `.ignite` as brightness/blur only | `lib/fonts.ts`, `app/layout.tsx`, landing components | ✅ `.ignite` rebuilt (no hue); wordmark = ash ignite. SVG wordmark = Phase 0 |
| **3 — Blur language** | Standardize blur scale (threshold/veil/near) across `MotionSlot` usages | `components/media/MotionSlot.tsx`, landing + gallery | ✅ done — `BlurLevel` scale 48/24/8px |
| **4 — Pages pass** | Strip color from all 11 routes; swap `/temples` map for typographic atlas | `app/**/page.tsx`, temple components | ✅ done — all hue removed; temples already typographic |
| **5 — Sigils** | Monochrome line-glyph per form to replace color identity | `glyphs.tsx`, `PowerSigil`, forms gallery | ✅ done — ash mandala sigil + name |
| **6 — Video** | Generate 6 monochrome `act` clips, host, drop into `video` fields | `services/karuppu/*/manifest.ts` + provider | ⏳ pending assets — sockets **production-grade** (lazy, paused-offscreen, reduced-motion, dual-codec, error fallback); runbook in §12 |
| **7 — Polish / deploy** | Grain at whisper opacity, Lighthouse, a11y, OG images, Vercel deploy | global | ◐ nearly done — icons/OG/sitemap/robots/manifest/404/error/JSON-LD shipped (§13); Lighthouse + deploy checklist remain |

Phases 1–5 need **zero new assets** — pure refinement of what exists, so the new direction is visible immediately. Video (6) layers in over time without touching component code.

---

**Status (this session):** Phases 1–5 complete; the whole site is monochrome ash-on-`#050505`. `npm run build` + `tsc --noEmit` both green; verified in-browser (landing, god-door sigil, `/forms/[id]` reveal, gallery blur scale, worship). The palette is collapsed to four greyscale tokens (`--void/--ash/--dim/--faint`); the legacy `--color-*` and `--accent/--glow` names survive only as ash aliases so existing utility classes compile without hue. Per-form `accent/glow/theme` are gone from `content/forms.ts` and every page; `CursorEmber`/`EmberField` deleted; `KalaPaniField` spirit-lights kept as ash motion.

**Next steps:** (0) commission/trace the SVG wordmark for the masthead + hero; (6) generate the six monochrome `act` clips and drop paths into the `video?` fields; (7) Lighthouse pass, OG images, Vercel deploy.

---

## Session update — 2026-06-05 (assets, microservices, glass nav)

- **Per-god microservices.** Each form is now a self-contained module under `services/karuppu/<id>/manifest.ts`, composed by `registry.ts`; `content/forms.ts` is a thin back-compat re-export. See `services/karuppu/README.md`.
- **Black-and-white asset pipeline.** `generate/optimize-images.mjs` (sharp) bakes greyscale web derivatives from the colour originals in `assets/img-V1` → `public/img/forms/<id>.webp` (clear reveal, ~75–125 KB) + `public/img/veil/<id>.webp` (tiny blurred backdrop, ~17–30 KB). The heavy 2.5–3.3 MB jpegs were dropped from `/public` (≈17 MB → ≈0.75 MB). Colour originals stay in `/assets` for the future glow pass.
- **Site-wide "glimpse."** New `components/atmosphere/VeiledBackdrop.tsx` — a fixed, zoomed, blurred, greyscale, near-black Ken-Burns photo glimpse — sits behind every photographic chapter (powers, iconography, worship, festivals, guardian, gallery, about) and each sanctum; the landing + gallery tiles now read the tiny `veil` sources. `temples` / `diaspora` keep their bespoke `AtlasField` / `KalaPaniField`.
- **Navigation.** The full-screen toggle menu (`SiteHeader` / `RitualMenu`) and the right-side fires index are removed; replaced by a floating glassmorphic top-centre slidebar (`components/nav/GlassNav.tsx`) — frosted ash over the void, horizontally scrollable, strictly monochrome.
- **Glow deferred.** Everything stays B&W; a future plan will say *where* to glow (brightness/bloom only, never hue). `VeiledBackdrop` and `GlassNav` leave the seam.

`tsc --noEmit` + `next build` green; all 20 routes prerender.

---

## 11. The blood seam (the law, amended)

Phase 0 resolved itself: the *Karuppu* film wordmark was recreated as two brush
PNGs (`public/img/brand/karuppu-{english,tamil}-wordmark.png`, transparent,
blood-red) and wired via `components/brand/KaruppuWordmark.tsx` into the hero,
the glass nav and the footer. The wordmark arrived **red** — so the monochrome
law is amended, not repealed:

> **The room stays black. Exactly one colour may cut it: the blood red of the
> wordmark.** The seam touches *marks and edges* only — never floods.

| May carry the seam (`--accent` / `text-fire`) | Must stay greyscale |
|---|---|
| The wordmark + its `drop-shadow` bloom | Body text, prose, descriptions |
| Hairlines (hero rules, OG card rules) | Panels, cards, page backgrounds |
| Active nav pill, seal mandala + form name on the Threshold | The photographs (until the glow pass) |
| CTA fills (`PillButton` solid), red eyebrow numerals | Any area fill larger than a pill |
| "The reveal · coming in motion" marker dots | |

Second, quieter exception: **temple gold** (`--color-ashgold: #d8b56d`) may
whisper on *ritual artefacts only* — offering tags, shrine cards, belief
markers (`BeliefTag`, `OfferingsLedger`, `ShrineCard`).

Canonical tokens (one block in `globals.css`, duplicates merged):
`--void #040404 · --ash #eee8dd · --dim 58% · --faint 14% · --accent #ff1814 ·
--glow rgba(255,24,20,.18)` + seam family `fire/ember/blood` + `ashgold`.
Repoint `--accent`/`--glow` and the whole seam moves at once.

Contrast note: `#ff1814` on `#040404` ≈ **5.3:1** — passes WCAG AA for normal
text; keep red text at `text-xs`+ and never on `stone` panels below 4.5:1.

---

## 12. Video drop-in runbook (for the day the clips arrive)

The sockets are now production-grade. `MotionSlot` always paints the still
(LCP, bots, reduced-motion); when a `video` exists it lazy-mounts near the
viewport, fades in only once actually *playing*, pauses offscreen, plays only
the active landing layer (`paused` prop), and falls back to the still on any
error. Nothing to build when assets land — only these steps:

1. **Grade + trim** each clip to its `act` (6–12 s, loopable, near-black,
   monochrome — the seam belongs to the UI, not the footage).
2. **Compress** into both codecs (per god, from a master `<id>-master.mov`):
   ```bash
   ffmpeg -i sangili-master.mov -an -vf "scale=-2:1080,fps=24" \
     -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -movflags +faststart \
     public/video/sangili.mp4
   ffmpeg -i sangili-master.mov -an -vf "scale=-2:1080,fps=24" \
     -c:v libvpx-vp9 -b:v 0 -crf 34 -row-mt 1 \
     public/video/sangili.webm
   ```
   Target ≤ 2–4 MB per clip. Dark, low-detail footage compresses extremely well.
3. **Wire** one field in the god's manifest (`services/karuppu/<id>/manifest.ts`):
   ```ts
   video: { webm: "/video/sangili.webm", mp4: "/video/sangili.mp4" },
   ```
   (a bare string also works: `video: "/video/sangili.mp4"`).
4. **Verify**: Threshold shows it *blurred* behind the doors; `/forms/<id>`
   plays it clear; OS "reduce motion" shows the still; kill the file path and
   the still silently returns.
5. **If the six together exceed ~15 MB**, move them to Vercel Blob / Mux /
   Cloudinary and put the absolute URLs in the same fields — the sockets take
   any URL.

---

## 13. Phase 7 — shipped this pass, and the launch checklist

Shipped now (all generated, committed, zero runtime cost):
- **Brand derivatives** (`generate/brand-derivatives.mjs`, run any time the
  wordmarks change): favicon + `app/icon.png` 512 + `apple-icon.png` +
  maskable PWA icons; site-wide OG card (`app/opengraph-image.png` — wordmark
  on void, red hairlines, tagline); **six per-sanctum OG cards**
  (`public/og/<id>.jpg` — the god greyscale right, red eyebrow, named) wired
  into `generateMetadata`.
- **SEO shell**: `sitemap.ts` (17 URLs), `robots.ts`, `manifest.ts` (PWA,
  void-black), WebSite JSON-LD, `twitter:card`, env-driven `metadataBase`
  (`NEXT_PUBLIC_SITE_URL`).
- **Edges**: themed `not-found.tsx` ("இங்கு எதுவும் இல்லை / The dark holds
  nothing here") and `error.tsx` with retry — the shrine never shows a raw
  stack.

Launch checklist (remaining):
- [ ] Set `NEXT_PUBLIC_SITE_URL` on Vercel to the real domain.
- [ ] Lighthouse pass on `/`, `/guardian`, `/forms/sangili` (LCP < 2.5 s — the
      hero still is the LCP; wordmark PNGs are `priority`).
- [ ] Validate OG cards (opengraph.xyz / the social debuggers) after deploy.
- [ ] Cross-device sweep: hero wordmark stack at 360 px / 768 px / 1440 px,
      `GlassNav` overflow scroll on mobile, reduced-motion on.
- [ ] `npm run build` + smoke the 20 routes on the preview URL.

Roadmap after launch (in order of payoff):
1. **The clips** (§12) — the whole design converges on this payoff.
2. **The glow pass** — decide where photographs may *bloom* (brightness, never
   hue); candidates: sanctum reveal hover, festival fire sequence.
3. **Sanctum deepening** — per-god chapters (origin, temple, offering) inside
   each microservice manifest; the structure already supports it.
4. **Ambient sound v2** — swap the synthesized drone for a recorded urumi /
   temple-bell bed behind a consent toggle (keep the Web-Audio fallback).
5. **Vercel Analytics + Speed Insights** — one import each, privacy-clean.
6. **Tamil-first mode** — a `ta` locale that leads with Tamil and drops
      English to the eyebrow line (content model already carries both).

---

## 14. The Six Rooms — per-god aesthetics (the law, amended again)

§11's clause "gods have no colours of their own" is repealed — carefully. The
shrine's shared halls (landing hero, chapters, nav, footer) still carry exactly
one colour, the blood red. But behind each god's door, the sanctum is HIS room:

> **The room stays black; the photographs stay greyscale. Inside a sanctum the
> seam re-points to the god's own colour — marks, edges and air only, never a
> flood. On the Threshold, each door already glows with the light of the room
> behind it.**

Mechanics (why this costs almost nothing): `--accent` / `--glow` are `@theme
inline` tokens, so seam utilities (`text-accent`, `bg-accent`, `border-accent`,
alpha variants) resolve the variable *at the element*.
`components/forms/SanctumRoom.tsx` sets the two vars + `data-god` on the route
wrapper and the entire seam re-tints beneath it; `Seal` does the same per
landing door; the sanctum's prev/next links carry their *neighbour's* accent.
No component knows about colour.

The six rooms (each `theme` lives in `services/karuppu/<id>/manifest.ts`,
grounded in that god's own lore):

| God | Room (element) | Seam | Weather (`AtmosphereKind`) |
|---|---|---|---|
| 01 Sangili | iron | `#7db8e8` forged steel | `iron` — falling chain-glints |
| 02 Periya | ember | `#ff7a33` molten | `embers` — few, large, rising |
| 03 Chinna | camphor | `#c8ecf6` cold white flame | `camphor` — swift darting trails |
| 04 Mangadu | the grove | `#86c46a` leaf | `grove` — sinking leaf-flecks |
| 05 Sangani | the kala pani | `#b493f0` deep water | `spirits` — lights drifting shoreward |
| 06 Vettai | moonlit mist | `#5fd0b4` pale teal | `hunt` — fireflies + paired eye-glints |

The weather is `components/atmosphere/SanctumAtmosphere.tsx` — ONE canvas,
six signatures: sparse motes in the god's colour, `mix-blend-screen` (pure
added light: glows over the void, vanishes over ash text, can never obstruct
reading), paused when the tab hides, halved on lean connections, collapsed to
a single static frame under reduced motion. His aura breathes via
`aura-breathe` (radial `var(--glow)`); the landing backdrop washes ~9% of the
active door's colour into the dark as it crossfades.

### Stabilizers shipped with this pass

- **`generate/verify-registry.mjs`** — the build gate (npm `prebuild`, also
  `npm run doctor`): per god, id matches folder, num two-digit + unique,
  image/veil/OG files exist on disk, local `/video/…` paths resolve, accent is
  hex + unique + ≥ 4.5:1 on the void (WCAG AA), glow is rgba, exactly three
  aspects, god registered in registry.ts. A broken manifest refuses the build.
- **`dynamicParams = false`** on `/forms/[form]` — the roster is sealed at
  build time; unknown doors 404 without rendering.
- **Sanctum-scoped `loading.tsx` + `error.tsx`** — a fault in one room never
  darkens the shrine. ⚠ A ROOT `app/loading.tsx` was tried and REVERTED: the
  root Suspense boundary left the static landing stuck behind React's
  streaming reveal (`$RC`) — content shipped inside `<div hidden id="S:0">`
  and never swapped in (extension-heavy browsers can kill the inline reveal).
  Do not reintroduce a root loading boundary on this static site.
- **Cache headers** (`next.config.mjs`): `/img`, `/icons`, `/og`, `/video` →
  30 days + stale-while-revalidate. Never `immutable`: the pipelines overwrite
  the same filenames in place.
- **Lean media** (`lib/adaptive.ts`): on Data Saver / 2G / ≤2 GB devices,
  `MotionSlot` never mounts video (the still is the designed fallback) and the
  weather halves its motes. Load-shedding, not degradation.
- **Aspects**: each manifest carries three titled marks (`aspects`), rendered
  as the sanctum's three-card grid between the telling and the act.

### Adding a god now means

One folder + one registry line, as before, plus: pick an unused accent (the
verifier enforces contrast and uniqueness), choose an `AtmosphereKind` (or add
a seventh signature in `SanctumAtmosphere`), name the room's `element`, write
the three `aspects`.

**Status (2026-07-02):** all six rooms live and verified in-browser (landing
wordmark ignite, tinted doors, four rooms eyeballed + two spot-checked);
`typecheck` + `build` green — 27 static routes, sanctum page JS ≈ 3.6 kB;
prebuild gate green (accents 7.9–16.4 : 1 on the void).
