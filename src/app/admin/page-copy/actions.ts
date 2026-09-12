"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PAGE_COPY_SLOTS } from "@/lib/page-copy-slots";

export async function ensurePageCopySlots() {
  const supabase = await createClient();
  const rows = PAGE_COPY_SLOTS.map((slot) => ({
    slot_key: slot.key,
    page_group: slot.page_group,
    label: slot.label,
    title: slot.title,
    body: slot.body,
    meta: slot.meta ?? {},
    sort_order: slot.sort_order,
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase.from("page_copy").upsert(rows, {
    onConflict: "slot_key",
    ignoreDuplicates: true,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/page-copy");
}

export async function savePageCopy(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const label = String(formData.get("label") ?? "").trim();
  const metaRaw = String(formData.get("meta_json") ?? "").trim();

  let meta: Record<string, unknown> = {};
  if (metaRaw) {
    try {
      meta = JSON.parse(metaRaw) as Record<string, unknown>;
    } catch {
      throw new Error("Meta JSON is invalid");
    }
  }

  if (!id) throw new Error("Missing id");

  const { error } = await supabase
    .from("page_copy")
    .update({
      label: label || undefined,
      title: title || null,
      body: body || null,
      meta,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/page-copy");
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/why-us");
  redirect("/admin/page-copy");
}
