"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { BRAND_INFO } from "@/lib/constants";
import { pageImage } from "@/lib/page-image-slots";
import BrandMark from "@/components/layout/BrandMark";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const outcomes = [
  {
    title: "Fewer costly surprises",
    detail:
      "You see a realistic budget band and layout risks before you lock materials or pay a big advance.",
  },
  {
    title: "One team, one schedule",
    detail:
      "Kitchen, wardrobes, and room finishes stay with Emagine—so you are not chasing five contractors.",
  },
  {
    title: "What you approved is what gets built",
    detail:
      "3D of your actual flat locks finishes first. Site work follows that plan, not a showroom memory.",
  },
];

const risks = [
  {
    decision: "First step",
    other: "Showroom tour first",
    eds: "Your floor plan first—priced for your flat size",
  },
  {
    decision: "Pricing",
    other: "Quote after you are emotionally invested",
    eds: "Published ₹/sqft bands before you commit",
  },
  {
    decision: "Design basis",
    other: "Generic sample rooms",
    eds: "Design matched to your builder layout",
  },
  {
    decision: "Who builds",
    other: "Many contractors, unclear ownership",
    eds: "Modular kitchens and full-home finish by one studio",
  },
  {
    decision: "Materials",
    other: "Vague ‘premium’ materials",
    eds: "Named BWP ply and hardware in the brief",
  },
];

const objections = [
  {
    q: "I’m already talking to a big brand showroom",
    a: "Keep talking to them—and send us the same floor plan. Compare a clear ₹/sqft band and layout notes against a showroom quote. Most owners just want the fairest starting point.",
  },
  {
    q: "Is Emagine only for new builder flats?",
    a: "Pre-possession apartments in Chennai are our focus (Casagrand, Appaswamy, Akshaya, SPR City and similar). Older renovations—ask on WhatsApp; we’ll say if we’re the right fit.",
  },
  {
    q: "Will this delay my possession timeline?",
    a: "Layout review is usually same-day. Design and site phases lock after you approve 3D—so work starts with a fixed scope, not open-ended site debates.",
  },
];

export default function WhyUsContent({
  images,
}: {
  images: Record<string, string>;
}) {
  const img = (key: string) => pageImage(images, key);
  const whatsappHref = `https://wa.me/${BRAND_INFO.contact.whatsapp}?text=${encodeURIComponent(
    "Hi Emagine — I want to compare EDS with other interior options for my Chennai flat.",
  )}`;

  return (
    <div className="bg-[var(--background)] text-[var(--text-primary)] min-h-screen">
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img("why_hero")}
          alt="Chennai apartment interiors"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[var(--text-primary)]/85 via-[var(--text-primary)]/45 to-[var(--text-primary)]/20"
          aria-hidden
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-16 md:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#FBFBFA]/70 hover:text-[#FBFBFA] transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            Back to home
          </Link>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="max-w-2xl"
          >
            <motion.div variants={fadeUp} className="mb-4">
              <BrandMark variant="onDark" size="hero" withStudio />
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent-gold-bright)] font-semibold mb-4"
            >
              Why Emagine · Chennai
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-serif text-3xl md:text-5xl text-[#FBFBFA] font-medium leading-tight mb-5"
            >
              The safer way to start interiors for your new flat
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-[#FBFBFA]/80 text-base md:text-lg leading-relaxed mb-8 max-w-xl"
            >
              Big showrooms sell the visit. Loose contractors sell flexibility.
              Emagine sells clarity—budget, layout, and materials—before you
              spend.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
              <Link href="/#apply" className="btn-primary text-center">
                Get a free layout review
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-white/40 text-white px-8 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-white/10"
              >
                WhatsApp to compare
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Outcomes — not a process remix */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent-gold)] font-semibold mb-4">
            What you actually get
          </p>
          <h2 className="font-serif text-3xl md:text-5xl tracking-tight max-w-2xl mb-12 leading-tight">
            What changes when you start with Emagine
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {outcomes.map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.55 }}
                className="border border-[var(--border)] bg-white p-8 hover:border-[var(--accent-gold-bright)] transition-colors"
              >
                <span className="font-serif text-4xl text-[var(--accent-gold-bright)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-2xl mt-4 mb-3">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.detail}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Visual proof strip */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {[
          { img: img("why_strip_kitchen"), label: "Modular kitchens" },
          { img: img("why_strip_living"), label: "Living that fits the plan" },
          { img: img("why_strip_bedroom"), label: "Wardrobes & bedrooms" },
        ].map((cell) => (
          <div key={cell.label} className="relative aspect-[4/3] md:aspect-auto md:min-h-[320px] overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cell.img}
              alt={cell.label}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/35" />
            <p className="absolute bottom-6 left-6 font-serif text-2xl text-white">
              {cell.label}
            </p>
          </div>
        ))}
      </section>

      {/* Risk table — robust comparison */}
      <section className="py-20 md:py-28 bg-[var(--surface)]">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent-gold)] font-semibold mb-4">
            Side by side
          </p>
          <h2 className="font-serif text-3xl md:text-5xl tracking-tight mb-4 leading-tight">
            Showroom path vs Emagine path
          </h2>
          <p className="text-[var(--text-secondary)] mb-10 max-w-xl leading-relaxed">
            Use this when you are comparing options for a Chennai flat—before
            you sign anything.
          </p>
          <div className="overflow-x-auto border border-[var(--border)] bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--text-primary)] text-white">
                <tr>
                  <th className="p-4 md:p-5 font-semibold uppercase tracking-widest text-xs">
                    Decision
                  </th>
                  <th className="p-4 md:p-5 font-semibold uppercase tracking-widest text-xs text-white/60">
                    Typical path
                  </th>
                  <th className="p-4 md:p-5 font-semibold uppercase tracking-widest text-xs text-[var(--accent-gold-bright)]">
                    With Emagine
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {risks.map((row) => (
                  <tr key={row.decision} className="align-top">
                    <td className="p-4 md:p-5 font-medium text-[var(--text-primary)]">
                      {row.decision}
                    </td>
                    <td className="p-4 md:p-5 text-[var(--text-secondary)]">
                      {row.other}
                    </td>
                    <td className="p-4 md:p-5 text-[var(--text-primary)] font-medium">
                      {row.eds}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-[var(--text-secondary)]">
            Materials detail and ₹/sqft calculator live on the{" "}
            <Link href="/#material" className="text-[var(--accent-gold)] underline">
              homepage
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Objections */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent-gold)] font-semibold mb-4">
            Straight answers
          </p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-10">
            Questions owners ask before switching
          </h2>
          <div className="space-y-6">
            {objections.map((item) => (
              <div
                key={item.q}
                className="border-b border-[var(--border)] pb-6"
              >
                <h3 className="font-serif text-xl md:text-2xl mb-3">{item.q}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strong close */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img("why_cta")}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--text-primary)]/80" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center text-white">
          <h2 className="font-serif text-3xl md:text-5xl tracking-tight mb-5 leading-tight">
            Compare us with your floor plan—not a brochure
          </h2>
          <p className="text-white/70 mb-10 leading-relaxed">
            Send the plan. Get layout notes and a budget band. Then decide with
            numbers, not showroom pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/#apply" className="btn-primary">
              Request free layout review
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-white/40 px-8 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-white/10"
            >
              WhatsApp {BRAND_INFO.contact.location.split(",")[0]}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
