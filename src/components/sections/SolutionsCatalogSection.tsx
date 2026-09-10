"use client";

import Link from "next/link";
import {
  Bath,
  Box,
  Columns2,
  CookingPot,
  DoorClosed,
  Flower2,
  Home,
  Laptop,
  Lightbulb,
  Monitor,
  Paintbrush,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { SiteContentItem } from "@/lib/types";

const ICONS: Record<string, LucideIcon> = {
  CookingPot,
  DoorClosed,
  Monitor,
  Lightbulb,
  Sparkles,
  Laptop,
  Box,
  Paintbrush,
  Bath,
  Flower2,
  Columns2,
  Home,
};

export default function SolutionsCatalogSection({
  items,
}: {
  items: SiteContentItem[];
}) {
  return (
    <section
      id="solutions"
      className="py-24 md:py-32 border-t border-[var(--border)] scroll-mt-24 atmosphere"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-3">
              A to Z interior solutions
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-[var(--text-primary)] mb-4">
              Everything a full-home brief usually needs.
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Kitchen, wardrobe, living, lighting, and more—planned as one home,
              not separate packages.
            </p>
          </div>
          <Link href="/#evaluate" className="btn-primary shrink-0 w-fit">
            Check your ₹/sqft range
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {items.map((item) => {
            const iconName = String(
              (item.meta as { icon?: string }).icon ?? "Home",
            );
            const Icon = ICONS[iconName] ?? Home;
            return (
              <div key={item.id} className="flip-card" tabIndex={0}>
                <div className="flip-card-inner">
                  <div className="flip-card-face flip-card-front border border-[var(--border)] bg-[var(--background)] flex flex-col items-center justify-center gap-4 p-6 text-center shadow-[0_8px_30px_rgba(18,17,15,0.04)]">
                    <Icon
                      className="w-14 h-14 md:w-16 md:h-16 text-[var(--accent-gold)]"
                      strokeWidth={1.15}
                      aria-hidden
                    />
                    <h3 className="font-serif text-lg md:text-xl leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flip-card-face flip-card-back border border-[var(--accent-gold-bright)]/40 bg-[var(--text-primary)] text-[#FBFBFA] flex flex-col items-center justify-center gap-3 p-6 text-center">
                    <Icon
                      className="w-8 h-8 text-[var(--accent-gold-bright)]"
                      strokeWidth={1.25}
                      aria-hidden
                    />
                    <h3 className="font-serif text-lg">{item.title}</h3>
                    <p className="text-xs md:text-sm text-white/75 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
