import type { Metadata } from "next";
import { forms } from "@/services/karuppu";
import { LandingExperience } from "@/components/landing/LandingExperience";

export const metadata: Metadata = {
  description:
    "A dark, cinematic shrine for Karuppu Swamy — each guardian is a sigil, not a portrait. Open one to see the god.",
};

/**
 * The Threshold (landing). Pure void + blurred fire-haze; the gods appear only
 * as glowing sigils. The roster comes straight from the registry, so lighting a
 * new fire later is a one-line data change.
 */
export default function HomePage() {
  return <LandingExperience forms={forms} />;
}
