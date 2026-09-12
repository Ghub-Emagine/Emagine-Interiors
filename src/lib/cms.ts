import { createClient } from "@supabase/supabase-js";
import type {
  BlogPost,
  HeroSlide,
  PageImage,
  PortfolioProject,
  RoomDesignImage,
  SiteContentItem,
  SiteContentSection,
  Testimonial,
} from "@/lib/types";
import {
  INTERIOR_SOLUTIONS,
  PROMISE_STRIP,
  PRICING_TIERS,
  ROOM_DESIGN_GALLERIES,
  STUDIO_OFFERINGS,
  TRUST_MARQUEE,
} from "@/lib/constants";
import { SITE_IMAGES } from "@/lib/site-images";
import { defaultPageMediaMap, type PageMedia } from "@/lib/page-image-slots";
import {
  defaultPageCopyMap,
  type PageCopyItem,
} from "@/lib/page-copy-slots";

import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/supabase-public-env";

function createPublicClient() {
  return createClient(getSupabaseUrl(), getSupabaseAnonKey());
}

export async function getPublishedProjects(): Promise<PortfolioProject[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("portfolio_projects")
      .select("*")
      .eq("status", "published")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("getPublishedProjects:", error.message);
      return [];
    }
    return (data ?? []) as PortfolioProject[];
  } catch (err) {
    console.error("getPublishedProjects:", err);
    return [];
  }
}

export async function getFeaturedProjects(
  limit = 3,
): Promise<PortfolioProject[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("portfolio_projects")
      .select("*")
      .eq("status", "published")
      .eq("featured", true)
      .order("sort_order", { ascending: true })
      .limit(limit);

    if (error) {
      console.error("getFeaturedProjects:", error.message);
      return getPublishedProjects().then((all) => all.slice(0, limit));
    }

    if (data && data.length > 0) {
      return data as PortfolioProject[];
    }

    return getPublishedProjects().then((all) => all.slice(0, limit));
  } catch (err) {
    console.error("getFeaturedProjects:", err);
    return [];
  }
}

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("status", "published")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("getPublishedTestimonials:", error.message);
      return [];
    }
    return (data ?? []) as Testimonial[];
  } catch (err) {
    console.error("getPublishedTestimonials:", err);
    return [];
  }
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("blog_posts_site")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error) {
      console.error("getPublishedPosts:", error.message);
      return [];
    }
    return (data ?? []) as BlogPost[];
  } catch (err) {
    console.error("getPublishedPosts:", err);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("blog_posts_site")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error) {
      console.error("getPostBySlug:", error.message);
      return null;
    }
    return (data as BlogPost) ?? null;
  } catch (err) {
    console.error("getPostBySlug:", err);
    return null;
  }
}

export async function getProjectBySlug(
  slug: string,
): Promise<PortfolioProject | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("portfolio_projects")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error) {
      console.error("getProjectBySlug:", error.message);
      return null;
    }
    return (data as PortfolioProject) ?? null;
  } catch (err) {
    console.error("getProjectBySlug:", err);
    return null;
  }
}

export async function getPublishedRoomDesigns(): Promise<RoomDesignImage[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("room_design_images")
      .select("*")
      .eq("status", "published")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("getPublishedRoomDesigns:", error.message);
      return [];
    }
    return (data ?? []) as RoomDesignImage[];
  } catch (err) {
    console.error("getPublishedRoomDesigns:", err);
    return [];
  }
}

