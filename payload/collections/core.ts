import type { CollectionConfig } from "payload";
import { adminOnly, adminOnlyField, anyone, loggedIn } from "../access";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "User", plural: "Users" },
  auth: { tokenExpiration: 60 * 60 * 24 * 14, maxLoginAttempts: 8, lockTime: 10 * 60 * 1000 },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "role"],
    group: "Settings",
    description: "People who can log in to this dashboard.",
  },
  access: {
    read: loggedIn,
    create: adminOnly,
    delete: adminOnly,
    update: ({ req, id }) => req.user?.role === "admin" || req.user?.id === id,
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "admin",
      options: [
        { label: "Admin (everything, including users)", value: "admin" },
        { label: "Editor (content only)", value: "editor" },
      ],
      access: { update: adminOnlyField },
      admin: { position: "sidebar" },
    },
  ],
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
