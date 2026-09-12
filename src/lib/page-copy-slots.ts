/**
 * Homepage + form copy slots — editable in /admin/page-copy
 */
export type PageCopySlotDef = {
  key: string;
  page_group: string;
  label: string;
  title: string;
  body: string;
  meta?: Record<string, unknown>;
  sort_order: number;
};

export const PAGE_COPY_SLOTS: PageCopySlotDef[] = [
  {
    key: "hero_main",
    page_group: "Hero",
    label: "Hero headline & CTAs",
    title: "Full-home interiors for Chennai flats—planned from your builder",
    body: "Modular kitchens, wardrobes, and turnkey rooms—planned against your actual floor plan so light, flow, and materials are decided before you spend.",
    meta: {
      rotating_words: [
        "layout",
        "kitchen",
        "wardrobe",
        "living room",
        "bedroom",
        "floor plan",
      ],
      cta_primary: "Get free price estimate",
      cta_secondary: "Free layout review",
      cta_primary_href: "/#evaluate",
      cta_secondary_href: "/#apply",
    },
    sort_order: 10,
  },
  {
    key: "process_section",
    page_group: "Process",
    label: "Process section header",
    title: "Three steps. No showroom theatre.",
    body: "Most firms sell a visit. We sell a clear path from your builder plan to a finished home you already approved in 3D.",
    meta: { eyebrow: "How it works" },
    sort_order: 10,
  },
  {
    key: "process_1",
    page_group: "Process",
    label: "Process step 1",
    title: "Floor plan in",
    body: "Share your builder floor plan. We flag light, flow, and storage issues—plus a realistic budget in lakhs.",
    sort_order: 20,
  },
  {
    key: "process_2",
    page_group: "Process",
    label: "Process step 2",
    title: "See it before you buy",
    body: "Photoreal 3D of your actual flat—then kitchens, wardrobes, and rooms approved before site work starts.",
    sort_order: 30,
  },
  {
    key: "process_3",
    page_group: "Process",
    label: "Process step 3",
    title: "Built by one team",
    body: "Making and site finish stay with us. Fewer contractors, fewer delays, one studio you can call.",
    sort_order: 40,
  },
  {
    key: "services_section",
    page_group: "Services",
    label: "Services section header",
    title: "Full-home interiors—without the experience-centre detour.",
    body: "From free layout review to modular kitchens and on-site finish. You work with the studio, not a mall of sample rooms.",
    meta: { eyebrow: "What we deliver", cta: "Start with your floor plan" },
    sort_order: 10,
  },
  {
    key: "service_1",
    page_group: "Services",
    label: "Service 1",
    title: "Free layout review",
    body: "We study your builder floor plan for light, flow, and storage issues—before any design fee.",
    sort_order: 20,
  },
  {
    key: "service_2",
    page_group: "Services",
    label: "Service 2",
    title: "Modular kitchens & wardrobes",
    body: "Branded BWP cabinets and named hardware, designed for your flat and approved in 3D first.",
    sort_order: 30,
  },
  {
    key: "service_3",
    page_group: "Services",
    label: "Service 3",
    title: "Full-home interiors",
    body: "Living, bedrooms, false ceiling, lighting, and finishes—one studio, one schedule.",
    sort_order: 40,
  },
  {
    key: "service_4",
    page_group: "Services",
    label: "Service 4",
    title: "Complete turnkey delivery",
    body: "Making and site finish by our team so you are not chasing five different contractors.",
    sort_order: 50,
  },
  {
    key: "material_section",
    page_group: "Materials",
    label: "Materials section header",
    title: "Materials, not marketing.",
    body: "Corporate quotes often look similar on paper. The difference is what sits inside the cabinets, whose hinges you get, and whether the 3D matches what is built on site.",
    meta: { eyebrow: "What quotes hide" },
    sort_order: 10,
  },
  {
    key: "material_1",
    page_group: "Materials",
    label: "Material row 1",
    title: "Cabinet body",
    body: "",
    meta: { eds: "Branded BWP Gurjan ply", competitor: "Prelam MDF / mixed" },
    sort_order: 20,
  },
  {
    key: "material_2",
    page_group: "Materials",
    label: "Material row 2",
    title: "Hardware",
    body: "",
    meta: { eds: "Hettich / Häfele", competitor: "Unbranded economy" },
    sort_order: 30,
  },
  {
    key: "material_3",
    page_group: "Materials",
    label: "Material row 3",
    title: "Scope",
    body: "",
    meta: {
      eds: "Modular + full-home delivery",
      competitor: "Kitchen-only packages",
    },
    sort_order: 40,
  },
  {
    key: "material_4",
    page_group: "Materials",
    label: "Material row 4",
    title: "Design basis",
    body: "",
    meta: { eds: "Your builder flat in 3D", competitor: "Showroom template" },
    sort_order: 50,
  },
  {
    key: "material_5",
    page_group: "Materials",
    label: "Material row 5",
    title: "Spec promise",
    body: "",
    meta: { eds: "Built as you approved", competitor: "Subject to availability" },
    sort_order: 60,
  },
  {
    key: "closing_cta",
    page_group: "Closing",
    label: "Closing CTA",
    title: "Prefer to talk first?",
    body: "Message the studio on WhatsApp with your builder name and flat size. We'll guide you from there.",
    meta: {
      cta_primary: "WhatsApp the studio",
      cta_secondary: "Why choose Emagine",
    },
    sort_order: 10,
  },
  {
    key: "form_section",
    page_group: "Layout form",
    label: "Home layout form header",
    title: "Send your floor plan. We will WhatsApp what to watch for.",
    body: "Upload your builder floor plan and details. Get practical notes on light, storage, and flow, plus a realistic budget band in lakhs.",
    meta: {
      eyebrow: "Free layout review",
      chip_1: "Pre-possession flats",
      chip_2: "Limited reviews / week",
      chip_3: "Chennai studio",
      submit_label: "Send for layout review",
    },
    sort_order: 10,
  },
  {
    key: "about_hero",
    page_group: "About",
    label: "About hero",
    title: "A studio for people who already bought the flat.",
    body: "Clear decisions before site drama, and interiors planned for the home you actually own in Chennai.",
    meta: {
      eyebrow: "Emagine Design Studio · Chennai",
      highlight: "who already bought the flat.",
    },
    sort_order: 100,
  },
  {
    key: "about_origin",
    page_group: "About",
    label: "About origin section",
    title: "Why this studio exists",
    body: "Large players can feel rigid. Local contractors can feel flexible until materials and timelines slip. Emagine sits in the middle: careful detailing, named materials, and a habit of checking your floor plan before money leaves the account.",
    meta: {
      eyebrow: "Origin",
      side_quote:
        "Built in the gap between big brands and loose contractors.",
    },
    sort_order: 110,
  },
  {
    key: "about_chennai",
    page_group: "About",
    label: "About Chennai context",
    title: "Flats here come with a floor plan and a lot of opinions.",
    body: "Pre-possession apartments stack decisions fast: wet areas that don't fit, wardrobe walls that steal light, budgets quoted as approx until site day. Emagine's bias is simple—score the plan first, then design what you can actually live with.",
    meta: { eyebrow: "Chennai context" },
    sort_order: 120,
  },
  {
    key: "about_refusals_intro",
    page_group: "About",
    label: "About refusals intro",
    title: "What we refuse on purpose",
    body: "These rules shape every brief we take.",
    meta: { eyebrow: "Lines we won't cross" },
    sort_order: 130,
  },
  {
    key: "about_cta",
    page_group: "About",
    label: "About bottom CTA",
    title: "Ready to plan your flat?",
    body: "Send your builder floor plan for a free review, or message us on WhatsApp to start.",
    meta: {
      cta_primary: "Get a free layout review",
      cta_whatsapp: "WhatsApp the studio",
    },
    sort_order: 140,
  },
  {
    key: "why_hero",
    page_group: "Why Emagine",
    label: "Why Us hero",
    title: "The safer way to start interiors for your new flat",
    body: "Big showrooms sell the visit. Loose contractors sell flexibility. Emagine sells clarity—budget, layout, and materials—before you spend.",
    meta: {
      eyebrow: "Why Emagine · Chennai",
      cta_primary: "Get a free layout review",
      cta_whatsapp: "WhatsApp to compare",
    },
    sort_order: 200,
  },
  {
    key: "why_outcomes_intro",
    page_group: "Why Emagine",
    label: "Why Us outcomes intro",
    title: "What changes when you start with Emagine",
    body: "",
    meta: { eyebrow: "What you actually get" },
    sort_order: 210,
  },
  {
    key: "why_compare_intro",
    page_group: "Why Emagine",
    label: "Why Us comparison intro",
    title: "Showroom path vs Emagine path",
    body: "Use this when you are comparing options for a Chennai flat, before you sign anything.",
    meta: { eyebrow: "Side by side" },
    sort_order: 220,
  },
  {
    key: "why_cta",
    page_group: "Why Emagine",
    label: "Why Us bottom CTA",
    title: "Compare us with your floor plan, not a brochure",
    body: "Send the plan. Get layout notes and a budget band. Then decide with numbers, not showroom pressure.",
    meta: {
      cta_primary: "Request free layout review",
    },
    sort_order: 230,
  },
];

export type PageCopyItem = {
  slot_key: string;
  title: string | null;
  body: string | null;
  meta: Record<string, unknown>;
};

export function defaultPageCopyMap(): Record<string, PageCopyItem> {
  const map: Record<string, PageCopyItem> = {};
  for (const slot of PAGE_COPY_SLOTS) {
    map[slot.key] = {
      slot_key: slot.key,
      title: slot.title,
      body: slot.body,
      meta: slot.meta ?? {},
    };
  }
  return map;
}

export function copyField(
  map: Record<string, PageCopyItem>,
  key: string,
  field: "title" | "body",
  fallback = "",
): string {
  const item = map[key];
  if (!item) return fallback;
  const val = item[field];
  return (val && String(val).trim()) || fallback;
}

export function copyMeta<T = unknown>(
  map: Record<string, PageCopyItem>,
  key: string,
  metaKey: string,
  fallback: T,
): T {
  const item = map[key];
  if (!item?.meta || !(metaKey in item.meta)) return fallback;
  return item.meta[metaKey] as T;
}
