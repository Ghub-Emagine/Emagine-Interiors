import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ensurePageCopySlots } from "./actions";

type PageCopyRow = {
  id: string;
  slot_key: string;
  page_group: string;
  label: string;
  title: string | null;
  body: string | null;
  sort_order: number;
};

export default async function AdminPageCopyPage() {
  const supabase = await createClient();
  let { data, error } = await supabase
    .from("page_copy")
    .select("id, slot_key, page_group, label, title, body, sort_order")
    .order("page_group", { ascending: true })
    .order("sort_order", { ascending: true });

  if (!error && (!data || data.length === 0)) {
    try {
      await ensurePageCopySlots();
      const again = await supabase
        .from("page_copy")
        .select("id, slot_key, page_group, label, title, body, sort_order")
        .order("page_group", { ascending: true })
        .order("sort_order", { ascending: true });
      data = again.data;
      error = again.error;
    } catch {
      /* seed may fail */
    }
  }

  const rows = (data ?? []) as PageCopyRow[];
  const groups = Array.from(new Set(rows.map((r) => r.page_group)));

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-2">
            Homepage text
          </p>
          <h1 className="font-serif text-4xl mb-2">Page copy</h1>
          <p className="text-sm text-[var(--text-secondary)] max-w-lg">
            Edit hero, process, services, materials, closing CTA, and layout-form
            headlines without code.
          </p>
        </div>
        <form action={ensurePageCopySlots}>
          <button type="submit" className="btn-secondary shrink-0">
            Sync missing slots
          </button>
        </form>
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error.message}</p>}

      {groups.map((group) => (
        <section key={group} className="mb-10">
          <h2 className="font-serif text-2xl mb-4 border-b border-[var(--border)] pb-2">
            {group}
          </h2>
          <div className="space-y-3">
            {rows
              .filter((r) => r.page_group === group)
              .map((row) => (
                <div
                  key={row.id}
                  className="border border-[var(--border)] bg-[var(--background)] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="font-serif text-lg">{row.label}</p>
                    <p className="text-xs text-[var(--text-secondary)] font-mono truncate">
                      {row.slot_key}
                    </p>
                    {row.title && (
                      <p className="text-sm text-[var(--text-secondary)] mt-1 line-clamp-1">
                        {row.title}
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/admin/page-copy/${row.id}`}
                    className="text-xs uppercase tracking-widest text-[var(--accent-gold)] hover:underline shrink-0"
                  >
                    Edit copy
                  </Link>
                </div>
              ))}
          </div>
        </section>
      ))}

      {rows.length === 0 && !error && (
        <div className="border border-dashed border-[var(--border)] p-12 text-center">
          <p className="font-serif text-xl mb-4">No copy slots yet</p>
          <form action={ensurePageCopySlots}>
            <button type="submit" className="btn-primary inline-flex">
              Create default slots
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
