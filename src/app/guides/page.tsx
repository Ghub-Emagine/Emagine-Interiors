import type { Metadata } from "next";
import Link from "next/link";
import { GUIDE_PILLARS } from "./pillars";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Practical guides for Chennai flat interiors—cost, layout, wardrobes, and pre-possession planning from Emagine Design Studio.",
};

export default function GuidesIndexPage() {
  return (
    <div className="bg-[var(--background)] min-h-screen">
      <section className="border-b border-[var(--border)] atmosphere py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-3">
            Guides
          </p>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">
            Chennai flat interiors, explained
          </h1>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Five pillar guides on cost, builder plans, storage, and what to lock
            before possession—written for homeowners planning modular and
            full-home work.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 max-w-7xl mx-auto px-6 md:px-12">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl">
          {GUIDE_PILLARS.map((pillar) => (
            <li key={pillar.slug}>
              <Link href={`/guides/${pillar.slug}`} className="group block">
                <p className="text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2">
                  {pillar.eyebrow}
                </p>
                <h2 className="font-serif text-2xl md:text-3xl group-hover:text-[var(--accent-gold)] transition-colors">
                  {pillar.title}
                </h2>
                <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {pillar.excerpt}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16 pt-10 border-t border-[var(--border)] max-w-xl">
          <p className="font-serif text-2xl mb-3">
            Already have a builder floor plan?
          </p>
          <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
            Skip the reading list—send the plan and get a same-day WhatsApp
            layout read with a realistic budget band.
          </p>
          <Link
            href="/layout-review?utm_source=guide&utm_campaign=guides-index"
            className="btn-primary inline-flex"
          >
            Free layout review
          </Link>
        </div>
      </section>
    </div>
  );
}
