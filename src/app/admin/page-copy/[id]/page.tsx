import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { savePageCopy } from "../actions";

type Props = { params: Promise<{ id: string }> };

export default async function EditPageCopyPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("page_copy")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) notFound();

  const metaJson = JSON.stringify(data.meta ?? {}, null, 2);

  return (
    <div>
      <Link
        href="/admin/page-copy"
        className="text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--accent-gold)]"
      >
        ← Page copy
      </Link>
      <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mt-6 mb-2">
        {data.page_group}
      </p>
      <h1 className="font-serif text-3xl mb-8">{data.label}</h1>

      <form action={savePageCopy} className="space-y-6 max-w-2xl">
        <input type="hidden" name="id" value={data.id} />

        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Label (admin only)
          </label>
          <input
            name="label"
            defaultValue={data.label}
            className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Title / headline
          </label>
          <input
            name="title"
            defaultValue={data.title ?? ""}
            className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Body / detail
          </label>
          <textarea
            name="body"
            defaultValue={data.body ?? ""}
            rows={5}
            className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
            Extra fields (JSON)
          </label>
          <textarea
            name="meta_json"
            defaultValue={metaJson}
            rows={10}
            className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm font-mono"
          />
          <p className="mt-1.5 text-xs text-[var(--text-secondary)]">
            Hero: rotating_words, cta_primary, cta_secondary. Material rows: eds,
            competitor. Keep valid JSON.
          </p>
        </div>

        <button type="submit" className="btn-primary">
          Save copy
        </button>
      </form>
    </div>
  );
}
