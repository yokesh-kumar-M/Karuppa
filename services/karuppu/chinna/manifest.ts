import type { KaruppuForm } from "../types";

/** 03 · Chinna Karuppu — the young and swift. */
export const chinna: KaruppuForm = {
  id: "chinna",
  num: "03",
  name: "Chinna Karuppu",
  tamil: "சின்ன கருப்பு",
  epithet: "The young and swift",
  region: "Tamil Nadu",
  image: "/img/forms/chinna.webp",
  veil: "/img/veil/chinna.webp",
  description:
    "The younger one — lean, alert, agile and swift to answer the call. Where the elder commands, Chinna Karuppu moves: lighter in adornment, quicker in step, cool as the flame of burning camphor.",
  act: "Moves at impossible divine speed, leaving cold camphor light-trails and a flurry of lightning-fast strikes.",
  // His room is CAMPHOR — the cold white flame; swift trails of light dart past.
  theme: {
    accent: "#c8ecf6",
    glow: "rgba(200, 236, 246, 0.16)",
    atmosphere: "camphor",
    element: "camphor",
  },
  aspects: [
    {
      title: "The camphor flame",
      line: "Cool as the white fire that burns without residue — light without heat.",
    },
    {
      title: "The speed",
      line: "He answers the call before its echo has died.",
    },
    {
      title: "The trail",
      line: "Cold light lingers a moment where he has already been.",
    },
  ],
};
