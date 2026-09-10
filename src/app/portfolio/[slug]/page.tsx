import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getPublishedProjects } from "@/lib/cms";

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

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const gallery = [
    ...(project.cover_image_url ? [project.cover_image_url] : []),
    ...(project.gallery_urls ?? []).filter(
      (url) => url && url !== project.cover_image_url,
    ),
  ];

  return (
    <div className="bg-[var(--background)] min-h-screen">
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-end overflow-hidden">
        {project.cover_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.cover_image_url}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
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
        <Link href="/#apply" className="btn-primary inline-flex mt-10">
          Plan a similar home
        </Link>
      </section>

      {gallery.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20 grid grid-cols-1 md:grid-cols-2 gap-4">
          {gallery.map((url) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={url}
              src={url}
              alt=""
              className="w-full aspect-[4/3] object-cover border border-[var(--border)]"
            />
          ))}
        </section>
      )}
    </div>
  );
}
