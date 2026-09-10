"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { PortfolioProject } from "@/lib/types";

const spanClasses = [
  "md:col-span-7 md:row-span-2 min-h-[420px] md:min-h-[640px]",
  "md:col-span-5 min-h-[280px] md:min-h-[310px]",
  "md:col-span-5 min-h-[280px] md:min-h-[310px]",
  "md:col-span-12 min-h-[320px] md:min-h-[420px]",
];

export default function PortfolioArchive({
  projects,
}: {
  projects: PortfolioProject[];
}) {
  return (
    <div className="bg-[#1A1A1A] text-[#FBFBFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#FBFBFA]/70 hover:text-[#FBFBFA] transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          Return Home
        </Link>

        <header className="mb-16 md:mb-20 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold-bright)] mb-4">
            Chennai · Selected works
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-6">
            Projects we&apos;ve verified before possession
          </h1>
          <p className="text-[#FBFBFA]/65 text-base md:text-lg leading-relaxed">
            Developer flats across ECR, OMR, and the city core—planned in 3D so
            what you approve is what gets built.
          </p>
        </header>

        {projects.length === 0 ? (
          <p className="text-[#FBFBFA]/60 text-sm">
            No published projects yet. Check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                className={`group relative overflow-hidden bg-[#242424] ${
                  spanClasses[index % spanClasses.length]
                }`}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.9,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link href={`/portfolio/${project.slug}`} className="absolute inset-0 z-10">
                  <span className="sr-only">View {project.title}</span>
                </Link>
                {project.cover_image_url && (
                  <img
                    src={project.cover_image_url}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-[1]">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#FBFBFA]/60 mb-2">
                    {[project.tier, project.location].filter(Boolean).join(" · ")}
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl tracking-tight">
                    {project.title}
                  </h2>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
