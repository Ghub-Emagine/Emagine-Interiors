import type { MetadataRoute } from "next";
import { getPublishedPosts, getPublishedProjects } from "@/lib/cms";

const GUIDE_PATHS = [
  "/guides",
  "/guides/modular-kitchen-cost-chennai",
  "/guides/full-home-interiors-cost-chennai",
  "/guides/builder-floor-plan-mistakes",
  "/guides/wardrobe-size-guide-2-3-bhk",
  "/guides/pre-possession-interiors-checklist",
] as const;

const STATIC_PATHS = [
  "/",
  "/about",
  "/why-us",
  "/portfolio",
  "/blog",
  "/layout-review",
  "/referral",
  "/partners",
  "/privacy",
  "/terms",
  ...GUIDE_PATHS,
] as const;

function siteOrigin() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000"
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteOrigin();
  const [projects, posts] = await Promise.all([
    getPublishedProjects(),
    getPublishedPosts(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    changeFrequency: path.startsWith("/guides") ? "monthly" : "weekly",
    priority: path === "/" ? 1 : path.startsWith("/guides") ? 0.7 : 0.8,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${base}/portfolio/${project.slug}`,
    lastModified: project.updated_at || project.published_at || undefined,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.updated_at || post.published_at || undefined,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...projectEntries, ...postEntries];
}
