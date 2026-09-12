import { SITE_IMAGES } from "@/lib/site-images";

export type PageImageSlotDef = {
  key: string;
  page_group: string;
  label: string;
  fallback: keyof typeof SITE_IMAGES;
  alt: string;
  sort_order: number;
};

/** Canonical slots — admin + public fallbacks stay in sync */
export const PAGE_IMAGE_SLOTS: PageImageSlotDef[] = [
  {
    key: "about_hero",
    page_group: "About",
    label: "Hero background",
    fallback: "livingFamily",
    alt: "About hero",
    sort_order: 10,
  },
  {
    key: "about_origin",
    page_group: "About",
    label: "Origin side image",
    fallback: "studioDesk",
    alt: "Studio workspace",
    sort_order: 20,
  },
  {
    key: "about_chennai",
    page_group: "About",
    label: "Chennai context image",
    fallback: "apartmentBright",
    alt: "Apartment living",
    sort_order: 30,
  },
  {
    key: "about_gallery_1",
    page_group: "About",
    label: "Studio gallery 1",
    fallback: "kitchenWarm",
    alt: "Kitchen",
    sort_order: 40,
  },
  {
    key: "about_gallery_2",
    page_group: "About",
    label: "Studio gallery 2",
    fallback: "bedroomCalm",
    alt: "Bedroom",
    sort_order: 50,
  },
  {
    key: "about_cta",
    page_group: "About",
    label: "Bottom CTA background",
    fallback: "closing",
    alt: "CTA",
    sort_order: 60,
  },
  {
    key: "why_hero",
    page_group: "Why Emagine",
    label: "Hero background",
    fallback: "apartmentWarm",
    alt: "Why EDS hero",
    sort_order: 10,
  },
  {
    key: "why_strip_kitchen",
    page_group: "Why Emagine",
    label: "Strip — kitchen",
    fallback: "kitchenWarm",
    alt: "Modular kitchen",
    sort_order: 20,
  },
  {
    key: "why_strip_living",
    page_group: "Why Emagine",
    label: "Strip — living",
    fallback: "livingFamily",
    alt: "Living room",
    sort_order: 30,
  },
  {
    key: "why_strip_bedroom",
    page_group: "Why Emagine",
    label: "Strip — bedroom",
    fallback: "bedroomCalm",
    alt: "Bedroom",
    sort_order: 40,
  },
  {
    key: "why_cta",
    page_group: "Why Emagine",
    label: "Bottom CTA background",
    fallback: "closing",
    alt: "CTA",
    sort_order: 50,
  },
  {
    key: "layout_hero",
    page_group: "Layout review",
    label: "Hero background",
    fallback: "apartmentBright",
    alt: "Layout review hero",
    sort_order: 10,
  },
  {
    key: "layout_step_1",
    page_group: "Layout review",
    label: "After submit — step 1",
    fallback: "floorPlanDesk",
    alt: "Floor plan review",
    sort_order: 20,
  },
  {
    key: "layout_step_2",
    page_group: "Layout review",
    label: "After submit — step 2",
    fallback: "kitchenWarm",
    alt: "Budget band",
    sort_order: 30,
  },
  {
    key: "layout_step_3",
    page_group: "Layout review",
    label: "After submit — step 3",
    fallback: "apartmentWarm",
    alt: "Design",
    sort_order: 40,
  },
  {
    key: "home_process_1",
    page_group: "Homepage",
    label: "How it works — step 1",
    fallback: "floorPlanDesk",
    alt: "Floor plan",
    sort_order: 10,
  },
  {
    key: "home_process_2",
    page_group: "Homepage",
    label: "How it works — step 2",
    fallback: "livingSoft",
    alt: "3D preview",
    sort_order: 20,
  },
  {
    key: "home_process_3",
    page_group: "Homepage",
    label: "How it works — step 3",
    fallback: "buildSite",
    alt: "Build",
    sort_order: 30,
  },
  {
    key: "home_service_1",
    page_group: "Homepage",
    label: "Services card 1",
    fallback: "floorPlanDesk",
    alt: "Layout review",
    sort_order: 40,
  },
  {
    key: "home_service_2",
    page_group: "Homepage",
    label: "Services card 2",
    fallback: "kitchenWarm",
    alt: "Kitchen",
    sort_order: 50,
  },
  {
    key: "home_service_3",
    page_group: "Homepage",
    label: "Services card 3",
    fallback: "livingFamily",
    alt: "Full home",
    sort_order: 60,
  },
  {
    key: "home_service_4",
    page_group: "Homepage",
    label: "Services card 4",
    fallback: "buildSite",
    alt: "Turnkey",
    sort_order: 70,
  },
  {
    key: "home_faq_side",
    page_group: "Homepage",
    label: "FAQ side image",
    fallback: "apartmentWarm",
    alt: "FAQ",
    sort_order: 80,
  },
  {
    key: "home_closing",
    page_group: "Homepage",
    label: "Closing CTA background",
    fallback: "closing",
    alt: "Closing",
    sort_order: 90,
  },
];

export type PageMedia = {
  url: string;
  media_type: "image" | "video";
};

export function defaultPageMediaMap(): Record<string, PageMedia> {
  const map: Record<string, PageMedia> = {};
  for (const slot of PAGE_IMAGE_SLOTS) {
    map[slot.key] = {
      url: SITE_IMAGES[slot.fallback],
      media_type: "image",
    };
  }
  return map;
}

/** @deprecated prefer pageMedia — returns URL only */
export function defaultPageImageMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const slot of PAGE_IMAGE_SLOTS) {
    map[slot.key] = SITE_IMAGES[slot.fallback];
  }
  return map;
}

export function pageMedia(
  map: Record<string, PageMedia>,
  key: string,
): PageMedia {
  return (
    map[key] ??
    defaultPageMediaMap()[key] ?? {
      url: SITE_IMAGES.apartmentWarm,
      media_type: "image",
    }
  );
}

export function pageImage(
  map: Record<string, string> | Record<string, PageMedia>,
  key: string,
): string {
  const entry = map[key];
  if (!entry) {
    return defaultPageImageMap()[key] ?? SITE_IMAGES.apartmentWarm;
  }
  if (typeof entry === "string") return entry;
  return entry.url;
}
