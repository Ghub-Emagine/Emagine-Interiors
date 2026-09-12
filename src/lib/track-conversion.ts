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
