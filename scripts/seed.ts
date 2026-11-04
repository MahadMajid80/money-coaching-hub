/**
 * Fills an empty dashboard with the site's current content (safe to re-run).
 *
 *   npm run seed
 *
 * Optional: SEED_ADMIN_EMAIL + SEED_ADMIN_PASSWORD (+ SEED_ADMIN_NAME) create the first admin login.
 * Also available as the "Load starting content" button on the dashboard home.
 */
import { getPayload } from "payload";
import config from "../payload.config";
import { seedContent } from "../lib/cms/seed";

const payload = await getPayload({ config });
const { SEED_ADMIN_EMAIL: email, SEED_ADMIN_PASSWORD: password, SEED_ADMIN_NAME: name } = process.env;
await seedContent(payload, { origin: process.env.NEXT_PUBLIC_SITE_URL, admin: email && password ? { email, password, name } : undefined });
console.log("Done.");
process.exit(0);
