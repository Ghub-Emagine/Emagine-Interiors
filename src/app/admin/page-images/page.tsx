import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { PageImage } from "@/lib/types";
import { ensurePageImageSlots } from "./actions";

export default async function AdminPageImagesPage() {
  const supabase = await createClient();
  let { data, error } = await supabase
    .from("page_images")
    .select("*")
    .order("page_group", { ascending: true })
    .order("sort_order", { ascending: true });

  if (!error && (!data || data.length === 0)) {
    try {
      await ensurePageImageSlots();
      const again = await supabase
        .from("page_images")
        .select("*")
        .order("page_group", { ascending: true })
        .order("sort_order", { ascending: true });
      data = again.data;
      error = again.error;
    } catch {
      /* seed may fail if offline; show empty */
    }
  }

  const images = (data ?? []) as PageImage[];
  const groups = Array.from(new Set(images.map((i) => i.page_group)));

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-2">
            Site visuals
          </p>
          <h1 className="font-serif text-4xl mb-2">Page images</h1>
          <p className="text-sm text-[var(--text-secondary)] max-w-lg">
            Swap photos on About, Why Emagine, Layout review, and homepage
            bands—upload your Chennai project shots here. Homepage hero still
            uses the Hero section.
          </p>
        </div>
        <form action={ensurePageImageSlots}>
          <button type="submit" className="btn-secondary shrink-0">
            Sync missing slots
          </button>
        </form>
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error.message}</p>}

      {groups.map((group) => (
        <section key={group} className="mb-12">
          <h2 className="font-serif text-2xl mb-4 border-b border-[var(--border)] pb-2">
            {group}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images
              .filter((img) => img.page_group === group)
              .map((img) => (
                <div
                  key={img.id}
                  className="border border-[var(--border)] bg-[var(--background)] overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.image_url}
                    alt={img.alt_text ?? img.label}
                    className="aspect-video w-full object-cover"
                  />
                  <div className="p-4">
                    <p className="font-serif text-lg mb-1">{img.label}</p>
                    <p className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] mb-3">
                      {img.slot_key}
                    </p>
                    <Link
                      href={`/admin/page-images/${img.id}`}
                      className="text-xs uppercase tracking-widest text-[var(--accent-gold)] hover:underline"
                    >
                      Change image
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </section>
      ))}

      {images.length === 0 && !error && (
        <div className="border border-dashed border-[var(--border)] p-12 text-center">
          <p className="font-serif text-xl mb-4">No page images yet</p>
          <form action={ensurePageImageSlots}>
            <button type="submit" className="btn-primary inline-flex">
              Create default slots
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
