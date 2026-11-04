import type { Access, FieldAccess } from "payload";

/** Anyone logged in to the dashboard. */
export const loggedIn: Access = ({ req }) => Boolean(req.user);

/** Only users with the Admin role. */
export const adminOnly: Access = ({ req }) => req.user?.role === "admin";
export const adminOnlyField: FieldAccess = ({ req }) => req.user?.role === "admin";

/** Public can read published items; logged-in users also see drafts. */
export const publishedOrLoggedIn: Access = ({ req }) => {
  if (req.user) return true;
  return { _status: { equals: "published" } };
};

export const anyone: Access = () => true;
