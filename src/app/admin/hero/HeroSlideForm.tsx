import { saveHeroSlide } from "./actions";
import type { HeroSlide } from "@/lib/types";

export default function HeroSlideForm({ slide }: { slide?: HeroSlide | null }) {
  return (
    <form action={saveHeroSlide} className="space-y-6 max-w-xl">
      {slide?.id && <input type="hidden" name="id" value={slide.id} />}

      <div>
        <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
          Media type *
        </label>
        <select
          name="media_type"
          defaultValue={slide?.media_type ?? "image"}
          className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
        >
          <option value="image">Image</option>
          <option value="video">Video (muted autoplay)</option>
        </select>
      </div>

      {slide?.media_url && (
        <div>
          {slide.media_type === "video" ? (
            <video
              src={slide.media_url}
              className="h-40 w-full max-w-md object-cover border border-[var(--border)]"
              muted
              controls
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={slide.media_url}
              alt=""
              className="h-40 w-full max-w-md object-cover border border-[var(--border)]"
            />
          )}
        </div>
      )}

      <div className="border border-[var(--accent-gold-bright)]/40 bg-[var(--surface)] p-5 space-y-4">
        <p className="text-sm text-[var(--text-secondary)]">
          Upload image or short MP4/WebM. Videos play muted on the homepage.
        </p>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Upload media
          </label>
          <input
            name="media_file"
            type="file"
            accept="image/*,video/mp4,video/webm"
            className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[var(--text-primary)] file:text-white file:text-xs file:uppercase file:tracking-widest"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Or media URL
          </label>
          <input
            name="media_url"
            defaultValue={slide?.media_url ?? ""}
            placeholder="https://…"
            className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
          Video poster URL (optional)
        </label>
        <input
          name="poster_url"
          defaultValue={slide?.poster_url ?? ""}
          className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
        />
        <input
          name="poster_file"
          type="file"
          accept="image/*"
          className="mt-2 block w-full text-sm"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
          Alt text
        </label>
        <input
          name="alt_text"
          defaultValue={slide?.alt_text ?? ""}
          className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Sort order
          </label>
          <input
            name="sort_order"
            type="number"
            defaultValue={slide?.sort_order ?? 0}
            className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Status
          </label>
          <select
            name="status"
            defaultValue={slide?.status ?? "published"}
            className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <button type="submit" className="btn-primary">
        Save slide
      </button>
    </form>
  );
}
