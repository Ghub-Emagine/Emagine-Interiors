import { BRAND_INFO } from "@/lib/constants";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/supabase-public-env";

export type SiteSettings = {
  brand_name: string;
  tagline: string;
  location: string;
  contact_email: string;
  contact_whatsapp: string;
  notify_emails: string;
  resend_from: string;
  ga_measurement_id: string;
  meta_pixel_id: string;
  lead_webhook_url: string;
  lead_api_key: string;
  /** Daily lead digest cron — "true" | "false" (string). Auth uses env CRON_SECRET, not a DB key. */
  lead_digest_enabled: string;
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  brand_name: BRAND_INFO.name,
  tagline: BRAND_INFO.tagline,
  location: BRAND_INFO.contact.location,
  contact_email: BRAND_INFO.contact.email,
  contact_whatsapp: BRAND_INFO.contact.whatsapp,
  notify_emails: "janajackie@gmail.com",
  resend_from: "Emagine Interiors <onboarding@resend.dev>",
  ga_measurement_id: "",
  meta_pixel_id: "",
  lead_webhook_url: "",
  lead_api_key: "",
  lead_digest_enabled: "false",
};

export const SITE_SETTING_KEYS = Object.keys(
  DEFAULT_SITE_SETTINGS,
) as (keyof SiteSettings)[];

function createPublicClient() {
  return createClient(getSupabaseUrl(), getSupabaseAnonKey());
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const settings = { ...DEFAULT_SITE_SETTINGS };

  // Env overrides for analytics (optional; admin wins if set in DB)
  if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    settings.ga_measurement_id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID.trim();
  }
  if (process.env.NEXT_PUBLIC_META_PIXEL_ID) {
    settings.meta_pixel_id = process.env.NEXT_PUBLIC_META_PIXEL_ID.trim();
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase.from("site_settings").select("key, value");
    if (error) {
      console.error("getSiteSettings:", error.message);
      return settings;
    }
    for (const row of data ?? []) {
      const key = row.key as keyof SiteSettings;
      if (key in settings && typeof row.value === "string") {
        settings[key] = row.value;
      }
    }
  } catch (err) {
    console.error("getSiteSettings:", err);
  }

  return settings;
}

export function parseNotifyEmails(raw: string): string[] {
  return raw
    .split(/[,;\s]+/)
    .map((e) => e.trim())
    .filter((e) => e.includes("@"));
}

export function brandFromSettings(s: SiteSettings) {
  return {
    name: s.brand_name || BRAND_INFO.name,
    tagline: s.tagline || BRAND_INFO.tagline,
    contact: {
      email: s.contact_email || BRAND_INFO.contact.email,
      whatsapp: s.contact_whatsapp || BRAND_INFO.contact.whatsapp,
      location: s.location || BRAND_INFO.contact.location,
    },
  };
}
