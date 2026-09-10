"use client";

import { useState } from "react";
import Link from "next/link";
import { BRAND_INFO, BUDGET_BANDS_LAKHS } from "@/lib/constants";
import DeveloperLocationField from "@/components/ui/DeveloperLocationField";

export default function EvaluationFormSection() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const whatsappHref = `https://wa.me/${BRAND_INFO.contact.whatsapp}?text=${encodeURIComponent(
    "Hi Emagine — I'd like a layout review for my Chennai flat.",
  )}`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitted(false);
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("source", "home-form");

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
        setErrorMessage(
          payload?.error ??
            "Something went wrong. Please try again or WhatsApp us.",
        );
        return;
      }

      setSubmitted(true);
      form.reset();
      setFileName(null);
    } catch {
      setErrorMessage(
        "Something went wrong. Please try again or WhatsApp us.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="apply"
      className="scroll-mt-20 py-20 md:py-28 border-t border-[var(--border)] relative overflow-hidden"
    >
      {/* Blueprint-style atmosphere — distinct from closing CTA photo band */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundColor: "var(--surface)",
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
      <div
        className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[var(--accent-gold-bright)]/10 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-10 md:mb-12 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-3">
            Free layout review
          </p>
          <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-4">
            Send your floor plan. We&apos;ll WhatsApp what to watch for.
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Attach your builder plan—get practical notes on light, storage, and
            flow, plus a realistic budget band in lakhs.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-[10px] uppercase tracking-widest font-semibold text-[var(--text-secondary)]">
            <span className="border border-[var(--border)] bg-[var(--background)] px-3 py-1.5">
              Pre-possession flats
            </span>
            <span className="border border-[var(--border)] bg-[var(--background)] px-3 py-1.5">
              Limited reviews / week
            </span>
            <span className="border border-[var(--border)] bg-[var(--background)] px-3 py-1.5">
              Chennai studio
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <aside className="lg:col-span-4 space-y-4">
            <div className="border border-[var(--border)] bg-[var(--background)] p-6">
              <p className="text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-3 font-semibold">
                What to expect
              </p>
              <ol className="space-y-4 text-sm text-[var(--text-secondary)]">
                <li className="flex gap-3">
                  <span className="font-serif text-xl text-[var(--accent-gold-bright)] leading-none">
                    1
                  </span>
                  Same-day WhatsApp when we can
                </li>
                <li className="flex gap-3">
                  <span className="font-serif text-xl text-[var(--accent-gold-bright)] leading-none">
                    2
                  </span>
                  Layout notes + budget in lakhs
                </li>
                <li className="flex gap-3">
                  <span className="font-serif text-xl text-[var(--accent-gold-bright)] leading-none">
                    3
                  </span>
                  3D design if you move ahead
                </li>
              </ol>
            </div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full border-2 border-[#25D366] text-[#128C7E] bg-[#25D366]/10 px-5 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-[#25D366]/20 transition-colors"
            >
              Prefer WhatsApp first →
            </a>
            <p className="text-xs text-[var(--text-secondary)]">
              Want a shorter form?{" "}
              <Link href="/layout-review" className="text-[var(--accent-gold)] underline">
                Request a free review
              </Link>
              .
            </p>
          </aside>

          <div className="lg:col-span-8 border border-[var(--border)] bg-[var(--background)] p-6 md:p-10 shadow-[0_24px_60px_rgba(18,17,15,0.08)]">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="full-name"
                    className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold"
                  >
                    Full name *
                  </label>
                  <input
                    id="full-name"
                    name="fullName"
                    type="text"
                    className="w-full bg-white border border-[var(--border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent-gold-bright)]"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="whatsapp"
                    className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold"
                  >
                    WhatsApp *
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    className="w-full bg-white border border-[var(--border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent-gold-bright)]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DeveloperLocationField label="Developer & location" />
                <div>
                  <label
                    htmlFor="budget-tier"
                    className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold"
                  >
                    Total budget (approx.) *
                  </label>
                  <select
                    id="budget-tier"
                    name="budgetTier"
                    className="w-full bg-white border border-[var(--border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent-gold-bright)]"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select range in lakhs
                    </option>
                    {BUDGET_BANDS_LAKHS.map((b) => (
                      <option key={b.value} value={b.label}>
                        {b.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <span className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
                  Builder floor plan (PDF / image) *
                </span>
                <label className="border-2 border-dashed border-[var(--accent-gold)]/40 bg-[var(--surface)] p-8 text-center hover:border-[var(--accent-gold-bright)] transition-colors cursor-pointer relative block">
                  <input
                    type="file"
                    name="floorPlan"
                    className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
                    required
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={(e) => {
                      const file = e.target.files?.[0] ?? null;
                      setFileName(file?.name ?? null);
                      setSubmitted(false);
                      setErrorMessage(null);
                    }}
                  />
                  <span className="pointer-events-none font-serif text-xl block mb-1">
                    {fileName ?? "Drop floor plan here"}
                  </span>
                  <span className="pointer-events-none text-xs text-[var(--text-secondary)]">
                    {fileName ? "Click to replace" : "PDF or image · max 10MB"}
                  </span>
                </label>
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  className="border border-red-600 bg-red-50 text-red-800 px-4 py-3 text-sm"
                >
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-60"
              >
                {isSubmitting ? "Submitting…" : "Send for layout review"}
              </button>
              <p className="text-center text-xs text-[var(--text-secondary)]">
                {submitted
                  ? "Received. We’ll WhatsApp you shortly."
                  : "Limited reviews / week · Chennai flats"}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
