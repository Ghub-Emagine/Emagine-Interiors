import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { HeroSlide } from "@/lib/types";
import { deleteHeroSlide, setHeroSlideStatus } from "./actions";

export default async function AdminHeroPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hero_slides")
    .select("*")
    .order("sort_order", { ascending: true });

  const slides = (data ?? []) as HeroSlide[];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-2">
            Homepage
          </p>
          <h1 className="font-serif text-4xl mb-2">Hero slideshow</h1>
          <p className="text-sm text-[var(--text-secondary)] max-w-lg">
            Images or short muted videos that rotate on the homepage hero. Sort
            order controls the sequence.
          </p>
        </div>
        <Link href="/admin/hero/new" className="btn-primary shrink-0">
          Add slide
        </Link>
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error.message}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="border border-[var(--border)] bg-[var(--background)] overflow-hidden"
          >
            {slide.media_type === "video" ? (
              <video
                src={slide.media_url}
                className="aspect-video w-full object-cover bg-black"
                muted
                playsInline
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={slide.media_url}
                alt={slide.alt_text ?? ""}
                className="aspect-video w-full object-cover"
              />
            )}
            <div className="p-4">
              <p className="text-xs uppercase tracking-widest text-[var(--accent-gold)]">
                {slide.media_type} · {slide.status} · #{slide.sort_order}
              </p>
              <div className="flex flex-wrap gap-3 mt-3">
                <Link
                  href={`/admin/hero/${slide.id}`}
                  className="text-xs uppercase tracking-widest text-[var(--accent-gold)] hover:underline"
                >
                  Edit
                </Link>
                <form
                  action={setHeroSlideStatus.bind(
                    null,
                    slide.id,
                    slide.status === "published" ? "draft" : "published",
                  )}
                >
                  <button
                    type="submit"
                    className="text-xs uppercase tracking-widest text-[var(--text-secondary)]"
                  >
                    {slide.status === "published" ? "Unpublish" : "Publish"}
                  </button>
                </form>
                <form action={deleteHeroSlide.bind(null, slide.id)}>
                  <button
                    type="submit"
                    className="text-xs uppercase tracking-widest text-red-700"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>

      {slides.length === 0 && (
        <div className="border border-dashed border-[var(--border)] p-12 text-center">
          <p className="font-serif text-xl mb-4">No hero slides yet</p>
          <Link href="/admin/hero/new" className="btn-primary inline-flex">
            Add first slide
          </Link>
        </div>
      )}
    </div>
  );
}
