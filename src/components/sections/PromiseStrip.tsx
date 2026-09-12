"use client";

import { motion } from "framer-motion";
import type { SiteContentItem } from "@/lib/types";

export default function PromiseStrip({ items }: { items: SiteContentItem[] }) {
  return (
    <section className="relative border-y border-[var(--border)] bg-[var(--surface)] overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,165,116,0.12),transparent_70%)]"
      />
      <div
        aria-hidden
        className="promise-strip-breathe pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-gold-bright)] to-transparent opacity-70"
      />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.07 }}
            whileHover={{ y: -3 }}
            className="promise-card group relative border border-[var(--border)] bg-[var(--background)]/90 p-5 md:p-6 shadow-[0_10px_28px_-18px_rgba(28,25,23,0.45)]"
          >
            <div className="h-0.5 w-8 bg-[var(--accent-gold-bright)] mb-4" />
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-gold)] mb-2 font-semibold">
              {item.title}
            </p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {item.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
