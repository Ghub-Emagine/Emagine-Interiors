import type { Metadata } from "next";
import Link from "next/link";
import BrandMark from "@/components/layout/BrandMark";
import { getSiteSettings, brandFromSettings } from "@/lib/site-settings";
import { studioWaHref } from "@/lib/whatsapp";

const LAYOUT_REVIEW_HREF =
  "/layout-review?utm_source=partner&utm_campaign=partner";

const partnerPoints = [
  {
    title: "Layout-first for your buyers",
    detail:
      "We review builder floor plans for light, flow, and storage—before anyone locks a kitchen vendor or pays a big advance.",
  },
  {
    title: "Clear ₹/sqft bands",
    detail:
      "Essential, Executive, and Luxury ranges your clients can compare against showroom quotes—without a sales-centre visit.",
  },
  {
    title: "Same-day WhatsApp",
    detail:
      "Buyers get layout notes and a realistic budget band on WhatsApp. You stay in the loop as the introducer.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const brand = brandFromSettings(settings);
  return {
    title: `Partner with ${brand.name}`,
    description:
      "Brokers and builders: introduce Chennai flat buyers to Emagine for free layout reviews, transparent ₹/sqft, and same-day WhatsApp guidance.",
  };
}

export default async function PartnersPage() {
  const settings = await getSiteSettings();
  const brand = brandFromSettings(settings);
  const waHref = studioWaHref(
    brand.contact.whatsapp,
    "Hi Emagine — I'm a broker/builder partner interested in referring Chennai flat buyers for layout reviews.",
  );

  return (
    <div className="bg-[var(--background)] text-[var(--text-primary)] min-h-screen">
      <section className="relative overflow-hidden border-b border-[var(--border)]">
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

        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-8">
          <BrandMark variant="onLight" size="hero" withStudio priority />

          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--accent-gold)] font-semibold">
              Partners · Brokers & builders
            </p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] leading-snug font-medium">
              Send buyers a clearer start on interiors
            </h1>
            <p className="text-[var(--text-secondary)] text-base leading-relaxed max-w-xl">
              {brand.name} helps Chennai flat buyers read their builder plan and
              get a realistic budget band—so your introductions turn into
              confident next steps, not showroom runaround.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border-2 border-[#25D366] text-[#128C7E] bg-[#25D366]/10 px-6 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-[#25D366]/20 transition-colors min-h-[48px]"
            >
              WhatsApp the studio
            </a>
            <Link
              href={LAYOUT_REVIEW_HREF}
              className="btn-primary inline-flex items-center justify-center min-h-[48px]"
            >
              Share free layout review
            </Link>
          </div>
        </div>
      </section>

      <section className="atmosphere py-16 md:py-20 border-b border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-3">
            How partnership works
          </p>
          <h2 className="font-serif text-2xl md:text-3xl mb-4">
            Built for channel partners, not cold leads
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-10 max-w-xl">
            Whether you sell inventory at Casagrand, Appaswamy, Akshaya, SPR
            City, or another premium Chennai site—introduce buyers when they ask
            about kitchens, wardrobes, or full-home work.
          </p>

          <ul className="space-y-8">
            {partnerPoints.map((point) => (
              <li key={point.title} className="border-t border-[var(--border)] pt-6">
                <h3 className="font-serif text-xl md:text-2xl mb-2">
                  {point.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl">
                  {point.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <h2 className="font-serif text-2xl md:text-3xl mb-3">
            Ready to introduce a buyer?
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-8 max-w-xl">
            Message us on WhatsApp with your name and project, or send buyers
            straight to a free layout review—tracked as a partner referral.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border-2 border-[#25D366] text-[#128C7E] bg-[#25D366]/10 px-6 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-[#25D366]/20 transition-colors min-h-[48px]"
            >
              Partner WhatsApp
            </a>
            <Link
              href={LAYOUT_REVIEW_HREF}
              className="btn-secondary inline-flex items-center justify-center min-h-[48px]"
            >
              Open layout review link
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
