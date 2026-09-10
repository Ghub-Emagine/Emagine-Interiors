import { saveTestimonial } from "./actions";
import type { Testimonial } from "@/lib/types";

export default function TestimonialForm({
  testimonial,
}: {
  testimonial?: Testimonial | null;
}) {
  return (
    <form action={saveTestimonial} className="space-y-6 max-w-2xl">
      {testimonial?.id && (
        <input type="hidden" name="id" value={testimonial.id} />
      )}
      <div>
        <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
          Client name *
        </label>
        <input
          name="client_name"
          required
          defaultValue={testimonial?.client_name ?? ""}
          className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
          Project label
        </label>
        <input
          name="project_label"
          defaultValue={testimonial?.project_label ?? ""}
          placeholder="Casagrand · ECR"
          className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
          Quote *
        </label>
        <textarea
          name="quote"
          required
          rows={4}
          defaultValue={testimonial?.quote ?? ""}
          className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Rating (1–5)
          </label>
          <input
            name="rating"
            type="number"
            min={1}
            max={5}
            defaultValue={testimonial?.rating ?? 5}
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
            defaultValue={testimonial?.sort_order ?? 0}
            className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Status
          </label>
          <select
            name="status"
            defaultValue={testimonial?.status ?? "draft"}
            className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>
      <button type="submit" className="btn-primary">
        Save testimonial
      </button>
    </form>
  );
}
