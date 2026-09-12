"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BUDGET_BANDS_LAKHS } from "@/lib/constants";
import DeveloperLocationField from "@/components/ui/DeveloperLocationField";
import {
  trackFormStart,
  trackGenerateLead,
} from "@/lib/track-conversion";
import { leadPrefillMessage, studioWaHref } from "@/lib/whatsapp";

const STEPS = [
  { n: 1, label: "Contact" },
  { n: 2, label: "Project" },
  { n: 3, label: "Floor plan" },
] as const;

const FLOOR_PLAN_MAX_BYTES = 10 * 1024 * 1024;

function isAllowedFloorPlan(file: File): string | null {
  const type = (file.type || "").toLowerCase();
  const name = (file.name || "").toLowerCase();
  const byMime =
    type.startsWith("image/") || type === "application/pdf";
  const byExt =
    !type &&
    /\.(pdf|png|jpe?g|webp|gif|heic|heif|bmp|tiff?)$/i.test(name);
  if (!byMime && !byExt) {
    return "Floor plan must be an image (JPG, PNG, etc.) or PDF.";
  }
  if (file.size > FLOOR_PLAN_MAX_BYTES) {
    return "Floor plan must be 10MB or smaller.";
  }
  return null;
}

type Props = {
  source: string;
  studioWhatsapp: string;
  submitLabel?: string;
  utm?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  };
  compact?: boolean;
};

