import type { Metadata } from "next";
import WhyUsContent from "./WhyUsContent";
import { getPageCopyMap, getPageImageMap } from "@/lib/cms";
import { getSiteSettings, brandFromSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const brand = brandFromSettings(settings);
  return {
    title: `Why Emagine | ${brand.name}`,
    description: `Why choose ${brand.name} for Chennai flat interiors—layout-first planning, clear ₹/sqft, one studio from plan to finish.`,
  };
}

export default async function WhyUsPage() {
  const [images, copy] = await Promise.all([
    getPageImageMap(),
    getPageCopyMap(),
  ]);
  return <WhyUsContent images={images} copy={copy} />;
}
