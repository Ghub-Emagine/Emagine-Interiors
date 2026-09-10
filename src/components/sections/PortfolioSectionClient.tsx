"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { PortfolioProject } from "@/lib/types";

function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block shrink-0 w-[78vw] sm:w-[400px] md:w-[440px]"
    >
      <div className="aspect-[4/3] relative overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
        {project.cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.cover_image_url}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h3 className="font-serif text-2xl">{project.title}</h3>
          <p className="text-xs uppercase tracking-widest text-white/70 mt-1">
            {[project.location, project.tier].filter(Boolean).join(" · ")}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function PortfolioSectionClient({
  projects,
}: {
  projects: PortfolioProject[];
}) {
  const filters = useMemo(() => {
    const developers = Array.from(
      new Set(
        projects
          .map((p) => p.developer)
          .filter((d): d is string => Boolean(d)),
      ),
    );
    return ["All", ...developers];
  }, [projects]);

  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.developer === activeFilter);

  // Enough copies so CSS marquee always has width to scroll
  const loopItems =
    filtered.length === 0
      ? []
      : [...filtered, ...filtered, ...filtered, ...filtered];

  return (
    <section id="work" className="py-24 atmosphere scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-3">
              Selected work
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-primary)] mb-4">
              Homes planned for Chennai flats
            </h2>
            <p className="text-[var(--text-secondary)] max-w-xl leading-relaxed">
              Designed from real builder layouts—before possession—not copied from
              sample rooms.
            </p>
          </div>

          {filters.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] whitespace-nowrap">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`pb-1 transition-colors ${
                    activeFilter === filter
                      ? "text-[var(--text-primary)] border-b border-[var(--text-primary)]"
                      : "hover:text-[var(--text-primary)]"
                  }`}
                >
                  {filter === "All" ? "All Projects" : filter}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-[var(--text-secondary)] text-sm py-12">
          No published projects yet.
        </p>
      ) : (
        <div className="works-marquee overflow-hidden">
          <div className="works-marquee-track flex w-max gap-5 px-6 md:px-12">
            {loopItems.map((project, i) => (
              <ProjectCard key={`${project.id}-${i}`} project={project} />
            ))}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 text-center">
        <Link href="/portfolio" className="btn-secondary inline-flex">
          View full archive
        </Link>
      </div>
    </section>
  );
}
