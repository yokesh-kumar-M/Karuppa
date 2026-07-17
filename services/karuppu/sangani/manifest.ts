import type { KaruppuForm } from "../types";

/** 05 · Sangani Baba — the ocean-crossed. */
export const sangani: KaruppuForm = {
  id: "sangani",
  num: "05",
  name: "Sangani Baba",
  tamil: "சங்கனி பாபா",
  epithet: "The ocean-crossed",
  region: "Trinidad · Guyana · Suriname",
  image: "/img/forms/sangani.webp",
  veil: "/img/veil/sangani.webp",
  description:
    "Carried across the kala pani — the dark waters — to the Indo-Caribbean, Karuppu is honoured here as Sangani Baba in folk shrines from Trinidad to Suriname. A guardian who followed his people to the far shore and stayed.",
  act: "Opens a swirling portal above a dark ocean, sending spirit-lights streaming toward distant shores.",
  verify: true,
  // His room is the KALA PANI — deep-water violet; spirit-lights drift shoreward.
  theme: {
    accent: "#b493f0",
    glow: "rgba(180, 147, 240, 0.18)",
    atmosphere: "spirits",
    element: "the kala pani",
  },
  aspects: [
    {
      title: "The dark waters",
      line: "He crossed the kala pani with his people, and did not turn back.",
    },
    {
      title: "The far shore",
      line: "Folk shrines keep his name from Trinidad to Suriname.",
    },
    {
      title: "The spirit-lights",
      line: "The portal opens over black water; the lights stream home.",
    },
  ],
};
