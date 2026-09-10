import Link from "next/link";
import { BRAND_INFO } from "@/lib/constants";
import { getPageImageMap } from "@/lib/cms";
import { pageImage } from "@/lib/page-image-slots";

/** Soft closer after the form — WhatsApp / revisit, not a second pitch */
export default async function ClosingCtaSection() {
  const images = await getPageImageMap();

  return (
    <section className="relative overflow-hidden border-t border-[var(--border)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={pageImage(images, "home_closing")}
        alt=""
        className="absolute inset-0 w-full h-full object-cover scale-105"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[var(--text-primary)]/78"
        aria-hidden
      />
      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-20 text-center text-[#FBFBFA]">
        <h2 className="font-serif text-2xl md:text-4xl leading-tight mb-4">
          Prefer to talk first?
        </h2>
        <p className="text-[#FBFBFA]/75 leading-relaxed mb-8 max-w-lg mx-auto text-sm md:text-base">
          Message the studio on WhatsApp with your builder name and flat size.
          We&apos;ll guide you from there.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`https://wa.me/${BRAND_INFO.contact.whatsapp}?text=${encodeURIComponent(
              "Hi Emagine — I'd like a free estimate for my Chennai flat.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--accent-gold-bright)] text-[var(--text-primary)] px-8 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
          >
            WhatsApp the studio
          </a>
          <Link
            href="/why-us"
            className="border border-white/40 px-8 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-white/10 transition-colors"
          >
            Why choose Emagine
          </Link>
        </div>
      </div>
    </section>
  );
}
