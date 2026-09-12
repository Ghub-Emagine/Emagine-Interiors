import { createClient } from "@/lib/supabase/server";
import {
  DEFAULT_SITE_SETTINGS,
  SITE_SETTING_KEYS,
  type SiteSettings,
} from "@/lib/site-settings";
import { ensureDefaultSettings, saveSiteSettings } from "./actions";

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  let { data } = await supabase.from("site_settings").select("key, value");

  if (!data || data.length === 0) {
    try {
      await ensureDefaultSettings();
      const again = await supabase.from("site_settings").select("key, value");
      data = again.data;
    } catch {
      /* empty */
    }
  }

  const settings: SiteSettings = { ...DEFAULT_SITE_SETTINGS };
  for (const row of data ?? []) {
    const key = row.key as keyof SiteSettings;
    if (key in settings) settings[key] = row.value ?? "";
  }

  const fields: {
    key: keyof SiteSettings;
    label: string;
    help?: string;
    multiline?: boolean;
  }[] = [
    { key: "brand_name", label: "Brand name" },
    { key: "tagline", label: "Tagline", multiline: true },
    { key: "location", label: "Location" },
    { key: "contact_email", label: "Public contact email" },
    {
      key: "contact_whatsapp",
      label: "Public WhatsApp (digits with country code)",
      help: "Example: 918122192193 — used for float button and CTAs",
    },
    {
      key: "notify_emails",
      label: "Lead notify emails",
      help: "Comma-separated. New leads are emailed here via Resend.",
    },
    {
      key: "resend_from",
      label: "Resend From address",
      help: "Use onboarding@resend.dev until you verify your domain in Resend, then switch to hello@yourdomain.com",
    },
    {
      key: "ga_measurement_id",
      label: "Google Analytics 4 ID",
      help: "G-XXXXXXXXXX — leave blank until you have one",
    },
    {
      key: "meta_pixel_id",
      label: "Meta Pixel ID",
      help: "Numeric Pixel ID for ads — leave blank until ready",
    },
    {
      key: "lead_webhook_url",
      label: "Lead webhook URL (Zapier / Make / CRM)",
      help: "Optional. Each new lead POSTs JSON here for WhatsApp/CRM automations.",
    },
    {
      key: "lead_api_key",
      label: "Leads API key",
      help: "Secret for GET /api/leads — send as header x-api-key. Generate a long random string.",
    },
  ];

  const digestEnabled = settings.lead_digest_enabled === "true";

  return (
    <div>
      <div className="mb-8 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-2">
          Studio
        </p>
        <h1 className="font-serif text-4xl mb-2">Site settings</h1>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          Contact details, lead notifications, analytics IDs, and CRM webhook —
          change these without touching code. Keys already in the database:{" "}
          {SITE_SETTING_KEYS.length}.
        </p>
      </div>

      <form action={saveSiteSettings} className="space-y-6 max-w-xl">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold">
              {field.label}
            </label>
            {field.multiline ? (
              <textarea
                name={field.key}
                defaultValue={settings[field.key]}
                rows={3}
                className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
              />
            ) : (
              <input
                name={field.key}
                defaultValue={settings[field.key]}
                className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
              />
            )}
            {field.help && (
              <p className="mt-1.5 text-xs text-[var(--text-secondary)]">
                {field.help}
              </p>
            )}
          </div>
        ))}

        <div className="border border-[var(--border)] bg-white px-4 py-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="lead_digest_enabled"
              value="true"
              defaultChecked={digestEnabled}
              className="mt-1 h-4 w-4 accent-[var(--accent-gold)]"
            />
            <span>
              <span className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] font-semibold mb-1">
                Daily lead digest email
              </span>
              <span className="block text-sm text-[var(--text-primary)]">
                Send a summary of the last 24 hours of leads to notify emails
                (via cron). Off by default.
              </span>
              <span className="mt-1.5 block text-xs text-[var(--text-secondary)]">
                Requires <code className="text-xs">CRON_SECRET</code> in Vercel
                env — never store the secret here. Cron route ships in a later
                wave; this toggle only enables/disables sending once that exists.
              </span>
            </span>
          </label>
        </div>

        <div className="border border-[var(--border)] bg-[var(--surface)] p-5 text-sm text-[var(--text-secondary)] leading-relaxed">
          <p className="font-semibold text-[var(--text-primary)] mb-2">
            Getting leads in your Gmail inbox
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Confirm notify emails above (default is your Gmail).</li>
            <li>Check Spam / Promotions — Resend&apos;s free from-address is often filtered.</li>
            <li>
              In Resend, verify your domain, then set From to something like{" "}
              <code className="text-xs">Emagine &lt;hello@yourdomain.com&gt;</code>.
            </li>
            <li>Star those emails in Gmail for phone push notifications.</li>
            <li>
              For WhatsApp alerts: paste a Zapier/Make webhook URL above and
              connect &quot;Catch Hook → Send WhatsApp&quot;.
            </li>
          </ol>
        </div>

        <button type="submit" className="btn-primary">
          Save settings
        </button>
      </form>
    </div>
  );
}
