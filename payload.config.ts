import path from "node:path";
import { fileURLToPath } from "node:url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";
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

if (!process.env.PAYLOAD_SECRET && process.env.NODE_ENV === "production") {
  console.warn("[cms] PAYLOAD_SECRET is not set. Set it before going live.");
}

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || "",
  secret: process.env.PAYLOAD_SECRET || "local-development-secret-change-me",
  admin: {
    user: Users.slug,
    avatar: "default",
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
      // Used by the "Load starting content" button on the dashboard home (admins only).
      path: "/seed-content",
      method: "post",
      handler: async (req) => {
        if (req.user?.role !== "admin") return Response.json({ error: "Only admins can do this." }, { status: 403 });
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
