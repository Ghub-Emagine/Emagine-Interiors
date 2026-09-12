/** Daily lead digest helpers (cron). Keep contact route untouched. */

export type DigestLeadRow = {
  status: string | null;
  source: string | null;
  has_floor_plan: boolean | null;
};

export type LeadDigestSummary = {
  count: number;
  byStatus: Record<string, number>;
  bySource: Record<string, number>;
  floorPlanCount: number;
  /** 0–100; 0 when count is 0 */
  attachRatePct: number;
};

export function authorizeCron(request: Request): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return false;
  const header = request.headers.get("authorization")?.trim();
  return header === `Bearer ${secret}`;
}

export function summarizeLeads(leads: DigestLeadRow[]): LeadDigestSummary {
  const byStatus: Record<string, number> = {};
  const bySource: Record<string, number> = {};
  let floorPlanCount = 0;

  for (const lead of leads) {
    const status = lead.status?.trim() || "unknown";
    const source = lead.source?.trim() || "unknown";
    byStatus[status] = (byStatus[status] ?? 0) + 1;
    bySource[source] = (bySource[source] ?? 0) + 1;
    if (lead.has_floor_plan) floorPlanCount += 1;
  }

  const count = leads.length;
  const attachRatePct =
    count === 0 ? 0 : Math.round((floorPlanCount / count) * 1000) / 10;

  return { count, byStatus, bySource, floorPlanCount, attachRatePct };
}

function countsList(map: Record<string, number>): string {
  const entries = Object.entries(map).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  if (entries.length === 0) return "<li>None</li>";
  return entries
    .map(([key, n]) => `<li><strong>${escapeHtml(key)}</strong>: ${n}</li>`)
    .join("");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildDigestHtml(
  summary: LeadDigestSummary,
  sinceIso: string,
  untilIso: string,
): string {
  return `
    <h2>Daily lead digest</h2>
    <p>Window: <strong>${escapeHtml(sinceIso)}</strong> → <strong>${escapeHtml(untilIso)}</strong> (last 24h)</p>
    <p><strong>Total leads:</strong> ${summary.count}</p>
    <p><strong>Floor plan attach rate:</strong> ${summary.attachRatePct}% (${summary.floorPlanCount} / ${summary.count})</p>
    <h3>By status</h3>
    <ul>${countsList(summary.byStatus)}</ul>
    <h3>By source</h3>
    <ul>${countsList(summary.bySource)}</ul>
  `.trim();
}

export function digestWindow(now = new Date()): { since: Date; until: Date; sinceIso: string; untilIso: string } {
  const until = now;
  const since = new Date(until.getTime() - 24 * 60 * 60 * 1000);
  return {
    since,
    until,
    sinceIso: since.toISOString(),
    untilIso: until.toISOString(),
  };
}
