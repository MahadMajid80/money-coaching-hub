import type { Field, GlobalConfig } from "payload";
import { anyone, loggedIn } from "../access";
import { revalidateGlobal } from "../hooks/revalidate";

const access = { read: anyone, update: loggedIn };
const hooks = { afterChange: [revalidateGlobal] };

const link = (label: string, url: string): Record<string, unknown> => ({ label, url, newTab: false });
const linkArray = (name: string, label: string, defaults: Record<string, unknown>[], description?: string): Field => ({
  name,
  label,
  type: "array",
  labels: { singular: "Link", plural: "Links" },
  defaultValue: defaults,
  admin: { description, initCollapsed: true, components: { RowLabel: "/payload/components/RowLabel#LinkRowLabel" } },
  fields: [
    {
      type: "row",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "url", type: "text", required: true, label: "Link" },
        { name: "newTab", type: "checkbox", label: "New tab", defaultValue: false },
      ],
    },
  ],
});

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  admin: { group: "Settings", description: "Logo, menu, footer, contact details, SEO defaults and tracking codes." },
  access,
  hooks,
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Header & menu",
          fields: [
            { name: "logo", type: "upload", relationTo: "media", admin: { description: "Leave empty to keep the current logo." } },
            linkArray(
              "nav",
              "Main menu",
              [
                link("Investing Course", "/investing-made-simple/"),
                link("Coaching", "/services/"),
                link("Companies", "/services/financial-workshops/"),
                link("Column", "/#column"),
                link("Money Types", "/#types"),
                link("Blog", "/blog/"),
              ],
              "Drag to reorder.",
            ),
            {
              type: "row",
              fields: [
                { name: "headerCtaLabel", type: "text", label: "Header button text", defaultValue: "Book a 10-minute call" },
                { name: "headerCtaUrl", type: "text", label: "Header button link", defaultValue: "/contact-us/" },
              ],
            },
            {
              name: "announcement",
              label: "Announcement bar",
              type: "group",
              admin: { description: "An optional strip across the very top of every page, e.g. “January cohort: 5 seats left”." },
              fields: [
                { name: "enabled", type: "checkbox", label: "Show the announcement bar", defaultValue: false },
                {
                  type: "row",
                  fields: [
                    { name: "text", type: "text" },
                    { name: "linkLabel", type: "text", label: "Link text" },
                    { name: "url", type: "text", label: "Link" },
                  ],
                },
                {
                  name: "style",
                  type: "select",
                  defaultValue: "gold",
                  options: [
                    { label: "Gold", value: "gold" },
                    { label: "Black", value: "dark" },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Footer",
          fields: [
            { name: "footerBrand", type: "text", label: "Footer name", defaultValue: "MONEY COACHING HUB" },
            {
              name: "footerTagline",
              type: "textarea",
              label: "Footer text",
              defaultValue: "Based in Malta (EU), working with clients all over the world.\nEducation, not personalised financial advice.",
              admin: { description: "Each line shows on its own line." },
            },
            {
              name: "footerColumns",
              type: "array",
              label: "Footer link columns",
              labels: { singular: "Column", plural: "Columns" },
              admin: { initCollapsed: true },
              defaultValue: [
                {
                  title: "Learn",
                  links: [
                    link("Investing Made Simple", "/investing-made-simple/"),
                    link("Crypto Made Simple", "/crypto-made-simple-the-online-course/"),
                    link("Side Hustle, Done Right", "/side-hustle/#notify"),
                    link("Technical Analysis Bootcamp", "/technical-analysis-bootcamp/"),
                    link("Times of Malta column", "/#column"),
                    link("Money Type Quiz", "/take-money-type-quiz/"),
                    link("The 8 Money Types", "/the-8-money-archetypes/"),
                    link("€10,000 Investment House", "/portfolio-management/"),
                    link("Blog", "/blog/"),
                  ],
                },
                {
                  title: "Coaching",
                  links: [
                    link("Individual Coaching", "/services/#options"),
                    link("Couples Coaching", "/services/#options"),
                    link("Single Session", "/services/#options"),
                    link("For Companies", "/services/financial-workshops/"),
                  ],
                },
                { title: "Connect", links: [link("Book a 10-minute call", "/contact-us/")] },
              ],
              fields: [{ name: "title", type: "text", required: true }, linkArray("links", "Links", [])],
            },
            {
              name: "disclaimer",
              type: "textarea",
              label: "Small-print disclaimer",
              defaultValue:
                "Luca Caruana is a Certified Money Coach (CMC®). Money Coaching Hub provides financial education and coaching. It is not licensed to provide investment advice and does not sell financial products.",
              admin: { description: "Shown in the footer of the inner pages." },
            },
          ],
        },
        {
          label: "Contact & social",
          fields: [
            {
              type: "row",
              fields: [
                { name: "email", type: "email", defaultValue: "info@moneycoachinghub.com" },
                { name: "phone", type: "text" },
                { name: "location", type: "text", defaultValue: "Malta" },
              ],
            },
            linkArray("socials", "Social media", [
              { label: "Instagram", url: "https://www.instagram.com/moneycoachluca/", newTab: true },
              { label: "LinkedIn", url: "https://www.linkedin.com/company/money-coaching-hub/", newTab: true },
              { label: "Facebook", url: "https://www.facebook.com/profile.php?id=61575551973728", newTab: true },
            ]),
            {
              name: "notifyEmail",
              type: "email",
              label: "Send form messages to",
              admin: { description: "Where contact and workshop enquiries are emailed. Leave empty to use the email above." },
            },
          ],
        },
        {
          label: "SEO & sharing",
          fields: [
            { name: "seoTitle", type: "text", label: "Default page title", defaultValue: "Money Coaching Hub – Luca Caruana, Certified Money Coach, Malta" },
            {
              name: "seoDescription",
              type: "textarea",
              label: "Default description",
              defaultValue:
                "Luca Caruana, Certified Money Coach in Malta. One-to-one coaching, the Investing Made Simple course and financial wellbeing workshops. No products, no commissions.",
            },
            { name: "shareImage", type: "upload", relationTo: "media", label: "Default sharing image", admin: { description: "Shown when a page is shared on WhatsApp, Facebook, LinkedIn… 1200×630 works best." } },
          ],
        },
        {
          label: "Tracking",
          description: "Paste IDs only. Leave empty to turn off.",
          fields: [
            { name: "gaId", type: "text", label: "Google Analytics 4 ID", admin: { description: "Looks like G-XXXXXXX." } },
            { name: "metaPixelId", type: "text", label: "Meta (Facebook) Pixel ID" },
            { name: "searchConsole", type: "text", label: "Google Search Console verification code", admin: { description: "Only the content=\"…\" value." } },
          ],
        },
      ],
    },
  ],
};

