import { APIError, type CollectionBeforeValidateHook, type CollectionConfig } from "payload";
import { anyone, loggedIn } from "../access";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";

/**
 * The single admin login. Nobody can sign up or add more users: the only account
 * is the one that already exists (or the one created with `npm run seed`).
 * The admin can change their own name, email and password from the account page.
 */
/** A strong password: at least 12 characters, with letters and numbers, not the email. */
const strongPassword: CollectionBeforeValidateHook = ({ data }) => {
  const pw = data?.password;
  if (typeof pw !== "string" || !pw) return data;
  const problems: string[] = [];
  if (pw.length < 12) problems.push("at least 12 characters");
  if (!/[a-z]/i.test(pw) || !/\d/.test(pw)) problems.push("letters and numbers");
  if (data?.email && pw.toLowerCase().includes(String(data.email).split("@")[0].toLowerCase())) problems.push("not containing your email name");
  if (/^(password|moneycoach|moneycoachinghub|luca)/i.test(pw)) problems.push("not an easy-to-guess word");
  if (problems.length) throw new APIError(`Please choose a stronger password: ${problems.join(", ")}.`, 400, null, true);
  return data;
};

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Admin login", plural: "Admin login" },
  auth: {
    // Logged out after 8 hours without activity (the dashboard refreshes the login while it's open).
    tokenExpiration: 60 * 60 * 8,
    // 5 wrong passwords lock the login for 15 minutes (stops password guessing).
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    // Server-side sessions: logging out really ends the session.
    useSessions: true,
    // The login token stays in a protected cookie that page scripts can't read; it is never sent back in responses.
    removeTokenFromResponses: true,
    cookies: { secure: process.env.NODE_ENV === "production", sameSite: "Strict" },
  },
  hooks: { beforeValidate: [strongPassword] },
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
    // No SVG: an SVG file can contain scripts. Photos and PDFs only.
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif", "application/pdf"],
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
