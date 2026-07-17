import type { KaruppuForm } from "../types";

/** 06 · Vettai Karuppu — the divine hunter. */
export const vettai: KaruppuForm = {
  id: "vettai",
  num: "06",
  name: "Vettai Karuppu",
  tamil: "வேட்டை கருப்பு",
  epithet: "The divine hunter",
  region: "Tamil Nadu",
  image: "/img/forms/vettai.webp",
  veil: "/img/veil/vettai.webp",
  description:
    "The hunter of the night, lean and fierce, who runs down evil with his hunting dog (vettai naai) at his heel and a bow of cold light in hand. His is the spectral grey of moonlit mist and cremation-ground ash.",
  act: "Strides through moonlit mist tracking a fleeing shadow, then looses a bow of cold light to pin it as the hound lunges.",
  verify: true,
  // His room is MOONLIT MIST — pale teal in the dark; fireflies blink, eyes glint.
  theme: {
    accent: "#5fd0b4",
    glow: "rgba(95, 208, 180, 0.16)",
    atmosphere: "hunt",
    element: "moonlit mist",
  },
  aspects: [
    {
      title: "The hound",
      line: "The vettai naai runs at his heel, and nothing outruns them both.",
    },
    {
      title: "The bow",
      line: "Cold light drawn, loosed, and pinned — the hunt ends where he aims.",
    },
    {
      title: "The mist",
      line: "Moonlit grey and cremation-ground ash; the hunt is silent.",
    },
  ],
};
