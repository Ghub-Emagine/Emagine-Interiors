import type { Metadata } from "next";
import Link from "next/link";
import BrandMark from "@/components/layout/BrandMark";
import { getSiteSettings, brandFromSettings } from "@/lib/site-settings";
import { leadPrefillMessage, studioWaHref } from "@/lib/whatsapp";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const brand = brandFromSettings(settings);
  return {
    title: `Request received | ${brand.name}`,
    description:
      "Your layout review request is in. Usually same-day WhatsApp from the studio with layout notes and a realistic budget band.",
  };
}

export default async function LayoutReviewThanksPage() {
  const settings = await getSiteSettings();
  const brand = brandFromSettings(settings);
  const whatsapp = brand.contact.whatsapp;
  const waHref = studioWaHref(
    whatsapp,
    `${leadPrefillMessage()} Looking forward to your layout notes and budget band.`,
  );

  return (
    <div className="bg-[var(--background)] text-[var(--text-primary)] min-h-[calc(100vh-5rem)]">
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-[var(--surface)] via-[var(--background)] to-[var(--accent-gold)]/10"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, var(--text-primary) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden
        />

        <div className="relative z-10 max-w-2xl mx-auto px-6 py-16 md:py-24 text-center space-y-8">
          <BrandMark variant="onLight" size="hero" withStudio priority />

          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--accent-gold)] font-semibold">
              Layout review
            </p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] leading-snug font-medium">
              Received. Usually same-day WhatsApp.
            </h1>
            <p className="text-[var(--text-secondary)] text-base leading-relaxed max-w-md mx-auto">
              We will review your details and message you on WhatsApp with
              layout notes and a realistic budget band.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border-2 border-[#25D366] text-[#128C7E] bg-[#25D366]/10 px-6 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-[#25D366]/20 transition-colors min-h-[48px]"
            >
              Message the studio on WhatsApp
            </a>
            <Link href="/portfolio" className="btn-secondary min-h-[48px]">
              Browse portfolio
            </Link>
          </div>

          <p className="pt-4">
            <Link
              href="/"
              className="text-sm text-[var(--text-secondary)] underline underline-offset-4 hover:text-[var(--text-primary)] transition-colors"
            >
              Back to homepage
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
