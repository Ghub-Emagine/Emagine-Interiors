import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function csvEscape(value: string) {
  if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

/** Force Excel to treat value as text (phones, IDs). */
function excelText(value: string) {
  if (!value) return "";
  return csvEscape(`="${value.replace(/"/g, '""')}"`);
}

function formatDateIst(iso: string) {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return iso;
  }
}

const SOURCE_LABELS: Record<string, string> = {
  "home-form": "Home form",
  "layout-review": "Layout review",
  "pricing-estimate": "Price estimate",
};

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { data, error } = await supabase
    .from("website_leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(2000);

  if (error) {
    return new NextResponse(error.message, { status: 500 });
  }

  const headers = [
    "ID",
    "Date",
    "Name",
    "WhatsApp",
    "Email",
    "Developer / Location",
    "Budget",
    "Source",
    "Status",
    "Floor plan",
    "Notes",
    "Contacted",
    "Message",
    "Estimate min (L)",
    "Estimate max (L)",
    "Sqft",
    "UTM source",
    "UTM medium",
    "UTM campaign",
  ];

  const lines = [headers.join(",")];
  for (const row of data ?? []) {
    const r = row as Record<string, unknown>;
    const phone = String(r.phone ?? "").replace(/\s+/g, "");
    const source = String(r.source ?? "");
    const cells = [
      excelText(String(r.id ?? "")),
      csvEscape(formatDateIst(String(r.created_at ?? ""))),
      csvEscape(String(r.name ?? "")),
      excelText(phone),
      csvEscape(String(r.email ?? "")),
      csvEscape(String(r.location ?? "")),
      csvEscape(String(r.tier ?? "")),
      csvEscape(SOURCE_LABELS[source] ?? source),
      csvEscape(String(r.status ?? "new")),
      csvEscape(r.has_floor_plan === true ? "Yes" : "No"),
      csvEscape(String(r.notes ?? "")),
      csvEscape(
        r.contacted_at ? formatDateIst(String(r.contacted_at)) : "",
      ),
      csvEscape(String(r.message ?? "")),
      csvEscape(String(r.estimate_min ?? "")),
      csvEscape(String(r.estimate_max ?? "")),
      csvEscape(String(r.sqft ?? "")),
      csvEscape(String(r.utm_source ?? "")),
      csvEscape(String(r.utm_medium ?? "")),
      csvEscape(String(r.utm_campaign ?? "")),
    ];
    lines.push(cells.join(","));
  }

  const stamp = new Date().toISOString().slice(0, 10);
  // BOM so Excel keeps ₹ and Indian characters
  const body = `\uFEFF${lines.join("\r\n")}`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="emagine-leads-${stamp}.csv"`,
    },
  });
}
