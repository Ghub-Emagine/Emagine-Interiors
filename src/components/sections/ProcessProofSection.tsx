"use client";

import { motion } from "framer-motion";
import { pageMedia } from "@/lib/page-image-slots";
import type { PageCopyItem } from "@/lib/page-copy-slots";
import { copyField, copyMeta } from "@/lib/page-copy-slots";
import type { PageMedia } from "@/lib/page-image-slots";
import SlotMedia from "@/components/ui/SlotMedia";

const stepKeys = ["process_1", "process_2", "process_3"] as const;
const imageSlots = ["home_process_1", "home_process_2", "home_process_3"];

export default function ProcessProofSection({
  images,
  copy,
}: {
  images: Record<string, PageMedia>;
  copy: Record<string, PageCopyItem>;
}) {
  const eyebrow = copyMeta(copy, "process_section", "eyebrow", "How it works");
  const sectionTitle = copyField(
    copy,
    "process_section",
    "title",
    "Three steps. No showroom theatre.",
  );
  const sectionBody = copyField(
    copy,
    "process_section",
    "body",
    "Most firms sell a visit. We sell a clear path from your builder plan to a finished home you already approved in 3D.",
  );

  const steps = stepKeys.map((key, index) => ({
    number: String(index + 1).padStart(2, "0"),
    title: copyField(copy, key, "title", `Step ${index + 1}`),
    detail: copyField(copy, key, "body", ""),
    media: pageMedia(images, imageSlots[index]),
  }));

  return (
    <section className="py-24 md:py-28 atmosphere border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-14 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-3">
            {eyebrow}
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-[var(--text-primary)] mb-4">
            {sectionTitle}
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            {sectionBody}
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
                <SlotMedia
                  url={step.media.url}
                  mediaType={step.media.media_type}
                  imgClassName="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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
