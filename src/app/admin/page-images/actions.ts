"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PAGE_IMAGE_SLOTS } from "@/lib/page-image-slots";
import { SITE_IMAGES } from "@/lib/site-images";

export async function ensurePageImageSlots() {
  const supabase = await createClient();
  const rows = PAGE_IMAGE_SLOTS.map((slot) => ({
    slot_key: slot.key,
    page_group: slot.page_group,
    label: slot.label,
    image_url: SITE_IMAGES[slot.fallback],
    alt_text: slot.alt,
    sort_order: slot.sort_order,
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase.from("page_images").upsert(rows, {
    onConflict: "slot_key",
    ignoreDuplicates: true,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/page-images");
}

export async function savePageImage(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "").trim();
  const label = String(formData.get("label") ?? "").trim();
  const altText = String(formData.get("alt_text") ?? "").trim();
  let imageUrl = String(formData.get("image_url") ?? "").trim();

  const imageFile = formData.get("image_file");
  if (imageFile instanceof File && imageFile.size > 0) {
    const ext = imageFile.name.split(".").pop() || "jpg";
    const path = `page-images/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
    const bytes = await imageFile.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from("portfolio-images")
      .upload(path, bytes, {
        contentType: imageFile.type || "image/jpeg",
        upsert: true,
      });
    if (uploadError) throw new Error(uploadError.message);
    imageUrl = supabase.storage
      .from("portfolio-images")
      .getPublicUrl(path).data.publicUrl;
  }

  if (!imageUrl) throw new Error("Image URL or upload is required");
  if (!id) throw new Error("Missing image id");

  const { error } = await supabase
    .from("page_images")
    .update({
      label: label || undefined,
      image_url: imageUrl,
      alt_text: altText || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/page-images");
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/why-us");
  revalidatePath("/layout-review");
  redirect("/admin/page-images");
}
