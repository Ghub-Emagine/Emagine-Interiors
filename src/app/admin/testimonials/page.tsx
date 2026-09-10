import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Testimonial } from "@/lib/types";
import { deleteTestimonial, setTestimonialStatus } from "./actions";

export default async function AdminTestimonialsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });

  const items = (data ?? []) as Testimonial[];

  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-2">
            Social proof
          </p>
          <h1 className="font-serif text-4xl mb-2">Testimonials</h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Quotes that appear on the homepage when published.
          </p>
        </div>
        <Link href="/admin/testimonials/new" className="btn-primary">
          New testimonial
        </Link>
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error.message}</p>}

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-[var(--border)] bg-[var(--background)] p-5 flex flex-col md:flex-row md:items-start justify-between gap-4"
          >
            <div>
              <div className="font-medium">
                {item.client_name}
                {item.project_label ? (
                  <span className="text-[var(--text-secondary)] font-normal">
                    {" "}
                    · {item.project_label}
                  </span>
                ) : null}
              </div>
              <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-2xl">
                “{item.quote}”
              </p>
              <p className="text-xs uppercase tracking-widest text-[var(--accent-gold)] mt-3">
                {item.status}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href={`/admin/testimonials/${item.id}`}
                className="text-xs uppercase tracking-widest text-[var(--accent-gold)] hover:underline"
              >
                Edit
              </Link>
              <form
                action={setTestimonialStatus.bind(
                  null,
                  item.id,
                  item.status === "published" ? "draft" : "published",
                )}
              >
                <button
                  type="submit"
                  className="text-xs uppercase tracking-widest text-[var(--text-secondary)]"
                >
                  {item.status === "published" ? "Unpublish" : "Publish"}
                </button>
              </form>
              <form action={deleteTestimonial.bind(null, item.id)}>
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
    </div>
  );
}
