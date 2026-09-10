import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { SiteContentItem } from "@/lib/types";
import ContentItemForm from "../ContentItemForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditContentPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_content_items")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) notFound();
  const item = data as SiteContentItem;

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-2">
        Edit · {item.section}
      </p>
      <h1 className="font-serif text-3xl mb-8">Edit content item</h1>
      <ContentItemForm section={item.section} item={item} />
    </div>
  );
}
