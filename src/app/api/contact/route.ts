import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const fullName = String(formData.get("fullName") ?? "").trim();
    const whatsapp = String(formData.get("whatsapp") ?? "").trim();
    const location = String(formData.get("location") ?? "").trim();
    const budgetTier = String(formData.get("budgetTier") ?? "").trim();
    const floorPlan = formData.get("floorPlan");

    const name = fullName;
    const phone = whatsapp;
    const tier = budgetTier;

    if (!fullName || !whatsapp || !location || !budgetTier) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 },
      );
    }

    const { error: supabaseError } = await supabase.from("website_leads").insert({
      name,
      phone,
      location,
      tier,
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
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // !! CRITICAL: MANUALLY CHANGE `to` TO YOUR VERIFIED RESEND LOGIN EMAIL !!
      // !! Resend will reject sends until this matches your account email.    !!
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      to: ["janajackie@gmail.com"],
      subject: `New layout evaluation — ${fullName}`,
      html: `
        <h2>New Spatial Analysis Application</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>WhatsApp:</strong> ${whatsapp}</p>
        <p><strong>Developer & Location:</strong> ${location}</p>
        <p><strong>Budget Tier:</strong> ${budgetTier}</p>
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
