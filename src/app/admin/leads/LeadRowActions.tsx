"use client";

import { useTransition } from "react";
import type { LeadStatus, WebsiteLead } from "@/lib/types";
import {
  LEAD_STATUSES,
  LEAD_STATUS_LABELS,
  leadWhatsAppHref,
} from "@/lib/lead-helpers";
import { updateLeadNotes, updateLeadStatus } from "./actions";

const STATUS_BADGE: Record<LeadStatus, string> = {
  new: "bg-amber-50 text-amber-900 border-amber-200",
  contacted: "bg-sky-50 text-sky-900 border-sky-200",
  reviewed: "bg-violet-50 text-violet-900 border-violet-200",
  quoted: "bg-indigo-50 text-indigo-900 border-indigo-200",
  won: "bg-emerald-50 text-emerald-900 border-emerald-200",
  lost: "bg-stone-100 text-stone-600 border-stone-200",
  spam: "bg-red-50 text-red-800 border-red-200",
};

export default function LeadRowActions({
  lead,
  isDuplicate,
}: {
  lead: WebsiteLead;
  isDuplicate: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const status = lead.status ?? "new";
  const wa = leadWhatsAppHref(lead);

  return (
    <div className="space-y-3 min-w-[11rem]">
      <div className="flex flex-wrap gap-1.5 items-center">
        <span
          className={`inline-block text-[10px] uppercase tracking-wider border px-2 py-0.5 font-semibold ${STATUS_BADGE[status]}`}
        >
          {LEAD_STATUS_LABELS[status]}
        </span>
        {lead.has_floor_plan ? (
          <span className="inline-block text-[10px] uppercase tracking-wider border border-emerald-200 bg-emerald-50 text-emerald-900 px-2 py-0.5 font-semibold">
            Plan yes
          </span>
        ) : (
          <span className="inline-block text-[10px] uppercase tracking-wider border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] px-2 py-0.5">
            Plan no
          </span>
        )}
        {isDuplicate && (
          <span className="inline-block text-[10px] uppercase tracking-wider border border-orange-200 bg-orange-50 text-orange-900 px-2 py-0.5 font-semibold">
            Possible duplicate
          </span>
        )}
      </div>

      <form
        action={(fd) => startTransition(() => updateLeadStatus(fd))}
        className="flex flex-col gap-1"
      >
        <input type="hidden" name="id" value={lead.id} />
        <label className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-semibold">
          Status
        </label>
        <select
          name="status"
          defaultValue={status}
          disabled={pending}
          onChange={(e) => e.currentTarget.form?.requestSubmit()}
          className="border border-[var(--border)] bg-white px-2 py-1.5 text-xs disabled:opacity-60"
        >
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {LEAD_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </form>

      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-xs font-semibold text-[var(--accent-gold)] hover:underline"
        >
          WhatsApp (prefilled)
        </a>
      )}

      <form
        action={(fd) => startTransition(() => updateLeadNotes(fd))}
        className="space-y-1"
      >
        <input type="hidden" name="id" value={lead.id} />
        <label className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-semibold">
          Notes
        </label>
        <textarea
          name="notes"
          defaultValue={lead.notes ?? ""}
          rows={2}
          className="w-full border border-[var(--border)] bg-white px-2 py-1.5 text-xs"
          placeholder="Follow-up notes…"
        />
        <button
          type="submit"
          disabled={pending}
          className="text-[10px] uppercase tracking-widest font-semibold text-[var(--accent-gold)] hover:underline disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save notes"}
        </button>
      </form>
    </div>
  );
}
