// Checks a reCAPTCHA v2 answer with Google. Needs RECAPTCHA_SECRET_KEY in Vercel (type: Secret).
// Without the secret the check is skipped, so the forms keep working while it's being set up.
import "server-only";

export type CaptchaResult = { ok: true; skipped?: boolean } | { ok: false; reason: string };

export async function verifyRecaptcha(token: unknown, ip?: string): Promise<CaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { ok: true, skipped: true };
  const response = typeof token === "string" ? token.trim() : "";
  if (!response || response === "unavailable") return { ok: false, reason: "missing" };
  try {
    const body = new URLSearchParams({ secret, response: response.slice(0, 4000) });
    if (ip && ip !== "unknown") body.set("remoteip", ip);
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", { method: "POST", body, signal: AbortSignal.timeout(6000) });
    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (data.success) return { ok: true };
    return { ok: false, reason: (data["error-codes"] || ["failed"]).join(",") };
  } catch (e) {
    // Google unreachable: don't lose a real enquiry over it.
    console.error("reCAPTCHA check could not reach Google", e);
    return { ok: true, skipped: true };
  }
}
