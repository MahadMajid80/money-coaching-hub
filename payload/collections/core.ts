import type { CollectionConfig } from "payload";
import { anyone, loggedIn } from "../access";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";

/**
 * The single admin login. Nobody can sign up or add more users: the only account
 * is the one that already exists (or the one created with `npm run seed`).
 * The admin can change their own name, email and password from the account page.
 */
export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Admin login", plural: "Admin login" },
  auth: { tokenExpiration: 60 * 60 * 24 * 14, maxLoginAttempts: 8, lockTime: 10 * 60 * 1000 },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email"],
    group: "Settings",
    description: "Your login. Change your password from the account page (your picture, top right).",
  },
  access: {
    read: ({ req }) => (req.user ? { id: { equals: req.user.id } } : false),
    create: () => false,
    delete: () => false,
    update: ({ req, id }) => Boolean(req.user) && req.user?.id === id,
    unlock: () => false,
  },
  fields: [{ name: "name", type: "text", required: true }],
};

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Image or file", plural: "Media library" },
  admin: {
    group: "Library",
    description: "Every photo and file on the site. Upload once, use anywhere.",
    defaultColumns: ["filename", "alt", "updatedAt"],
  },
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  upload: {
    staticDir: process.env.MEDIA_DIR || "media",
    mimeTypes: ["image/*", "application/pdf"],
    focalPoint: true,
    crop: true,
    adminThumbnail: "thumb",
    imageSizes: [
      { name: "thumb", width: 400 },
      { name: "card", width: 900 },
      { name: "large", width: 1800 },
    ],
  },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Alt text",
      admin: { description: "Describe the picture in a few words, for screen readers and Google. E.g. “Luca speaking at a workshop”." },
    },
    { name: "caption", type: "text", admin: { description: "Optional. Shown under the image in blog posts." } },
  ],
};
