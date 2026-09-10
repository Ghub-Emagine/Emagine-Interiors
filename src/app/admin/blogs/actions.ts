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

export async function setBlogStatus(
  id: string,
  status: "draft" | "published",
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("blog_posts_site")
    .update({
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
}

export async function deleteBlog(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts_site").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
}

export async function saveBlog(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const status = String(formData.get("status") ?? "draft") as
    | "draft"
    | "published";
  let coverImageUrl = String(formData.get("cover_image_url") ?? "").trim();

  if (!title) throw new Error("Title is required");
  if (!body) throw new Error("Body is required");

  const slug = slugInput || slugify(title);

  const coverFile = formData.get("cover_file");
  if (coverFile instanceof File && coverFile.size > 0) {
    const ext = coverFile.name.split(".").pop() || "jpg";
    const path = `blog/${slug}/cover-${Date.now()}.${ext}`;
    const bytes = await coverFile.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from("portfolio-images")
      .upload(path, bytes, {
        contentType: coverFile.type || "image/jpeg",
        upsert: true,
      });
    if (uploadError) throw new Error(uploadError.message);
    coverImageUrl = supabase.storage
      .from("portfolio-images")
      .getPublicUrl(path).data.publicUrl;
  }

  const payload = {
    title,
    slug,
    excerpt: excerpt || null,
    body,
    cover_image_url: coverImageUrl || null,
    status,
    published_at: status === "published" ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await supabase
      .from("blog_posts_site")
      .update(payload)
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("blog_posts_site").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  redirect("/admin/blogs");
}
