export type GuidePillar = {
  slug: string;
  title: string;
  eyebrow: string;
  excerpt: string;
  description: string;
};

export const GUIDE_PILLARS: GuidePillar[] = [
  {
    slug: "modular-kitchen-cost-chennai",
    title: "Modular kitchen cost in Chennai",
    eyebrow: "Cost guide",
    excerpt:
      "What drives ₹/sqft for modular kitchens in Chennai flats—carcass, shutters, hardware, and layout quirks.",
    description:
      "Chennai modular kitchen cost bands, what changes the quote, and how to read builder wet-area plans before you buy.",
  },
  {
    slug: "full-home-interiors-cost-chennai",
    title: "Full-home interiors cost in Chennai",
    eyebrow: "Cost guide",
    excerpt:
      "How full-home budgets usually break down for 2 & 3 BHK flats—rooms, false ceiling, lighting, and finish grades.",
    description:
      "Realistic full-home interiors cost ranges for Chennai flats, room-wise scope, and how to set a lakhs budget before possession.",
  },
  {
    slug: "builder-floor-plan-mistakes",
    title: "Builder floor plan mistakes to catch early",
    eyebrow: "Layout",
    excerpt:
      "Common Casagrand, Appaswamy, and Akshaya plan issues: dead corners, tight bedrooms, and kitchens that fight daily cooking.",
    description:
      "Floor-plan mistakes Chennai homeowners miss on builder layouts—and what to fix before modular work starts.",
  },
  {
    slug: "wardrobe-size-guide-2-3-bhk",
    title: "Wardrobe size guide for 2 & 3 BHK",
    eyebrow: "Storage",
    excerpt:
      "How much wardrobe run you actually need in Chennai bedrooms—and where sliding vs hinged makes sense.",
    description:
      "Wardrobe sizing for 2 BHK and 3 BHK Chennai flats: depths, runs, sliding doors, and loft planning.",
  },
  {
    slug: "pre-possession-interiors-checklist",
    title: "Pre-possession interiors checklist",
    eyebrow: "Checklist",
    excerpt:
      "What to decide before keys—layout review, budget band, electrical points, and site access for Chennai flats.",
    description:
      "Pre-possession interiors checklist for Chennai flat buyers: plan review, budget, MEP, and vendor timing.",
  },
];

export function getPillar(slug: string): GuidePillar | undefined {
  return GUIDE_PILLARS.find((p) => p.slug === slug);
}

export function layoutReviewHref(slug: string): string {
  return `/layout-review?utm_source=guide&utm_campaign=${encodeURIComponent(slug)}`;
}
