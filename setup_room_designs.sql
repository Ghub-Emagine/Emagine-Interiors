-- Room design images for homepage "Trending designs" (admin CMS)
CREATE TABLE IF NOT EXISTS public.room_design_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_type text NOT NULL CHECK (room_type IN ('kitchen', 'living', 'bedroom')),
  image_url text NOT NULL,
  alt_text text,
  sort_order int NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.room_design_images ENABLE ROW LEVEL SECURITY;
