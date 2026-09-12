import { saveContentItem } from "./actions";
import type { SiteContentItem, SiteContentSection } from "@/lib/types";

const ICON_OPTIONS = [
  "CookingPot",
  "DoorClosed",
  "Monitor",
  "Lightbulb",
  "Sparkles",
  "Laptop",
  "Box",
  "Paintbrush",
  "Bath",
  "Flower2",
  "Columns2",
  "Home",
];

export default function ContentItemForm({
  section,
  item,
}: {
  section: SiteContentSection;
  item?: SiteContentItem | null;
}) {
  const meta = (item?.meta ?? {}) as Record<string, unknown>;

  return (
    <form action={saveContentItem} className="space-y-6 max-w-xl">
      {item?.id && <input type="hidden" name="id" value={item.id} />}
      <input type="hidden" name="section" value={section} />

      <div>
        <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
          {section === "faq"
            ? "Question"
            : section === "marquee"
              ? "Marquee phrase"
              : "Title"}{" "}
          *
        </label>
        <input
          name="title"
          required
          defaultValue={item?.title ?? ""}
          className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
        />
      </div>

      {section !== "marquee" && (
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            {section === "faq" ? "Answer" : "Detail"}
          </label>
          <textarea
            name="detail"
            rows={section === "faq" ? 5 : 3}
            defaultValue={item?.detail ?? ""}
            className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
          />
        </div>
      )}
      {section === "marquee" && <input type="hidden" name="detail" value="" />}

      {section === "solution" && (
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Icon
          </label>
          <select
            name="icon"
            defaultValue={String(meta.icon ?? "Home")}
            className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
          >
            {ICON_OPTIONS.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </div>
      )}

      {section === "pricing" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
              Tier key
            </label>
            <input
              name="tier_key"
              defaultValue={String(meta.tier_key ?? "")}
              placeholder="essential"
              className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
              Min ₹/sqft
            </label>
            <input
              name="min"
              type="number"
              defaultValue={Number(meta.min ?? 0)}
              className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
              Max ₹/sqft
            </label>
            <input
              name="max"
              type="number"
              defaultValue={Number(meta.max ?? 0)}
              className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
            />
          </div>
        </div>
      )}

      {section === "offering" && (
        <div className="border border-[var(--accent-gold-bright)]/40 bg-[var(--surface)] p-5 space-y-4">
          <p className="text-sm text-[var(--text-secondary)]">
            Card image for Our offerings — upload or paste URL.
          </p>
          {typeof meta.image_url === "string" && meta.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={meta.image_url}
              alt=""
              className="h-36 w-full max-w-sm object-cover border border-[var(--border)]"
            />
          )}
          <input
            name="image_url"
            defaultValue={typeof meta.image_url === "string" ? meta.image_url : ""}
            placeholder="https://…"
            className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
          />
          <input
            name="image_file"
            type="file"
            accept="image/*"
            className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[var(--text-primary)] file:text-white file:text-xs file:uppercase file:tracking-widest"
          />
        </div>
      )}

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
        Save
      </button>
    </form>
  );
}
