import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { LeadStatus, WebsiteLead } from "@/lib/types";
import {
  LEAD_STATUSES,
  LEAD_STATUS_LABELS,
  normalizePhone,
} from "@/lib/lead-helpers";
import LeadRowActions from "./leads/LeadRowActions";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

type Props = {
  searchParams: Promise<{
    status?: string;
    source?: string;
    utm_source?: string;
  }>;
};

export default async function AdminLeadsPage({ searchParams }: Props) {
  const params = await searchParams;
  const statusFilter = params.status?.trim() || "";
  const sourceFilter = params.source?.trim() || "";
  const utmFilter = params.utm_source?.trim() || "";

  const supabase = await createClient();
  let query = supabase
    .from("website_leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  if (statusFilter && LEAD_STATUSES.includes(statusFilter as LeadStatus)) {
    query = query.eq("status", statusFilter);
  }
  if (sourceFilter) {
    query = query.eq("source", sourceFilter);
  }
  if (utmFilter) {
    query = query.eq("utm_source", utmFilter);
  }

  const { data, error } = await query;
  const leads = (data ?? []) as WebsiteLead[];

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const { data: healthRows } = await supabase
    .from("website_leads")
    .select("source, has_floor_plan")
    .gte("created_at", sevenDaysAgo.toISOString());

  const healthLeads = healthRows ?? [];
  const healthCount = healthLeads.length;
  const floorPlanCount = healthLeads.filter((l) => l.has_floor_plan).length;
  const attachRate =
    healthCount > 0 ? Math.round((floorPlanCount / healthCount) * 100) : 0;
  const healthBySource = healthLeads.reduce<Record<string, number>>(
    (acc, lead) => {
      const key = lead.source || "unknown";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {},
  );
  const topSources = Object.entries(healthBySource)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const byStatus = leads.reduce<Record<string, number>>((acc, lead) => {
    const key = lead.status || "new";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const byUtm = leads.reduce<Record<string, number>>((acc, lead) => {
    const key = lead.utm_source || "(none)";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const bySource = leads.reduce<Record<string, number>>((acc, lead) => {
    const key = lead.source || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const phoneCounts = leads.reduce<Record<string, number>>((acc, lead) => {
    const p = normalizePhone(lead.phone);
    if (!p) return acc;
    acc[p] = (acc[p] || 0) + 1;
    return acc;
  }, {});

  const sources = Object.keys(bySource).sort();
  const utms = Object.keys(byUtm)
    .filter((k) => k !== "(none)")
    .sort();

  const filterQs = (overrides: Record<string, string>) => {
    const q = new URLSearchParams();
    const next = {
      status: statusFilter,
      source: sourceFilter,
      utm_source: utmFilter,
      ...overrides,
    };
    for (const [k, v] of Object.entries(next)) {
      if (v) q.set(k, v);
    }
    const s = q.toString();
    return s ? `/admin?${s}` : "/admin";
  };

  return (
    <div>
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-2">
            Inbox
          </p>
          <h1 className="font-serif text-4xl mb-2">Leads</h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Pipeline, WhatsApp, and UTM filters — newest first (up to 500).
          </p>
        </div>
        <a
          href="/admin/leads-export"
          className="btn-primary shrink-0 text-center"
        >
          Export CSV / Excel
        </a>
      </div>

      <form
        method="get"
        action="/admin"
        className="mb-6 flex flex-wrap gap-3 items-end border border-[var(--border)] bg-[var(--background)] p-4"
      >
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[var(--text-secondary)] mb-1 font-semibold">
            Status
          </label>
          <select
            name="status"
            defaultValue={statusFilter}
            className="border border-[var(--border)] bg-white px-3 py-2 text-sm min-w-[8rem]"
          >
            <option value="">All</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {LEAD_STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[var(--text-secondary)] mb-1 font-semibold">
            Source
          </label>
          <select
            name="source"
            defaultValue={sourceFilter}
            className="border border-[var(--border)] bg-white px-3 py-2 text-sm min-w-[8rem]"
          >
            <option value="">All</option>
            {sources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[var(--text-secondary)] mb-1 font-semibold">
            UTM source
          </label>
          <select
            name="utm_source"
            defaultValue={utmFilter}
            className="border border-[var(--border)] bg-white px-3 py-2 text-sm min-w-[8rem]"
          >
            <option value="">All</option>
            {utms.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn-secondary text-xs">
          Apply filters
        </button>
        {(statusFilter || sourceFilter || utmFilter) && (
          <Link href="/admin" className="text-xs text-[var(--accent-gold)] underline py-2">
            Clear
          </Link>
        )}
      </form>

      <div className="mb-6 border border-[var(--border)] bg-[var(--background)] p-5">
        <p className="text-[10px] uppercase tracking-widest text-[var(--accent-gold)] mb-1 font-semibold">
          Conversion health
        </p>
        <p className="text-xs text-[var(--text-secondary)] mb-4">
          Last 7 days (unfiltered)
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] mb-1">
              Leads
            </p>
            <p className="font-serif text-3xl">{healthCount}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] mb-1">
              Attach rate
            </p>
            <p className="font-serif text-3xl">{attachRate}%</p>
            <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">
              {floorPlanCount}/{healthCount} with floor plan
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] mb-2">
              Top sources
            </p>
            {topSources.length === 0 ? (
              <p className="text-sm text-[var(--text-secondary)]">No leads yet</p>
            ) : (
              <ul className="space-y-1">
                {topSources.map(([source, count]) => (
                  <li
                    key={source}
                    className="flex items-baseline justify-between gap-3 text-sm border-b border-[var(--border)]/60 pb-1 last:border-0"
                  >
                    <span className="truncate">{source}</span>
                    <span className="font-serif text-lg shrink-0">{count}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] mb-1">
            Showing
          </p>
          <p className="font-serif text-3xl">{leads.length}</p>
        </div>
        {LEAD_STATUSES.filter((s) => byStatus[s]).slice(0, 3).map((s) => (
          <Link
            key={s}
            href={filterQs({ status: s })}
            className="border border-[var(--border)] bg-[var(--background)] p-4 hover:border-[var(--accent-gold-bright)] transition-colors"
          >
            <p className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] mb-1 truncate">
              {LEAD_STATUS_LABELS[s]}
            </p>
            <p className="font-serif text-3xl">{byStatus[s]}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {Object.entries(byUtm)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 4)
          .map(([utm, count]) => (
            <div
              key={utm}
              className="border border-[var(--border)] bg-[var(--surface)]/40 p-4"
            >
              <p className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] mb-1 truncate">
                UTM · {utm}
              </p>
              <p className="font-serif text-2xl">{count}</p>
            </div>
          ))}
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error.message}</p>}

      {leads.length === 0 ? (
        <div className="border border-dashed border-[var(--border)] bg-[var(--background)] p-12 text-center">
          <p className="font-serif text-xl mb-2">No leads match</p>
          <p className="text-sm text-[var(--text-secondary)]">
            Clear filters or wait for new submissions.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-[var(--border)] bg-[var(--background)] shadow-[0_12px_40px_rgba(18,17,15,0.04)]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[var(--border)] text-xs uppercase tracking-widest text-[var(--text-secondary)] bg-[var(--surface)]/50">
              <tr>
                <th className="p-4 font-semibold">When</th>
                <th className="p-4 font-semibold">Contact</th>
                <th className="p-4 font-semibold">Source</th>
                <th className="p-4 font-semibold">Details</th>
                <th className="p-4 font-semibold">UTM</th>
                <th className="p-4 font-semibold">CRM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {leads.map((lead) => {
                const phone = normalizePhone(lead.phone);
                const isDuplicate = Boolean(phone && phoneCounts[phone] > 1);
                return (
                  <tr
                    key={lead.id}
                    className="align-top hover:bg-[var(--surface)]/40 transition-colors"
                  >
                    <td className="p-4 whitespace-nowrap text-xs text-[var(--text-secondary)]">
                      {formatDate(lead.created_at)}
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{lead.name || "—"}</div>
                      {lead.phone && (
                        <div className="text-xs text-[var(--text-secondary)]">
                          {lead.phone}
                        </div>
                      )}
                      {lead.email && (
                        <div className="text-xs text-[var(--text-secondary)]">
                          {lead.email}
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="inline-block text-[10px] uppercase tracking-wider bg-[var(--surface)] border border-[var(--border)] px-2 py-1">
                        {lead.source || "—"}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-[var(--text-secondary)]">
                      {lead.location && <div>{lead.location}</div>}
                      {lead.tier && <div>Budget: {lead.tier}</div>}
                      {lead.sqft && <div>{lead.sqft} sqft</div>}
                      {(lead.estimate_min || lead.estimate_max) && (
                        <div>
                          ₹{lead.estimate_min}–{lead.estimate_max} L
                        </div>
                      )}
                      {lead.message && (
                        <div className="mt-1">{lead.message}</div>
                      )}
                    </td>
                    <td className="p-4 text-xs text-[var(--text-secondary)]">
                      {[lead.utm_source, lead.utm_medium, lead.utm_campaign]
                        .filter(Boolean)
                        .join(" / ") || "—"}
                    </td>
                    <td className="p-4">
                      <LeadRowActions lead={lead} isDuplicate={isDuplicate} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
