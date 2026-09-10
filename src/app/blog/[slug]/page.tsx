import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPublishedPosts } from "@/lib/cms";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post | Emagine Design Studio" };
  return {
    title: `${post.title} | Emagine Design Studio`,
    description: post.excerpt || undefined,
  };
}

/** Lightweight body renderer: ## headings + blank-line paragraphs */
function renderBody(body: string) {
  const blocks = body.split(/\n\n+/).filter(Boolean);
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("## ")) {
      return (
        <h2 key={i} className="font-serif text-2xl md:text-3xl mt-10 mb-4">
          {trimmed.replace(/^##\s+/, "")}
        </h2>
      );
    }
    if (trimmed.startsWith("# ")) {
      return (
        <h2 key={i} className="font-serif text-2xl md:text-3xl mt-10 mb-4">
          {trimmed.replace(/^#\s+/, "")}
        </h2>
      );
    }
    return (
      <p
        key={i}
        className="text-[var(--text-secondary)] leading-relaxed mb-5 whitespace-pre-line"
      >
        {trimmed}
      </p>
    );
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <article className="bg-[var(--background)] min-h-screen">
      <header className="border-b border-[var(--border)]">
        {post.cover_image_url && (
          <div className="relative aspect-[21/9] max-h-[420px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover_image_url}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <Link
            href="/blog"
            className="text-xs uppercase tracking-widest text-[var(--accent-gold)] hover:underline"
          >
            ← All articles
          </Link>
          {date && (
            <p className="text-xs uppercase tracking-widest text-[var(--text-secondary)] mt-6 mb-3">
              {date}
            </p>
          )}
          <h1 className="font-serif text-3xl md:text-5xl leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-5 text-lg text-[var(--text-secondary)] leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-16">
        {renderBody(post.body)}

        <div className="mt-16 pt-10 border-t border-[var(--border)]">
          <p className="font-serif text-2xl mb-4">
            Planning interiors for a Chennai flat?
          </p>
          <Link href="/#apply" className="btn-primary inline-flex">
            Request a layout review
          </Link>
        </div>
      </div>
    </article>
  );
}
