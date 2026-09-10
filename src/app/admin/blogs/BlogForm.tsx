import { saveBlog } from "./actions";
import type { BlogPost } from "@/lib/types";

export default function BlogForm({ post }: { post?: BlogPost | null }) {
  return (
    <form action={saveBlog} className="space-y-8 max-w-3xl">
      {post?.id && <input type="hidden" name="id" value={post.id} />}

      <section className="space-y-5">
        <h2 className="font-serif text-xl border-b border-[var(--border)] pb-2">
          Post
        </h2>
        <p className="text-sm text-[var(--text-secondary)]">
          Paste AI-drafted copy into Title, Excerpt, and Body. Publish when ready
          — no code deploy needed.
        </p>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Title *
          </label>
          <input
            name="title"
            required
            defaultValue={post?.title ?? ""}
            className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Slug (URL)
          </label>
          <input
            name="slug"
            defaultValue={post?.slug ?? ""}
            placeholder="auto from title"
            className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Excerpt (SEO / listing)
          </label>
          <textarea
            name="excerpt"
            rows={2}
            defaultValue={post?.excerpt ?? ""}
            placeholder="1–2 sentences for Google & the blog index"
            className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Body *
          </label>
          <textarea
            name="body"
            required
            rows={16}
            defaultValue={post?.body ?? ""}
            placeholder="Write or paste the full article. Use blank lines between paragraphs. Headings: start a line with ## "
            className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm font-mono leading-relaxed"
          />
          <p className="text-xs text-[var(--text-secondary)] mt-2">
            Tip for AI: ask for markdown-ish text with ## headings and blank-line
            paragraphs, then paste here.
          </p>
        </div>
      </section>

      <section className="space-y-5 border border-[var(--accent-gold-bright)]/40 bg-[var(--surface)] p-6">
        <h2 className="font-serif text-xl">Cover image</h2>
        {post?.cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover_image_url}
            alt=""
            className="h-40 w-full max-w-md object-cover border border-[var(--border)]"
          />
        )}
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Cover image URL
          </label>
          <input
            name="cover_image_url"
            defaultValue={post?.cover_image_url ?? ""}
            className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Or upload cover
          </label>
          <input
            name="cover_file"
            type="file"
            accept="image/*"
            className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[var(--text-primary)] file:text-white file:text-xs file:uppercase file:tracking-widest"
          />
        </div>
      </section>

      <div>
        <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
          Status
        </label>
        <select
          name="status"
          defaultValue={post?.status ?? "draft"}
          className="border border-[var(--border)] bg-white px-4 py-2 text-sm"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <button type="submit" className="btn-primary">
        Save post
      </button>
    </form>
  );
}
