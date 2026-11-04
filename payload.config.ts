import path from "node:path";
import { fileURLToPath } from "node:url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { seoPlugin } from "@payloadcms/plugin-seo";
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
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URI || `file:${path.resolve(dirname, "data/payload.db")}` },
    migrationDir: path.resolve(dirname, "migrations"),
    // On the live server the database is created/updated automatically at start-up.
    prodMigrations: migrations,
  }),
  sharp,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  graphQL: { disable: true },
  jobs: {
    autoRun: [{ cron: "* * * * *", queue: "default", limit: 20 }],
    shouldAutoRun: async () => process.env.PAYLOAD_DISABLE_JOBS !== "1",
  },
  plugins: [
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
