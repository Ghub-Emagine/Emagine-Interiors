"use client";

import { motion } from "framer-motion";
import { pageImage } from "@/lib/page-image-slots";

const stepMeta = [
  {
    number: "01",
    title: "Floor plan in",
    detail:
      "Share your builder floor plan. We flag light, flow, and storage issues—plus a realistic budget in lakhs.",
    slot: "home_process_1",
  },
  {
    number: "02",
    title: "See it before you buy",
    detail:
      "Photoreal 3D of your actual flat—then kitchens, wardrobes, and rooms approved before site work starts.",
    slot: "home_process_2",
  },
  {
    number: "03",
    title: "Built by one team",
    detail:
      "Making and site finish stay with us. Fewer contractors, fewer delays, one studio you can call.",
    slot: "home_process_3",
  },
];

export default function ProcessProofSection({
  images,
}: {
  images: Record<string, string>;
}) {
  const steps = stepMeta.map((step) => ({
    ...step,
    image: pageImage(images, step.slot),
  }));

  return (
    <section className="py-24 md:py-28 atmosphere border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-14 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-3">
            How it works
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-[var(--text-primary)] mb-4">
            Three steps. No showroom theatre.
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Most firms sell a visit. We sell a clear path from your builder plan
            to a finished home you already approved in 3D.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5">
          {steps.map((step, index) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.65,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group border border-[var(--border)] bg-[var(--background)] overflow-hidden"
            >
              <div className="aspect-[16/10] relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={step.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 font-serif text-3xl text-white/90 drop-shadow">
                  {step.number}
                </span>
              </div>
              <div className="p-6 md:p-7">
                <h3 className="font-serif text-2xl mb-3 text-[var(--text-primary)]">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {step.detail}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
