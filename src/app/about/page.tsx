import type { Metadata } from "next";
import AboutContent from "./AboutContent";
import { getPageCopyMap, getPageImageMap } from "@/lib/cms";
import { getSiteSettings, brandFromSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const brand = brandFromSettings(settings);
  return {
    title: `About | ${brand.name}`,
    description: `${brand.name} — Chennai full-home and modular interiors, planned from your builder layout. Clarity, transparent ₹/sqft, no experience-centre detour.`,
  };
}

export default async function AboutPage() {
  const [images, copy] = await Promise.all([
    getPageImageMap(),
    getPageCopyMap(),
  ]);
  return <AboutContent images={images} copy={copy} />;
}
