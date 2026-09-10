import Link from "next/link";
import { getPublishedPosts } from "@/lib/cms";

export const metadata = {
  title: "Blog | Emagine Design Studio",
  description:
    "Guides on Chennai flat interiors, layout planning, modular kitchens, and materials from Emagine Design Studio.",
};

function formatDate(iso: string | null) {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return null;
  }
}

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="bg-[var(--background)] min-h-screen">
      <section className="border-b border-[var(--border)] atmosphere py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-3">
            Insights
          </p>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">
            Layout, materials &amp; Chennai flats
          </h1>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Practical notes from the studio—written for homeowners planning
            modular and full-home interiors before possession.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 max-w-7xl mx-auto px-6 md:px-12">
        {posts.length === 0 ? (
          <div className="border border-dashed border-[var(--border)] p-12 text-center max-w-xl mx-auto">
            <p className="font-serif text-2xl mb-3">Articles coming soon</p>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              Meanwhile, start with a free layout review of your builder plan.
            </p>
            <Link href="/#apply" className="btn-primary inline-flex">
              Send your floor plan
            </Link>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl">
            {posts.map((post) => (
              <li key={post.id}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  {post.cover_image_url && (
                    <div className="aspect-[16/10] overflow-hidden border border-[var(--border)] mb-5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.cover_image_url}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      />
                    </div>
                  )}
                  {formatDate(post.published_at) && (
                    <p className="text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2">
                      {formatDate(post.published_at)}
                    </p>
                  )}
                  <h2 className="font-serif text-2xl md:text-3xl group-hover:text-[var(--accent-gold)] transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
