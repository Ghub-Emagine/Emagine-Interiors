import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PortfolioViewContent from "@/components/portfolio/PortfolioViewContent";
import JsonLd from "@/components/seo/JsonLd";
import { getProjectBySlug, getPublishedProjects } from "@/lib/cms";
import { portfolioProjectJsonLd } from "@/lib/seo";
import { getSiteSettings, brandFromSettings } from "@/lib/site-settings";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project | Emagine Design Studio" };
  return {
    title: `${project.title} | Emagine Design Studio`,
    description: project.summary || undefined,
  };
}

function galleryAlt(
  title: string,
  slug: string,
  location: string | null,
  index: number,
  total: number,
) {
  const place = location?.trim() || slug;
  if (total === 1) return `${title} — interiors, ${place}`;
  return `${title} — interiors, ${place} (photo ${index + 1} of ${total})`;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const settings = await getSiteSettings();
  const brand = brandFromSettings(settings);
  const whatsapp = brand.contact.whatsapp;

  const wantThisLookHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    `Hi Emagine — I want this look: "${project.title}" (portfolio/${project.slug}). Can we plan something similar for my Chennai flat?`,
  )}`;

  const gallery = [
    ...(project.cover_image_url ? [project.cover_image_url] : []),
    ...(project.gallery_urls ?? []).filter(
      (url) => url && url !== project.cover_image_url,
    ),
  ];

  return (
    <>
      <JsonLd data={portfolioProjectJsonLd(project)} />
      <PortfolioViewContent title={project.title} slug={project.slug} />
      <div className="bg-[var(--background)] min-h-screen">
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-end overflow-hidden">
        {project.cover_image_url ? (
          <Image
            src={project.cover_image_url}
            alt={galleryAlt(
              project.title,
              project.slug,
              project.location,
              0,
              Math.max(gallery.length, 1),
            )}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-[var(--surface)]" />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[var(--text-primary)]/80 via-[var(--text-primary)]/30 to-transparent"
          aria-hidden
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-14">
          <Link
            href="/portfolio"
            className="text-xs uppercase tracking-widest text-white/70 hover:text-white"
          >
            ← Our work
          </Link>
          <h1 className="mt-4 font-serif text-4xl md:text-5xl text-[#FBFBFA]">
            {project.title}
          </h1>
          <p className="mt-3 text-sm text-white/75">
            {[project.developer, project.location, project.tier]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-16">
        {project.summary && (
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            {project.summary}
          </p>
        )}
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <a
            href={wantThisLookHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border-2 border-[#25D366] text-[#128C7E] bg-[#25D366]/10 px-6 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-[#25D366]/20 transition-colors min-h-[48px]"
          >
            I want this look
          </a>
          <Link href="/#apply" className="btn-primary inline-flex min-h-[48px]">
            Plan a similar home
          </Link>
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20 grid grid-cols-1 md:grid-cols-2 gap-4">
          {gallery.map((url, index) => (
            <div
              key={url}
              className="relative w-full aspect-[4/3] border border-[var(--border)] overflow-hidden"
            >
              <Image
                src={url}
                alt={galleryAlt(
                  project.title,
                  project.slug,
                  project.location,
                  index,
                  gallery.length,
                )}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </section>
      )}
    </div>
    </>
  );
}
