import Link from "next/link";
import { BRAND_INFO } from "@/lib/constants";
import BrandMark from "@/components/layout/BrandMark";

export default function Footer() {
  const whatsappHref = `https://wa.me/${BRAND_INFO.contact.whatsapp}?text=${encodeURIComponent(
    "Hi Emagine — I'd like to talk about interiors for my Chennai flat.",
  )}`;

  return (
    <footer className="bg-[var(--text-primary)] text-[var(--background)] pt-16 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5 max-w-sm">
          <BrandMark variant="onDark" size="footer" withStudio />
          <p className="text-white/55 text-sm mt-5 mb-6 leading-relaxed">
            {BRAND_INFO.tagline}
          </p>
          <p className="text-sm text-white/70">{BRAND_INFO.contact.location}</p>
          <p className="text-xs text-white/40 mt-2">Independent Chennai studio</p>
        </div>

        <div className="md:col-span-3 flex flex-col gap-3 text-sm">
          <span className="text-white/40 uppercase tracking-widest text-xs mb-1 font-semibold">
            Explore
          </span>
          <Link
            href="/portfolio"
            className="text-white/75 hover:text-[var(--accent-gold-bright)]"
          >
            Our work
          </Link>
          <Link
            href="/#designs"
            className="text-white/75 hover:text-[var(--accent-gold-bright)]"
          >
            Room designs
          </Link>
          <Link
            href="/#services"
            className="text-white/75 hover:text-[var(--accent-gold-bright)]"
          >
            Services
          </Link>
          <Link
            href="/#solutions"
            className="text-white/75 hover:text-[var(--accent-gold-bright)]"
          >
            A–Z solutions
          </Link>
          <Link
            href="/about"
            className="text-white/75 hover:text-[var(--accent-gold-bright)]"
          >
            About
          </Link>
          <Link
            href="/why-us"
            className="text-white/75 hover:text-[var(--accent-gold-bright)]"
          >
            Why EDS
          </Link>
          <Link
            href="/blog"
            className="text-white/75 hover:text-[var(--accent-gold-bright)]"
          >
            Blog
          </Link>
          <Link
            href="/layout-review"
            className="text-white/75 hover:text-[var(--accent-gold-bright)]"
          >
            Free layout review
          </Link>
        </div>

        <div className="md:col-span-4 flex flex-col gap-3 text-sm">
          <span className="text-white/40 uppercase tracking-widest text-xs mb-1 font-semibold">
            Talk to us
          </span>
          <a
            href={`mailto:${BRAND_INFO.contact.email}`}
            className="text-white/75 hover:text-[var(--accent-gold-bright)]"
          >
            {BRAND_INFO.contact.email}
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center mt-2 bg-[var(--accent-gold-bright)] text-[var(--text-primary)] px-5 py-3 text-xs uppercase tracking-widest font-semibold w-fit hover:bg-white transition-colors"
          >
            WhatsApp the studio
          </a>
          <Link
            href="/#evaluate"
            className="text-white/75 hover:text-[var(--accent-gold-bright)] mt-2"
          >
            Free price estimate
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-14 pt-6 border-t border-white/10 text-xs text-white/40 flex flex-col sm:flex-row justify-between gap-3">
        <span>
          © {new Date().getFullYear()} {BRAND_INFO.name}. All rights reserved.
        </span>
        <div className="flex flex-wrap gap-4">
          <Link href="/privacy" className="hover:text-[var(--accent-gold-bright)]">
            Privacy policy
          </Link>
          <Link href="/terms" className="hover:text-[var(--accent-gold-bright)]">
            Terms &amp; conditions
          </Link>
          <span>Modular · Full-home · Layout verified</span>
        </div>
      </div>
    </footer>
  );
}
