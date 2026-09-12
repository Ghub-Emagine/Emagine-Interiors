/**
 * Public Supabase credentials for browser + server CMS reads.
 * NEXT_PUBLIC_* values are safe to expose (RLS protects data).
 * Fallback keeps production working if Vercel env vars were never set.
 */
const FALLBACK_URL = "https://rnhfswklyugaubkvuxtm.supabase.co";
const FALLBACK_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuaGZzd2tseXVnYXVia3Z1eHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4ODY4ODgsImV4cCI6MjA5NjQ2Mjg4OH0.qqcXZSyTXhkLsCE5aiNLWwP2_M87kstGDhoN7_VK1nA";

function readEnv(name: string) {
  const raw = process.env[name];
  if (raw == null) return "";
  return String(raw).trim().replace(/^["']|["']$/g, "");
}

export function getSupabaseUrl() {
  return readEnv("NEXT_PUBLIC_SUPABASE_URL") || FALLBACK_URL;
}

export function getSupabaseAnonKey() {
  return readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY") || FALLBACK_ANON_KEY;
}
