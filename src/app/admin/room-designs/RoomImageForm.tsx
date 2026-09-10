import { saveRoomImage } from "./actions";
import type { RoomDesignImage } from "@/lib/types";

export default function RoomImageForm({
  item,
}: {
  item?: RoomDesignImage | null;
}) {
  return (
    <form action={saveRoomImage} className="space-y-6 max-w-xl">
      {item?.id && <input type="hidden" name="id" value={item.id} />}

      <div>
        <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
          Room type *
        </label>
        <select
          name="room_type"
          required
          defaultValue={item?.room_type ?? "kitchen"}
          className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
        >
          <option value="kitchen">Kitchen</option>
          <option value="living">Living</option>
          <option value="bedroom">Bedroom</option>
        </select>
      </div>

      {item?.image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.image_url}
          alt=""
          className="h-40 w-full max-w-sm object-cover border border-[var(--border)]"
        />
      )}

      <div>
        <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
          Image URL
        </label>
        <input
          name="image_url"
          defaultValue={item?.image_url ?? ""}
          placeholder="https://… or upload below"
          className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
        />
      </div>

      <div className="border border-[var(--accent-gold-bright)]/40 bg-[var(--surface)] p-5">
        <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
          Upload image
        </label>
        <input
          name="image_file"
          type="file"
          accept="image/*"
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[var(--text-primary)] file:text-white file:text-xs file:uppercase file:tracking-widest"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
          Alt text
        </label>
        <input
          name="alt_text"
          defaultValue={item?.alt_text ?? ""}
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
            defaultValue={item?.sort_order ?? 0}
            className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Status
          </label>
          <select
            name="status"
            defaultValue={item?.status ?? "published"}
            className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <button type="submit" className="btn-primary">
        Save image
      </button>
    </form>
  );
}
