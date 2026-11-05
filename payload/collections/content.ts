import type { CollectionConfig, Field } from "payload";
import { anyone, loggedIn } from "../access";
import { orderField, slugField } from "../fields";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";

const hooks = { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] };
const open = { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn };

/** A reorderable list of single lines. */
const lines = (name: string, label: string, description?: string): Field => ({
  name,
  label,
  type: "array",
  labels: { singular: "Line", plural: "Lines" },
  admin: { description, initCollapsed: false },
  fields: [{ name: "text", type: "textarea", required: true, label: false }],
});

export const Courses: CollectionConfig = {
  slug: "courses",
  labels: { singular: "Course", plural: "Courses" },
  admin: {
    useAsTitle: "name",
    group: "Courses & coaching",
    defaultColumns: ["name", "status", "dates", "price"],
    description: "Dates, prices, booking links and everything on each course page. Changes show on the site as soon as you save.",
    livePreview: { url: ({ data }) => `/${(data as { slug?: string })?.slug ?? ""}/` },
    preview: (doc) => `/${doc?.slug ?? ""}/`,
  },
  access: open,
  hooks,
  fields: [
    { name: "name", type: "text", required: true },
    slugField("name", "The course page address, e.g. investing-made-simple → /investing-made-simple/. Changing it changes the page address."),
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "open",
      options: [
        { label: "Open for booking", value: "open" },
        { label: "Waiting list (no dates yet)", value: "waitlist" },
        { label: "Hidden (page not shown)", value: "hidden" },
      ],
      admin: { position: "sidebar" },
    },
    orderField,
    {
      type: "tabs",
      tabs: [
        {
          label: "Booking",
          description: "The booking card, dates and price.",
          fields: [
            { name: "eyebrow", type: "text", label: "Small label above the title", admin: { description: "E.g. “Bestselling course · Taught in Maltese”." } },
            { name: "short", type: "text", label: "One-line summary", admin: { description: "Used on course cards across the site." } },
            { name: "tagline", type: "textarea", label: "Intro under the title" },
            {
              type: "row",
              fields: [
                { name: "dates", type: "text", label: "Dates", admin: { description: "E.g. “Starts Monday 11 January 2027”." } },
                { name: "startDate", type: "date", label: "First session (for sorting and countdowns)" },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "format", type: "text", admin: { description: "E.g. “4 live sessions on Zoom”." } },
                { name: "time", type: "text", admin: { description: "E.g. “Mondays, 7:30–8:30pm CET”." } },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "price", type: "text", admin: { description: "E.g. €175" } },
                { name: "priceNote", type: "text", label: "Price note" },
                { name: "seats", type: "text", label: "Seats", admin: { description: "E.g. “Strictly 20 seats”." } },
              ],
            },
            { name: "checkout", type: "text", label: "Payment link (Stripe)", admin: { description: "The full Stripe payment link. Leave empty to send people to the contact page." } },
            { name: "ctaLabel", type: "text", label: "Booking button text", defaultValue: "Book your place" },
            { name: "image", type: "upload", relationTo: "media", label: "Course photo", admin: { description: "Optional. Used on the course page next to the instructor text." } },
          ],
        },
        {
          label: "Page content",
          fields: [
            {
              name: "intro",
              type: "group",
              fields: [
                { name: "title", type: "text" },
                lines("paras", "Paragraphs"),
              ],
            },
            {
              name: "forYou",
              label: "Who it's for",
              type: "group",
              fields: [{ name: "title", type: "text" }, lines("items", "Points"), { name: "note", type: "textarea" }],
            },
            { name: "sessionsTitle", type: "text", label: "Sessions heading" },
            { name: "sessionsNote", type: "textarea", label: "Sessions note" },
            {
              name: "sessions",
              type: "array",
              labels: { singular: "Session", plural: "Sessions" },
              admin: { initCollapsed: true },
              fields: [
                { name: "title", type: "text", required: true },
                { name: "meta", type: "text", admin: { description: "Optional, e.g. a date." } },
                lines("points", "Points"),
                { name: "outcome", type: "textarea" },
              ],
            },
            {
              name: "included",
              label: "What's included",
              type: "array",
              admin: { initCollapsed: true },
              fields: [
                { name: "title", type: "text", required: true },
                { name: "text", type: "textarea" },
              ],
            },
            { name: "includedValue", type: "text", label: "Included value line" },
            lines("instructor", "About the instructor (paragraphs)"),
          ],
        },
        {
          label: "Reviews & FAQ",
          fields: [
            {
              name: "testimonials",
              label: "Reviews",
              type: "array",
              admin: { initCollapsed: true },
              fields: [
                { name: "text", type: "textarea", required: true },
                { type: "row", fields: [{ name: "name", type: "text", required: true }, { name: "role", type: "text" }] },
              ],
            },
            {
              name: "faqs",
              label: "Questions & answers",
              type: "array",
              admin: { initCollapsed: true },
              fields: [
                { name: "q", type: "text", label: "Question", required: true },
                { name: "a", type: "textarea", label: "Answer", required: true },
              ],
            },
            { name: "disclaimer", type: "textarea" },
          ],
        },
      ],
    },
  ],
};

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: { singular: "Review", plural: "Reviews" },
  admin: {
    useAsTitle: "name",
    group: "Courses & coaching",
    defaultColumns: ["name", "role", "showOn", "order"],
    description: "Client reviews. Tick where each one appears.",
  },
  access: open,
  hooks,
  defaultSort: "order",
  fields: [
    { name: "quote", type: "textarea", required: true },
    { type: "row", fields: [{ name: "name", type: "text", required: true }, { name: "role", type: "text", label: "Job title or detail" }] },
    { name: "photo", type: "upload", relationTo: "media" },
    {
      name: "showOn",
      type: "select",
      hasMany: true,
      label: "Show on",
      defaultValue: ["services"],
      options: [
        { label: "Homepage", value: "home" },
        { label: "Coaching page", value: "services" },
        { label: "Workshops page", value: "workshops" },
        { label: "My story page", value: "luca" },
      ],
      admin: { position: "sidebar" },
    },
    orderField,
  ],
};

