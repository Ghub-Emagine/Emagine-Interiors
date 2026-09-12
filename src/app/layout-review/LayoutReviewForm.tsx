"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { BRAND_INFO } from "@/lib/constants";
import LayoutReviewWizard from "@/components/forms/LayoutReviewWizard";

export default function LayoutReviewForm({
  studioWhatsapp,
}: {
  studioWhatsapp?: string;
}) {
  const searchParams = useSearchParams();
  const whatsapp = studioWhatsapp || BRAND_INFO.contact.whatsapp;

  const utm = useMemo(
    () => ({
      utm_source: searchParams.get("utm_source") ?? "",
      utm_medium: searchParams.get("utm_medium") ?? "",
      utm_campaign: searchParams.get("utm_campaign") ?? "",
    }),
    [searchParams],
  );

  return (
    <LayoutReviewWizard
      source="layout-review"
      studioWhatsapp={whatsapp}
      submitLabel="Request free layout review"
      utm={utm}
      compact
    />
  );
}
