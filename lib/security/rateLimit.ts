import { createHash } from "node:crypto";
import { cms } from "@/lib/cms/payload";

/** The visitor's IP address, as reported by Vercel or the hosting proxy. */
export function clientIp(req: Request): string {
  return (
    req.headers.get("x-real-ip") ||
    req.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

/** A one-way fingerprint of the IP (the real address is never stored). */
export function ipHash(ip: string): string {
  const salt = process.env.PAYLOAD_SECRET || process.env.TURSO_AUTH_TOKEN || "mch";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

/**
 * Persistent rate limit: counts what this visitor submitted recently in the database,
 * so it holds across servers and restarts (unlike a memory counter on Vercel).
 */
export async function tooMany(collection: "enquiries" | "subscribers", hash: string, max: number, minutes: number): Promise<boolean> {
  try {
    const payload = await cms();
    const since = new Date(Date.now() - minutes * 60_000).toISOString();
    const r = await payload.count({ collection, overrideAccess: true, where: { and: [{ ipHash: { equals: hash } }, { createdAt: { greater_than: since } }] } });
    return r.totalDocs >= max;
  } catch {
    return false;
  }
}

/** Strip control characters (stops header injection in emails) and trim to a maximum length. */
export const cleanText = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max) : "";
export const cleanLine = (v: unknown, max: number) => cleanText(v, max).replace(/[\r\n]+/g, " ");

/**
 * Basic checks for the public forms: JSON only, small bodies only, and sent from this website
 * (not posted from another site in the visitor's browser).
 */
export async function readFormBody(req: Request, maxBytes = 20_000): Promise<{ body: Record<string, unknown> } | { error: string; status: number }> {
  const origin = req.headers.get("origin");
  if (origin) {
    const { allowedOrigins } = await import("./origins");
    const self = new URL(req.url).origin;
    if (origin !== self && !allowedOrigins().includes(origin)) return { error: "Not allowed.", status: 403 };
  }
  if (!(req.headers.get("content-type") || "").includes("application/json")) return { error: "Invalid request.", status: 415 };
  const len = Number(req.headers.get("content-length") || 0);
  if (len > maxBytes) return { error: "Message too long.", status: 413 };
  try {
    const text = await req.text();
    if (text.length > maxBytes) return { error: "Message too long.", status: 413 };
    const body = JSON.parse(text);
    if (!body || typeof body !== "object" || Array.isArray(body)) return { error: "Invalid request.", status: 400 };
    return { body };
  } catch {
    return { error: "Invalid request.", status: 400 };
  }
}
