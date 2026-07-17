/**
 * The shared contract every Karuppu microservice implements.
 *
 * Each god is a self-contained module under services/karuppu/<id>/manifest.ts —
 * his own identity, media, "act" (the motion brief) and now his ROOM — composed
 * into the roster by registry.ts. The app imports the roster, never an
 * individual god, so lighting a new fire is one new folder + one line in the
 * registry.
 *
 * Media stays monochrome by law (plan.md §2): `image` and `veil` are baked
 * greyscale; `video` (when it lands) is graded the same. Colour lives only in
 * the `theme` — the seam of the god's own sanctum (plan.md §14): marks, edges
 * and air, never floods, never the photographs.
 */
export type FormId =
  | "sangili"
  | "periya"
  | "chinna"
  | "mangadu"
  | "sangani"
  | "vettai";

/**
 * The six weathers — one canvas signature per room, drawn by
 * `components/atmosphere/SanctumAtmosphere`. Each is motion in the god's own
 * colour: sparse, near-black, never a spectacle.
 */
export type AtmosphereKind =
  | "iron"     // falling chain-glints, heavy and slow
  | "embers"   // few large embers rising, monumental
  | "camphor"  // swift darting trails of cold light
  | "grove"    // leaf-flecks sinking with a pendulum sway
  | "spirits"  // spirit-lights drifting toward far shores
  | "hunt";    // fireflies that blink on and off; paired eye-glints

/**
 * A god's room (plan.md §14 — the Six Rooms). Inside his sanctum the shrine's
 * blood seam re-points to HIS colour: `accent`/`glow` override the CSS pair of
 * the same names, so every seam utility beneath the room re-tints from these
 * two values. The law still holds — his colour touches marks, edges and air
 * only. The void stays `#040404`; the photographs stay greyscale.
 */
export interface SanctumTheme {
  /** The god's seam — a hex that must hold ≥ 4.5:1 on the void (verified at build). */
  accent: string;
  /** The seam's bloom — an rgba used for shadows, auras and washes. */
  glow: string;
  /** Which weather fills his air. */
  atmosphere: AtmosphereKind;
  /** The element of the room, named — e.g. "iron", "ember", "camphor". */
  element: string;
}

/** One of the god's three marks — a titled, one-line aspect of who he is. */
export interface FormAspect {
  title: string;
  line: string;
}

export interface KaruppuForm {
  id: FormId;
  /** Two-digit order of descent on the Threshold. */
  num: string;
  /** English name. */
  name: string;
  /** Tamil name (rendered typographically, never generated). */
  tamil: string;
  /** Short distinguishing trait. */
  epithet: string;
  /** Where this form is most honoured. */
  region: string;
  /**
   * The clear REVEAL still — greyscale, optimised — shown only in the sanctum
   * (/forms/[id]). The payoff of the blur → motion gradient.
   */
  image: string;
  /**
   * The blurred-BACKDROP source — a tiny greyscale "glimpse" used behind the
   * Threshold, the chapters and the gallery. Only ever seen through heavy blur,
   * so it is deliberately small.
   */
  veil: string;
  /** A reverent one-paragraph description. */
  description: string;
  /** The divine act this form is known for — the brief for his motion clip. */
  act: string;
  /**
   * Reserved motion slot. Drop a path (e.g. "/video/sangili.mp4") — or both
   * codecs, `{ webm: "/video/sangili.webm", mp4: "/video/sangili.mp4" }` —
   * and every MotionSlot for this god plays it: blurred on the Threshold,
   * clear in the sanctum, lazy-loaded, paused offscreen, still-fallback on
   * reduced motion or error. No other code change. (Runbook: plan.md §12.)
   */
  video?: string | { webm?: string; mp4?: string };
  /** True where a claim is devotional/unverified and must be tagged on the site. */
  verify?: boolean;
  /** His room — seam colour, bloom and weather (plan.md §14). */
  theme: SanctumTheme;
  /** His three marks — shown as the aspects grid in the sanctum. */
  aspects: [FormAspect, FormAspect, FormAspect];
}
