import type { Metadata } from "next";
import { Suspense } from "react";
import { getPublishedProjects } from "@/lib/cms";
import { getSiteSettings, brandFromSettings } from "@/lib/site-settings";
import PortfolioArchive from "./PortfolioArchive";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const brand = brandFromSettings(settings);
  return {
    title: `Portfolio | ${brand.name}`,
    description: `Selected Chennai apartment interiors by ${brand.name}—developer flats planned in 3D before possession.`,
  };
}

export default async function PortfolioPage() {
  const projects = await getPublishedProjects();
  return (
    <Suspense
      fallback={
        <div className="bg-[#1A1A1A] text-[#FBFBFA] min-h-screen flex items-center justify-center">
          <p className="text-sm text-[#FBFBFA]/60">Loading portfolio…</p>
        </div>
      }
    >
      <PortfolioArchive projects={projects} />
    </Suspense>
  );
}
