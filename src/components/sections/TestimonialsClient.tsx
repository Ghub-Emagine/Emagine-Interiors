"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Testimonial } from "@/lib/types";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function TestimonialsClient({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (testimonials.length < 2) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % testimonials.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [testimonials.length]);

  return (
    <section className="py-24 md:py-28 atmosphere border-t border-[var(--border)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-4">
              From owners like you
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-primary)] mb-4">
              Certainty before the first payment.
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Pre-possession buyers who wanted a clear budget and modular /
              full-home interiors that match the plan—before materials left the
              warehouse.
            </p>
          </div>
          <Link
            href="/#apply"
            className="btn-primary shrink-0 text-center self-start md:self-auto"
          >
            Get your review
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {testimonials.map((t, index) => {
            const isActive = index === active;
            return (
              <motion.blockquote
                key={t.id}
                variants={item}
                onMouseEnter={() => setActive(index)}
                animate={{
                  y: isActive ? -6 : 0,
                  scale: isActive ? 1.02 : 1,
                  borderColor: isActive
                    ? "var(--accent-gold-bright)"
                    : "var(--border)",
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`bg-[var(--background)] border p-8 md:p-9 flex flex-col relative ${
                  isActive ? "shadow-[0_20px_50px_rgba(18,17,15,0.08)]" : ""
                }`}
              >
                <span
                  className={`absolute top-6 right-6 font-serif text-5xl leading-none transition-colors ${
                    isActive
                      ? "text-[var(--accent-gold-bright)]"
                      : "text-[var(--border)]"
                  }`}
                  aria-hidden
                >
                  “
                </span>
                <p className="font-serif text-xl md:text-2xl text-[var(--text-primary)] leading-snug mb-8 flex-grow pr-6">
                  {t.quote}
                </p>
                <footer>
                  <cite className="not-italic text-sm font-semibold text-[var(--text-primary)]">
                    {t.client_name}
                  </cite>
                  {t.project_label && (
                    <p className="text-xs uppercase tracking-widest text-[var(--text-secondary)] mt-1">
                      {t.project_label}
                    </p>
                  )}
                </footer>
                <div className="mt-6 flex gap-1.5">
                  {testimonials.map((_, dot) => (
                    <button
                      key={dot}
                      type="button"
                      aria-label={`Show testimonial ${dot + 1}`}
                      onClick={() => setActive(dot)}
                      className={`h-1 rounded-full transition-all ${
                        dot === active
                          ? "w-6 bg-[var(--accent-gold-bright)]"
                          : "w-1.5 bg-[var(--border)]"
                      }`}
                    />
                  ))}
                </div>
              </motion.blockquote>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
