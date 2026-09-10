"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { SiteContentSection } from "@/lib/types";

const SECTIONS: SiteContentSection[] = [
  "promise",
  "faq",
  "solution",
  "pricing",
  "offering",
];

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/layout-review");
  revalidatePath("/admin/content");
}

export async function setContentStatus(
  id: string,
  status: "draft" | "published",
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("site_content_items")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePublic();
}

export async function deleteContentItem(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("site_content_items")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePublic();
}

export async function saveContentItem(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "").trim();
  const section = String(formData.get("section") ?? "").trim() as SiteContentSection;
  const title = String(formData.get("title") ?? "").trim();
  const detail = String(formData.get("detail") ?? "").trim();
  const sortOrder = Number(formData.get("sort_order") ?? 0) || 0;
  const status = String(formData.get("status") ?? "published") as
    | "draft"
    | "published";

  if (!SECTIONS.includes(section)) throw new Error("Invalid section");
  if (!title) throw new Error("Title is required");

  const meta: Record<string, unknown> = {};

  if (section === "solution") {
    meta.icon = String(formData.get("icon") ?? "Home").trim() || "Home";
  }
  if (section === "pricing") {
    meta.tier_key =
      String(formData.get("tier_key") ?? "").trim() ||
      title.toLowerCase().replace(/\s+/g, "-");
    meta.min = Number(formData.get("min") ?? 0) || 0;
    meta.max = Number(formData.get("max") ?? 0) || 0;
  }
  if (section === "offering") {
    let imageUrl = String(formData.get("image_url") ?? "").trim();
    const file = formData.get("image_file");
    if (file instanceof File && file.size > 0) {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `offerings/${Date.now()}.${ext}`;
      const bytes = await file.arrayBuffer();
      const { error: uploadError } = await supabase.storage
        .from("portfolio-images")
        .upload(path, bytes, {
          contentType: file.type || "image/jpeg",
          upsert: true,
        });
      if (uploadError) throw new Error(uploadError.message);
      imageUrl = supabase.storage
        .from("portfolio-images")
        .getPublicUrl(path).data.publicUrl;
    }
    if (imageUrl) meta.image_url = imageUrl;
  }

  const payload = {
    section,
    title,
    detail: detail || null,
    meta,
    sort_order: sortOrder,
    status,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await supabase
      .from("site_content_items")
      .update(payload)
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("site_content_items").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePublic();
  redirect(`/admin/content?section=${section}`);
}
