import type { Field, GlobalConfig } from "payload";
import { pagePaths, pageSchemas, type SchemaField } from "../../lib/cms/schemas";
import { anyone, loggedIn } from "../access";
import { revalidateGlobal } from "../hooks/revalidate";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "";

/** Sections whose lists are managed elsewhere in the dashboard. */
const NOTES: Record<string, string> = {
  "home.logo_strip": "The client names and logos are edited under Courses & coaching → Client logos.",
  "workshops.logo_strip": "The client names and logos are edited under Courses & coaching → Client logos.",
  "home.testimonials": "The review cards come from Reviews (tick “Homepage”).",
  "coaching.testimonials": "The quotes come from Reviews (tick “Coaching page”).",
  "workshops.what_they_say": "The quotes come from Reviews (tick “Workshops page”).",
  "luca.reviews": "The quotes come from Reviews (tick “My story page”).",
  "home.times_of_malta_column": "The two newest articles come from Times of Malta columns. The picture below is used when a column has no image of its own.",
  "home.blog": "The three newest blog posts show here automatically. The cards below are only used while there are no posts.",
  "home.course": "The start date and price come from Courses → Investing Made Simple (set “First session”).",
  "investing.hero": "Dates and price come from Courses → Investing Made Simple (set “First session”); the text fields are used when no date is set.",
  "investing.apply": "Dates, price and the payment link come from Courses → Investing Made Simple.",
};

function field(f: SchemaField): Field {
  if (f.type === "checkbox") {
    return {
      name: f.name,
      type: "checkbox",
      label: f.label,
      defaultValue: false,
      admin: { description: "Hides the whole section from the page without deleting anything." },
    };
  }
  if (f.type === "upload") {
    return {
      name: f.name,
      type: "upload",
      relationTo: "media",
      label: f.label,
      admin: {
        description: `Currently showing ${String(f.default).split("/").pop()}. Upload or pick an image to replace it; remove it to go back to the original.`,
        components: { Description: { path: "/payload/components/ImageDefault#ImageDefault", clientProps: { src: String(f.default) } } },
      },
    };
  }
  const isLink = f.kind === "url" || f.kind === "card";
  return ({
    name: f.name,
    type: f.type,
    label: f.label,
    defaultValue: String(f.default),
    admin: {
      placeholder: String(f.default),
      description: isLink
        ? "A page on this site (e.g. /contact-us/), a section (#reviews) or a full web address."
        : f.styled
          ? "Words between *stars* keep their highlight colour; **double stars** stay bold. Empty = back to the original."
          : undefined,
    },
  }) as Field;
}

export const pageGlobals: GlobalConfig[] = pageSchemas.map((s) => ({
  slug: `page-${s.slug}`,
  label: s.label,
  admin: {
    group: "Pages",
    description: `Every text, button and photo on ${pagePaths[s.slug] ?? "this page"}. Open a section to edit it. Empty fields go back to the original wording.`,
    preview: () => `${SITE}${pagePaths[s.slug] ?? "/"}`,
    livePreview: { url: () => `${SITE}${pagePaths[s.slug] ?? "/"}` },
  },
  access: { read: anyone, update: loggedIn },
  hooks: { afterChange: [revalidateGlobal] },
  versions: { max: 25 },
  fields: s.groups.map(
    (g): Field => ({
      type: "collapsible",
      label: g.label,
      admin: { initCollapsed: true },
      fields: [
        {
          name: g.name,
          type: "group",
          label: false,
          admin: { description: NOTES[`${s.slug}.${g.name}`] },
          fields: g.fields.map(field),
        },
      ],
    }),
  ),
}));
