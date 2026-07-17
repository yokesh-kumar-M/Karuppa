import { FlameMandala } from "@/components/icons";

/**
 * The held breath while a door opens. The sanctums are prerendered, so this is
 * seen only on slow descents — a turning mandala on the void, never a spinner.
 */
export default function SanctumLoading() {
  return (
    <div className="grid min-h-dvh place-items-center bg-void">
      <div className="flex flex-col items-center gap-6">
        <FlameMandala aria-hidden className="slow-spin h-20 w-20 text-accent/55" />
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-sacred/45">
          The door opens
        </p>
      </div>
    </div>
  );
}
