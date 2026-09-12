import Link from "next/link";
import type { ReactNode } from "react";
import { layoutReviewHref, type GuidePillar } from "./pillars";

type Props = {
  pillar: GuidePillar;
  children: ReactNode;
  ctaHeadline?: string;
  ctaBody?: string;
};

export default function GuideArticle({
  pillar,
  children,
  ctaHeadline = "Want this applied to your builder plan?",
  ctaBody = "Send your floor plan. We WhatsApp a clear layout read and a realistic budget band for your Chennai flat.",
}: Props) {
  return (
    <article className="bg-[var(--background)] min-h-screen">
      <header className="border-b border-[var(--border)] atmosphere">
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-20">
          <Link
            href="/guides"
            className="text-xs uppercase tracking-widest text-[var(--accent-gold)] hover:underline"
          >
            ← All guides
          </Link>
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mt-8 mb-3">
            {pillar.eyebrow}
          </p>
          <h1 className="font-serif text-3xl md:text-5xl leading-tight">
            {pillar.title}
          </h1>
          <p className="mt-5 text-lg text-[var(--text-secondary)] leading-relaxed">
            {pillar.excerpt}
          </p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-16 prose-guide">
        {children}

        <div className="mt-16 pt-10 border-t border-[var(--border)]">
          <p className="font-serif text-2xl md:text-3xl mb-3">{ctaHeadline}</p>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-6 max-w-xl">
            {ctaBody}
          </p>
          <Link
            href={layoutReviewHref(pillar.slug)}
            className="btn-primary inline-flex"
          >
            Request a free layout review
          </Link>
        </div>
      </div>
    </article>
  );
}

export function GuideSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="font-serif text-2xl md:text-3xl mt-2 mb-4">{title}</h2>
      <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export function GuideList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 list-none pl-0">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[var(--text-secondary)]">
          <span className="text-[var(--accent-gold-bright)] shrink-0 mt-0.5">
            ▸
          </span>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}
