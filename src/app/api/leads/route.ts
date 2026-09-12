import { NextResponse } from "next/server";
import { getSupabaseForLeads } from "@/lib/supabase";
import { getSiteSettings } from "@/lib/site-settings";

/**
 * CRM pull API — GET /api/leads
 * Auth: header x-api-key must match Site Settings → Leads API key
 * Query: ?limit=100 (max 500)
 */
export async function GET(request: Request) {
  const settings = await getSiteSettings();
  const apiKey = settings.lead_api_key?.trim();
  if (!apiKey) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Leads API key not configured. Set it in Admin → Site settings.",
      },
      { status: 503 },
    );
  }

  const provided =
    request.headers.get("x-api-key") ||
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ||
    "";

  if (provided !== apiKey) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(request.url);
  const limit = Math.min(
    Math.max(Number(searchParams.get("limit") ?? 100) || 100, 1),
    500,
  );
  const since = searchParams.get("since");

  let query = getSupabaseForLeads()
    .from("website_leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (since) {
    query = query.gte("created_at", since);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    count: data?.length ?? 0,
    leads: data ?? [],
  });
}
