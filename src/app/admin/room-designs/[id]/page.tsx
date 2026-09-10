import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { RoomDesignImage } from "@/lib/types";
import RoomImageForm from "../RoomImageForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditRoomImagePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("room_design_images")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) notFound();

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-2">
        Edit
      </p>
      <h1 className="font-serif text-3xl mb-8">Edit room design image</h1>
      <RoomImageForm item={data as RoomDesignImage} />
    </div>
  );
}