export const Columns: CollectionConfig = {
  slug: "columns",
  labels: { singular: "Times of Malta column", plural: "Times of Malta columns" },
  admin: {
    useAsTitle: "title",
    group: "Courses & coaching",
    defaultColumns: ["title", "date"],
    description: "Links to Luca's columns. The newest two show on the homepage.",
  },
  access: open,
  hooks,
  defaultSort: "-date",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "url", type: "text", required: true, label: "Link to the article" },
    { name: "date", type: "date", required: true, admin: { date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" } } },
    { name: "excerpt", type: "textarea" },
    { name: "image", type: "upload", relationTo: "media", admin: { description: "Optional. Otherwise the column artwork is used." } },
  ],
};

export const ClientLogos: CollectionConfig = {
  slug: "client-logos",
  labels: { singular: "Client", plural: "Client logos" },
  admin: {
    useAsTitle: "name",
    group: "Courses & coaching",
    defaultColumns: ["name", "order"],
    description: "The “Trusted by teams at” strip. Upload a logo (white or transparent works best) or leave it as text.",
  },
  access: open,
  hooks,
  defaultSort: "order",
  fields: [
    { name: "name", type: "text", required: true },
    { name: "logo", type: "upload", relationTo: "media" },
    { name: "url", type: "text", label: "Website (optional)" },
    orderField,
  ],
};

export const SimplePages: CollectionConfig = {
  slug: "simple-pages",
  labels: { singular: "Simple page", plural: "Simple pages" },
  admin: {
    useAsTitle: "title",
    group: "Pages",
    defaultColumns: ["title", "slug", "updatedAt"],
    description: "Text pages such as the privacy policy, cookie policy and terms. You can also add new ones: they appear at /<slug>/.",
    preview: (doc) => `${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/preview/?path=${encodeURIComponent(`/${doc?.slug ?? ""}/`)}`,
  },
  access: { read: ({ req }) => (req.user ? true : { _status: { equals: "published" } }), create: loggedIn, update: loggedIn, delete: loggedIn },
  versions: { drafts: true, maxPerDoc: 20 },
  hooks,
  fields: [
    { name: "title", type: "text", required: true },
    slugField("title"),
    { name: "eyebrow", type: "text", label: "Small label above the title", defaultValue: "Legal" },
    { name: "intro", type: "textarea" },
    { name: "content", type: "richText" },
    { name: "legacyHtml", type: "textarea", label: "Original WordPress content", admin: { condition: (d) => Boolean(d?.legacyHtml), description: "Imported from the old site; shown while the content field above is empty." } },
  ],
};

export const Enquiries: CollectionConfig = {
  slug: "enquiries",
  labels: { singular: "Enquiry", plural: "Enquiries" },
  admin: {
    useAsTitle: "name",
    group: "Inbox",
    defaultColumns: ["name", "kind", "email", "createdAt", "handled"],
    description: "Every message sent through the site's forms. A copy is also emailed.",
  },
  access: { read: loggedIn, create: () => false, update: loggedIn, delete: loggedIn },
  defaultSort: "-createdAt",
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text" },
        { name: "email", type: "email" },
        { name: "phone", type: "text" },
      ],
    },
    { name: "kind", type: "text", label: "Form", admin: { readOnly: true } },
    { name: "subject", type: "text" },
    { name: "message", type: "textarea" },
    { name: "details", type: "json", admin: { readOnly: true, description: "Everything else the form sent." } },
    { name: "handled", type: "checkbox", label: "Dealt with", admin: { position: "sidebar" } },
    { name: "ipHash", type: "text", index: true, admin: { hidden: true } },
    { name: "notes", type: "textarea", label: "Private notes", admin: { position: "sidebar" } },
  ],
};

export const Subscribers: CollectionConfig = {
  slug: "subscribers",
  labels: { singular: "Sign-up", plural: "Newsletter sign-ups" },
  admin: {
    useAsTitle: "email",
    group: "Inbox",
    defaultColumns: ["email", "firstName", "source", "createdAt", "syncedToMailerLite"],
    description: "Everyone who signed up on the site. They are also added to MailerLite when it's connected.",
  },
  access: { read: loggedIn, create: () => false, update: loggedIn, delete: loggedIn },
  defaultSort: "-createdAt",
  fields: [
    { name: "email", type: "email", required: true },
    { name: "firstName", type: "text" },
    { name: "source", type: "text", admin: { readOnly: true } },
    { name: "list", type: "text", admin: { readOnly: true } },
    { name: "syncedToMailerLite", type: "checkbox", label: "Added to MailerLite", admin: { readOnly: true } },
    { name: "ipHash", type: "text", index: true, admin: { hidden: true } },
  ],
};
