-- Phase 7: deeper CRM fields on website_leads (nullable; no contact-form insert required).
-- Run in Supabase SQL Editor after setup_leads_table.sql.

ALTER TABLE public.website_leads
  ADD COLUMN IF NOT EXISTS proposal_url text,
  ADD COLUMN IF NOT EXISTS site_visit_at timestamptz;
