/** Digits-only phone for wa.me (studio numbers are usually already E.164 without +). */
function waDigits(phone: string): string {
  return String(phone ?? "").replace(/\D/g, "");
}

/** Studio-facing WhatsApp deep link with optional prefilled text. */
export function studioWaHref(phone: string, text: string): string {
  const digits = waDigits(phone);
  const base = `https://wa.me/${digits}`;
  const trimmed = text?.trim();
  if (!trimmed) return base;
  return `${base}?text=${encodeURIComponent(trimmed)}`;
}

export type LeadPrefillInput = {
  name?: string;
  location?: string;
  tier?: string;
  hasFloorPlan?: boolean;
};

/**
 * Prefill text when a visitor messages the studio after (or about) a layout review.
 * Omits empty fields; floor-plan line only when `hasFloorPlan` is explicitly set.
 */
export function leadPrefillMessage({
  name,
  location,
  tier,
  hasFloorPlan,
}: LeadPrefillInput = {}): string {
  const parts = [
    "Hi Emagine - I just submitted a layout review for my Chennai flat.",
  ];
  const n = name?.trim();
  const loc = location?.trim();
  const t = tier?.trim();
  if (n) parts.push(`My name is ${n}.`);
  if (loc) parts.push(`Project: ${loc}.`);
  if (t) parts.push(`Budget: ${t}.`);
  if (hasFloorPlan === true) parts.push("Floor plan is attached.");
  if (hasFloorPlan === false) parts.push("Floor plan not attached yet.");
  return parts.join(" ");
}
