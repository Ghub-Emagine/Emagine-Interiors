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
  hero_enabled: string;
  trust_marquee_enabled: string;
  promise_strip_enabled: string;
  portfolio_enabled: string;
  room_designs_enabled: string;
  services_enabled: string;
  solutions_enabled: string;
  process_enabled: string;
  material_enabled: string;
  testimonials_enabled: string;
  pricing_enabled: string;
  faq_enabled: string;
  evaluation_enabled: string;
  closing_cta_enabled: string;
};

/** Homepage section toggles shown in Admin → Settings (order = homepage order). */
export const HOMEPAGE_SECTION_TOGGLES: {
  key: keyof SiteSettings;
  label: string;
  help: string;
}[] = [
  {
    key: "hero_enabled",
    label: "Hero",
    help: "Top slideshow / video. Edit under Hero.",
  },
  {
    key: "trust_marquee_enabled",
    label: "Hero marquee",
    help: "Scrolling strip after the hero. Edit phrases under Content → Hero marquee.",
  },
  {
    key: "promise_strip_enabled",
    label: "Promise strip",
    help: "Four-column trust grid. Edit under Content → Promise strip.",
  },
  {
    key: "portfolio_enabled",
    label: "Selected works",
    help: "Featured portfolio marquee. Edit under Projects.",
  },
  {
    key: "room_designs_enabled",
    label: "Trending room designs",
    help: "Kitchen / living / bedroom galleries. Edit under Room designs.",
  },
  {
    key: "services_enabled",
    label: "Services",
    help: "What we design & build. Edit page images/copy as needed.",
  },
  {
    key: "solutions_enabled",
    label: "A–Z solutions",
    help: "Flip-card catalog. Edit under Content → A–Z solutions.",
  },
  {
    key: "process_enabled",
    label: "Process proof",
    help: "How we work / proof section.",
  },
  {
    key: "material_enabled",
    label: "Materials",
    help: "Material & finish story section.",
  },
  {
    key: "testimonials_enabled",
    label: "Testimonials",
    help: "From owners like you. Edit under Testimonials.",
  },
  {
    key: "pricing_enabled",
    label: "Pricing tool",
    help: "₹/sqft calculator. Edit bands under Content → Pricing bands.",
  },
  {
    key: "faq_enabled",
    label: "FAQ",
    help: "Homepage FAQ. Edit under Content → FAQ.",
  },
  {
    key: "evaluation_enabled",
    label: "Evaluation form",
    help: "Lead / layout review form.",
  },
  {
    key: "closing_cta_enabled",
    label: "Closing CTA",
    help: "Final call-to-action block.",
  },
];

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
  hero_enabled: "true",
  trust_marquee_enabled: "true",
  promise_strip_enabled: "true",
  portfolio_enabled: "true",
  room_designs_enabled: "true",
  services_enabled: "true",
  solutions_enabled: "true",
  process_enabled: "true",
  material_enabled: "true",
  testimonials_enabled: "true",
  pricing_enabled: "true",
  faq_enabled: "true",
  evaluation_enabled: "true",
  closing_cta_enabled: "true",
};

/** Checkbox settings stored as "true" / "false" strings. */
export const SITE_SETTING_TOGGLES: (keyof SiteSettings)[] = [
  "lead_digest_enabled",
  ...HOMEPAGE_SECTION_TOGGLES.map((t) => t.key),
];

export const SITE_SETTING_KEYS = Object.keys(
  DEFAULT_SITE_SETTINGS,
) as (keyof SiteSettings)[];

export function isSectionEnabled(
  settings: SiteSettings,
  key: (typeof HOMEPAGE_SECTION_TOGGLES)[number]["key"],
) {
  return settings[key] === "true";
}

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
