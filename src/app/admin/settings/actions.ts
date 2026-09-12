"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  DEFAULT_SITE_SETTINGS,
  SITE_SETTING_KEYS,
  SITE_SETTING_TOGGLES,
  type SiteSettings,
} from "@/lib/site-settings";

export async function saveSiteSettings(formData: FormData) {
  const supabase = await createClient();
  const now = new Date().toISOString();
  const rows = SITE_SETTING_KEYS.map((key) => {
    // Checkbox: absent when unchecked → store "false"
    if (SITE_SETTING_TOGGLES.includes(key)) {
      const raw = formData.get(key);
      return {
        key,
        value: raw === "true" || raw === "on" ? "true" : "false",
        updated_at: now,
      };
    }
    return {
      key,
      value: String(formData.get(key) ?? DEFAULT_SITE_SETTINGS[key] ?? "").trim(),
      updated_at: now,
    };
  });

  const { error } = await supabase.from("site_settings").upsert(rows, {
    onConflict: "key",
  });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/settings");
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/why-us");
  revalidatePath("/layout-review");
}

export async function ensureDefaultSettings() {
  const supabase = await createClient();
  const rows = SITE_SETTING_KEYS.map((key) => ({
    key,
    value: DEFAULT_SITE_SETTINGS[key as keyof SiteSettings],
    updated_at: new Date().toISOString(),
  }));
  const { error } = await supabase.from("site_settings").upsert(rows, {
    onConflict: "key",
    ignoreDuplicates: true,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/settings");
}
