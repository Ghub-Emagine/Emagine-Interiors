"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Gallery = {
  id: string;
  title: string;
  blurb: string;
  images: { src: string; alt: string }[];
};

export default function RoomDesignsSection({
  galleries,
}: {
  galleries: Gallery[];
}) {
  const [active, setActive] = useState(galleries[0]?.id ?? "kitchen");
  const gallery = galleries.find((g) => g.id === active) ?? galleries[0];

  if (!gallery) return null;

  return (
    <section
      id="designs"
      className="py-24 md:py-28 border-t border-[var(--border)] scroll-mt-24 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 50% at 80% 20%, rgba(201,168,76,0.12), transparent)",
        }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-3">
              Trending room designs
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-[var(--text-primary)] mb-4">
              Kitchens, living rooms, bedrooms—planned for your flat.
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Browse by room. Every look still starts from your builder layout.
            </p>
          </div>
          <Link href="/#apply" className="btn-primary shrink-0 w-fit">
            Get a free estimate
          </Link>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 text-xs font-semibold uppercase tracking-widest">
          {galleries.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setActive(g.id)}
              className={`px-5 py-2.5 whitespace-nowrap transition-all ${
                active === g.id
                  ? "bg-[var(--text-primary)] text-[var(--background)]"
                  : "bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {g.title}
            </button>
          ))}
        </div>

        <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-xl">
          {gallery.blurb}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={gallery.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4"
          >
            {gallery.images.map((img, i) => (
              <div
                key={img.src}
                className={`overflow-hidden relative group ${
                  i === 0
                    ? "md:col-span-7 md:row-span-2 min-h-[280px] md:min-h-[420px]"
                    : "md:col-span-5 min-h-[200px] md:min-h-[200px]"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
