"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function setTestimonialStatus(
  id: string,
  status: "draft" | "published",
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("testimonials")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function saveTestimonial(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "").trim();
  const clientName = String(formData.get("client_name") ?? "").trim();
  const projectLabel = String(formData.get("project_label") ?? "").trim();
  const quote = String(formData.get("quote") ?? "").trim();
  const ratingRaw = String(formData.get("rating") ?? "").trim();
  const status = String(formData.get("status") ?? "draft") as
    | "draft"
    | "published";
  const sortOrder = Number(formData.get("sort_order") ?? 0) || 0;

  if (!clientName || !quote) throw new Error("Name and quote are required");

  const rating = ratingRaw ? Number(ratingRaw) : null;

  const payload = {
    client_name: clientName,
    project_label: projectLabel || null,
    quote,
    rating,
    status,
    sort_order: sortOrder,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await supabase
      .from("testimonials")
      .update(payload)
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("testimonials").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}
