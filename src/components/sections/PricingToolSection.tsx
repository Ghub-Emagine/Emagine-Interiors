"use client";

import { useMemo, useState } from "react";
import type { PricingTierMap } from "@/lib/pricing";

export default function PricingToolSection({
  tiers,
}: {
  tiers: PricingTierMap;
}) {
  const keys = useMemo(() => Object.keys(tiers), [tiers]);
  const defaultKey = keys.includes("executive") ? "executive" : keys[0] ?? "";
  const [sqft, setSqft] = useState<number | "">("");
  const [tier, setTier] = useState(defaultKey);
  const [estimate, setEstimate] = useState<{ min: string; max: string } | null>(
    null,
  );
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [emailError, setEmailError] = useState<string | null>(null);

  const calculateEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sqft || sqft < 500 || !tiers[tier]) return;

    const selectedTier = tiers[tier];
    const minLakhs = ((Number(sqft) * selectedTier.min) / 100000).toFixed(2);
    const maxLakhs = ((Number(sqft) * selectedTier.max) / 100000).toFixed(2);

    setEstimate({ min: minLakhs, max: maxLakhs });
    setEmailStatus("idle");
    setEmailError(null);
  };

  const sendEstimateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!estimate || !email.trim() || !tiers[tier]) return;

    setEmailStatus("sending");
    setEmailError(null);

    const formData = new FormData();
    formData.set("intent", "estimate");
    formData.set("source", "pricing-estimate");
    formData.set("website_url", "");
    formData.set("email", email.trim());
    formData.set("sqft", String(sqft));
    formData.set("budgetTier", tiers[tier].name);
    formData.set("estimateMin", estimate.min);
    formData.set("estimateMax", estimate.max);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json().catch(() => null)) as {
        success?: boolean;
        error?: string;
      } | null;

      if (!response.ok) {
        setEmailStatus("error");
        setEmailError(payload?.error ?? "Could not send. Try again.");
        return;
      }

      setEmailStatus("sent");
      setEmail("");
    } catch (err) {
      setEmailStatus("error");
      setEmailError(err instanceof Error ? err.message : "Could not send.");
    }
  };

  if (keys.length === 0) return null;

  return (
    <section
      id="evaluate"
      className="py-24 bg-[var(--text-primary)] text-[var(--background)] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-gold-bright)] mb-6">
            <span className="w-6 h-px bg-[var(--accent-gold-bright)]" />
            Budget in lakhs
          </div>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Know your estimate before you commit.
          </h2>
          <p className="text-white/60 mb-8 text-base leading-relaxed">
            Enter your carpet/built-up size and finish grade. We return a total
            range in lakhs—the way homeowners actually decide.
          </p>

          <ul className="space-y-4 text-sm text-white/75">
            {keys.map((key) => (
              <li key={key} className="flex items-start gap-3">
                <span className="text-[var(--accent-gold-bright)]">▸</span>
                <span>
                  <strong className="text-white">{tiers[key].name}</strong> · ₹
                  {tiers[key].min.toLocaleString("en-IN")}–
                  {tiers[key].max.toLocaleString("en-IN")}/sqft
                  <span className="block text-white/45 mt-0.5">
                    {tiers[key].desc}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#2A2A2A] p-8 border border-[#3A3A3A]">
          {!estimate ? (
            <form onSubmit={calculateEstimate} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
                  Total Square Footage
                </label>
                <input
                  type="number"
                  value={sqft}
                  onChange={(e) =>
                    setSqft(e.target.value ? Number(e.target.value) : "")
                  }
                  placeholder="e.g. 1250"
                  className="w-full bg-[var(--text-primary)] border border-[#3A3A3A] text-[var(--background)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent-gold-bright)] transition-colors"
                  required
                  min={500}
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
                  Execution Tier
                </label>
                <div
                  className={`grid gap-2 ${
                    keys.length === 3 ? "grid-cols-3" : "grid-cols-2"
                  }`}
                >
                  {keys.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTier(t)}
                      className={`py-3 text-xs uppercase tracking-widest font-semibold border transition-all ${
                        tier === t
                          ? "bg-[var(--accent-gold-bright)] text-[var(--text-primary)] border-[var(--accent-gold-bright)]"
                          : "bg-[var(--text-primary)] text-[var(--text-secondary)] border-[#3A3A3A] hover:border-[var(--text-secondary)]"
                      }`}
                    >
                      {tiers[t].name}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full btn-primary mt-4">
                Calculate range in lakhs
              </button>
            </form>
          ) : (
            <div className="text-center py-6">
              <span className="block text-xs uppercase tracking-widest text-[var(--accent-gold-bright)] mb-4 font-semibold">
                Estimated Investment
              </span>
              <div className="text-4xl md:text-5xl font-serif text-[var(--background)] mb-2">
                ₹{estimate.min} L — ₹{estimate.max} L
              </div>
              <p className="text-[var(--text-secondary)] text-xs uppercase tracking-widest mb-8">
                Exclusive of 18% GST
              </p>

              <div className="bg-[var(--text-primary)] p-6 border border-[#3A3A3A] text-left">
                <p className="text-sm text-[var(--border)] mb-4">
                  Want the room-by-room breakdown? Enter your email and we&apos;ll
                  send the itemized spreadsheet.
                </p>
                {emailStatus === "sent" ? (
                  <p className="text-sm text-[var(--accent-gold-bright)]">
                    Sent. Check your inbox shortly.
                  </p>
                ) : (
                  <form onSubmit={sendEstimateEmail} className="flex gap-2">
                    <input
                      type="text"
                      name="website_url"
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden
                      defaultValue=""
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full bg-[#2A2A2A] border border-[#3A3A3A] text-[var(--background)] px-4 py-2 text-sm focus:outline-none focus:border-[var(--accent-gold-bright)]"
                    />
                    <button
                      type="submit"
                      disabled={emailStatus === "sending"}
                      className="bg-[var(--accent-gold-bright)] text-[var(--text-primary)] px-6 text-xs uppercase font-semibold tracking-widest hover:bg-[var(--background)] transition-colors disabled:opacity-60"
                    >
                      {emailStatus === "sending" ? "…" : "Send"}
                    </button>
                  </form>
                )}
                {emailError && (
                  <p className="mt-2 text-xs text-red-400">{emailError}</p>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  setEstimate(null);
                  setEmailStatus("idle");
                  setEmailError(null);
                }}
                className="mt-6 text-xs text-[var(--text-secondary)] uppercase tracking-widest hover:text-[var(--border)] transition-colors underline underline-offset-4"
              >
                Recalculate
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
