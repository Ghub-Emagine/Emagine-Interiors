import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/supabase-public-env";

let adminClient: SupabaseClient | null = null;
let publicClient: SupabaseClient | null = null;

function readEnv(name: string) {
  const raw = process.env[name];
  if (raw == null) return "";
  return String(raw).trim().replace(/^["']|["']$/g, "");
}

/** Anon client for public writes (leads) and reads — always available via NEXT_PUBLIC_* */
export function getSupabasePublic() {
  if (publicClient) return publicClient;
  publicClient = createClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return publicClient;
}

/** Service-role client when available (optional for lead inserts). */
export function getSupabaseAdmin() {
  if (adminClient) return adminClient;
  const url = getSupabaseUrl();
  const key = readEnv("SUPABASE_SERVICE_ROLE_KEY");
  if (!key) {
    // Fall back to anon — requires INSERT policy on website_leads
    return getSupabasePublic();
  }
  adminClient = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return adminClient;
}

/** Prefer service role; falls back to anon for form inserts */
export function getSupabaseForLeads() {
  const serviceKey = readEnv("SUPABASE_SERVICE_ROLE_KEY");
  if (serviceKey) return getSupabaseAdmin();
  return getSupabasePublic();
}

export const supabaseAdmin = {
  from(...args: Parameters<SupabaseClient["from"]>) {
    return getSupabaseForLeads().from(...args);
  },
};

export const supabase = supabaseAdmin;
