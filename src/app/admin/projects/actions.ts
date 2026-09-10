"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

async function uploadImage(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File,
  slug: string,
  prefix: string,
) {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${slug}/${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
  const bytes = await file.arrayBuffer();
  const { error } = await supabase.storage
    .from("portfolio-images")
    .upload(path, bytes, {
      contentType: file.type || "image/jpeg",
      upsert: true,
    });
  if (error) throw new Error(error.message);
  return supabase.storage.from("portfolio-images").getPublicUrl(path).data
    .publicUrl;
}

export async function setProjectStatus(
  id: string,
  status: "draft" | "published",
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("portfolio_projects")
    .update({
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/projects");
  revalidatePath("/");
  revalidatePath("/portfolio");
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("portfolio_projects")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/projects");
  revalidatePath("/");
  revalidatePath("/portfolio");
}

export async function saveProject(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const developer = String(formData.get("developer") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const tier = String(formData.get("tier") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const status = String(formData.get("status") ?? "draft") as
    | "draft"
    | "published";
  const featured = formData.get("featured") === "on";
  const sortOrder = Number(formData.get("sort_order") ?? 0) || 0;
  let coverImageUrl = String(formData.get("cover_image_url") ?? "").trim();
  const existingGallery = String(formData.get("existing_gallery") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!title) throw new Error("Title is required");

  const slug = slugInput || slugify(title);

  const coverFile = formData.get("cover_file");
  if (coverFile instanceof File && coverFile.size > 0) {
    coverImageUrl = await uploadImage(supabase, coverFile, slug, "cover");
  }

  const galleryFiles = formData.getAll("gallery_files");
  const uploadedGallery: string[] = [];
  for (const file of galleryFiles) {
    if (file instanceof File && file.size > 0) {
      uploadedGallery.push(await uploadImage(supabase, file, slug, "gallery"));
    }
  }

  const gallery_urls = [...existingGallery, ...uploadedGallery];

  const payload = {
    title,
    slug,
    developer: developer || null,
    location: location || null,
    tier: tier || null,
    summary: summary || null,
    cover_image_url: coverImageUrl || null,
    gallery_urls,
    featured,
    status,
    sort_order: sortOrder,
    published_at: status === "published" ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await supabase
      .from("portfolio_projects")
      .update(payload)
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("portfolio_projects").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/projects");
  revalidatePath("/");
  revalidatePath("/portfolio");
  redirect("/admin/projects");
}
