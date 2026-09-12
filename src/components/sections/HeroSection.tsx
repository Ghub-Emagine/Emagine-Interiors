"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import BrandMark from "@/components/layout/BrandMark";
import { SITE_IMAGES } from "@/lib/site-images";
import type { HeroSlide } from "@/lib/types";
import type { PageCopyItem } from "@/lib/page-copy-slots";
import { copyField, copyMeta } from "@/lib/page-copy-slots";

const DEFAULT_WORDS = [
  "layout",
  "kitchen",
  "wardrobe",
  "living room",
  "bedroom",
  "floor plan",
];

function TypeCycle({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    const speed = deleting ? 38 : 72;

    if (!deleting && display === word) {
      const hold = setTimeout(() => setDeleting(true), 1600);
      return () => clearTimeout(hold);
    }

    if (deleting && display === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(() => {
      setDisplay(
        deleting
          ? word.slice(0, Math.max(0, display.length - 1))
          : word.slice(0, display.length + 1),
      );
    }, speed);
    return () => clearTimeout(t);
  }, [display, deleting, index, words]);

  return (
    <span className="inline-block min-w-[7ch] text-[var(--accent-gold-bright)] border-r-2 border-[var(--accent-gold-bright)] pr-1 animate-pulse">
      {display || "\u00A0"}
    </span>
  );
}

export default function HeroSection({
  slides,
  copy,
}: {
  slides: HeroSlide[];
  copy: Record<string, PageCopyItem>;
}) {
  const safeSlides =
    slides.length > 0
      ? slides
      : [
          {
            id: "x",
            media_type: "image" as const,
            media_url: SITE_IMAGES.heroLiving,
            poster_url: null,
            alt_text: "Interior",
            sort_order: 0,
            status: "published" as const,
            created_at: "",
            updated_at: "",
          },
        ];

  const headline = copyField(
    copy,
    "hero_main",
    "title",
    "Full-home interiors for Chennai flats—planned from your builder",
  );
  const subcopy = copyField(
    copy,
    "hero_main",
    "body",
    "Modular kitchens, wardrobes, and turnkey rooms—planned against your actual floor plan.",
  );
  const words =
    copyMeta<string[]>(copy, "hero_main", "rotating_words", DEFAULT_WORDS) ||
    DEFAULT_WORDS;
  const ctaPrimary = copyMeta(
    copy,
    "hero_main",
    "cta_primary",
    "Get free price estimate",
  );
  const ctaSecondary = copyMeta(
    copy,
    "hero_main",
    "cta_secondary",
    "Free layout review",
  );
  const ctaPrimaryHref = copyMeta(
    copy,
    "hero_main",
    "cta_primary_href",
    "/#evaluate",
  );
  const ctaSecondaryHref = copyMeta(
    copy,
    "hero_main",
    "cta_secondary_href",
    "/#apply",
  );

  const [slide, setSlide] = useState(0);
  const current = safeSlides[slide % safeSlides.length];

  useEffect(() => {
    if (safeSlides.length < 2) return;
    const ms = current.media_type === "video" ? 8000 : 5500;
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % safeSlides.length);
    }, ms);
    return () => clearInterval(id);
  }, [safeSlides.length, current.media_type, slide]);

  return (
    <section className="relative min-h-[calc(100vh-5.5rem)] md:min-h-[calc(100vh-6rem)] flex items-end md:items-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id + slide}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {current.media_type === "video" ? (
            <video
              className="w-full h-full object-cover"
              src={current.media_url}
              poster={current.poster_url ?? undefined}
              autoPlay
              muted
              loop
              playsInline
              aria-label={current.alt_text ?? "Hero video"}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={current.media_url}
              alt={current.alt_text ?? "Interior by Emagine Design Studio"}
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div
        className="absolute inset-0 bg-gradient-to-t from-[var(--text-primary)]/80 via-[var(--text-primary)]/40 to-[var(--text-primary)]/20"
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-16 md:py-24">
        <motion.div
          className="max-w-2xl space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <BrandMark variant="onDark" size="hero" withStudio priority />

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#FBFBFA]/95 leading-snug tracking-tight font-medium">
            {headline} <TypeCycle words={words} />.
          </h1>

          <p className="text-base md:text-lg text-[#FBFBFA]/75 max-w-lg leading-relaxed">
            {subcopy}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href={ctaPrimaryHref}
              className="bg-[var(--accent-gold-bright)] text-[var(--text-primary)] hover:bg-[#FBFBFA] px-8 py-4 text-xs uppercase tracking-widest font-semibold text-center transition-all min-h-[48px] flex items-center justify-center"
            >
              {ctaPrimary}
            </Link>
            <Link
              href={ctaSecondaryHref}
              className="border border-[#FBFBFA]/40 text-[#FBFBFA] hover:bg-[#FBFBFA]/10 px-8 py-4 text-xs uppercase tracking-widest font-semibold text-center transition-all min-h-[48px] flex items-center justify-center"
            >
              {ctaSecondary}
            </Link>
          </div>

          {safeSlides.length > 1 && (
            <div className="flex gap-2 pt-4">
              {safeSlides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSlide(i)}
                  className={`h-1 transition-all ${
                    i === slide
                      ? "w-8 bg-[var(--accent-gold-bright)]"
                      : "w-4 bg-white/35 hover:bg-white/55"
                  }`}
                  aria-label={`Show slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
