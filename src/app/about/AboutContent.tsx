"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BRAND_INFO } from "@/lib/constants";
import BrandMark from "@/components/layout/BrandMark";
import { pageImage } from "@/lib/page-image-slots";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * About is intentionally NOT a remix of home:
 * Home sells process, services, rooms, pricing, intake.
 * About covers origin, refusals, operating rules, and Chennai context.
 */
export default function AboutContent({
  images,
}: {
  images: Record<string, string>;
}) {
  const img = (key: string) => pageImage(images, key);
  const whatsappHref = `https://wa.me/${BRAND_INFO.contact.whatsapp}?text=${encodeURIComponent(
    "Hi Emagine — I'd like to know more about the studio.",
  )}`;

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.4]);

  const refusals = [
    {
      title: "We don’t sell a showroom visit first",
      detail:
        "Your builder floor plan is the brief. Sample rooms that aren’t your flat don’t decide your budget.",
    },
    {
      title: "We don’t hide the ₹/sqft",
      detail:
        "Bands are published before you commit. Design fees don’t arrive as a surprise percentage.",
    },
    {
      title: "We don’t hand you five contractors",
      detail:
        "Layout, modular, and site finish stay under one studio so you aren’t chasing strangers.",
    },
    {
      title: "We don’t over-book the week",
      detail:
        "Layout reviews are capped so we stay hands-on—fewer leads, clearer replies.",
    },
  ];

  const operating = [
    {
      label: "Registered studio",
      value: "Independent Chennai practice",
    },
    {
      label: "How we talk",
      value: "WhatsApp-first, same-day when we can",
    },
    {
      label: "Where we work",
      value: BRAND_INFO.contact.location,
    },
    {
      label: "Focus",
      value: "Pre-possession Chennai apartments",
    },
  ];

  return (
    <div className="bg-[var(--background)] text-[var(--text-primary)] overflow-x-hidden">
      <section
        ref={heroRef}
        className="relative h-[85vh] min-h-[520px] flex items-end overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img("about_hero")}
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/30 to-black/15" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="max-w-3xl"
          >
            <BrandMark variant="onDark" size="hero" withStudio />
            <p className="mt-8 text-[10px] uppercase tracking-[0.35em] text-white/55 font-semibold">
              Emagine Design Studio · Chennai
            </p>
            <h1 className="mt-4 font-serif text-4xl sm:text-5xl md:text-7xl text-white leading-[1.02] tracking-tight">
              A studio for people
              <br />
              <span className="text-[var(--accent-gold-bright)]">
                who already bought the flat.
              </span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/70 max-w-xl leading-relaxed">
              Clear decisions before site drama—and interiors planned for the
              home you actually own in Chennai.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[85vh]">
          <div className="lg:col-span-5 relative min-h-[45vh] lg:min-h-full lg:sticky lg:top-0 lg:h-screen">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img("about_origin")}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <p className="absolute bottom-10 left-8 right-8 font-serif text-3xl md:text-4xl text-white leading-tight">
              Built in the gap between
              <span className="text-[var(--accent-gold-bright)]"> big brands </span>
              and
              <span className="text-[var(--accent-gold-bright)]"> loose contractors</span>.
            </p>
          </div>

          <div className="lg:col-span-7 flex items-center">
            <div className="px-8 md:px-14 lg:px-20 py-20 md:py-28 max-w-xl">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent-gold)] font-semibold mb-5">
                Origin
              </p>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-[1.1] mb-8">
                Why this studio exists
              </h2>
              <div className="space-y-5 text-[var(--text-secondary)] leading-relaxed">
                <p>
                  Large players can feel rigid. Local contractors can feel
                  flexible—until materials and timelines slip. Emagine sits in
                  the middle: careful detailing, named materials, and a habit of
                  checking your floor plan before money leaves the account.
                </p>
                <p>
                  We are not chasing footfall through an experience centre. We
                  are helping fewer families moving into Casagrand, Appaswamy,
                  Akshaya, SPR City, and similar Chennai projects make fewer
                  wrong decisions.
                </p>
                <p className="text-[var(--text-primary)] font-medium border-l-2 border-[var(--accent-gold-bright)] pl-5">
                  You already bought the flat. We help you finish it without
                  guessing.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/why-us" className="btn-secondary">
                  Why choose Emagine
                </Link>
                <Link href="/#work" className="btn-secondary">
                  See the work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[var(--text-primary)] text-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent-gold-bright)] font-semibold mb-5">
              Chennai context
            </p>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-[1.08] mb-6">
              Flats here come with a floor plan—and a lot of opinions.
            </h2>
            <p className="text-white/65 leading-relaxed mb-6">
              Pre-possession apartments stack decisions fast: wet areas that
              don’t fit, wardrobe walls that steal light, budgets quoted as
              “approx” until site day. Emagine’s bias is simple—score the plan
              first, then design what you can actually live with.
            </p>
            <p className="text-white/65 leading-relaxed">
              That is a different job from selling laminate options in a
              walkthrough mall. It’s slower to start, clearer to finish.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img("about_chennai")}
              alt="Apartment living for Chennai flat owners"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <p className="absolute bottom-6 left-6 right-6 text-sm text-white/80">
              {BRAND_INFO.contact.location} · Apartments first
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-14">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent-gold)] font-semibold mb-4">
              Lines we won’t cross
            </p>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-[1.08]">
              What we refuse—on purpose
            </h2>
            <p className="mt-5 text-[var(--text-secondary)] leading-relaxed">
              These rules shape every brief we take.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {refusals.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.55, ease }}
                className="group border border-[var(--border)] bg-white p-8 md:p-10 hover:border-[var(--accent-gold-bright)] transition-colors"
              >
                <span className="font-serif text-5xl text-[var(--surface)] group-hover:text-[var(--accent-gold-bright)]/25 transition-colors leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-2xl mt-4 mb-3">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent-gold)] font-semibold mb-4">
            How the studio runs
          </p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-12 max-w-xl">
            Small on purpose. Reachable on WhatsApp.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {operating.map((row) => (
              <div key={row.label}>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)] mb-2 font-semibold">
                  {row.label}
                </p>
                <p className="font-serif text-xl md:text-2xl leading-snug">
                  {row.value}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative aspect-[16/10] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img("about_gallery_1")}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img("about_gallery_2")}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-28 md:py-36 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img("about_cta")}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--text-primary)]/82" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white">
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-[1.05] mb-5">
            Ready to plan your flat?
          </h2>
          <p className="text-white/65 leading-relaxed mb-3 max-w-lg mx-auto">
            Send your builder floor plan for a free review—or message us on
            WhatsApp to start.
          </p>
          <a
            href={`mailto:${BRAND_INFO.contact.email}`}
            className="text-sm text-[var(--accent-gold-bright)] hover:text-white"
          >
            {BRAND_INFO.contact.email}
          </a>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/#apply"
              className="inline-flex items-center justify-center bg-[var(--accent-gold-bright)] text-[var(--text-primary)] px-8 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
            >
              Get a free layout review
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-white/40 px-8 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-white/10 transition-colors"
            >
              WhatsApp the studio
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
