import type { KaruppuForm } from "../types";

/** 01 · Sangili Karuppan — the chain-bound protector. */
export const sangili: KaruppuForm = {
  id: "sangili",
  num: "01",
  name: "Sangili Karuppan",
  tamil: "சங்கிலி கருப்பன்",
  epithet: "The chain-bound protector",
  region: "Tamil Nadu · Malaysia · Singapore",
  image: "/img/forms/sangili.webp",
  veil: "/img/veil/sangili.webp",
  description:
    "Bound in heavy iron chains, Sangili Karuppan is the fiercest protective form — the guardian who carries his own restraint as a vow. Borne across the seas by Tamil labourers, he became one of the most beloved deities of the Malaysian and Singaporean diaspora.",
  act: "Strains against the iron chains until they snap, releasing a ring of protective fire that seals the darkness away.",
  // His room is IRON — forged steel caught in cold light; chain-glints fall.
  theme: {
    accent: "#7db8e8",
    glow: "rgba(125, 184, 232, 0.18)",
    atmosphere: "iron",
    element: "iron",
  },
  aspects: [
    {
      title: "The chain",
      line: "Iron worn as a vow — restraint carried by choice, never imposed.",
    },
    {
      title: "The ring of fire",
      line: "When the links snap, the circle they release seals the dark away.",
    },
    {
      title: "The crossing",
      line: "Borne over the seas — beloved guardian of Malaysia and Singapore.",
    },
  ],
};
