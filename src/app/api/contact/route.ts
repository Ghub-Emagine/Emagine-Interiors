import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

function pick(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const intent = pick(formData, "intent");
    const source = pick(formData, "source") || (intent === "estimate" ? "pricing-estimate" : "home-form");
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

      const { error: leadError } = await supabaseAdmin.from("website_leads").insert({
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
      });

      if (leadError) {
        console.log(`SUPABASE ESTIMATE LEAD ERROR: ${leadError.message}`);
      }

      const { data, error } = await resend.emails.send({
        from: "Emagine Interiors <onboarding@resend.dev>",
        to: ["janajackie@gmail.com"],
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

    const { error: supabaseError } = await supabaseAdmin.from("website_leads").insert({
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
    });

    if (supabaseError) {
      console.log(`SUPABASE ERROR: ${supabaseError.message}`);
    } else {
      console.log("SUPABASE INSERT SUCCESS");
    }

    const attachments =
      floorPlan instanceof File && floorPlan.size > 0
        ? [
            {
              filename: floorPlan.name,
              content: Buffer.from(await floorPlan.arrayBuffer()),
            },
          ]
        : undefined;

    const { data, error } = await resend.emails.send({
      from: "Emagine Interiors <onboarding@resend.dev>",
      to: ["janajackie@gmail.com"],
      subject: `New layout evaluation — ${fullName}`,
      html: `
        <h2>New Spatial Analysis Application</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>WhatsApp:</strong> ${whatsapp}</p>
        <p><strong>Developer & Location:</strong> ${location}</p>
        <p><strong>Budget Tier:</strong> ${budgetTier}</p>
        <p><strong>Source:</strong> ${source}</p>
        <p><strong>UTM:</strong> ${[utmSource, utmMedium, utmCampaign].filter(Boolean).join(" / ") || "—"}</p>
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
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
