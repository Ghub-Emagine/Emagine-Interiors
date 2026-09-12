import type { LeadStatus, WebsiteLead } from "@/lib/types";

export const LEAD_STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "reviewed",
  "quoted",
  "won",
  "lost",
  "spam",
];

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  reviewed: "Reviewed",
  quoted: "Quoted",
  won: "Won",
  lost: "Lost",
  spam: "Spam",
};

export function normalizePhone(phone: string | null | undefined): string {
  return String(phone ?? "").replace(/\D/g, "");
}

/** WhatsApp wa.me number: 10-digit IN → prefix 91 */
export function whatsappDigits(phone: string | null | undefined): string {
  const digits = normalizePhone(phone);
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

export function leadWhatsAppHref(lead: Pick<
  WebsiteLead,
  "phone" | "name" | "location" | "tier" | "source"
>): string | null {
  const digits = whatsappDigits(lead.phone);
  if (!digits) return null;
  const parts = [
    `Hi ${lead.name || "there"},`,
    "this is Emagine Design Studio regarding your layout review request.",
  ];
  if (lead.location) parts.push(`Project: ${lead.location}.`);
  if (lead.tier) parts.push(`Budget: ${lead.tier}.`);
  if (lead.source) parts.push(`(via ${lead.source})`);
  return `https://wa.me/${digits}?text=${encodeURIComponent(parts.join(" "))}`;
}

export function isLeadStatus(value: string): value is LeadStatus {
  return (LEAD_STATUSES as string[]).includes(value);
}