export const SideHustleSettings: GlobalConfig = {
  slug: "side-hustle-settings",
  label: "Side hustle: launch stage",
  admin: { group: "Courses & coaching", description: "Which version of the Side Hustle page visitors see, and the payment links." },
  access,
  hooks,
  fields: [
    {
      name: "stage",
      type: "radio",
      defaultValue: "notify",
      options: [
        { label: "Get notified (before booking opens)", value: "notify" },
        { label: "Intro session booking", value: "intro" },
        { label: "Full programme booking", value: "programme" },
      ],
    },
    { name: "introCheckout", type: "text", label: "Intro session payment link", defaultValue: "/contact-us/?subject=Side%20Hustle%20intro" },
    { name: "programmeCheckout", type: "text", label: "Programme payment link", defaultValue: "/contact-us/?subject=Side%20Hustle%20programme" },
  ],
};

export const QuizSettings: GlobalConfig = {
  slug: "quiz-settings",
  label: "Quiz words",
  admin: { group: "Money types quiz", description: "The words on the money type quiz, and which type each word counts towards." },
  access,
  hooks,
  fields: [
    {
      name: "words",
      type: "array",
      labels: { singular: "Word", plural: "Words" },
      admin: { components: { RowLabel: "/payload/components/RowLabel#WordRowLabel" } },
      fields: [
        {
          type: "row",
          fields: [
            { name: "word", type: "text", required: true },
            {
              name: "type",
              type: "select",
              required: true,
              options: ["innocent", "victim", "warrior", "martyr", "fool", "creator", "tyrant", "magician"].map((v) => ({
                label: v[0].toUpperCase() + v.slice(1),
                value: v,
              })),
            },
          ],
        },
      ],
    },
  ],
};
