// Sends a notification email through the site's mailbox (SMTP_* in Vercel).
// Goes to CONTACT_TO, or the dashboard's Site settings → "Send form messages to" (falls back to the site email).
import "server-only";
import nodemailer from "nodemailer";
import { getSettings } from "@/lib/cms/data";

export const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Email to the site owner. Returns false (and logs why) when email isn't set up or sending fails. */
export async function notifyOwner(opts: { subject: string; text: string; rows: [string, string][]; replyTo?: { name: string; email: string } }) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_FROM } = process.env;
  const settings = await getSettings();
  const to = process.env.CONTACT_TO || settings.notifyEmail;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !to) {
    console.error("notifyOwner: SMTP environment variables are not set.");
    return false;
  }
  const port = Number(SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });
  const rows = opts.rows
    .map(([k, v]) => `<tr><td style="padding:8px 0;color:#555;width:130px;vertical-align:top">${escapeHtml(k)}</td><td style="padding:8px 0;font-weight:600">${escapeHtml(v || "—")}</td></tr>`)
    .join("");
  const html = `<!doctype html><html><body style="margin:0;background:#f6f6f6;font-family:Helvetica,Arial,sans-serif;color:#0a0a0a">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px"><tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e8e8e8">
    <tr><td style="background:#0a0a0a;padding:20px 28px;color:#fff;font-size:16px;font-weight:700">Money Coaching Hub <span style="color:#f8a90f">· ${escapeHtml(opts.subject)}</span></td></tr>
    <tr><td style="padding:28px"><table width="100%" cellpadding="0" cellspacing="0" style="font-size:15px">${rows}</table>
      <p style="margin-top:20px;font-size:13px;color:#555">Also saved in the dashboard: Inbox → Newsletter sign-ups.</p></td></tr>
  </table></td></tr></table></body></html>`;
  try {
    await transporter.sendMail({
      from: `"Money Coaching Hub website" <${CONTACT_FROM || SMTP_USER}>`,
      to,
      replyTo: opts.replyTo ? `"${opts.replyTo.name.replace(/"/g, "")}" <${opts.replyTo.email}>` : undefined,
      subject: opts.subject,
      text: opts.text,
      html,
    });
    return true;
  } catch (err) {
    console.error("notifyOwner: send failed", err);
    return false;
  }
}
