"use client";

import { useEffect } from "react";
import { trackViewContent } from "@/lib/track-conversion";

/** Fires ViewContent once on portfolio project detail mount. */
export default function PortfolioViewContent({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) {
  useEffect(() => {
    trackViewContent({
      content_name: title,
      content_ids: [slug],
      content_type: "product",
    });
  }, [title, slug]);

  return null;
}
