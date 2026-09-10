"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function setHeroSlideStatus(
  id: string,
  status: "draft" | "published",
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("hero_slides")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/hero");
  revalidatePath("/");
}

export async function deleteHeroSlide(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("hero_slides").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/hero");
  revalidatePath("/");
}

export async function saveHeroSlide(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "").trim();
  const mediaType = String(formData.get("media_type") ?? "image") as
    | "image"
    | "video";
  const altText = String(formData.get("alt_text") ?? "").trim();
  const sortOrder = Number(formData.get("sort_order") ?? 0) || 0;
  const status = String(formData.get("status") ?? "published") as
    | "draft"
    | "published";
  let mediaUrl = String(formData.get("media_url") ?? "").trim();
  let posterUrl = String(formData.get("poster_url") ?? "").trim();

  const mediaFile = formData.get("media_file");
  if (mediaFile instanceof File && mediaFile.size > 0) {
    const ext = mediaFile.name.split(".").pop() || (mediaType === "video" ? "mp4" : "jpg");
    const path = `hero/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
    const bytes = await mediaFile.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from("portfolio-images")
      .upload(path, bytes, {
        contentType: mediaFile.type || (mediaType === "video" ? "video/mp4" : "image/jpeg"),
        upsert: true,
      });
    if (uploadError) throw new Error(uploadError.message);
    mediaUrl = supabase.storage
      .from("portfolio-images")
      .getPublicUrl(path).data.publicUrl;
  }

  const posterFile = formData.get("poster_file");
  if (posterFile instanceof File && posterFile.size > 0) {
    const ext = posterFile.name.split(".").pop() || "jpg";
    const path = `hero/poster-${Date.now()}.${ext}`;
    const bytes = await posterFile.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from("portfolio-images")
      .upload(path, bytes, {
        contentType: posterFile.type || "image/jpeg",
        upsert: true,
      });
    if (uploadError) throw new Error(uploadError.message);
    posterUrl = supabase.storage
      .from("portfolio-images")
      .getPublicUrl(path).data.publicUrl;
  }

  if (!mediaUrl) throw new Error("Media URL or upload is required");

  const payload = {
    media_type: mediaType,
    media_url: mediaUrl,
    poster_url: posterUrl || null,
    alt_text: altText || null,
    sort_order: sortOrder,
    status,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await supabase
      .from("hero_slides")
      .update(payload)
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("hero_slides").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/hero");
  revalidatePath("/");
  redirect("/admin/hero");
}