export default function LayoutReviewWizard({
  source,
  studioWhatsapp,
  submitLabel = "Send for layout review",
  utm,
  compact = false,
}: Props) {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [budgetTier, setBudgetTier] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [floorPlan, setFloorPlan] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const formStartFired = useRef(false);
  const router = useRouter();

  const locationId = `lrw-location-${source}`;

  function fireFormStart() {
    if (formStartFired.current) return;
    formStartFired.current = true;
    trackFormStart({ source });
  }

  useEffect(() => {
    if (step === 1) fireFormStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- once on first-step mount
  }, []);

  const fieldClass = compact
    ? "w-full bg-white border border-[var(--border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent-gold-bright)]"
    : "w-full bg-white border border-[var(--border)] px-4 py-3.5 text-sm focus:outline-none focus:border-[var(--accent-gold-bright)] min-h-[48px]";

  const successWaHref = studioWaHref(
    studioWhatsapp,
    leadPrefillMessage({
      name: fullName,
      tier: budgetTier,
    }),
  );

  function readLocation(): string {
    const el = document.getElementById(locationId) as
      | HTMLInputElement
      | HTMLSelectElement
      | null;
    return el?.value?.trim() ?? "";
  }

  function goNext() {
    fireFormStart();
    setErrorMessage(null);
    if (step === 1) {
      if (!fullName.trim() || !whatsapp.trim()) {
        setErrorMessage("Please add your name and WhatsApp number.");
        return;
      }
      setStep(2);
      return;
    }
    if (step === 2) {
      const location = readLocation();
      if (!location || location === "__custom__" || !budgetTier) {
        setErrorMessage("Select developer / location and a budget range.");
        return;
      }
      setStep(3);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fireFormStart();
    if (step !== 3) {
      goNext();
      return;
    }

    setErrorMessage(null);

    if (floorPlan) {
      const fileError = isAllowedFloorPlan(floorPlan);
      if (fileError) {
        setErrorMessage(fileError);
        return;
      }
    }

    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("fullName", fullName.trim());
    formData.set("whatsapp", whatsapp.trim());
    formData.set("budgetTier", budgetTier);
    formData.set("message", message.trim());
    formData.set("source", source);
    if (utm?.utm_source) formData.set("utm_source", utm.utm_source);
    if (utm?.utm_medium) formData.set("utm_medium", utm.utm_medium);
    if (utm?.utm_campaign) formData.set("utm_campaign", utm.utm_campaign);
    if (floorPlan) {
      formData.set("floorPlan", floorPlan);
    } else {
      formData.delete("floorPlan");
    }

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

      trackGenerateLead({
        source,
        hasFloorPlan: Boolean(floorPlan && floorPlan.size > 0),
      });

      if (source === "layout-review") {
        router.push("/layout-review/thanks");
        return;
      }

      setSubmitted(true);
      setFileName(null);
      setFloorPlan(null);
    } catch {
      setErrorMessage(
        "Something went wrong. Please try again or WhatsApp us.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="space-y-5 text-center py-4">
        <p className="font-serif text-2xl text-[var(--text-primary)]">
          Received. Usually same-day WhatsApp.
        </p>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          We will review your details and message you on WhatsApp with layout
          notes and a realistic budget band.
        </p>
        <a
          href={successWaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full border-2 border-[#25D366] text-[#128C7E] bg-[#25D366]/10 px-5 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-[#25D366]/20 transition-colors min-h-[48px]"
        >
          Message the studio on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <input
        type="text"
        name="website_url"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
        defaultValue=""
      />
      <div className="flex items-center gap-2 mb-2">
        {STEPS.map((s) => (
          <div key={s.n} className="flex-1">
            <div
              className={`h-1 ${
                s.n <= step
                  ? "bg-[var(--accent-gold-bright)]"
                  : "bg-[var(--border)]"
              }`}
            />
            <p
              className={`mt-2 text-[10px] uppercase tracking-widest font-semibold ${
                s.n === step
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)]"
              }`}
            >
              {s.n}. {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Keep all steps mounted so location/file state survives */}
      <div className={step === 1 ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "hidden"}>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Full name *
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => {
              fireFormStart();
              setFullName(e.target.value);
            }}
            className={fieldClass}
            autoComplete="name"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            WhatsApp *
          </label>
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => {
              fireFormStart();
              setWhatsapp(e.target.value);
            }}
            className={fieldClass}
            placeholder="91…"
            autoComplete="tel"
          />
        </div>
      </div>

      <div className={step === 2 ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "hidden"}>
        <DeveloperLocationField
          id={locationId}
          label="Developer & location"
          required={false}
        />
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Total budget (approx.) *
          </label>
          <select
            name="budgetTierSelect"
            value={budgetTier}
            onChange={(e) => setBudgetTier(e.target.value)}
            className={fieldClass}
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

      <div className={step === 3 ? "space-y-5" : "hidden"}>
        <div>
          <span className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Builder floor plan
          </span>
          <label className="border-2 border-dashed border-[var(--accent-gold)]/40 bg-[var(--surface)] p-8 text-center hover:border-[var(--accent-gold-bright)] transition-colors cursor-pointer relative block min-h-[120px] flex flex-col justify-center">
            <input
              type="file"
              name="floorPlan"
              className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
              accept=".pdf,.png,.jpg,.jpeg,image/*,application/pdf"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                if (file) {
                  const fileError = isAllowedFloorPlan(file);
                  if (fileError) {
                    setFloorPlan(null);
                    setFileName(null);
                    setErrorMessage(fileError);
                    e.target.value = "";
                    return;
                  }
                }
                setFloorPlan(file);
                setFileName(file?.name ?? null);
                setErrorMessage(null);
              }}
            />
            <span className="pointer-events-none font-serif text-xl block mb-1">
              {fileName ?? "Upload your builder floor plan"}
            </span>
            <span className="pointer-events-none text-xs text-[var(--text-secondary)]">
              {fileName ? "Click to replace" : "PDF or image · max 10MB"}
            </span>
          </label>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Anything we should know
          </label>
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className={fieldClass}
            placeholder="Possession date, rooms to prioritise…"
          />
        </div>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="border border-red-600 bg-red-50 text-red-800 px-4 py-3 text-sm"
        >
          {errorMessage}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        {step > 1 && (
          <button
            type="button"
            onClick={() => {
              setErrorMessage(null);
              setStep((s) => s - 1);
            }}
            className="btn-secondary min-h-[48px] sm:w-auto"
          >
            Back
          </button>
        )}
        {step < 3 ? (
          <button
            type="button"
            onClick={goNext}
            className="w-full btn-primary min-h-[52px] text-sm"
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary min-h-[52px] text-sm disabled:opacity-60"
          >
            {isSubmitting ? "Submitting…" : submitLabel}
          </button>
        )}
      </div>

      <p className="text-center text-xs text-[var(--text-secondary)]">
        Free · Usually same-day WhatsApp · Chennai flats
      </p>
    </form>
  );
}
