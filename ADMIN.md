# Admin CMS setup

## Access

- URL: `/admin/login` (not linked in public nav)
- Auth: Supabase email/password

## Create the first admin user

1. Open Supabase Dashboard → your project → **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Enter the email/password you will use for `/admin/login`
4. Enable **Auto Confirm User** (or confirm the email)
5. Sign in at `http://localhost:3000/admin/login`

Do not commit passwords. Rotate the password after first login if shared temporarily.

## Env vars required

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=   # optional if website_leads anon INSERT policy exists
RESEND_API_KEY=
NEXT_PUBLIC_GA_MEASUREMENT_ID=   # optional fallback; prefer Admin → Settings
NEXT_PUBLIC_META_PIXEL_ID=       # optional fallback; prefer Admin → Settings
```

If `SUPABASE_SERVICE_ROLE_KEY` is empty, lead forms still work via the anon key + RLS insert policy.

## What you can manage (no code)

| Section | Path |
|---------|------|
| Leads inbox + **CSV export** | `/admin` |
| **Site settings** (WhatsApp, emails, analytics, webhook, API key) | `/admin/settings` |
| Hero slideshow (image/video) | `/admin/hero` |
| Portfolio projects | `/admin/projects` |
| Room designs | `/admin/room-designs` |
| Content (promise, FAQ, A–Z, pricing, offerings) | `/admin/content` |
| Page images (About / Why / layout-review / home bands) | `/admin/page-images` |
| **Page copy** (hero, process, services, materials, form, closing) | `/admin/page-copy` |
| Blog posts | `/admin/blogs` |
| Testimonials | `/admin/testimonials` |

### Site settings (do this first)

1. Open **Settings**
2. Set public WhatsApp, contact email, location, tagline
3. **Lead notify emails** — where Resend sends new-lead alerts (comma-separated)
4. **Resend From** — keep `Emagine Interiors <onboarding@resend.dev>` until your domain is verified in Resend, then switch to `Emagine <hello@yourdomain.com>`
5. Paste **GA4** (`G-…`) and **Meta Pixel** IDs when ready
6. Optional **Lead webhook URL** for Zapier/Make → WhatsApp/CRM
7. Set a long random **Leads API key** for CRM pull (`GET /api/leads` with header `x-api-key`)

### Getting leads in your real Gmail inbox

Leads already email to the address in **Lead notify emails** (default `janajackie@gmail.com`).

1. Check **Spam / Promotions** — free Resend from-address is often filtered
2. In [Resend](https://resend.com): verify your domain → update **Resend From** in Settings
3. In Gmail: star or filter those subjects for phone push notifications
4. For WhatsApp alerts without code: Zapier/Make — Catch Hook (paste URL into Settings) → Send WhatsApp / Slack / CRM

### Export leads (Excel / CSV)

Admin → Leads → **Export CSV / Excel** downloads `emagine-leads-YYYY-MM-DD.csv`.

**Open correctly in Excel (Windows):** double-click the file, or File → Open. The export includes a UTF-8 BOM so ₹ and Indian text stay intact. Phones and IDs are Excel text formulas (`="9551…"`) so they do not turn into `9.18E+11`.

**Columns:** ID, Date (IST), Name, WhatsApp, Email, Developer / Location, Budget, Source, **Status**, **Floor plan**, **Notes**, **Contacted**, Message, estimate fields, UTMs.

If an old export shows `â‚¹` or scientific phones, re-export — do not re-save the broken file.

### Lead pipeline (Admin → Leads)

Statuses: **New** → **Contacted** → **Reviewed** → **Quoted** → **Won** / **Lost** / **Spam**.

- Change status in the CRM column (sets `contacted_at` the first time you mark Contacted).
- Save **Notes** per lead.
- **WhatsApp (prefilled)** opens a message with name, project, budget.
- **Plan yes/no** shows whether a floor plan was attached.
- Filters: status, source, UTM source. Stat cards for status + UTM.
- **Possible duplicate** appears when the same phone digits appear more than once in the loaded set (soft warning only).

Not in product today: Twilio WhatsApp Cloud, OAuth marketplace connectors, merge into the separate org `leads` table.

### CRM: webhook (Zapier / Make) + API pull

You already have outbound webhook + pull API. No native Zoho/HubSpot SDK required.

**1. Outbound webhook (push on each lead)**

1. In Zapier/Make: create a **Catch Hook** / webhook trigger; copy the URL
2. Paste it into Admin → **Settings** → Lead webhook URL → Save
3. Submit a test form; the Zap receives JSON like:

```json
{
  "type": "layout",
  "name": "Priya",
  "phone": "9551640484",
  "location": "Casagrand / OMR",
  "tier": "15-25L",
  "email": null,
  "source": "home-form",
  "utm_source": "instagram",
  "utm_medium": "social",
  "utm_campaign": "layout_review",
  "message": null,
  "has_floor_plan": true,
  "created_at": "2026-09-12T06:00:00.000Z"
}
```

Pricing-tool leads use `"type": "estimate"` plus `estimate_min`, `estimate_max`, `sqft`.

**Partner path examples**

- Catch Hook → **Google Sheets** (append row)
- Catch Hook → **Zoho CRM** / HubSpot create contact
- Catch Hook → WhatsApp Business / Slack notify
- Make.com same pattern with HTTP webhook module

**2. Pull API (CRM polls)**

```
GET /api/leads?limit=100
GET /api/leads?since=2026-09-01T00:00:00.000Z&limit=200
Header: x-api-key: YOUR_KEY
```

Set the key in Admin → Settings → Leads API key. Response: `{ success, count, leads: [...] }`. Use `id` for dedupe.

Not in product today: Twilio WhatsApp Cloud, OAuth marketplace connectors.

### Hero video (homepage)

Already supported — no code deploy needed to enable it:

1. Admin → **Hero** → New / Edit slide
2. Media type → **Video**
3. Upload short **MP4 or WebM** (muted autoplay loop) or paste a public URL
4. Publish the slide

If the live site shows only photos, no video slide is published yet.

### Page images (photo or video slots)

Admin → **Page images** covers About, Why Emagine, layout-review, and homepage bands (process, services, FAQ, closing).

1. Open a slot → set **Media type** to Image or Video
2. Upload image or short muted MP4/WebM (or paste URL)
3. Save — public pages render `<video>` when type is video

Prefer short looping clips for backgrounds. Default remains image.

### Page copy & images

- **Page copy** — edit homepage headlines, process steps, services, materials table, layout form, closing CTA
- **Page images** — photos or short videos for About / Why / layout-review / homepage bands
- Homepage **hero** still uses **Hero**; portfolio covers use **Projects**

### Portfolio filters

`/portfolio?developer=Casagrand&tier=…` — filters on the archive page (All / by developer / by tier). Clear via the link on the page.

### About / Why Us page copy

Admin → **Page copy** → Sync slots, then edit **About** and **Why Emagine** groups (heroes, section intros, CTAs). Refusals and comparison table rows stay in code.

### Home layout form

Three-step wizard (Contact → Project → Floor plan). Floor plan is **not required** in HTML; public copy does not say “optional.” Name, WhatsApp, developer/location, and budget are required. Successful submit fires GA `generate_lead` + Meta `Lead` when those IDs are set in Settings.

Contact API includes a honeypot (`website_url`) and an in-memory rate limit (5 posts / 10 min / IP per server instance).

### After Cursor — ops checklist (Phase 0 deferred)

Do these outside coding sessions; they unlock most of the ROI:

1. Upload real Chennai project photos/videos (Hero + Page images)
2. Verify Resend domain → update **Resend From** in Settings
3. Zapier/Make Catch Hook → Sheet + WhatsApp/Slack ping (paste webhook URL in Settings)
4. Paste GA4 + Meta Pixel IDs in Settings
5. Publish 3–5 real portfolio projects with galleries
6. Re-export CSV once and confirm phones/₹ look correct in Excel

### Social ads landing page

Use `/layout-review?utm_source=instagram&utm_medium=social&utm_campaign=layout_review` in ads and bio links. GA/Meta (when IDs are set) track page views automatically.

### Publishing a project (images)

1. **Projects** → **New project**
2. Cover + optional gallery → Featured + Published

### Publishing room designs / blog / testimonials

Same as before — only **published** items appear on the public site.

## Brand assets

Wordmark SVGs live in `public/images/branding/`. Primary site logo: `EMAGINE_3000_3000-02.svg` (wired via `BrandMark`).

## SQL references

- `setup_page_images.sql` (includes `media_type` image|video)
- `setup_site_settings.sql` (settings + page_copy tables)
- `setup_leads_table.sql` (website_leads + CRM status/notes/has_floor_plan)
