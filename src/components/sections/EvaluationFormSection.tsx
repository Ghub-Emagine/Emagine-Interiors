"use client";

import Link from "next/link";
import type { PageCopyItem } from "@/lib/page-copy-slots";
import { copyField, copyMeta } from "@/lib/page-copy-slots";
import { pageMedia, type PageMedia } from "@/lib/page-image-slots";
import SlotMedia from "@/components/ui/SlotMedia";
import LayoutReviewWizard from "@/components/forms/LayoutReviewWizard";
import { trackContactClick } from "@/lib/track-conversion";

export default function EvaluationFormSection({
  whatsapp,
  copy,
  images,
}: {
  whatsapp: string;
  copy: Record<string, PageCopyItem>;
  images: Record<string, PageMedia>;
}) {
  const whatsappHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    "Hi Emagine - I'd like a layout review for my Chennai flat.",
  )}`;

  const eyebrow = copyMeta(copy, "form_section", "eyebrow", "Free layout review");
  const title = copyField(
    copy,
    "form_section",
    "title",
    "Send your floor plan. We will WhatsApp what to watch for.",
  );
  const body = copyField(
    copy,
    "form_section",
    "body",
    "Upload your builder floor plan and details. Get practical notes on light, storage, and flow, plus a realistic budget band in lakhs.",
  );
  const chip1 = copyMeta(copy, "form_section", "chip_1", "Pre-possession flats");
  const chip2 = copyMeta(copy, "form_section", "chip_2", "Limited reviews / week");
  const chip3 = copyMeta(copy, "form_section", "chip_3", "Chennai studio");
  const submitLabel = copyMeta(
    copy,
    "form_section",
    "submit_label",
    "Send for layout review",
  );
  const bg = pageMedia(images, "home_closing");

  return (
    <section
      id="apply"
      className="scroll-mt-28 relative overflow-hidden border-t border-[var(--border)]"
    >
      <SlotMedia
        url={bg.url}
        mediaType={bg.media_type}
        imgClassName="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0 bg-[var(--text-primary)]/88"
        aria-hidden
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="mb-10 md:mb-12 max-w-2xl text-[#FBFBFA]">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold-bright)] mb-3 font-semibold">
            {eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight mb-4">
            {title}
          </h2>
          <p className="text-[#FBFBFA]/75 leading-relaxed text-base md:text-lg">
            {body}
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-widest font-semibold text-[#FBFBFA]/85">
            {[chip1, chip2, chip3].map((chip) => (
              <span
                key={chip}
                className="border border-white/25 bg-white/5 px-3 py-2"
              >
                {chip}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-[var(--accent-gold-bright)] font-medium">
            Free · Usually same-day WhatsApp
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <aside className="lg:col-span-4 space-y-4">
            <div className="border border-white/15 bg-white/5 backdrop-blur-sm p-6 text-[#FBFBFA]">
              <p className="text-xs uppercase tracking-widest text-[var(--accent-gold-bright)] mb-4 font-semibold">
                What to expect
              </p>
              <ol className="space-y-4 text-sm text-[#FBFBFA]/80">
                <li className="flex gap-3">
                  <span className="font-serif text-2xl text-[var(--accent-gold-bright)] leading-none">
                    1
                  </span>
                  Same-day WhatsApp when we can
                </li>
                <li className="flex gap-3">
                  <span className="font-serif text-2xl text-[var(--accent-gold-bright)] leading-none">
                    2
                  </span>
                  Layout notes + budget in lakhs
                </li>
                <li className="flex gap-3">
                  <span className="font-serif text-2xl text-[var(--accent-gold-bright)] leading-none">
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
              onClick={() => trackContactClick("whatsapp")}
              className="flex items-center justify-center gap-2 w-full border-2 border-[#25D366] text-white bg-[#25D366]/20 px-5 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-[#25D366]/35 transition-colors min-h-[48px]"
            >
              Prefer WhatsApp first →
            </a>
            <p className="text-xs text-[#FBFBFA]/60">
              Prefer the ads landing page?{" "}
              <Link
                href="/layout-review"
                className="text-[var(--accent-gold-bright)] underline"
              >
                Free layout review
              </Link>
              .
            </p>
          </aside>

          <div className="lg:col-span-8 border border-white/10 bg-[var(--background)] p-6 md:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
            <LayoutReviewWizard
              source="home-form"
              studioWhatsapp={whatsapp}
              submitLabel={submitLabel}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
