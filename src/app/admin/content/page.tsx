import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { SiteContentItem, SiteContentSection } from "@/lib/types";
import { deleteContentItem, setContentStatus } from "./actions";

const TABS: { id: SiteContentSection; label: string }[] = [
  { id: "promise", label: "Promise strip" },
  { id: "marquee", label: "Hero marquee" },
  { id: "faq", label: "FAQ" },
  { id: "solution", label: "A–Z solutions" },
  { id: "pricing", label: "Pricing bands" },
  { id: "offering", label: "Offerings" },
];

type Props = { searchParams: Promise<{ section?: string }> };

export default async function AdminContentPage({ searchParams }: Props) {
  const sp = await searchParams;
  const section = (TABS.some((t) => t.id === sp.section)
    ? sp.section
    : "promise") as SiteContentSection;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_content_items")
    .select("*")
    .eq("section", section)
    .order("sort_order", { ascending: true });

  const items = (data ?? []) as SiteContentItem[];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-2">
            Site copy
          </p>
          <h1 className="font-serif text-4xl mb-2">Content</h1>
          <p className="text-sm text-[var(--text-secondary)] max-w-lg">
            Edit promise strip, hero marquee phrases, FAQ, A–Z solutions, ₹/sqft
            bands, and offerings (including images)—no code deploy. Turn sections
            on/off under{" "}
            <Link href="/admin/settings" className="underline underline-offset-2">
              Site settings
            </Link>
            .
          </p>
        </div>
        <Link
          href={`/admin/content/new?section=${section}`}
          className="btn-primary shrink-0"
        >
          Add item
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 border-b border-[var(--border)] pb-4">
        {TABS.map((tab) => (
          <Link
            key={tab.id}
            href={`/admin/content?section=${tab.id}`}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-colors ${
              section === tab.id
                ? "bg-[var(--text-primary)] text-[var(--background)]"
                : "bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error.message}</p>}

      <div className="space-y-3">
        {items.map((item) => {
          const meta = item.meta as Record<string, unknown>;
          const imageUrl =
            typeof meta.image_url === "string" ? meta.image_url : null;
          return (
            <div
              key={item.id}
              className="border border-[var(--border)] bg-[var(--background)] p-4 flex flex-col md:flex-row gap-4 md:items-start justify-between"
            >
              <div className="flex gap-4 min-w-0">
                {section === "offering" && imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imageUrl}
                    alt=""
                    className="h-16 w-24 object-cover border border-[var(--border)] shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <p className="font-medium">{item.title}</p>
                  {item.detail && (
                    <p className="text-sm text-[var(--text-secondary)] mt-1 line-clamp-2">
                      {item.detail}
                    </p>
                  )}
                  <p className="text-xs uppercase tracking-widest text-[var(--accent-gold)] mt-2">
                    {item.status}
                    {section === "pricing" &&
                      ` · ₹${meta.min}–${meta.max}/sqft`}
                    {section === "solution" &&
                      typeof meta.icon === "string" &&
                      ` · ${meta.icon}`}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href={`/admin/content/${item.id}`}
                  className="text-xs uppercase tracking-widest text-[var(--accent-gold)] hover:underline"
                >
                  Edit
                </Link>
                <form
                  action={setContentStatus.bind(
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
                <form action={deleteContentItem.bind(null, item.id)}>
                  <button
                    type="submit"
                    className="text-xs uppercase tracking-widest text-red-700"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          );
        })}
      </div>

      {items.length === 0 && (
        <div className="border border-dashed border-[var(--border)] p-12 text-center">
          <p className="font-serif text-xl mb-4">No items in this section</p>
          <Link
            href={`/admin/content/new?section=${section}`}
            className="btn-primary inline-flex"
          >
            Add first item
          </Link>
        </div>
      )}
    </div>
  );
}
