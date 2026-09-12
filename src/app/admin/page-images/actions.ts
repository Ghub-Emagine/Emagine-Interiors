"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PAGE_IMAGE_SLOTS } from "@/lib/page-image-slots";
import { SITE_IMAGES } from "@/lib/site-images";

function revalidatePages() {
  revalidatePath("/admin/page-images");
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/why-us");
  revalidatePath("/layout-review");
}

export async function ensurePageImageSlots() {
  const supabase = await createClient();
  const rows = PAGE_IMAGE_SLOTS.map((slot) => ({
    slot_key: slot.key,
    page_group: slot.page_group,
    label: slot.label,
    image_url: SITE_IMAGES[slot.fallback],
    media_type: "image" as const,
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
  let mediaType = String(formData.get("media_type") ?? "image") as
    | "image"
    | "video";
  let imageUrl = String(formData.get("image_url") ?? "").trim();

  const imageFile = formData.get("image_file");
  if (imageFile instanceof File && imageFile.size > 0) {
    const isVideo = imageFile.type.startsWith("video/");
    const isImage = imageFile.type.startsWith("image/");
    if (!isVideo && !isImage) {
      throw new Error("Upload must be an image or MP4/WebM video.");
    }
    const maxBytes = isVideo
      ? 50 * 1024 * 1024
      : 10 * 1024 * 1024;
    if (imageFile.size > maxBytes) {
      throw new Error(
        isVideo
          ? "Video must be 50MB or smaller."
          : "Image must be 10MB or smaller.",
      );
    }
    if (isVideo) mediaType = "video";
    else if (isImage) mediaType = "image";

    const ext =
      imageFile.name.split(".").pop() || (mediaType === "video" ? "mp4" : "jpg");
    const path = `page-images/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
    const bytes = await imageFile.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from("portfolio-images")
      .upload(path, bytes, {
        contentType:
          imageFile.type ||
          (mediaType === "video" ? "video/mp4" : "image/jpeg"),
        upsert: true,
      });
    if (uploadError) throw new Error(uploadError.message);
    imageUrl = supabase.storage
      .from("portfolio-images")
      .getPublicUrl(path).data.publicUrl;
  }

  if (!imageUrl) throw new Error("Media URL or upload is required");
  if (!id) throw new Error("Missing image id");

  const { error } = await supabase
    .from("page_images")
    .update({
      label: label || undefined,
      image_url: imageUrl,
      media_type: mediaType,
      alt_text: altText || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePages();
  redirect("/admin/page-images");
}
