-- Site settings (key/value) + page copy CMS
-- Applied via Supabase migration site_settings_and_page_copy
--
-- Known keys (admin UI + defaults in src/lib/site-settings.ts):
--   brand_name, tagline, location, contact_email, contact_whatsapp,
--   notify_emails, resend_from, ga_measurement_id, meta_pixel_id,
--   lead_webhook_url, lead_api_key,
--   lead_digest_enabled  -- "true" | "false"; default "false"
-- Cron auth for daily digest uses env CRON_SECRET (Bearer), not a site_settings row.

CREATE TABLE IF NOT EXISTS public.site_settings (
  key text PRIMARY KEY,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Optional seed for digest toggle (safe to re-run)
INSERT INTO public.site_settings (key, value)
VALUES ('lead_digest_enabled', 'false')
ON CONFLICT (key) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.page_copy (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_key text UNIQUE NOT NULL,
  page_group text NOT NULL,
  label text NOT NULL,
  title text,
  body text,
  meta jsonb NOT NULL DEFAULT '{}'::jsonb,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.page_copy ENABLE ROW LEVEL SECURITY;
