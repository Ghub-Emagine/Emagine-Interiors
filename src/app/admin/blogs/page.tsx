import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/types";
import { deleteBlog, setBlogStatus } from "./actions";

export default async function AdminBlogsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts_site")
    .select("*")
    .order("updated_at", { ascending: false });

  const posts = (data ?? []) as BlogPost[];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-2">
            SEO content
          </p>
          <h1 className="font-serif text-4xl mb-2">Blog</h1>
          <p className="text-sm text-[var(--text-secondary)] max-w-lg">
            Publish articles without touching code. Draft with AI, paste here,
            hit publish — live on{" "}
            <Link href="/blog" className="text-[var(--accent-gold)] underline">
              /blog
            </Link>
            .
          </p>
        </div>
        <Link href="/admin/blogs/new" className="btn-primary shrink-0">
          New post
        </Link>
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error.message}</p>}

      {posts.length === 0 ? (
        <div className="border border-dashed border-[var(--border)] bg-[var(--background)] p-12 text-center">
          <p className="font-serif text-xl mb-2">No posts yet</p>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            Start with a Chennai flat interiors guide or layout checklist.
          </p>
          <Link href="/admin/blogs/new" className="btn-primary inline-flex">
            Write first post
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border border-[var(--border)] bg-[var(--background)] p-5 flex flex-col md:flex-row md:items-start justify-between gap-4"
            >
              <div>
                <div className="font-medium">{post.title}</div>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  /blog/{post.slug}
                </p>
                {post.excerpt && (
                  <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-2xl">
                    {post.excerpt}
                  </p>
                )}
                <p className="text-xs uppercase tracking-widest text-[var(--accent-gold)] mt-3">
                  {post.status}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href={`/admin/blogs/${post.id}`}
                  className="text-xs uppercase tracking-widest text-[var(--accent-gold)] hover:underline"
                >
                  Edit
                </Link>
                <form
                  action={setBlogStatus.bind(
                    null,
                    post.id,
                    post.status === "published" ? "draft" : "published",
                  )}
                >
                  <button
                    type="submit"
                    className="text-xs uppercase tracking-widest text-[var(--text-secondary)]"
                  >
                    {post.status === "published" ? "Unpublish" : "Publish"}
                  </button>
                </form>
                <form action={deleteBlog.bind(null, post.id)}>
                  <button
                    type="submit"
                    className="text-xs uppercase tracking-widest text-red-700"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
