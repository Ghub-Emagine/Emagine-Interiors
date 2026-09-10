"use client";

import { TRUST_MARQUEE } from "@/lib/constants";

export default function TrustMarquee() {
  const row = [...TRUST_MARQUEE, ...TRUST_MARQUEE];

  return (
    <section
      aria-label="What we offer"
      className="border-y border-[var(--border)] bg-[var(--text-primary)] text-[var(--background)] overflow-hidden py-4"
    >
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-10 text-xs uppercase tracking-[0.22em] font-semibold text-white/85"
          >
            {item}
            <span
              className="text-[var(--accent-gold-bright)]"
              aria-hidden
            >
              ·
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
