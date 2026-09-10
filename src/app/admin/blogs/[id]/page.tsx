import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/types";
import BlogForm from "../BlogForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts_site")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) notFound();

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-2">
        Edit
      </p>
      <h1 className="font-serif text-3xl mb-8">Edit blog post</h1>
      <BlogForm post={data as BlogPost} />
    </div>
  );
}
