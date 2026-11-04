import type { Access } from "payload";

/** Anyone logged in to the dashboard. */
export const loggedIn: Access = ({ req }) => Boolean(req.user);


/** Public can read published items; logged-in users also see drafts. */
export const publishedOrLoggedIn: Access = ({ req }) => {
  if (req.user) return true;
  return { _status: { equals: "published" } };
};

export const anyone: Access = () => true;
