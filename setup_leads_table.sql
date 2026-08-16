-- Note: `public.leads` already exists in this project as a CRM pipeline table.
-- Contact form submissions use `website_leads` instead.

CREATE TABLE website_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp DEFAULT now(),
  name text,
  phone text,
  location text,
  tier text
);

ALTER TABLE website_leads ENABLE ROW LEVEL SECURITY;
