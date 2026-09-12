"use client";

import type { SiteContentItem } from "@/lib/types";

export default function TrustMarquee({ items }: { items: SiteContentItem[] }) {
  const phrases = items.map((item) => item.title).filter(Boolean);
  if (phrases.length === 0) return null;

  const row = [...phrases, ...phrases];

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
            <span className="text-[var(--accent-gold-bright)]" aria-hidden>
              ·
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
