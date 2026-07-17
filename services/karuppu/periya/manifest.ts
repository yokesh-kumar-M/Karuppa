import type { KaruppuForm } from "../types";

/** 02 · Periya Karuppu — the great elder. */
export const periya: KaruppuForm = {
  id: "periya",
  num: "02",
  name: "Periya Karuppu",
  tamil: "பெரிய கருப்பு",
  epithet: "The great elder",
  region: "Tamil Nadu",
  image: "/img/forms/periya.webp",
  veil: "/img/veil/periya.webp",
  description:
    "The elder and greater — larger of frame, fuller of beard, draped in ornate garlands. Periya Karuppu is the commanding presence among the guardians, the senior voice whose word settles disputes and whose stride shakes the ground.",
  act: "Raises the aruval overhead and strikes the earth, sending a shockwave rippling outward through the dark.",
  // His room is EMBER — the elder's slow molten heat; few, large sparks rise.
  theme: {
    accent: "#ff7a33",
    glow: "rgba(255, 122, 51, 0.18)",
    atmosphere: "embers",
    element: "ember",
  },
  aspects: [
    {
      title: "The aruval",
      line: "The blade raised overhead — the strike that ends the argument.",
    },
    {
      title: "The word",
      line: "The senior voice among the guardians; his judgement settles disputes.",
    },
    {
      title: "The stride",
      line: "Larger of frame, fuller of beard — the ground answers when he walks.",
    },
  ],
};
