"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Fire when a lead form succeeds. No-ops if tags are unset. */
export function trackGenerateLead(params?: {
  source?: string;
  hasFloorPlan?: boolean;
}) {
  try {
    window.gtag?.("event", "generate_lead", {
      event_category: "lead",
      event_label: params?.source ?? "form",
      has_floor_plan: params?.hasFloorPlan ? "yes" : "no",
    });
  } catch {
    /* ignore */
  }
  try {
    window.fbq?.("track", "Lead");
  } catch {
    /* ignore */
  }
}

/** WhatsApp / contact clicks */
export function trackContactClick(method: "whatsapp" | "form_cta" = "whatsapp") {
  try {
    window.gtag?.("event", "contact", {
      event_category: "engagement",
      method,
    });
  } catch {
    /* ignore */
  }
  try {
    window.fbq?.("trackCustom", "Contact", { method });
  } catch {
    /* ignore */
  }
}

/** First engagement / mount of a multi-step lead form. */
export function trackFormStart(params?: { source?: string }) {
  try {
    window.gtag?.("event", "form_start", {
      event_category: "lead",
      event_label: params?.source ?? "form",
    });
  } catch {
    /* ignore */
  }
  try {
    window.fbq?.("trackCustom", "FormStart", {
      source: params?.source ?? "form",
    });
  } catch {
    /* ignore */
  }
}

/** Pricing tool estimate submitted successfully. */
export function trackEstimateRun(params?: {
  tier?: string;
  sqft?: number | string;
}) {
  try {
    window.gtag?.("event", "estimate_run", {
      event_category: "engagement",
      event_label: params?.tier ?? "estimate",
      sqft: params?.sqft != null ? String(params.sqft) : undefined,
    });
  } catch {
    /* ignore */
  }
  try {
    window.fbq?.("trackCustom", "EstimateRun", {
      tier: params?.tier,
      sqft: params?.sqft,
    });
  } catch {
    /* ignore */
  }
}

/** Video play (hero / slot media). */
export function trackVideoPlay(params?: { label?: string }) {
  try {
    window.gtag?.("event", "video_play", {
      event_category: "engagement",
      event_label: params?.label ?? "video",
    });
  } catch {
    /* ignore */
  }
  try {
    window.fbq?.("trackCustom", "VideoPlay", {
      label: params?.label ?? "video",
    });
  } catch {
    /* ignore */
  }
}

/** Portfolio / product detail view. */
export function trackViewContent(params?: {
  content_name?: string;
  content_ids?: string[];
  content_type?: string;
}) {
  try {
    window.gtag?.("event", "view_item", {
      event_category: "engagement",
      event_label: params?.content_name ?? "content",
      items: params?.content_ids?.map((id) => ({ item_id: id })),
    });
  } catch {
    /* ignore */
  }
  try {
    window.fbq?.("track", "ViewContent", {
      content_name: params?.content_name,
      content_ids: params?.content_ids,
      content_type: params?.content_type ?? "product",
    });
  } catch {
    /* ignore */
  }
}
