import "server-only";
import config from "@payload-config";
import { getPayload } from "payload";

/** The Payload instance (cached after the first call). */
export const cms = () => getPayload({ config });

/** URL of an uploaded media item (or null). */
export function mediaUrl(m: unknown, size?: "thumb" | "card" | "large"): string | null {
  if (!m || typeof m !== "object") return null;
  const doc = m as { url?: string | null; sizes?: Record<string, { url?: string | null } | undefined> };
  return (size && doc.sizes?.[size]?.url) || doc.url || null;
}

export function mediaAlt(m: unknown, fallback = ""): string {
  if (!m || typeof m !== "object") return fallback;
  return (m as { alt?: string | null }).alt || fallback;
}
