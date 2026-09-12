/**
 * Allowlisted `?builder=` slugs → public display names.
 * Unknown / empty slugs normalize to null (no personalized headline).
 */
export const BUILDER_ALLOWLIST: Record<string, string> = {
  casagrand: "Casagrand",
  appaswamy: "Appaswamy",
  akshaya: "Akshaya",
  "spr-city": "SPR City",
  sprcity: "SPR City",
  spr: "SPR City",
};

/** Normalize a query slug to a display name, or null if not allowlisted. */
export function normalizeBuilder(slug: string | null | undefined): string | null {
  if (!slug) return null;
  const key = slug
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  if (!key) return null;
  return BUILDER_ALLOWLIST[key] ?? null;
}
