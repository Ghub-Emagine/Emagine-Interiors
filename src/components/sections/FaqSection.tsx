"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { SiteContentItem } from "@/lib/types";

export default function FaqSection({
  items,
  sideImage,
}: {
  items: SiteContentItem[];
  sideImage: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 border-t border-[var(--border)] relative overflow-hidden">
      <div className="absolute inset-0 atmosphere opacity-60 pointer-events-none" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-3">
            Common questions
          </p>
          <h2 className="font-serif text-3xl md:text-5xl mb-4 leading-tight">
            Questions buyers ask before they commit
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
            Straight answers from what Chennai flat owners ask when comparing studios.
          </p>
          <div className="hidden lg:block aspect-[4/5] relative overflow-hidden border border-[var(--border)] group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sideImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        <div className="lg:col-span-8 space-y-3">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <motion.div
                key={item.id}
                layout
                className={`border transition-colors ${
                  isOpen
                    ? "border-[var(--accent-gold-bright)]/50 bg-[var(--background)] shadow-[0_12px_40px_rgba(18,17,15,0.06)]"
                    : "border-[var(--border)] bg-[var(--surface)]/50 hover:border-[var(--accent-gold)]/40"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="w-full flex items-start justify-between gap-4 p-5 md:p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="flex gap-4 items-start">
                    <span className="font-serif text-lg text-[var(--accent-gold-bright)] shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-xl md:text-2xl text-[var(--text-primary)]">
                      {item.title}
                    </span>
                  </span>
                  <span
                    className={`text-sm uppercase tracking-widest shrink-0 mt-1 transition-transform ${
                      isOpen
                        ? "rotate-45 text-[var(--accent-gold)]"
                        : "text-[var(--text-secondary)]"
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 md:px-6 pb-6 pl-[4.25rem] text-sm md:text-[15px] text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                        {item.detail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          <p className="pt-6 text-sm text-[var(--text-secondary)]">
            Still unsure?{" "}
            <Link
              href="/#apply"
              className="text-[var(--accent-gold)] font-semibold hover:underline"
            >
              Send your floor plan
            </Link>{" "}
            — same-day WhatsApp is the goal.
          </p>
        </div>
      </div>
    </section>
  );
}
