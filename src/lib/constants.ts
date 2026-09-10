// src/lib/constants.ts

export const BRAND_INFO = {
  name: "Emagine Design Studio",
  tagline:
    "Full-home interiors for Chennai flats—planned from your builder floor plan.",
  contact: {
    email: "hello@emagine3d.com",
    whatsapp: "918122192193",
    location: "Chennai, Tamil Nadu",
  },
};

/** Internal finish grades used by the ₹/sqft calculator */
export const PRICING_TIERS = {
  essential: {
    name: "Essential",
    min: 1200,
    max: 1600,
    desc: "Solid modular basics—clean detailing, branded BWP cabinet bodies.",
  },
  executive: {
    name: "Executive",
    min: 1600,
    max: 3000,
    desc: "Full-home finishes with 3D approved before site work begins.",
  },
  luxury: {
    name: "Luxury",
    min: 3000,
    max: 4500,
    desc: "Architectural-grade materials and detailing end to end.",
  },
};

/** Customer-facing total budget bands (aligned with how Chennai ads ask) */
export const BUDGET_BANDS_LAKHS = [
  { value: "under-5L", label: "Under ₹5 L" },
  { value: "5-12L", label: "₹5 L – ₹12 L" },
  { value: "12-25L", label: "₹12 L – ₹25 L" },
  { value: "25-40L", label: "₹25 L – ₹40 L" },
  { value: "40L-plus", label: "₹40 L and above" },
] as const;

export const TARGET_DEVELOPERS = [
  "Casagrand",
  "Appaswamy",
  "Akshaya",
  "SPR City",
  "Other Premium Site",
];

/** Full-home service lines (no experience centre — studio + site) */
export const SERVICE_LINES = [
  {
    title: "Free layout review",
    detail:
      "We study your builder floor plan for light, flow, and storage issues—before any design fee.",
  },
  {
    title: "Modular kitchens & wardrobes",
    detail:
      "Branded BWP cabinets and named hardware, designed for your flat and approved in 3D first.",
  },
  {
    title: "Full-home interiors",
    detail:
      "Living, bedrooms, false ceiling, lighting, and finishes—one studio, one schedule.",
  },
  {
    title: "Complete turnkey delivery",
    detail:
      "Making and site finish by our team so you are not chasing five different contractors.",
  },
];

export const TRUST_MARQUEE = [
  "Layout-first planning",
  "Modular kitchens",
  "Wardrobes",
  "Full-home interiors",
  "3D before site work",
  "Branded BWP ply",
  "Transparent ₹/sqft",
  "Casagrand · Appaswamy · Akshaya",
  "Chennai flats",
  "Same-day WhatsApp reviews",
];

/** Promise strip — Design Domains style trust row, Emagine voice */
export const PROMISE_STRIP = [
  {
    title: "On-time delivery",
    detail: "Site schedule locked after you approve the 3D—not endless site visits.",
  },
  {
    title: "Published ₹/sqft",
    detail: "Essential, Executive, Luxury bands before you commit spend.",
  },
  {
    title: "Named materials",
    detail: "Branded BWP ply and hardware you can verify—not vague ‘premium’.",
  },
  {
    title: "Clear studio policies",
    detail: "What we design, what we build, and how changes work—up front.",
  },
];

/** Room galleries — swap for real Chennai project photos in admin when ready. */
export const ROOM_DESIGN_GALLERIES = [
  {
    id: "kitchen",
    title: "Kitchen designs",
    blurb: "Modular kitchens planned for your wet areas and how you cook every day.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?q=80&w=900&auto=format&fit=crop",
        alt: "Warm modular kitchen cabinetry",
      },
      {
        src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=900&auto=format&fit=crop",
        alt: "Clean white modular kitchen",
      },
      {
        src: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=900&auto=format&fit=crop",
        alt: "Compact kitchen with warm finishes",
      },
    ],
  },
  {
    id: "living",
    title: "Living room designs",
    blurb: "Living spaces that respect light, TV wall depth, and storage for Chennai flats.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=900&auto=format&fit=crop",
        alt: "Living room with soft seating",
      },
      {
        src: "https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=900&auto=format&fit=crop",
        alt: "Bright apartment living area",
      },
      {
        src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=900&auto=format&fit=crop",
        alt: "Warm apartment living interior",
      },
    ],
  },
  {
    id: "bedroom",
    title: "Bedroom designs",
    blurb: "Wardrobes, bed walls, and quiet finishes sized to your builder plan.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=900&auto=format&fit=crop",
        alt: "Bedroom with wardrobe and soft lighting",
      },
      {
        src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=900&auto=format&fit=crop",
        alt: "Calm bedroom interior",
      },
      {
        src: "https://images.unsplash.com/photo-1595428774223-ef5262435a18?q=80&w=900&auto=format&fit=crop",
        alt: "Wardrobe storage detail",
      },
    ],
  },
];

/** Solutions catalog — icon keys map to Lucide icons */
export const INTERIOR_SOLUTIONS = [
  { title: "Modular kitchen", detail: "Cabinets, shutters, counter & hardware as one system.", icon: "CookingPot" },
  { title: "Storage & wardrobes", detail: "Floor-to-ceiling storage mapped to your rooms.", icon: "DoorClosed" },
  { title: "TV units & media walls", detail: "Depth, cables, and living flow planned in 3D.", icon: "Monitor" },
  { title: "False ceiling & lighting", detail: "Layers planned with electrical—not as an afterthought.", icon: "Lightbulb" },
  { title: "Dressing & vanity", detail: "Bedroom and bath storage that fits the plan.", icon: "Sparkles" },
  { title: "Study & work nooks", detail: "Compact desks for work-from-home without crowding the living room.", icon: "Laptop" },
  { title: "Space-saving furniture", detail: "Multipurpose pieces where Chennai flats run tight.", icon: "Box" },
  { title: "Wall finishes", detail: "Paint, wallpaper, and feature walls chosen with materials.", icon: "Paintbrush" },
  { title: "Bathroom interiors", detail: "Vanity, niches, and wet-area coordination.", icon: "Bath" },
  { title: "Pooja & utility", detail: "Often-missed rooms designed into the layout early.", icon: "Flower2" },
  { title: "Partition & screens", detail: "Light divides without blocking airflow.", icon: "Columns2" },
  { title: "Full-home turnkey", detail: "One studio from floor plan to handover.", icon: "Home" },
] as const;

export const STUDIO_OFFERINGS = [
  {
    title: "Dedicated design lead",
    detail:
      "One studio contact owns your layout, 3D, and site queries—not a rotating sales desk.",
  },
  {
    title: "Options until it fits",
    detail:
      "We refine your actual flat until light, storage, and budget land—not a single template.",
  },
  {
    title: "Material clarity",
    detail:
      "Named ply, laminates, and hardware in the quote. You know what you are paying for.",
  },
  {
    title: "Schedule discipline",
    detail:
      "Making and site phases start after you approve the 3D—not before.",
  },
  {
    title: "Full-home solutions",
    detail:
      "Kitchen to wardrobe to living finishes—one team for the whole home.",
  },
  {
    title: "Transparent design fees",
    detail:
      "Design scope and cost stated early. No surprise ‘design charges’ later.",
  },
];
