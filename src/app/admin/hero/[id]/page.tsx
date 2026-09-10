import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { HeroSlide } from "@/lib/types";
import HeroSlideForm from "../HeroSlideForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditHeroSlidePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hero_slides")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) notFound();

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-2">
        Edit
      </p>
      <h1 className="font-serif text-3xl mb-8">Edit hero slide</h1>
      <HeroSlideForm slide={data as HeroSlide} />
    </div>
  );
}
