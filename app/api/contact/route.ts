import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Required environment variables (set them in Vercel → Settings → Environment Variables):
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS   – the mailbox that sends the email
//   CONTACT_TO                                    – where enquiries arrive (comma-separate several)
//   CONTACT_FROM (optional)                       – defaults to SMTP_USER

export const runtime = "nodejs";

const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real people never fill this hidden field.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const topic = clean(body.topic, 120);
  const message = clean(body.message, 5000);

  if (!name || !email || !message) return NextResponse.json({ error: "Please fill in your name, email and message." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    console.error("Contact form: SMTP environment variables are not set.");
    return NextResponse.json({ error: "Our form is being set up. Please email info@moneycoachinghub.com instead." }, { status: 503 });
  }

  const port = Number(SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "—"],
    ["Interested in", topic || "—"],
  ]
    .map(([k, v]) => `<tr><td style="padding:8px 0;color:#555;width:130px;vertical-align:top">${k}</td><td style="padding:8px 0;font-weight:600">${esc(v)}</td></tr>`)
    .join("");

  const html = `<!doctype html><html><body style="margin:0;background:#f6f6f6;font-family:Helvetica,Arial,sans-serif;color:#0a0a0a">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px"><tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e8e8e8">
    <tr><td style="background:#0a0a0a;padding:20px 28px;color:#fff;font-size:16px;font-weight:700">Money Coaching Hub <span style="color:#f8a90f">· New enquiry</span></td></tr>
    <tr><td style="padding:28px">
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size:15px">${rows}</table>
      <div style="margin-top:20px;padding:18px;background:#fff6e0;border-radius:12px;font-size:15px;line-height:1.6;white-space:pre-wrap">${esc(message)}</div>
      <p style="margin-top:20px;font-size:13px;color:#555">Reply to this email to answer ${esc(name)} directly.</p>
    </td></tr>
  </table></td></tr></table></body></html>`;

  try {
    await transporter.sendMail({
      from: `"Money Coaching Hub website" <${CONTACT_FROM || SMTP_USER}>`,
      to: CONTACT_TO,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `New enquiry from ${name}${topic ? ` – ${topic}` : ""}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "-"}\nInterested in: ${topic || "-"}\n\n${message}`,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json({ error: "Sorry, your message couldn't be sent. Please email info@moneycoachinghub.com." }, { status: 500 });
  }
}
