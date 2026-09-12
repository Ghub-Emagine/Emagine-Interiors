"use client";

import Link from "next/link";
import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const developerFilter = searchParams.get("developer")?.trim() || "";
  const tierFilter = searchParams.get("tier")?.trim() || "";

  const developers = useMemo(() => {
    const set = new Set<string>();
    for (const p of projects) {
      if (p.developer?.trim()) set.add(p.developer.trim());
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const tiers = useMemo(() => {
    const set = new Set<string>();
    for (const p of projects) {
      if (p.tier?.trim()) set.add(p.tier.trim());
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const setFilter = useCallback(
    (key: "developer" | "tier", value: string) => {
      const q = new URLSearchParams(searchParams.toString());
      if (value) q.set(key, value);
      else q.delete(key);
      const s = q.toString();
      router.replace(s ? `${pathname}?${s}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (developerFilter && (p.developer?.trim() || "") !== developerFilter) {
        return false;
      }
      if (tierFilter && (p.tier?.trim() || "") !== tierFilter) {
        return false;
      }
      return true;
    });
  }, [projects, developerFilter, tierFilter]);

  const selectClass =
    "bg-[#242424] border border-white/15 text-[#FBFBFA] px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--accent-gold-bright)] min-w-[10rem]";

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

        <header className="mb-10 md:mb-12 max-w-2xl">
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

        {projects.length > 0 && (developers.length > 0 || tiers.length > 0) && (
          <div className="mb-10 flex flex-wrap gap-4 items-end border-b border-white/10 pb-8">
            {developers.length > 0 && (
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#FBFBFA]/55 mb-2 font-semibold">
                  Developer
                </label>
                <select
                  value={developerFilter}
                  onChange={(e) => setFilter("developer", e.target.value)}
                  className={selectClass}
                >
                  <option value="">All developers</option>
                  {developers.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {tiers.length > 0 && (
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#FBFBFA]/55 mb-2 font-semibold">
                  Tier
                </label>
                <select
                  value={tierFilter}
                  onChange={(e) => setFilter("tier", e.target.value)}
                  className={selectClass}
                >
                  <option value="">All tiers</option>
                  {tiers.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {(developerFilter || tierFilter) && (
              <button
                type="button"
                onClick={() => {
                  router.replace(pathname, { scroll: false });
                }}
                className="text-xs uppercase tracking-widest text-[var(--accent-gold-bright)] hover:underline py-2.5"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {projects.length === 0 ? (
          <p className="text-[#FBFBFA]/60 text-sm">
            No published projects yet. Check back soon.
          </p>
        ) : filtered.length === 0 ? (
          <p className="text-[#FBFBFA]/60 text-sm">
            No projects match these filters.{" "}
            <button
              type="button"
              onClick={() => router.replace(pathname, { scroll: false })}
              className="text-[var(--accent-gold-bright)] underline"
            >
              Clear filters
            </button>
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
            {filtered.map((project, index) => (
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
                  // eslint-disable-next-line @next/next/no-img-element
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
