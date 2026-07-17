"use client";

import { signIn } from "next-auth/react";
import { RitualDivider } from "@/components/ui/RitualDivider";

export function GoogleLoginCard({ configured }: { configured: boolean }) {
  return (
    <section className="relative isolate mx-auto flex min-h-dvh w-full max-w-7xl items-center overflow-hidden px-6 py-10 sm:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(231,227,218,0.14),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(231,227,218,0.08),transparent_28%),radial-gradient(circle_at_50%_85%,rgba(231,227,218,0.06),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.02),transparent_70%)]"
      />
      <div className="relative grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="relative flex flex-col justify-center">
          <div className="absolute -left-10 top-0 hidden h-48 w-48 rounded-full border border-sacred/8 bg-sacred/[0.02] blur-2xl lg:block" />
          <p className="font-mono text-[11px] uppercase tracking-[0.45em] text-sacred/38">
            {configured ? "Sacred access gate" : "Local preview mode"}
          </p>
          <h1 className="mt-5 max-w-xl font-display text-4xl font-semibold tracking-[0.08em] text-sacred sm:text-5xl lg:text-7xl">
            {configured
              ? "Enter Karuppa through a verified Google identity."
              : "The shrine is open while sign-in is unconfigured."}
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-sacred/68 sm:text-xl">
            {configured
              ? "The login gate uses one verified Google account, then returns directly to the landing page."
              : "Public pages stay available in a fresh checkout. Add the Google and NextAuth variables when this project needs controlled access."}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-sacred/14 bg-sacred/[0.03] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-sacred/55">
              {configured ? "Protected shrine" : "Public preview"}
            </span>
            <span className="inline-flex items-center rounded-full border border-sacred/14 bg-sacred/[0.03] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-sacred/55">
              Instant redirect
            </span>
            <span className="inline-flex items-center rounded-full border border-sacred/14 bg-sacred/[0.03] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-sacred/55">
              {configured ? "No guest mode" : "Auth optional"}
            </span>
          </div>

          <div className="mt-10 max-w-2xl">
            <RitualDivider className="px-0" />
          </div>

          <p className="mt-8 max-w-xl text-sm leading-relaxed text-sacred/42">
            {configured ? (
              <>
                After login, you return to <span className="text-sacred">/</span>.
                Google is used only as the gatekeeper for access.
              </>
            ) : (
              <>
                The public experience remains available at{" "}
                <span className="text-sacred">/</span>.
              </>
            )}
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[2rem] border border-sacred/10 bg-sacred/[0.03] blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-sacred/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_80px_-36px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-8">
            <div className="absolute right-4 top-4 h-24 w-24 rounded-full border border-sacred/10 bg-sacred/[0.02] blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-sacred/34">
                  Entry card
                </p>
                <span className="rounded-sm border border-sacred/18 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-sacred/55">
                  {configured ? "Secure" : "Preview"}
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <h2 className="font-display text-2xl font-semibold tracking-[0.08em] text-sacred sm:text-3xl">
                  {configured ? "Sign in to unlock the shrine." : "Sign-in is ready to configure."}
                </h2>
                <p className="max-w-md text-sm leading-relaxed text-sacred/58">
                  {configured
                    ? "Your Google account becomes the key. The rest of the site stays sealed until sign-in completes."
                    : "Use the environment-variable template to enable Google access without changing this interface."}
                </p>
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-sacred/10 bg-void/40 p-4">
                <button
                  type="button"
                  onClick={() =>
                    configured && signIn("google", { callbackUrl: "/" })
                  }
                  disabled={!configured}
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-sacred/14 bg-void px-5 py-3.5 text-left text-sacred transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone hover:shadow-[0_18px_50px_-28px_rgba(0,0,0,0.85)] focus:outline-none focus:ring-2 focus:ring-sacred/50 focus:ring-offset-0"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sacred/5 ring-1 ring-inset ring-sacred/10">
                    <GoogleGlyph />
                  </span>
                  <span className="flex flex-1 flex-col items-start">
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-sacred/45">
                      Continue with
                    </span>
                    <span className="font-display text-lg font-semibold tracking-[0.08em] text-sacred">
                      {configured ? "Google" : "Google sign-in not configured"}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="text-sacred/45 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </button>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <InfoTile label="Gate" value={configured ? "Required" : "Inactive"} />
                <InfoTile label="Session" value="Secure" />
                <InfoTile label="Return" value="Landing page" />
              </div>

              <p className="mt-5 text-center text-xs leading-relaxed text-sacred/38">
                {configured
                  ? "We only ask Google to verify identity and authorize entry."
                  : "Add the Google and NextAuth variables from .env.example to enable this gate."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4.5 w-4.5">
      <path fill="#EA4335" d="M12 10.2v3.95h5.61c-.25 1.31-1 2.42-2.11 3.16l3.42 2.66c2-1.85 3.15-4.58 3.15-7.81 0-.75-.07-1.48-.2-2.17H12z" />
      <path fill="#34A853" d="M6.55 14.27l-.72.55-2.54 1.98C4.9 20.19 8.11 22 12 22c2.69 0 4.95-.89 6.59-2.41l-3.42-2.66c-.94.63-2.14 1.01-3.17 1.01-2.43 0-4.49-1.64-5.22-3.87z" />
      <path fill="#4A90E2" d="M3.29 7.77A9.96 9.96 0 0 0 2 12c0 1.53.37 2.97 1.02 4.2l3.57-2.76A6.02 6.02 0 0 1 6.3 12c0-.69.12-1.36.29-1.84L3.29 7.77z" />
      <path fill="#FBBC05" d="M12 5.98c1.47 0 2.79.51 3.83 1.5l2.87-2.87C16.93 2.95 14.69 2 12 2 8.11 2 4.9 3.81 3.29 7.77l3.3 2.39C7.48 7.62 9.54 5.98 12 5.98z" />
    </svg>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-sacred/10 bg-sacred/[0.03] px-4 py-3">
      <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-sacred/34">
        {label}
      </p>
      <p className="mt-1 font-display text-sm tracking-[0.08em] text-sacred">
        {value}
      </p>
    </div>
  );
}
