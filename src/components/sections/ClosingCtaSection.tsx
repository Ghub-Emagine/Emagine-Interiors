import Link from "next/link";
import { getPageImageMap, getPageCopyMap } from "@/lib/cms";
import { getSiteSettings, brandFromSettings } from "@/lib/site-settings";
import { pageMedia } from "@/lib/page-image-slots";
import { copyField, copyMeta } from "@/lib/page-copy-slots";
import SlotMedia from "@/components/ui/SlotMedia";

export default async function ClosingCtaSection() {
  const [images, copy, settings] = await Promise.all([
    getPageImageMap(),
    getPageCopyMap(),
    getSiteSettings(),
  ]);
  const brand = brandFromSettings(settings);

  const title = copyField(copy, "closing_cta", "title", "Prefer to talk first?");
  const body = copyField(
    copy,
    "closing_cta",
    "body",
    "Message the studio on WhatsApp with your builder name and flat size.",
  );
  const ctaPrimary = copyMeta(
    copy,
    "closing_cta",
    "cta_primary",
    "WhatsApp the studio",
  );
  const ctaSecondary = copyMeta(
    copy,
    "closing_cta",
    "cta_secondary",
    "Why choose Emagine",
  );

  const closing = pageMedia(images, "home_closing");

  return (
    <section className="relative overflow-hidden border-t border-[var(--border)]">
      <SlotMedia
        url={closing.url}
        mediaType={closing.media_type}
        imgClassName="absolute inset-0 w-full h-full object-cover scale-105"
      />
      <div
        className="absolute inset-0 bg-[var(--text-primary)]/78"
        aria-hidden
      />
      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-20 text-center text-[#FBFBFA]">
        <h2 className="font-serif text-2xl md:text-4xl leading-tight mb-4">
          {title}
        </h2>
        <p className="text-[#FBFBFA]/75 leading-relaxed mb-8 max-w-lg mx-auto text-sm md:text-base">
          {body}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`https://wa.me/${brand.contact.whatsapp}?text=${encodeURIComponent(
              "Hi Emagine — I'd like a free estimate for my Chennai flat.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--accent-gold-bright)] text-[var(--text-primary)] px-8 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors min-h-[48px] flex items-center justify-center"
          >
            {ctaPrimary}
          </a>
          <Link
            href="/why-us"
            className="border border-white/40 px-8 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-white/10 transition-colors min-h-[48px] flex items-center justify-center"
          >
            {ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