/** Group CMS rows (or static fallback) for the room designs UI */
export async function getRoomDesignGalleries() {
  const rows = await getPublishedRoomDesigns();
  if (rows.length === 0) {
    return ROOM_DESIGN_GALLERIES.map((g) => ({
      id: g.id,
      title: g.title,
      blurb: g.blurb,
      images: g.images,
    }));
  }

  const meta: Record<string, { title: string; blurb: string }> = {
    kitchen: {
      title: "Kitchen designs",
      blurb:
        "Modular kitchens planned against your actual wet areas and circulation.",
    },
    living: {
      title: "Living room designs",
      blurb:
        "Living spaces that respect light, TV wall depth, and storage for Chennai flats.",
    },
    bedroom: {
      title: "Bedroom designs",
      blurb: "Wardrobes, bed walls, and quiet finishes sized to your builder plan.",
    },
  };

  return (["kitchen", "living", "bedroom"] as const)
    .map((id) => {
      const images = rows
        .filter((r) => r.room_type === id)
        .map((r) => ({
          src: r.image_url,
          alt: r.alt_text || meta[id].title,
        }));
      if (images.length === 0) return null;
      return { id, title: meta[id].title, blurb: meta[id].blurb, images };
    })
    .filter(Boolean) as {
    id: string;
    title: string;
    blurb: string;
    images: { src: string; alt: string }[];
  }[];
}

const FALLBACK_HERO: Omit<
  HeroSlide,
  "id" | "created_at" | "updated_at" | "status"
>[] = [
  {
    media_type: "image",
    media_url: SITE_IMAGES.heroLiving,
    poster_url: null,
    alt_text: "Warm apartment living interior",
    sort_order: 1,
  },
  {
    media_type: "image",
    media_url: SITE_IMAGES.heroKitchen,
    poster_url: null,
    alt_text: "Modular kitchen interior",
    sort_order: 2,
  },
  {
    media_type: "image",
    media_url: SITE_IMAGES.heroBedroom,
    poster_url: null,
    alt_text: "Bedroom interiors",
    sort_order: 3,
  },
];

export async function getPublishedHeroSlides(): Promise<HeroSlide[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .eq("status", "published")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("getPublishedHeroSlides:", error.message);
      return FALLBACK_HERO.map((s, i) => ({
        ...s,
        id: `fallback-${i}`,
        status: "published" as const,
        created_at: "",
        updated_at: "",
      }));
    }

    if (data && data.length > 0) return data as HeroSlide[];

    return FALLBACK_HERO.map((s, i) => ({
      ...s,
      id: `fallback-${i}`,
      status: "published" as const,
      created_at: "",
      updated_at: "",
    }));
  } catch (err) {
    console.error("getPublishedHeroSlides:", err);
    return FALLBACK_HERO.map((s, i) => ({
      ...s,
      id: `fallback-${i}`,
      status: "published" as const,
      created_at: "",
      updated_at: "",
    }));
  }
}

const FAQ_FALLBACK = [
  {
    title: "Do you only do layout reviews—or full interiors too?",
    detail:
      "Both. We start with your builder floor plan, then deliver modular kitchens, wardrobes, and full-home interiors for Chennai apartments. The free review is the first step—not the only one.",
  },
  {
    title: "Do you only work on new builder flats?",
    detail:
      "Pre-possession developer apartments are our specialty (Casagrand, Appaswamy, Akshaya, and similar). Renovating an older home? Tell us on WhatsApp—we’ll say honestly if we’re the right fit.",
  },
  {
    title: "How fast do you reply?",
    detail:
      "Usually the same day on WhatsApp during studio hours. Layout reviews are limited each week so we can stay hands-on.",
  },
  {
    title: "Is the ₹/sqft estimate a final quote?",
    detail:
      "No. The calculator gives a realistic band in lakhs. Your exact scope is confirmed after we review your floor plan and finish preferences—before site work starts.",
  },
  {
    title: "What materials do you use?",
    detail:
      "Branded BWP Gurjan ply cabinets with Hettich / Häfele hardware as standard—and we design your flat in 3D so site work matches what you approved.",
  },
];

