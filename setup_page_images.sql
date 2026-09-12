-- Page images CMS — fixed slots for About, Why EDS, layout-review, homepage bands
-- Applied via Supabase migration page_images_cms (keep in sync)

CREATE TABLE IF NOT EXISTS public.page_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_key text UNIQUE NOT NULL,
  page_group text NOT NULL,
  label text NOT NULL,
  image_url text NOT NULL,
  media_type text NOT NULL DEFAULT 'image' CHECK (media_type IN ('image', 'video')),
  alt_text text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Idempotent for existing DBs created before media_type
ALTER TABLE public.page_images
  ADD COLUMN IF NOT EXISTS media_type text NOT NULL DEFAULT 'image';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'page_images_media_type_check'
  ) THEN
    ALTER TABLE public.page_images
      ADD CONSTRAINT page_images_media_type_check
      CHECK (media_type IN ('image', 'video'));
  END IF;
END $$;

ALTER TABLE public.page_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS page_images_public_read ON public.page_images;
CREATE POLICY page_images_public_read ON public.page_images
  FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS page_images_admin_all ON public.page_images;
CREATE POLICY page_images_admin_all ON public.page_images
  FOR ALL TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
