-- Blog CMS for marketing site + ensure project gallery_urls
CREATE TABLE IF NOT EXISTS public.blog_posts_site (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text,
  body text NOT NULL DEFAULT '',
  cover_image_url text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts_site ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.portfolio_projects
  ADD COLUMN IF NOT EXISTS gallery_urls text[] DEFAULT '{}';
