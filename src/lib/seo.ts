import type { SiteSettings } from "@/lib/site-settings";
import { brandFromSettings } from "@/lib/site-settings";
import type { SiteContentItem } from "@/lib/types";

export function localBusinessJsonLd(settings: SiteSettings) {
  const brand = brandFromSettings(settings);
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: brand.name,
    description: brand.tagline,
    email: brand.contact.email,
    telephone: `+${brand.contact.whatsapp}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
      streetAddress: brand.contact.location,
    },
    areaServed: {
      "@type": "City",
      name: "Chennai",
    },
    url: process.env.NEXT_PUBLIC_SITE_URL || undefined,
  };
}

export function faqJsonLd(items: SiteContentItem[]) {
  const mainEntity = items
    .filter((i) => i.title && i.detail)
    .map((i) => ({
      "@type": "Question",
      name: i.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: i.detail,
      },
    }));

  if (mainEntity.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}

function siteOrigin() {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || undefined;
}

export function articleJsonLd(post: {
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
  updated_at?: string | null;
  authorName?: string;
}) {
  const base = siteOrigin();
  const url = base ? `${base}/blog/${post.slug}` : undefined;
  const publisherName = post.authorName || "Emagine Design Studio";

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || undefined,
    image: post.cover_image_url || undefined,
    datePublished: post.published_at || undefined,
    dateModified: post.updated_at || post.published_at || undefined,
    author: {
      "@type": "Organization",
      name: publisherName,
    },
    publisher: {
      "@type": "Organization",
      name: publisherName,
    },
    mainEntityOfPage: url
      ? {
          "@type": "WebPage",
          "@id": url,
        }
      : undefined,
    url,
  };
}

export function portfolioProjectJsonLd(project: {
  slug: string;
  title: string;
  summary: string | null;
  cover_image_url: string | null;
  gallery_urls?: string[] | null;
  location?: string | null;
  developer?: string | null;
  published_at?: string | null;
  updated_at?: string | null;
}) {
  const base = siteOrigin();
  const url = base ? `${base}/portfolio/${project.slug}` : undefined;
  const images = [
    project.cover_image_url,
    ...(project.gallery_urls ?? []),
  ].filter((src): src is string => Boolean(src));

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary || undefined,
    image: images.length > 0 ? images : undefined,
    url,
    datePublished: project.published_at || undefined,
    dateModified: project.updated_at || project.published_at || undefined,
    locationCreated: project.location
      ? {
          "@type": "Place",
          name: project.location,
        }
      : undefined,
    about: project.developer || undefined,
  };
}

export function jsonLdScript(data: Record<string, unknown> | null) {
  if (!data) return null;
  return JSON.stringify(data);
}
