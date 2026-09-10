import type { SiteContentItem } from "@/lib/types";

export type PricingTierMap = Record<
  string,
  { name: string; min: number; max: number; desc: string }
>;

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
