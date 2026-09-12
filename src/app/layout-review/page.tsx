import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { BRAND_INFO } from "@/lib/constants";
import BrandMark from "@/components/layout/BrandMark";
import { getPageImageMap } from "@/lib/cms";
import { pageMedia } from "@/lib/page-image-slots";
import { getSiteSettings, brandFromSettings } from "@/lib/site-settings";
import { normalizeBuilder } from "@/lib/builders";
import SlotMedia from "@/components/ui/SlotMedia";
import LayoutReviewForm from "./LayoutReviewForm";

type Props = {
  searchParams: Promise<{ builder?: string | string[] }>;
};

function builderParam(
  value: string | string[] | undefined,
): string | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const sp = await searchParams;
  const builderName = normalizeBuilder(builderParam(sp.builder));
  const settings = await getSiteSettings();
  const brand = brandFromSettings(settings);

  if (builderName) {
    return {
      title: `Free Layout Review for ${builderName} | ${brand.name}`,
      description: `Free layout review for ${builderName} flats in Chennai — modular & full-home interiors from your builder plan. Transparent ₹/sqft, same-day WhatsApp.`,
    };
  }

  return {
    title: `Free Layout Review | ${brand.name}`,
    description:
      "Free layout review for Chennai flats — modular & full-home interiors from your builder plan. Transparent ₹/sqft, same-day WhatsApp.",
  };
}

const proofPoints = [
  "Casagrand, Appaswamy, Akshaya & premium sites across Chennai",
  "Clear ₹/sqft for kitchens, wardrobes, and full-home work",
  "Usually same-day WhatsApp from the studio",
  "No experience-centre visit required to start",
];

export default async function LayoutReviewPage({ searchParams }: Props) {
  const sp = await searchParams;
  const builderName = normalizeBuilder(builderParam(sp.builder));
  const headline = builderName
    ? `Free layout review for ${builderName} flats in Chennai`
    : "Free layout review for Chennai flats";

  const [images, settings] = await Promise.all([
    getPageImageMap(),
    getSiteSettings(),
  ]);
  const brand = brandFromSettings(settings);
  const media = (key: string) => pageMedia(images, key);

  const afterSteps = [
    {
      n: "01",
      title: "We study your plan",
      detail:
        "Light, flow, and storage issues flagged against your builder layout.",
      media: media("layout_step_1"),
    },
    {
      n: "02",
      title: "Budget band on WhatsApp",
      detail: "A realistic lakhs range, not a vague visit-the-showroom reply.",
      media: media("layout_step_2"),
    },
    {
      n: "03",
      title: "Design what you approved",
      detail: "Modular and full-home interiors approved in 3D before site work.",
      media: media("layout_step_3"),
    },
  ];

  return (
    <div className="bg-[var(--background)] text-[var(--text-primary)]">
      <div className="relative text-[#FBFBFA] min-h-[calc(100vh-5rem)]">
        <SlotMedia
          url={media("layout_hero").url}
          mediaType={media("layout_hero").media_type}
          imgClassName="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[var(--text-primary)]/65 via-[var(--text-primary)]/78 to-[var(--text-primary)]/92"
          aria-hidden
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 space-y-6">
            <BrandMark variant="onDark" size="hero" withStudio />
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#FBFBFA]/60">
              {BRAND_INFO.contact.location} · Limited reviews / week
            </p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] leading-snug font-medium">
              {headline}
            </h1>
            <p className="text-[#FBFBFA]/75 text-base leading-relaxed max-w-md">
              Send your builder floor plan. We WhatsApp back what to watch for
              and a realistic budget band—then plan interiors that match what
              you approved.
            </p>
            <ul className="space-y-3 text-sm text-[#FBFBFA]/85 border-t border-white/15 pt-6">
              {proofPoints.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-[var(--accent-gold-bright)]">▸</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-[var(--background)] text-[var(--text-primary)] p-6 md:p-10 border border-[var(--border)] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-gold)] mb-2 font-semibold">
                Request your review
              </p>
              <p className="text-sm text-[var(--text-secondary)] mb-8">
                Takes under 2 minutes. Upload your builder floor plan.
              </p>
              <Suspense
                fallback={
                  <p className="text-sm text-[var(--text-secondary)]">
                    Loading…
                  </p>
                }
              >
                <LayoutReviewForm studioWhatsapp={brand.contact.whatsapp} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      <section className="py-20 md:py-28 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-3">
            After you submit
          </p>
          <h2 className="font-serif text-3xl md:text-4xl mb-4 max-w-xl">
            Clarity before you spend—not a sales walk-through.
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mb-12 leading-relaxed">
            Here is what happens once your plan is in.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            {afterSteps.map((step) => (
              <article
                key={step.n}
                className="group relative overflow-hidden min-h-[280px] border border-[var(--border)]"
              >
                <SlotMedia
                  url={step.media.url}
                  mediaType={step.media.media_type}
                  imgClassName="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15" />
                <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
                  <span className="font-serif text-3xl text-[var(--accent-gold-bright)] mb-2">
                    {step.n}
                  </span>
                  <h3 className="font-serif text-xl mb-2">{step.title}</h3>
                  <p className="text-sm text-white/75 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="border border-[var(--border)] bg-[var(--surface)] p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-lg">
              <h3 className="font-serif text-2xl mb-2">Want the full picture?</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                See finished homes, ₹/sqft bands, and materials on the main
                site—or compare how we differ from big showrooms.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link href="/" className="btn-primary">
                Visit the homepage
              </Link>
              <Link href="/why-us" className="btn-secondary">
                Why Emagine
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
