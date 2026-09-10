import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Testimonial } from "@/lib/types";
import TestimonialForm from "../TestimonialForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditTestimonialPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) notFound();

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Edit testimonial</h1>
      <TestimonialForm testimonial={data as Testimonial} />
    </div>
  );
}
