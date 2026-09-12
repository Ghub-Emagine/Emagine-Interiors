import type { SiteContentItem } from "@/lib/types";

export type PricingTierMap = Record<
  string,
  { name: string; min: number; max: number; desc: string }
>;

/** Scope modes for the cost calculator v2 (refines ₹/sqft → lakhs bands). */
export type EstimateScope = "modular" | "full-home";

export const ESTIMATE_SCOPES: Record<
  EstimateScope,
  {
    label: string;
    shortLabel: string;
    hint: string;
    /** Multipliers on tier min/max ₹/sqft (modular ≈ kitchen + wardrobes share). */
    minFactor: number;
    maxFactor: number;
  }
> = {
  modular: {
    label: "Modular / room-wise",
    shortLabel: "Modular",
    hint: "Kitchen + wardrobes focus—typical first-phase scope.",
    minFactor: 0.45,
    maxFactor: 0.58,
  },
  "full-home": {
    label: "Full-home",
    shortLabel: "Full-home",
    hint: "Living, bedrooms, ceilings, lighting & coordinated finish.",
    minFactor: 1,
    maxFactor: 1,
  },
};

export function tiersFromContent(items: SiteContentItem[]): PricingTierMap {
  const map: PricingTierMap = {};
  for (const item of items) {
    const meta = item.meta as { tier_key?: string; min?: number; max?: number };
    const key = String(meta.tier_key || item.title.toLowerCase()).replace(
      /\s+/g,
      "-",
    );
    map[key] = {
      name: item.title,
      min: Number(meta.min ?? 0),
      max: Number(meta.max ?? 0),
      desc: item.detail ?? "",
    };
  }
  return map;
}

/** Lakhs band from carpet/built-up sqft, finish tier, and modular vs full-home scope. */
export function estimateLakhsBand(
  sqft: number,
  tier: { min: number; max: number },
  scope: EstimateScope = "full-home",
): { min: string; max: string } {
  const { minFactor, maxFactor } = ESTIMATE_SCOPES[scope];
  const minLakhs = ((sqft * tier.min * minFactor) / 100_000).toFixed(2);
  const maxLakhs = ((sqft * tier.max * maxFactor) / 100_000).toFixed(2);
  return { min: minLakhs, max: maxLakhs };
}
