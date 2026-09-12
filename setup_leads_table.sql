-- Note: `public.leads` already exists in this project as a CRM pipeline table.
-- Contact form submissions use `website_leads` instead.

CREATE TABLE IF NOT EXISTS website_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp DEFAULT now(),
  name text,
  phone text,
  location text,
  tier text
);

ALTER TABLE website_leads ENABLE ROW LEVEL SECURITY;

-- Lead CRM fields (Sprint 1)
ALTER TABLE public.website_leads
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS notes text,
  ADD COLUMN IF NOT EXISTS has_floor_plan boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS contacted_at timestamptz,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'website_leads_status_check'
  ) THEN
    ALTER TABLE public.website_leads
      ADD CONSTRAINT website_leads_status_check
      CHECK (status IN ('new','contacted','reviewed','quoted','won','lost','spam'));
  END IF;
END $$;
