import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";
import { allowedOrigins } from "./lib/security/origins";
import { migrations } from "./migrations";
import { Categories, Posts } from "./payload/collections/blog";
import { ClientLogos, Columns, Courses, Enquiries, SimplePages, Subscribers, Testimonials } from "./payload/collections/content";
import { Media, Users } from "./payload/collections/core";
import { pageGlobals } from "./payload/globals/pages";
import { QuizSettings, SideHustleSettings, SiteSettings } from "./payload/globals/settings";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// Database: a hosted Turso/libSQL database when its address is set (needed on Vercel,
// whose disk is read-only), otherwise a local SQLite file (own server / local dev).
const dbUrl = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URI || `file:${path.resolve(dirname, "data/payload.db")}`;
const dbToken = process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN || undefined;
// Photos: Vercel Blob when its token is set (Vercel), otherwise a folder on the server.
const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
const onVercel = Boolean(process.env.VERCEL);
if (onVercel && dbUrl.startsWith("file:")) {
  console.error("[cms] On Vercel the dashboard needs a hosted database: set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN.");
}

// Signs dashboard logins. Uses PAYLOAD_SECRET when set; otherwise it is derived from the
// (private) database token, so a Vercel deploy with Turso connected needs no extra setup.
const DEV_SECRET = "local-development-secret-change-me";
const secret =
  process.env.PAYLOAD_SECRET ||
  (dbToken ? createHash("sha256").update(`payload:${dbToken}`).digest("hex") : DEV_SECRET);
// Never run a live site with the well-known development key (anyone could forge a login).
if (secret === DEV_SECRET && process.env.NODE_ENV === "production" && process.env.NEXT_PHASE !== "phase-production-build") {
  throw new Error("[cms] Set PAYLOAD_SECRET (a long random string) before starting the live site.");
}

const origins = allowedOrigins();

// Email (password resets, and a copy of enquiries) only when an SMTP mailbox is configured.
const smtp = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;
const email = smtp
  ? nodemailerAdapter({
      defaultFromAddress: process.env.CONTACT_FROM || process.env.SMTP_USER!,
      defaultFromName: "Money Coaching Hub",
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 465),
        secure: Number(process.env.SMTP_PORT || 465) === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      },
    })
  : undefined;

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || "",
  secret,
  // Security: only these addresses may use the dashboard's login cookie or call the API from a browser.
  csrf: origins,
  cors: origins,
  // Uploads: 15 MB max per file.
  upload: { limits: { fileSize: 15_000_000 } },
  // Limit how deeply linked documents can be expanded in one request.
  maxDepth: 4,
  email,
  admin: {
    user: Users.slug,
    avatar: "default",
    // Always the light, on-brand look, whatever the computer's dark-mode setting is.
    theme: "light",
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: " · Money Coaching Hub",
      icons: [{ rel: "icon", type: "image/png", url: "/icon.png" }],
    },
    components: {
      graphics: { Logo: "/payload/components/Brand#Logo", Icon: "/payload/components/Brand#Icon" },
      beforeDashboard: ["/payload/components/Welcome#Welcome"],
    },
    dateFormat: "d MMM yyyy, HH:mm",
    livePreview: {
      breakpoints: [
        { label: "Phone", name: "phone", width: 390, height: 844 },
        { label: "Tablet", name: "tablet", width: 820, height: 1180 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
  },
  collections: [Posts, Categories, Courses, Testimonials, Columns, ClientLogos, SimplePages, Enquiries, Subscribers, Media, Users],
  globals: [...pageGlobals, SiteSettings, SideHustleSettings, QuizSettings],
  editor: lexicalEditor({}),
  endpoints: [
    {
      // Used by the "Load starting content" button on the dashboard home (logged-in admin only).
      path: "/seed-content",
      method: "post",
      handler: async (req) => {
        if (!req.user) return Response.json({ error: "Please log in." }, { status: 403 });
        const { seedContent } = await import("./lib/cms/seed");
        const origin = process.env.NEXT_PUBLIC_SITE_URL || req.origin || new URL(req.url || "http://localhost").origin;
        try {
          const added = await seedContent(req.payload, { origin });
          return Response.json({ added });
        } catch (e) {
          req.payload.logger.error(e);
          return Response.json({ error: (e as Error).message }, { status: 500 });
        }
      },
    },
  ],
  db: sqliteAdapter({
    client: { url: dbUrl, authToken: dbToken },
    migrationDir: path.resolve(dirname, "migrations"),
    // On the live server the database is created/updated automatically at start-up.
    prodMigrations: migrations,
  }),
  sharp,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  graphQL: { disable: true },
  jobs: {
    // Runs scheduled publishing. On a normal server it runs every minute in the background;
    // on Vercel (no background process) Vercel Cron calls /api/payload-jobs/run instead (see vercel.json).
    autoRun: onVercel ? [] : [{ cron: "* * * * *", queue: "default", limit: 20 }],
    shouldAutoRun: async () => !onVercel && process.env.PAYLOAD_DISABLE_JOBS !== "1",
    access: {
      run: ({ req }) => {
        if (req.user) return true;
        const secret = process.env.CRON_SECRET;
        return Boolean(secret) && req.headers.get("authorization") === `Bearer ${secret}`;
      },
    },
  },
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(blobToken),
      token: blobToken,
      collections: { media: { disablePayloadAccessControl: true } },
      // Upload straight from the browser to Blob, so large photos don't hit Vercel's 4.5 MB request limit.
      clientUploads: true,
    }),
    seoPlugin({
      collections: ["posts", "courses", "simple-pages"],
      globals: pageGlobals.map((g) => g.slug),
      uploadsCollection: "media",
      generateTitle: ({ doc }) => {
        const d = doc as { title?: string; name?: string };
        return `${d?.title || d?.name || "Money Coaching Hub"} | Money Coaching Hub`;
      },
      generateDescription: ({ doc }) => {
        const d = doc as { excerpt?: string; short?: string; tagline?: string };
        return d?.excerpt || d?.tagline || d?.short || "";
      },
      generateURL: ({ doc, collectionSlug }) => {
        const d = doc as { slug?: string; category?: { slug?: string } };
        if (collectionSlug === "posts" && d?.category?.slug) return `${SITE}/${d.category.slug}/${d.slug}/`;
        return `${SITE}/${d?.slug ?? ""}/`;
      },
    }),
    redirectsPlugin({
      collections: ["posts", "courses"],
      overrides: {
        labels: { singular: "Redirect", plural: "Redirects" },
        admin: {
          group: "Settings",
          description: "Send an old web address to a new one (for example after renaming a post). Use paths like /old-page/.",
        },
      },
    }),
  ],
});
