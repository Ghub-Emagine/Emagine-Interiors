import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { PageImage } from "@/lib/types";
import PageImageForm from "../PageImageForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditPageImagePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("page_images")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) notFound();

  const image = data as PageImage;

  return (
    <div>
      <Link
        href="/admin/page-images"
        className="text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--accent-gold)]"
      >
        ← Page images
      </Link>
      <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mt-6 mb-2">
        {image.page_group}
      </p>
      <h1 className="font-serif text-3xl mb-2">{image.label}</h1>
      <p className="text-sm text-[var(--text-secondary)] mb-8 font-mono text-xs">
        {image.slot_key}
      </p>
      <PageImageForm image={image} />
    </div>
  );
}
