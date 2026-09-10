import { createClient } from "@/lib/supabase/server";
import type { WebsiteLead } from "@/lib/types";

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

export default async function AdminLeadsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("website_leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  const leads = (data ?? []) as WebsiteLead[];
  const bySource = leads.reduce<Record<string, number>>((acc, lead) => {
    const key = lead.source || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-2">
          Inbox
        </p>
        <h1 className="font-serif text-4xl mb-2">Leads</h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Forms, estimates, and layout-review submissions — newest first.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div className="border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] mb-1">
            Total
          </p>
          <p className="font-serif text-3xl">{leads.length}</p>
        </div>
        {Object.entries(bySource)
          .slice(0, 3)
          .map(([source, count]) => (
            <div
              key={source}
              className="border border-[var(--border)] bg-[var(--background)] p-4"
            >
              <p className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] mb-1 truncate">
                {source}
              </p>
              <p className="font-serif text-3xl">{count}</p>
            </div>
          ))}
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error.message}</p>}

      {leads.length === 0 ? (
        <div className="border border-dashed border-[var(--border)] bg-[var(--background)] p-12 text-center">
          <p className="font-serif text-xl mb-2">No leads yet</p>
          <p className="text-sm text-[var(--text-secondary)]">
            Submissions from the site will appear here.
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
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {leads.map((lead) => (
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
                      <a
                        href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent-gold)] hover:underline text-xs font-semibold"
                      >
                        WhatsApp {lead.phone}
                      </a>
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
                    {lead.message && <div className="mt-1">{lead.message}</div>}
                  </td>
                  <td className="p-4 text-xs text-[var(--text-secondary)]">
                    {[lead.utm_source, lead.utm_medium, lead.utm_campaign]
                      .filter(Boolean)
                      .join(" / ") || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