function fallbackItems(section: SiteContentSection): SiteContentItem[] {
  const stamp = { status: "published" as const, created_at: "", updated_at: "" };
  if (section === "promise") {
    return PROMISE_STRIP.map((p, i) => ({
      id: `fb-promise-${i}`,
      section,
      title: p.title,
      detail: p.detail,
      meta: {},
      sort_order: i,
      ...stamp,
    }));
  }
  if (section === "marquee") {
    return TRUST_MARQUEE.map((title, i) => ({
      id: `fb-marquee-${i}`,
      section,
      title,
      detail: null,
      meta: {},
      sort_order: i,
      ...stamp,
    }));
  }
  if (section === "faq") {
    return FAQ_FALLBACK.map((f, i) => ({
      id: `fb-faq-${i}`,
      section,
      title: f.title,
      detail: f.detail,
      meta: {},
      sort_order: i,
      ...stamp,
    }));
  }
  if (section === "solution") {
    return INTERIOR_SOLUTIONS.map((s, i) => ({
      id: `fb-sol-${i}`,
      section,
      title: s.title,
      detail: s.detail,
      meta: { icon: s.icon },
      sort_order: i,
      ...stamp,
    }));
  }
  if (section === "pricing") {
    return Object.entries(PRICING_TIERS).map(([key, t], i) => ({
      id: `fb-price-${key}`,
      section,
      title: t.name,
      detail: t.desc,
      meta: { tier_key: key, min: t.min, max: t.max },
      sort_order: i,
      ...stamp,
    }));
  }
  return STUDIO_OFFERINGS.map((o, i) => ({
    id: `fb-off-${i}`,
    section: "offering" as const,
    title: o.title,
    detail: o.detail,
    meta: {
      image_url:
        [
          SITE_IMAGES.floorPlanDesk,
          SITE_IMAGES.kitchenWarm,
          SITE_IMAGES.livingFamily,
          SITE_IMAGES.apartmentWarm,
          SITE_IMAGES.bedroomCalm,
          SITE_IMAGES.wardrobe,
        ][i],
    },
    sort_order: i,
    ...stamp,
  }));
}

export async function getSiteContent(
  section: SiteContentSection,
): Promise<SiteContentItem[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("site_content_items")
      .select("*")
      .eq("section", section)
      .eq("status", "published")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("getSiteContent:", section, error.message);
      return fallbackItems(section);
    }
    if (!data || data.length === 0) return fallbackItems(section);
    return data as SiteContentItem[];
  } catch (err) {
    console.error("getSiteContent:", section, err);
    return fallbackItems(section);
  }
}

/** Merged map of slot_key → media (DB overrides + code fallbacks) */
export async function getPageImageMap(): Promise<Record<string, PageMedia>> {
  const map = defaultPageMediaMap();
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("page_images")
      .select("slot_key, image_url, media_type");

    if (error) {
      console.error("getPageImageMap:", error.message);
      return map;
    }
    for (const row of data ?? []) {
      if (row.slot_key && row.image_url) {
        map[row.slot_key] = {
          url: row.image_url,
          media_type:
            row.media_type === "video" ? "video" : "image",
        };
      }
    }
    return map;
  } catch (err) {
    console.error("getPageImageMap:", err);
    return map;
  }
}

export async function getPageImagesAdmin(): Promise<PageImage[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("page_images")
      .select("*")
      .order("page_group", { ascending: true })
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("getPageImagesAdmin:", error.message);
      return [];
    }
    return (data ?? []) as PageImage[];
  } catch (err) {
    console.error("getPageImagesAdmin:", err);
    return [];
  }
}

export async function getPageCopyMap(): Promise<Record<string, PageCopyItem>> {
  const map = defaultPageCopyMap();
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("page_copy")
      .select("slot_key, title, body, meta");

    if (error) {
      console.error("getPageCopyMap:", error.message);
      return map;
    }
    for (const row of data ?? []) {
      if (!row.slot_key) continue;
      map[row.slot_key] = {
        slot_key: row.slot_key,
        title: row.title,
        body: row.body,
        meta: (row.meta as Record<string, unknown>) ?? {},
      };
    }
    return map;
  } catch (err) {
    console.error("getPageCopyMap:", err);
    return map;
  }
}
