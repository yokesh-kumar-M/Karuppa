import type { KaruppuForm } from "../types";

/** 04 · Mangadu Karuppu — guardian of the grove. */
export const mangadu: KaruppuForm = {
  id: "mangadu",
  num: "04",
  name: "Mangadu Karuppu",
  tamil: "மாங்காடு கருப்பு",
  epithet: "Guardian of the grove",
  region: "Mangadu, Tamil Nadu",
  image: "/img/forms/mangadu.webp",
  veil: "/img/veil/mangadu.webp",
  description:
    "Stationed at the wilderness boundary — the kāṭu — where the village ends and the grove begins, Mangadu Karuppu keeps watch with his sword raised in vigilance. His is the keeper of the threshold, the protector of the sacred grove.",
  act: "Summons the wilderness — roots, a spectral horse and a hound rise within a dome of guarding energy.",
  // His room is the GROVE — green kept at the wilderness edge; leaf-flecks sink.
  theme: {
    accent: "#86c46a",
    glow: "rgba(134, 196, 106, 0.16)",
    atmosphere: "grove",
    element: "the grove",
  },
  aspects: [
    {
      title: "The boundary",
      line: "Stationed where the village ends and the kāṭu begins.",
    },
    {
      title: "The grove",
      line: "Roots, horse and hound — the wilderness itself rises at his call.",
    },
    {
      title: "The watch",
      line: "Sword raised, unblinking — the keeper of the threshold.",
    },
  ],
};
