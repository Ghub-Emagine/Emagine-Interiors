export type PublishStatus = "draft" | "published";

export type PortfolioProject = {
  id: string;
  slug: string;
  title: string;
  developer: string | null;
  location: string | null;
  tier: string | null;
  summary: string | null;
  cover_image_url: string | null;
  gallery_urls: string[] | null;
  featured: boolean;
  status: PublishStatus;
  sort_order: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Testimonial = {
  id: string;
  client_name: string;
  project_label: string | null;
  quote: string;
  rating: number | null;
  status: PublishStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type LeadStatus =
  | "new"
  | "contacted"
  | "reviewed"
  | "quoted"
  | "won"
  | "lost"
  | "spam";

export type WebsiteLead = {
  id: string;
  created_at: string;
  name: string | null;
  phone: string | null;
  location: string | null;
  tier: string | null;
  email: string | null;
  source: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  message: string | null;
  estimate_min: string | null;
  estimate_max: string | null;
  sqft: string | null;
  status: LeadStatus;
  notes: string | null;
  has_floor_plan: boolean;
  contacted_at: string | null;
  updated_at: string | null;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  cover_image_url: string | null;
  status: PublishStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type RoomType = "kitchen" | "living" | "bedroom";

export type RoomDesignImage = {
  id: string;
  room_type: RoomType;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
  status: PublishStatus;
  created_at: string;
  updated_at: string;
};

export type HeroSlide = {
  id: string;
  media_type: "image" | "video";
  media_url: string;
  poster_url: string | null;
  alt_text: string | null;
  sort_order: number;
  status: PublishStatus;
  created_at: string;
  updated_at: string;
};

export type SiteContentSection =
  | "promise"
  | "faq"
  | "solution"
  | "pricing"
  | "offering";

export type SiteContentItem = {
  id: string;
  section: SiteContentSection;
  title: string;
  detail: string | null;
  meta: Record<string, unknown>;
  sort_order: number;
  status: PublishStatus;
  created_at: string;
  updated_at: string;
};

export type PageImage = {
  id: string;
  slot_key: string;
  page_group: string;
  label: string;
  image_url: string;
  media_type: "image" | "video";
  alt_text: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};
