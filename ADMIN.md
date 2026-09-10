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
```

If `SUPABASE_SERVICE_ROLE_KEY` is empty, lead forms still work via the anon key + RLS insert policy. Paste a valid service-role key from Supabase → Settings → API when you can.

## What you can manage

| Section | Path |
|---------|------|
| Leads inbox | `/admin` |
| Hero slideshow (image/video) | `/admin/hero` |
| Portfolio projects | `/admin/projects` |
| Room designs (Kitchen/Living/Bedroom) | `/admin/room-designs` |
| Site content (promises, FAQ, A–Z, pricing, offerings+images) | `/admin/content` |
| Page images (About, Why EDS, layout-review, homepage bands) | `/admin/page-images` |
| Blog posts | `/admin/blogs` |
| Testimonials | `/admin/testimonials` |

Publish → appears on the public site without a code deploy.

### Page images (About & similar)

1. **Page images** → pick a slot (e.g. About → Chennai context)
2. Upload a Chennai project photo or paste a URL → **Save**
3. Homepage **hero** still uses **Hero**; portfolio covers still use **Projects**

SQL reference: `setup_page_images.sql` (already applied on the live project).

### Publishing a project (images)

1. **Projects** → **New project**
2. Fill title, developer, location, tier, summary
3. **Images** panel (gold-bordered):
   - **Cover** — one main photo for home + portfolio grids (upload or URL). This is **not** the site hero.
   - **Gallery** — select multiple files (Ctrl/Cmd). Extra photos show on `/portfolio/[slug]`.
4. Featured + Published as needed

### Publishing room designs (homepage Trending)

1. **Room designs** → **Add image**
2. Pick Kitchen / Living / Bedroom
3. Upload or paste URL, set sort order, Publish
4. Images appear under homepage **Trending room designs**

### Publishing a blog (SEO / AI-friendly)

1. **Blog** → **New post**
2. Paste AI-drafted title, excerpt, and body (use `## Heading` lines + blank-line paragraphs)
3. Optional cover upload
4. Set **Published** → live at `/blog` and `/blog/your-slug`

Same flow for **Testimonials** — only `published` items appear on the homepage.

## Social ads landing page

Use `/layout-review?utm_source=instagram&utm_medium=social&utm_campaign=layout_review` in ads and bio links.

## Brand assets

Wordmark SVGs live in `public/images/branding/`. Primary site logo: `EMAGINE_3000_3000-02.svg` (wired via `BrandMark`).
