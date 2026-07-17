# services/karuppu — a microservice per god

Each form of Karuppu is a **self-contained module**, not a row in one big array.
The shrine treats every god as an independently-owned vertical slice: his data,
his media, and his "act" (the brief for his motion clip) live together, and he
gets his own statically-generated, code-split route at `/forms/<id>`.

```
services/karuppu/
├─ types.ts            The shared contract (KaruppuForm, FormId)
├─ registry.ts         Composes the manifests → forms[], formById
├─ index.ts            Public surface — import from "@/services/karuppu"
├─ sangili/manifest.ts ┐
├─ periya/manifest.ts  │
├─ chinna/manifest.ts  │  one folder = one god = one "microservice"
├─ mangadu/manifest.ts │
├─ sangani/manifest.ts │
└─ vettai/manifest.ts  ┘
```

## Rules

- **The app imports the roster, never a single god.** Pages and components pull
  `forms` / `formById` from `@/services/karuppu`. This keeps the gods swappable and independently editable.
- **Media is monochrome by law.** Every manifest points at two baked-greyscale
  web assets — `image` (the clear sanctum reveal) and `veil` (the tiny blurred
  backdrop "glimpse") — derived from the colour originals in `/assets` by
  `generate/optimize-images.mjs`. No hue ships.
- **`video?` is a reserved socket.** Drop a path and every `MotionSlot` for that
  god plays it (blurred on the Threshold, clear in the sanctum) with no other
  code change — the site becomes "the motion of the gods" form by form.

## Add a new god

1. `node` is not needed — create `services/karuppu/<id>/manifest.ts` implementing
   `KaruppuForm`.
2. Add the source portrait to `assets/img-V1/` and a line to
   `generate/optimize-images.mjs`, then run it to bake the greyscale derivatives.
3. Register him: import + append in `registry.ts`.

His sanctum route, Threshold door, gallery tile and glimpse backdrop all appear
on their own — they are generated from the roster.
