import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";
import {
  getSiteSettings,
  parseNotifyEmails,
} from "@/lib/site-settings";
import {
  authorizeCron,
  buildDigestHtml,
  digestWindow,
  summarizeLeads,
  type DigestLeadRow,
} from "@/lib/lead-digest";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

async function runLeadDigest(request: Request) {
  if (!authorizeCron(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const settings = await getSiteSettings();
    if (settings.lead_digest_enabled !== "true") {
      return NextResponse.json({
        ok: true,
        skipped: true,
        reason: "lead_digest_enabled is not true",
        count: 0,
      });
    }

    const { sinceIso, untilIso } = digestWindow();

    const { data, error } = await supabaseAdmin
      .from("website_leads")
      .select("status, source, has_floor_plan")
      .gte("created_at", sinceIso);

    if (error) {
      console.error("LEAD DIGEST QUERY ERROR:", error.message);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 },
      );
    }

    const leads = (data ?? []) as DigestLeadRow[];
    const summary = summarizeLeads(leads);

    const notifyTo = parseNotifyEmails(settings.notify_emails);
    const to =
      notifyTo.length > 0 ? notifyTo : ["janajackie@gmail.com"];
    const from =
      settings.resend_from ||
      "Emagine Interiors <onboarding@resend.dev>";

    const { error: sendError } = await resend.emails.send({
      from,
      to,
      subject: `Daily lead digest — ${summary.count} lead${summary.count === 1 ? "" : "s"} (24h)`,
      html: buildDigestHtml(summary, sinceIso, untilIso),
    });

    if (sendError) {
      console.error("LEAD DIGEST RESEND ERROR:", sendError);
      return NextResponse.json(
        { ok: false, error: sendError.message, count: summary.count },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      count: summary.count,
      attachRatePct: summary.attachRatePct,
      byStatus: summary.byStatus,
      bySource: summary.bySource,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unexpected server error.";
    console.error("LEAD DIGEST ROUTE ERROR:", err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  return runLeadDigest(request);
}

export async function POST(request: Request) {
  return runLeadDigest(request);
}
