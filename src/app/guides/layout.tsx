import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getSiteSettings, brandFromSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const brand = brandFromSettings(settings);
  return {
    title: {
      template: `%s | ${brand.name}`,
      default: `Guides | ${brand.name}`,
    },
    description:
      "Chennai flat interiors guides—modular kitchen cost, full-home budgets, floor-plan mistakes, wardrobes, and pre-possession checklists.",
  };
}

export default function GuidesLayout({ children }: { children: ReactNode }) {
  return children;
}
