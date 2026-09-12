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

export function jsonLdScript(data: Record<string, unknown> | null) {
  if (!data) return null;
  return JSON.stringify(data);
}
