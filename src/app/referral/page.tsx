import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings, brandFromSettings } from "@/lib/site-settings";

const LAYOUT_REVIEW_HREF =
  "/layout-review?utm_source=referral&utm_campaign=referral";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const brand = brandFromSettings(settings);
  return {
    title: `Referral program | ${brand.name}`,
    description: `Refer a friend planning Chennai flat interiors with ${brand.name}. They get a free layout review; you earn a thank-you credit when their project starts.`,
  };
}

const STEPS = [
  {
    title: "Share the studio",
    body: "Point a friend or neighbour who is planning a Chennai flat fit-out to our free layout review—or introduce them on WhatsApp.",
  },
  {
    title: "They send a plan",
    body: "They upload a builder floor plan and get a same-day WhatsApp read with layout notes and a realistic budget band.",
  },
  {
    title: "You earn a thank-you",
    body: "When they book a project with us, we credit you with a thank-you amount on your next invoice or a studio gift—confirmed in writing when their contract starts.",
  },
] as const;

export default async function ReferralPage() {
  const settings = await getSiteSettings();
  const brand = brandFromSettings(settings);

  return (
    <div className="bg-[var(--background)] min-h-screen">
      <section className="border-b border-[var(--border)] atmosphere py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-3">
            Referral
          </p>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">
            Refer a home. Earn a thank-you.
          </h1>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Know someone choosing interiors for a Chennai flat? Send them to{" "}
            {brand.name}. They get clarity on layout and budget; you get a
            thank-you when their project begins.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 max-w-3xl mx-auto px-6 md:px-12">
        <h2 className="font-serif text-2xl md:text-3xl mb-8">How it works</h2>
        <ol className="space-y-10 list-none pl-0">
          {STEPS.map((step, index) => (
            <li key={step.title} className="flex gap-5">
              <span
                className="font-serif text-2xl text-[var(--accent-gold)] shrink-0 w-8"
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-serif text-xl md:text-2xl mb-2">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 pt-10 border-t border-[var(--border)]">
          <p className="font-serif text-2xl md:text-3xl mb-3">
            Start with a layout review
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-6 max-w-xl">
            Have your friend request a free layout review and mention your name
            in the message. We’ll track the referral from there.
          </p>
          <Link href={LAYOUT_REVIEW_HREF} className="btn-primary inline-flex">
            Free layout review
          </Link>
        </div>

        <p className="mt-12 text-xs text-[var(--text-secondary)]/80 leading-relaxed max-w-xl">
          Thank-you credits apply when a referred client signs a project with{" "}
          {brand.name}. Details confirmed case by case—this page is not a
          binding offer.
        </p>
      </section>
    </div>
  );
}
