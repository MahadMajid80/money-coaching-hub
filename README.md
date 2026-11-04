# Money Coaching Hub

The website for [moneycoachinghub.com](https://moneycoachinghub.com) with its own editing dashboard at **/admin**.

- **Site:** Next.js 16 (App Router), built from the design pack.
- **Dashboard:** [Payload CMS 3](https://payloadcms.com), running inside the same app. Content is stored in one SQLite database file, and uploaded photos in a folder on the server.
- Luca's guide to editing is in [`docs/EDITING-GUIDE.md`](docs/EDITING-GUIDE.md).

## What can be edited in the dashboard

| Area | Where |
| --- | --- |
| Every text, button, link and photo on the 10 designed pages, plus a "hide this section" switch for each section | Pages → Homepage, Coaching page, … |
| Blog posts: write, edit, delete, schedule, drafts, preview, SEO | Blog → Blog posts / Blog categories |
| Course dates, prices, Stripe links, sessions, FAQs, course reviews. New courses get a page automatically | Courses & coaching → Courses |
| Reviews, and which pages they appear on | Courses & coaching → Reviews |
| Times of Malta column links | Courses & coaching → Times of Malta columns |
| "Trusted by" client names and logos | Courses & coaching → Client logos |
| Side hustle launch stage and payment links | Courses & coaching → Side hustle |
| Quiz words and which type each counts towards | Money types quiz → Quiz words |
| Privacy, cookies, terms, and any new text page (served at `/<slug>/`) | Pages → Simple pages |
| Logo, menu, header button, announcement bar, footer, contact details, social links, default SEO, sharing image, Google Analytics, Meta Pixel, Search Console | Settings → Site settings |
| Redirects from old addresses | Settings → Redirects |
| Contact and workshop enquiries, newsletter sign-ups | Inbox |
| The single admin login (no sign-up, no extra users) | Settings → Admin login |

Edits show on the site as soon as they're saved, because pages are rendered from the database on each visit. The eye icon on each page opens a side-by-side live preview.

## Run locally

```bash
npm install
npm run dev                 # http://localhost:3000, dashboard at /admin
npm run seed                # fill an empty database with the site's current content
```

The local database is `data/payload.db` and uploads go to `media/`. Both are git-ignored.

## Hosting on Vercel

Vercel's disk is read-only, so the database and photos must live in hosted services:

1. Vercel → your project → **Storage** → create a **Blob** store and connect it. This sets `BLOB_READ_WRITE_TOKEN`.
2. Create a database at [turso.tech](https://turso.tech) (free plan), or add Turso from Vercel → Storage / Marketplace. Set `TURSO_DATABASE_URL` (`libsql://…`) and `TURSO_AUTH_TOKEN`.
3. Set `PAYLOAD_SECRET` (long random string), `NEXT_PUBLIC_SITE_URL` and `CRON_SECRET`.
4. Redeploy. On first load the database tables are created automatically.
5. Create the one admin login with `SEED_ADMIN_EMAIL=… SEED_ADMIN_PASSWORD=… npm run seed` (run it pointed at the same database). There is no sign-up page. Then log in at `/admin` and press **Load starting content**.

Scheduled publishing runs through Vercel Cron (`vercel.json`). The Hobby plan allows one run a day, so scheduled posts go live at 06:00 UTC on their day. On Pro, change the schedule to every few minutes.

## Hosting on your own server

The site needs a host that runs **Node.js 20 or newer** as a long-running process, such as cPanel's "Setup Node.js App", a VPS or Railway. It cannot be a static host, because the dashboard and forms need a server.

1. Copy `.env.example` to `.env` and fill it in. Put `DATABASE_URI` and `MEDIA_DIR` **outside** the app folder so deploys never touch them, and set a long random `PAYLOAD_SECRET`.
2. Build and start:
   ```bash
   npm ci
   npm run build
   npm start                 # serves on $PORT (default 3000)
   ```
   On first start the database tables are created automatically from `migrations/`.
3. Load the current content and create the single admin login: `SEED_ADMIN_EMAIL=… SEED_ADMIN_PASSWORD=… npm run seed`. There is no sign-up page, and no further users can be added.
4. Move the blog over (it needs internet access to moneycoachinghub.com while the old site is still up): `npm run import:wordpress`. Posts keep their exact old addresses. Images go into the media library, and the legal pages are filled in.
5. Back-ups: copy the database file and the media folder, for example nightly with cron.

On a shared host with little memory, build on your computer or in GitHub Actions and upload the result. Run `next build` with `output: "standalone"` if the host needs a self-contained bundle.

## Changing the dashboard's structure (developers)

After changing a collection or field in `payload/` run:

```bash
npm run payload migrate:create <name>   # writes a new file in migrations/, commit it
npm run generate:importmap              # only if admin components changed
```

The live server applies new migrations when it starts.

The page editors are generated from the page designs. `content/page-schemas/*.json` lists each page's sections and fields, with the original wording as the default. Pages call `c.t("section.field")`, `c.img(...)` and `R(c, ...)` from `lib/cms/pageContent.tsx`. Empty fields fall back to the original wording. In text fields, `*word*` keeps the design's highlight colour and `**word**` stays bold.

## Where things live

| What | Where |
| --- | --- |
| Dashboard config | `payload.config.ts`, `payload/collections`, `payload/globals` |
| Dashboard branding and welcome screen | `payload/components` |
| Reading content on the site | `lib/cms/*`, `lib/blog.ts` |
| Site pages | `app/(frontend)/…` |
| Dashboard routes (do not edit) | `app/(payload)/…` |
| Styles | `app/(frontend)/globals.css` |
| WordPress import | `scripts/import-wordpress.mjs` then `scripts/import-to-dashboard.ts` |
