"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { SiteContentItem } from "@/lib/types";

export default function OfferingsSection({
  items,
}: {
  items: SiteContentItem[];
}) {
  return (
    <section className="py-24 md:py-32 border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-14 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-3">
            Our offerings
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-[var(--text-primary)] mb-4">
            How working with the studio feels day to day.
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Clear ownership, material honesty, and a finish line you can plan
            around.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, index) => {
            const imageUrl = String(
              (item.meta as { image_url?: string }).image_url ?? "",
            );
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group bg-[var(--background)] border border-[var(--border)] overflow-hidden hover:border-[var(--accent-gold)] transition-colors"
              >
                <div className="aspect-[16/9] relative overflow-hidden bg-[var(--border)]">
                  {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageUrl}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute top-3 left-3 font-serif text-2xl text-white drop-shadow">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute bottom-3 right-3 text-[10px] uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    Studio promise
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl mb-2 group-hover:text-[var(--accent-gold)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/#apply" className="btn-primary">
            Start a layout review
          </Link>
          <Link href="/why-us" className="btn-secondary">
            Why EDS
          </Link>
        </div>
      </div>
    </section>
  );
}
