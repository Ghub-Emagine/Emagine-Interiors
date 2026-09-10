"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BRAND_INFO, BUDGET_BANDS_LAKHS } from "@/lib/constants";
import DeveloperLocationField from "@/components/ui/DeveloperLocationField";

export default function LayoutReviewForm() {
  const searchParams = useSearchParams();
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const utm = useMemo(
    () => ({
      utm_source: searchParams.get("utm_source") ?? "",
      utm_medium: searchParams.get("utm_medium") ?? "",
      utm_campaign: searchParams.get("utm_campaign") ?? "",
    }),
    [searchParams],
  );

  const whatsappHref = useMemo(() => {
    const text = encodeURIComponent(
      "Hi Emagine — I'd like a free layout review for my Chennai flat.",
    );
    return `https://wa.me/${BRAND_INFO.contact.whatsapp}?text=${text}`;
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitted(false);
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("source", "layout-review");
    formData.set("utm_source", utm.utm_source);
    formData.set("utm_medium", utm.utm_medium);
    formData.set("utm_campaign", utm.utm_campaign);

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
        setErrorMessage(payload?.error ?? "Could not submit. Try again.");
        return;
      }

      setSubmitted(true);
      form.reset();
      setFileName(null);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Could not submit.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Full name *
          </label>
          <input
            name="fullName"
            required
            className="w-full bg-white border border-[var(--border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent-gold-bright)]"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            WhatsApp *
          </label>
          <input
            name="whatsapp"
            required
            placeholder="91…"
            className="w-full bg-white border border-[var(--border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent-gold-bright)]"
          />
        </div>
        <DeveloperLocationField />
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Total budget (approx.) *
          </label>
          <select
            name="budgetTier"
            required
            defaultValue=""
            className="w-full bg-white border border-[var(--border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent-gold-bright)]"
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
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Floor plan PDF (optional)
          </label>
          <input
            name="floorPlan"
            type="file"
            accept=".pdf,image/*"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
            className="w-full text-sm"
          />
          {fileName && (
            <p className="text-xs text-[var(--text-secondary)] mt-1">{fileName}</p>
          )}
        </div>

        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        {submitted && (
          <p className="text-sm text-[var(--accent-gold)]">
            Received. We&apos;ll WhatsApp you shortly.
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary disabled:opacity-60"
        >
          {isSubmitting ? "Sending…" : "Request free layout review"}
        </button>

        <p className="text-center text-xs text-[var(--text-secondary)]">
          Usually reply same day on WhatsApp · Chennai flats
        </p>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-xs uppercase tracking-widest font-semibold text-[var(--accent-gold)] hover:text-[var(--text-primary)] transition-colors"
        >
          Prefer WhatsApp? Message us now
        </a>
      </form>
    </>
  );
}
