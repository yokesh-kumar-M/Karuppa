"use client";

import { useEffect, useRef, useState } from "react";
import { Lamp } from "@/components/icons";

/**
 * Opt-in devotional ambience — a temple-bell strike and a low tanpura-like drone,
 * synthesised live with the Web Audio API (no audio files shipped, nothing
 * autoplays). Off until the visitor lights the lamp; a clear toggle silences it.
 */
export function AmbientSound() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const voicesRef = useRef<OscillatorNode[]>([]);

  const startDrone = (ctx: AudioContext) => {
    const master = ctx.createGain();
    master.gain.value = 0.0001;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 640;
    lp.Q.value = 0.6;
    master.connect(lp).connect(ctx.destination);
    masterRef.current = master;

    // Tonic + fifth + sub-octave — a slow, grounding drone bed.
    const voices: { f: number; type: OscillatorType; g: number }[] = [
      { f: 110.0, type: "sine", g: 0.5 },
      { f: 164.81, type: "sine", g: 0.3 },
      { f: 55.0, type: "triangle", g: 0.5 },
    ];
    voices.forEach((v, i) => {
      const osc = ctx.createOscillator();
      osc.type = v.type;
      osc.frequency.value = v.f;
      osc.detune.value = (i - 1) * 4;
      const g = ctx.createGain();
      g.gain.value = v.g;
      osc.connect(g).connect(master);
      osc.start();
      voicesRef.current.push(osc);
    });

    // Breathing LFO on the master gain.
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.12;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.022;
    lfo.connect(lfoGain).connect(master.gain);
    lfo.start();
    voicesRef.current.push(lfo);

    master.gain.exponentialRampToValueAtTime(0.07, ctx.currentTime + 2.4);
  };

  const strikeBell = (ctx: AudioContext) => {
    const now = ctx.currentTime;
    const out = ctx.createGain();
    out.gain.value = 0.6;
    out.connect(ctx.destination);
    // Inharmonic partials → a bell-like temple chime.
    const f0 = 523.25;
    [
      { r: 1, g: 0.6, d: 3.4 },
      { r: 2.0, g: 0.3, d: 2.6 },
      { r: 2.76, g: 0.18, d: 2.0 },
      { r: 4.07, g: 0.1, d: 1.4 },
    ].forEach((p) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = f0 * p.r;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, now);
      g.gain.linearRampToValueAtTime(p.g, now + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, now + p.d);
      osc.connect(g).connect(out);
      osc.start(now);
      osc.stop(now + p.d + 0.1);
    });
  };

  const enable = async () => {
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = ctxRef.current ?? new Ctx();
      ctxRef.current = ctx;
      if (ctx.state === "suspended") await ctx.resume();
      strikeBell(ctx);
      startDrone(ctx);
      setOn(true);
    } catch {
      /* Web Audio unavailable — fail silently. */
    }
  };

  const disable = () => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (ctx && master) {
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), now);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 1);
      window.setTimeout(() => {
        voicesRef.current.forEach((o) => {
          try {
            o.stop();
          } catch {
            /* already stopped */
          }
        });
        voicesRef.current = [];
        masterRef.current = null;
      }, 1100);
    }
    setOn(false);
  };

  useEffect(
    () => () => {
      try {
        ctxRef.current?.close();
      } catch {
        /* noop */
      }
    },
    []
  );

  return (
    <button
      type="button"
      onClick={() => (on ? disable() : enable())}
      aria-pressed={on}
      aria-label={on ? "Mute ambient sound" : "Play ambient sound"}
      title={on ? "Mute ambient sound" : "Play ambient sound"}
      className="ambient-sound group fixed z-[70] flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-sacred/20 bg-void/80 p-2.5 backdrop-blur-md transition-colors hover:border-accent/60 focus-visible:ring-2 focus-visible:ring-accent sm:min-w-0 sm:justify-start sm:px-3.5 sm:py-2"
    >
      <span className={on ? "text-accent" : "text-sacred/55"}>
        <Lamp lit={on} className="h-5 w-5" />
      </span>
      <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-sacred/66 sm:inline">
        {on ? "Sound on" : "Sound off"}
      </span>
    </button>
  );
}
