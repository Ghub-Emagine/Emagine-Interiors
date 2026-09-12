import { savePageImage } from "./actions";
import type { PageImage } from "@/lib/types";

export default function PageImageForm({ image }: { image: PageImage }) {
  const mediaType = image.media_type ?? "image";

  return (
    <form action={savePageImage} className="space-y-6 max-w-xl">
      <input type="hidden" name="id" value={image.id} />

      {mediaType === "video" ? (
        <video
          src={image.image_url}
          className="w-full max-w-md aspect-video object-cover border border-[var(--border)] bg-black"
          muted
          controls
          playsInline
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image.image_url}
          alt={image.alt_text ?? image.label}
          className="w-full max-w-md aspect-video object-cover border border-[var(--border)]"
        />
      )}

      <div>
        <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
          Label
        </label>
        <input
          name="label"
          defaultValue={image.label}
          className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
          Media type
        </label>
        <select
          name="media_type"
          defaultValue={mediaType}
          className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
        >
          <option value="image">Image</option>
          <option value="video">Video (muted autoplay)</option>
        </select>
      </div>

      <div className="border border-[var(--accent-gold-bright)]/40 bg-[var(--surface)] p-5 space-y-4">
        <p className="text-sm text-[var(--text-secondary)]">
          Upload a Chennai project photo or short MP4/WebM (muted loop), or paste
          a URL. Homepage hero videos also live under Admin → Hero.
        </p>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Upload media
          </label>
          <input
            name="image_file"
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
            name="image_url"
            defaultValue={image.image_url}
            placeholder="https://…"
            className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
          Alt text
        </label>
        <input
          name="alt_text"
          defaultValue={image.alt_text ?? ""}
          className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
        />
      </div>

      <button type="submit" className="btn-primary">
        Save media
      </button>
    </form>
  );
}
