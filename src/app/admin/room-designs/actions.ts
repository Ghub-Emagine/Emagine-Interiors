"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function setRoomImageStatus(
  id: string,
  status: "draft" | "published",
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("room_design_images")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/room-designs");
  revalidatePath("/");
}

export async function deleteRoomImage(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("room_design_images")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/room-designs");
  revalidatePath("/");
}

export async function saveRoomImage(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "").trim();
  const roomType = String(formData.get("room_type") ?? "").trim() as
    | "kitchen"
    | "living"
    | "bedroom";
  const altText = String(formData.get("alt_text") ?? "").trim();
  const sortOrder = Number(formData.get("sort_order") ?? 0) || 0;
  const status = String(formData.get("status") ?? "published") as
    | "draft"
    | "published";
  let imageUrl = String(formData.get("image_url") ?? "").trim();

  if (!roomType || !["kitchen", "living", "bedroom"].includes(roomType)) {
    throw new Error("Room type is required");
  }

  const file = formData.get("image_file");
  if (file instanceof File && file.size > 0) {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `room-designs/${roomType}/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
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

  if (!imageUrl) throw new Error("Image URL or upload is required");

  const payload = {
    room_type: roomType,
    image_url: imageUrl,
    alt_text: altText || null,
    sort_order: sortOrder,
    status,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await supabase
      .from("room_design_images")
      .update(payload)
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("room_design_images").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/room-designs");
  revalidatePath("/");
  redirect("/admin/room-designs");
}
