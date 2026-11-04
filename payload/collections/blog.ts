import type { CollectionBeforeChangeHook, CollectionConfig } from "payload";
import { anyone, loggedIn, publishedOrLoggedIn } from "../access";
import { slugField } from "../fields";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "";

export const Categories: CollectionConfig = {
  slug: "categories",
  labels: { singular: "Blog category", plural: "Blog categories" },
  admin: {
    useAsTitle: "name",
    group: "Blog",
    defaultColumns: ["name", "slug"],
    description: "Each category gets its own page at /category/<slug>/ and is the first part of its posts' web addresses.",
  },
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: "name", type: "text", required: true },
    slugField("name"),
    { name: "description", type: "textarea", admin: { description: "Shown at the top of the category page." } },
  ],
};

/** Plain text of a Lexical document, for reading time. */
function lexicalText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as { text?: string; children?: unknown[]; root?: unknown };
  if (n.root) return lexicalText(n.root);
  return (n.text || "") + " " + (n.children || []).map(lexicalText).join(" ");
}

const readingTime: CollectionBeforeChangeHook = ({ data }) => {
  const text = lexicalText(data.content) + " " + String(data.legacyHtml || "").replace(/<[^>]+>/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  data.readingTime = Math.max(1, Math.round(words / 220));
  if (!data.publishedAt && data._status === "published") data.publishedAt = new Date().toISOString();
  return data;
};

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Blog post", plural: "Blog posts" },
  admin: {
    useAsTitle: "title",
    group: "Blog",
    defaultColumns: ["title", "category", "publishedAt", "_status"],
    listSearchableFields: ["title", "excerpt", "slug"],
    description: "Write, edit, schedule or delete articles. Save as a draft to keep working on it privately.",
    livePreview: {
      url: ({ data }) => {
        const d = data as { slug?: string; category?: { slug?: string } | number };
        const cat = typeof d?.category === "object" ? d.category?.slug : undefined;
        return cat && d?.slug ? `${SITE}/api/preview/?path=${encodeURIComponent(`/${cat}/${d.slug}/`)}` : `${SITE}/blog/`;
      },
    },
    preview: (doc) => {
      const cat = (doc?.category as { slug?: string } | undefined)?.slug;
      return cat && doc?.slug ? `${SITE}/api/preview/?path=${encodeURIComponent(`/${cat}/${doc.slug}/`)}` : null;
    },
  },
  access: { read: publishedOrLoggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  versions: { drafts: { autosave: { interval: 1500 }, schedulePublish: true }, maxPerDoc: 30 },
  defaultSort: "-publishedAt",
  hooks: {
    beforeChange: [readingTime],
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      type: "tabs",
      tabs: [
        {
          label: "Article",
          fields: [
            {
              name: "featuredImage",
              type: "upload",
              relationTo: "media",
              admin: { description: "Shown at the top of the post and on the blog cards." },
            },
            {
              name: "excerpt",
              type: "textarea",
              admin: { description: "One or two sentences. Used on blog cards and in Google when no SEO description is set." },
            },
            { name: "content", type: "richText", label: "Article" },
            {
              name: "legacyHtml",
              type: "textarea",
              label: "Original WordPress content",
              admin: {
                condition: (data) => Boolean(data?.legacyHtml),
                description:
                  "Imported from the old site. It is shown only while the Article field above is empty. To edit this post, put the text in the Article field.",
              },
            },
          ],
        },
      ],
    },
    slugField("title"),
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
      admin: { position: "sidebar", description: "Decides the post's web address: /category-slug/post-slug/." },
    },
    {
      name: "extraCategories",
      type: "relationship",
      relationTo: "categories",
      hasMany: true,
      label: "Also show in",
      admin: { position: "sidebar" },
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Publish date",
      admin: { position: "sidebar", date: { pickerAppearance: "dayAndTime" } },
    },
    {
      name: "readingTime",
      type: "number",
      label: "Minutes to read",
      admin: { position: "sidebar", readOnly: true, description: "Worked out automatically." },
    },
    {
      name: "wpId",
      type: "number",
      admin: { hidden: true },
      index: true,
    },
  ],
};
