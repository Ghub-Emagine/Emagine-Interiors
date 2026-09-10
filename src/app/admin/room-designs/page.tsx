import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { RoomDesignImage } from "@/lib/types";
import { deleteRoomImage, setRoomImageStatus } from "./actions";

const labels: Record<string, string> = {
  kitchen: "Kitchen",
  living: "Living",
  bedroom: "Bedroom",
};

export default async function AdminRoomDesignsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("room_design_images")
    .select("*")
    .order("room_type", { ascending: true })
    .order("sort_order", { ascending: true });

  const items = (data ?? []) as RoomDesignImage[];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-2">
            Home · Trending designs
          </p>
          <h1 className="font-serif text-4xl mb-2">Room designs</h1>
          <p className="text-sm text-[var(--text-secondary)] max-w-lg">
            Add, reorder, or replace Kitchen / Living / Bedroom images on the
            homepage. Publish to go live without a code deploy.
          </p>
        </div>
        <Link href="/admin/room-designs/new" className="btn-primary shrink-0">
          Add image
        </Link>
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error.message}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-[var(--border)] bg-[var(--background)] overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image_url}
              alt={item.alt_text ?? ""}
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="p-4">
              <p className="text-xs uppercase tracking-widest text-[var(--accent-gold)]">
                {labels[item.room_type] ?? item.room_type} · {item.status}
              </p>
              <p className="text-sm text-[var(--text-secondary)] mt-1 truncate">
                {item.alt_text || "No alt text"} · order {item.sort_order}
              </p>
              <div className="flex flex-wrap gap-3 mt-3">
                <Link
                  href={`/admin/room-designs/${item.id}`}
                  className="text-xs uppercase tracking-widest text-[var(--accent-gold)] hover:underline"
                >
                  Edit
                </Link>
                <form
                  action={setRoomImageStatus.bind(
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
                <form action={deleteRoomImage.bind(null, item.id)}>
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

      {items.length === 0 && (
        <div className="border border-dashed border-[var(--border)] p-12 text-center">
          <p className="font-serif text-xl mb-2">No room images yet</p>
          <Link href="/admin/room-designs/new" className="btn-primary inline-flex mt-4">
            Add first image
          </Link>
        </div>
      )}
    </div>
  );
}
