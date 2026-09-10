"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SERVICE_LINES } from "@/lib/constants";
import { pageImage } from "@/lib/page-image-slots";

const serviceSlots = [
  "home_service_1",
  "home_service_2",
  "home_service_3",
  "home_service_4",
];

export default function ServicesSection({
  images,
}: {
  images: Record<string, string>;
}) {
  return (
    <section
      id="services"
      className="py-24 md:py-32 border-t border-[var(--border)] scroll-mt-24 bg-[var(--text-primary)] text-[#FBFBFA]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold-bright)] mb-4">
              What we deliver
            </p>
            <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-5">
              Full-home interiors—without the experience-centre detour.
            </h2>
            <p className="text-white/65 leading-relaxed max-w-md">
              From free layout review to modular kitchens and on-site finish. You
              work with the studio, not a mall of sample rooms.
            </p>
            <Link
              href="/#apply"
              className="inline-flex mt-8 bg-[var(--accent-gold-bright)] text-[var(--text-primary)] px-7 py-3.5 text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
            >
              Start with your floor plan
            </Link>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERVICE_LINES.map((service, index) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative overflow-hidden min-h-[240px] border border-white/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pageImage(images, serviceSlots[index])}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
                <div className="relative z-10 p-6 md:p-7 h-full flex flex-col justify-end">
                  <span className="font-serif text-4xl text-[var(--accent-gold-bright)]/90 mb-2">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-2xl mb-2">{service.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {service.detail}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
