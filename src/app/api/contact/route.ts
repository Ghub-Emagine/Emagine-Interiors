import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";
import {
  getSiteSettings,
  parseNotifyEmails,
} from "@/lib/site-settings";

const resend = new Resend(process.env.RESEND_API_KEY);

/** In-memory rate limit: 5 POSTs per IP per 10 minutes (per instance). */
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const rateBuckets = new Map<string, number[]>();

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const prev = rateBuckets.get(ip) ?? [];
  const recent = prev.filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    rateBuckets.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateBuckets.set(ip, recent);
  return false;
}

function pick(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

async function notifyWebhook(
  webhookUrl: string,
  payload: Record<string, unknown>,
) {
  if (!webhookUrl) return;
  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("LEAD WEBHOOK ERROR:", err);
  }
}

export async function POST(request: Request) {
  try {
    if (isRateLimited(clientIp(request))) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const settings = await getSiteSettings();
    const notifyTo = parseNotifyEmails(settings.notify_emails);
    const to =
      notifyTo.length > 0 ? notifyTo : ["janajackie@gmail.com"];
    const from =
      settings.resend_from ||
      "Emagine Interiors <onboarding@resend.dev>";

    const formData = await request.formData();

    // Honeypot — bots fill hidden fields; humans leave empty
    if (pick(formData, "website_url")) {
      return NextResponse.json({ success: true });
    }

    const intent = pick(formData, "intent");
    const source =
      pick(formData, "source") ||
      (intent === "estimate" ? "pricing-estimate" : "home-form");
    const utmSource = pick(formData, "utm_source");
    const utmMedium = pick(formData, "utm_medium");
    const utmCampaign = pick(formData, "utm_campaign");

    if (intent === "estimate") {
      const email = pick(formData, "email");
      const sqft = pick(formData, "sqft");
      const budgetTier = pick(formData, "budgetTier");
      const estimateMin = pick(formData, "estimateMin");
      const estimateMax = pick(formData, "estimateMax");

      if (!email || !budgetTier) {
        return NextResponse.json(
          { success: false, error: "Email and tier are required." },
          { status: 400 },
        );
      }

      const leadPayload = {
        name: null,
        phone: null,
        location: null,
        tier: budgetTier,
        email,
        source: source || "pricing-estimate",
        utm_source: utmSource || null,
        utm_medium: utmMedium || null,
        utm_campaign: utmCampaign || null,
        estimate_min: estimateMin || null,
        estimate_max: estimateMax || null,
        sqft: sqft || null,
        status: "new" as const,
        has_floor_plan: false,
      };

      const { error: leadError } = await supabaseAdmin
        .from("website_leads")
        .insert(leadPayload);

      if (leadError) {
        console.log(`SUPABASE ESTIMATE LEAD ERROR: ${leadError.message}`);
      }

      await notifyWebhook(settings.lead_webhook_url, {
        type: "estimate",
        ...leadPayload,
        created_at: new Date().toISOString(),
      });

      const { data, error } = await resend.emails.send({
        from,
        to,
        subject: `Estimate breakdown request — ${email}`,
        html: `
          <h2>Pricing Tool Lead</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Sqft:</strong> ${sqft || "—"}</p>
          <p><strong>Tier:</strong> ${budgetTier}</p>
          <p><strong>Estimate:</strong> ₹${estimateMin} L — ₹${estimateMax} L</p>
          <p><strong>Source:</strong> ${source}</p>
        `,
      });

      if (error) {
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 400 },
        );
      }

      return NextResponse.json({ success: true, data });
    }

    const fullName = pick(formData, "fullName");
    const whatsapp = pick(formData, "whatsapp");
    const location = pick(formData, "location");
    const budgetTier = pick(formData, "budgetTier");
    const message = pick(formData, "message");
    const email = pick(formData, "email");
    const floorPlan = formData.get("floorPlan");

    if (!fullName || !whatsapp || !location || !budgetTier) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 },
      );
    }

    const hasFloorPlan =
      floorPlan instanceof File && floorPlan.size > 0;

    const leadPayload = {
      name: fullName,
      phone: whatsapp,
      location,
      tier: budgetTier,
      email: email || null,
      source,
      utm_source: utmSource || null,
      utm_medium: utmMedium || null,
      utm_campaign: utmCampaign || null,
      message: message || null,
      status: "new" as const,
      has_floor_plan: hasFloorPlan,
    };

    const { error: supabaseError } = await supabaseAdmin
      .from("website_leads")
      .insert(leadPayload);

    if (supabaseError) {
      console.log(`SUPABASE ERROR: ${supabaseError.message}`);
    } else {
      console.log("SUPABASE INSERT SUCCESS");
    }

    await notifyWebhook(settings.lead_webhook_url, {
      type: "layout",
      ...leadPayload,
      created_at: new Date().toISOString(),
    });

    const attachments = hasFloorPlan
      ? [
          {
            filename: (floorPlan as File).name,
            content: Buffer.from(await (floorPlan as File).arrayBuffer()),
          },
        ]
      : undefined;

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject: `New layout evaluation — ${fullName}`,
      html: `
        <h2>New layout review request</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>WhatsApp:</strong> ${whatsapp}</p>
        <p><strong>Developer & Location:</strong> ${location}</p>
        <p><strong>Budget Tier:</strong> ${budgetTier}</p>
        <p><strong>Source:</strong> ${source}</p>
        <p><strong>UTM:</strong> ${[utmSource, utmMedium, utmCampaign].filter(Boolean).join(" / ") || "—"}</p>
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
        <p><strong>Floor plan attached:</strong> ${attachments ? "Yes" : "No"}</p>
      `,
      attachments,
    });

    console.log("RESEND RAW RESPONSE:", { data, error });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unexpected server error.";
    console.error("CONTACT ROUTE ERROR:", err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
