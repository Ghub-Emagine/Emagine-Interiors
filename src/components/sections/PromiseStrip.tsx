"use client";

import { motion } from "framer-motion";
import type { SiteContentItem } from "@/lib/types";

export default function PromiseStrip({ items }: { items: SiteContentItem[] }) {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            whileHover={{ y: -4 }}
            className="group border border-transparent hover:border-[var(--border)] hover:bg-[var(--background)] p-4 md:p-5 transition-colors"
          >
            <div className="h-0.5 w-0 group-hover:w-10 bg-[var(--accent-gold-bright)] mb-3 transition-all duration-500" />
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
