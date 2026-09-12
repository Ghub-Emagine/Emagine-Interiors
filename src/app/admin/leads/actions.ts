"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isLeadStatus } from "@/lib/lead-helpers";

export async function updateLeadStatus(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const statusRaw = String(formData.get("status") ?? "").trim();
  if (!id || !isLeadStatus(statusRaw)) {
    throw new Error("Invalid lead status update");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data: existing } = await supabase
    .from("website_leads")
    .select("contacted_at")
    .eq("id", id)
    .maybeSingle();

  const patch: Record<string, unknown> = {
    status: statusRaw,
    updated_at: new Date().toISOString(),
  };

  if (statusRaw === "contacted" && !existing?.contacted_at) {
    patch.contacted_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from("website_leads")
    .update(patch)
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}

export async function updateLeadNotes(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const notes = String(formData.get("notes") ?? "");
  if (!id) throw new Error("Missing lead id");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("website_leads")
    .update({
      notes: notes.trim() || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}
