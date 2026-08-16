// src/components/sections/EvaluationFormSection.tsx
"use client";

import { useState } from "react";

export default function EvaluationFormSection() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitted(false);
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

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
            `Transmission failed (${response.status} ${response.statusText})`,
        );
        return;
      }

      setSubmitted(true);
      form.reset();
      setFileName(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Transmission failed";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="apply" className="py-24 bg-[#FBFBFA] border-t border-[#E2E2DF]">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7D6E5D] mb-4">
            <span className="w-6 h-px bg-[#7D6E5D]"></span>
            Final Step
            <span className="w-6 h-px bg-[#7D6E5D]"></span>
          </div>
          <h2 className="text-4xl font-serif text-[#1A1A1A] mb-4">Apply For Spatial Analysis.</h2>
          <p className="text-[#6A6A66] max-w-2xl mx-auto">
            We take on a limited number of residential projects per quarter to ensure our founders remain directly involved in every visualization and site execution. Submit your layout for review.
          </p>
        </div>

        <div className="bg-[#F4F4F2] p-8 md:p-12 border border-[#E2E2DF]">
          <form className="space-y-8" onSubmit={handleSubmit}>
            
            {/* Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="full-name" className="block text-xs uppercase tracking-widest text-[#6A6A66] mb-2 font-semibold">Full Name *</label>
                <input 
                  id="full-name"
                  name="fullName"
                  type="text" 
                  className="w-full bg-[#FBFBFA] border border-[#E2E2DF] text-[#1A1A1A] px-4 py-3 text-sm focus:outline-none focus:border-[#7D6E5D]"
                  required
                />
              </div>
              <div>
                <label htmlFor="whatsapp" className="block text-xs uppercase tracking-widest text-[#6A6A66] mb-2 font-semibold">WhatsApp Number *</label>
                <input 
                  id="whatsapp"
                  name="whatsapp"
                  type="tel" 
                  className="w-full bg-[#FBFBFA] border border-[#E2E2DF] text-[#1A1A1A] px-4 py-3 text-sm focus:outline-none focus:border-[#7D6E5D]"
                  required
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="location" className="block text-xs uppercase tracking-widest text-[#6A6A66] mb-2 font-semibold">Developer & Location *</label>
                <input 
                  id="location"
                  name="location"
                  type="text" 
                  placeholder="e.g. Casagrand Mabelle, ECR"
                  className="w-full bg-[#FBFBFA] border border-[#E2E2DF] text-[#1A1A1A] px-4 py-3 text-sm focus:outline-none focus:border-[#7D6E5D]"
                  required
                />
              </div>
              <div>
                <label htmlFor="budget-tier" className="block text-xs uppercase tracking-widest text-[#6A6A66] mb-2 font-semibold">Target Budget Tier *</label>
                <select 
                  id="budget-tier"
                  name="budgetTier"
                  className="w-full bg-[#FBFBFA] border border-[#E2E2DF] text-[#1A1A1A] px-4 py-3 text-sm focus:outline-none focus:border-[#7D6E5D] appearance-none" 
                  required
                  defaultValue=""
                >
                  <option value="" disabled>Select an investment bracket...</option>
                  <option value="essential">Essential (₹800-₹1100/sqft)</option>
                  <option value="executive">Executive (₹1100-₹1500/sqft)</option>
                  <option value="luxury">Luxury (₹1500-₹1900/sqft)</option>
                </select>
              </div>
            </div>

            {/* The Friction Point: File Upload */}
            <div>
              <span className="block text-xs uppercase tracking-widest text-[#6A6A66] mb-2 font-semibold">Upload Builder Floor Plan (PDF/Image) *</span>
              <label className="border-2 border-dashed border-[#E2E2DF] bg-[#FBFBFA] p-8 text-center hover:border-[#7D6E5D] transition-colors cursor-pointer relative block">
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
                <span className="pointer-events-none text-[#1A1A1A] font-medium block mb-1">
                  {fileName ?? "Click to upload or drag and drop"}
                </span>
                <span className="pointer-events-none text-xs text-[#6A6A66]">
                  {fileName ? "File selected — click to replace" : "Maximum file size: 10MB"}
                </span>
              </label>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="border border-red-600 bg-red-50 text-red-800 px-4 py-3 text-sm whitespace-pre-wrap break-words"
              >
                {errorMessage}
              </div>
            )}

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1A1A1A] text-[#FBFBFA] hover:bg-[#7D6E5D] disabled:opacity-60 disabled:cursor-not-allowed px-8 py-4 text-xs uppercase tracking-widest font-semibold transition-all mt-4"
            >
              {isSubmitting ? "Submitting…" : "Submit Layout For Evaluation"}
            </button>
            <p className="text-center text-xs text-[#6A6A66] italic mt-4">
              {submitted
                ? "Layout received. We will review your submission and respond within 24 hours."
                : "Your data is completely confidential. We will review your layout and respond within 24 hours."}
            </p>
          </form>
        </div>

      </div>
    </section>
  );
}
