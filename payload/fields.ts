import type { Field, FieldHook } from "payload";

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const fillSlug =
  (from: string): FieldHook =>
  ({ value, data, originalDoc }) => {
    if (typeof value === "string" && value.trim()) return slugify(value);
    const src = data?.[from] ?? originalDoc?.[from];
    return typeof src === "string" ? slugify(src) : value;
  };

/** URL slug, filled from another field when left empty. */
export const slugField = (from = "title", description?: string): Field => ({
  name: "slug",
  type: "text",
  index: true,
  unique: true,
  label: "URL slug",
  admin: {
    position: "sidebar",
    description: description ?? "The last part of the web address. Leave empty to create it from the title.",
  },
  hooks: { beforeValidate: [fillSlug(from)] },
});

/** A display order number for sorting lists. */
export const orderField: Field = {
  name: "order",
  type: "number",
  defaultValue: 0,
  label: "Order",
  admin: { position: "sidebar", description: "Lower numbers show first." },
};

/** A simple link: label + URL + new-tab switch. */
export const linkFields = (opts: { required?: boolean } = {}): Field[] => [
  { name: "label", type: "text", required: opts.required },
  {
    name: "url",
    type: "text",
    label: "Link",
    required: opts.required,
    admin: { description: "A page on this site (e.g. /contact-us/) or a full web address (https://…)." },
  },
  { name: "newTab", type: "checkbox", label: "Open in a new tab", defaultValue: false },
];
