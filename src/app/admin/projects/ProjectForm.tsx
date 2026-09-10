import { saveProject } from "./actions";
import type { PortfolioProject } from "@/lib/types";

type Props = {
  project?: PortfolioProject | null;
};

export default function ProjectForm({ project }: Props) {
  const gallery = project?.gallery_urls?.filter(Boolean) ?? [];

  return (
    <form action={saveProject} className="space-y-8 max-w-2xl">
      {project?.id && <input type="hidden" name="id" value={project.id} />}

      <section className="space-y-5">
        <h2 className="font-serif text-xl border-b border-[var(--border)] pb-2">
          Project details
        </h2>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Title *
          </label>
          <input
            name="title"
            required
            defaultValue={project?.title ?? ""}
            className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Slug
          </label>
          <input
            name="slug"
            defaultValue={project?.slug ?? ""}
            placeholder="auto from title"
            className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
              Developer
            </label>
            <input
              name="developer"
              defaultValue={project?.developer ?? ""}
              className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
              Location
            </label>
            <input
              name="location"
              defaultValue={project?.location ?? ""}
              className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
              Tier
            </label>
            <input
              name="tier"
              defaultValue={project?.tier ?? ""}
              placeholder="Executive Tier"
              className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
              Sort order
            </label>
            <input
              name="sort_order"
              type="number"
              defaultValue={project?.sort_order ?? 0}
              className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Summary
          </label>
          <textarea
            name="summary"
            rows={3}
            defaultValue={project?.summary ?? ""}
            className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
          />
        </div>
      </section>

      <section className="space-y-5 border border-[var(--accent-gold-bright)]/40 bg-[var(--surface)] p-6">
        <div>
          <h2 className="font-serif text-xl mb-1">Images</h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Cover shows on home &amp; portfolio. Gallery can hold many photos
            (kitchen, living, bedroom…). Not the site hero — that stays on the
            marketing pages.
          </p>
        </div>

        {project?.cover_image_url && (
          <div>
            <p className="text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2">
              Current cover
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.cover_image_url}
              alt=""
              className="h-40 w-full max-w-sm object-cover border border-[var(--border)]"
            />
          </div>
        )}

        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Cover image URL
          </label>
          <input
            name="cover_image_url"
            defaultValue={project?.cover_image_url ?? ""}
            placeholder="https://… or leave blank if uploading"
            className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Upload cover image
          </label>
          <input
            name="cover_file"
            type="file"
            accept="image/*"
            className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[var(--text-primary)] file:text-white file:text-xs file:uppercase file:tracking-widest"
          />
        </div>

        {gallery.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2">
              Gallery ({gallery.length})
            </p>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {gallery.map((url) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={url}
                  src={url}
                  alt=""
                  className="aspect-square object-cover border border-[var(--border)]"
                />
              ))}
            </div>
            <textarea
              name="existing_gallery"
              defaultValue={gallery.join("\n")}
              rows={Math.min(gallery.length + 1, 6)}
              className="w-full border border-[var(--border)] bg-white px-3 py-2 text-xs font-mono"
              title="One URL per line — delete a line to remove an image"
            />
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              One URL per line. Delete a line to remove that image.
            </p>
          </div>
        )}

        {gallery.length === 0 && (
          <input type="hidden" name="existing_gallery" value="" />
        )}

        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Add gallery images (multiple)
          </label>
          <input
            name="gallery_files"
            type="file"
            accept="image/*"
            multiple
            className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[var(--accent-gold-bright)] file:text-[var(--text-primary)] file:text-xs file:uppercase file:tracking-widest file:font-semibold"
          />
          <p className="text-xs text-[var(--text-secondary)] mt-2">
            Hold Ctrl/Cmd to select several files at once.
          </p>
        </div>
      </section>

      <div className="flex flex-wrap gap-6 items-center">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={project?.featured ?? true}
          />
          Featured on home
        </label>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Status
          </label>
          <select
            name="status"
            defaultValue={project?.status ?? "draft"}
            className="border border-[var(--border)] bg-white px-4 py-2 text-sm"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <button type="submit" className="btn-primary">
        Save project
      </button>
    </form>
  );
}
