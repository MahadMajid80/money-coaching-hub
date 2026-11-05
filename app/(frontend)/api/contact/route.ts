import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getSettings } from "@/lib/cms/data";
import { cms } from "@/lib/cms/payload";
import { cleanLine, cleanText, clientIp, ipHash, readFormBody, tooMany } from "@/lib/security/rateLimit";

// Every message is saved in the dashboard (Inbox → Enquiries) and, when email is set up, emailed too.
// Environment variables for the email copy:
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS   – the mailbox that sends the email
//   CONTACT_TO (optional)                         – where enquiries arrive; defaults to the dashboard's Site settings email
//   CONTACT_FROM (optional)                       – defaults to SMTP_USER

export const runtime = "nodejs";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  const parsed = await readFormBody(req);
  if ("error" in parsed) return NextResponse.json({ error: parsed.error }, { status: parsed.status });
  const body = parsed.body;

  // Honeypot: real people never fill this hidden field.
  if (cleanText(body.website, 200)) return NextResponse.json({ ok: true });

  // At most 5 messages per visitor per 10 minutes, 20 per day.
  const hash = ipHash(clientIp(req));
  if ((await tooMany("enquiries", hash, 5, 10)) || (await tooMany("enquiries", hash, 20, 24 * 60))) {
    return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  }

  const name = cleanLine(body.name, 120);
  const email = cleanLine(body.email, 200);
  const phone = cleanLine(body.phone, 40);
  const topic = cleanLine(body.topic, 120);
  const message = cleanText(body.message, 5000);

  if (!name || !email || !message) return NextResponse.json({ error: "Please fill in your name, email and message." }, { status: 400 });
  if (!/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });

  // 1. Save it in the dashboard.
  let saved = false;
  try {
    const known = new Set(["name", "email", "phone", "topic", "message", "website", "kind"]);
    const details = Object.fromEntries(
      Object.entries(body)
        .filter(([k, v]) => !known.has(k) && /^[a-zA-Z][\w-]{0,40}$/.test(k) && typeof v === "string" && v.trim())
        .slice(0, 15)
        .map(([k, v]) => [k, cleanText(v, 500)]),
    );
    const payload = await cms();
    await payload.create({
      collection: "enquiries",
      overrideAccess: true,
      data: { name, email, phone, kind: cleanLine(body.kind, 60) || "Contact form", subject: topic, message, details, ipHash: hash },
    });
    saved = true;
  } catch (err) {
    console.error("Contact form: could not save enquiry", err);
  }

  // 2. Email a copy.
  const settings = await getSettings();
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_FROM } = process.env;
  const CONTACT_TO = process.env.CONTACT_TO || settings.notifyEmail;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    if (saved) return NextResponse.json({ ok: true });
    console.error("Contact form: SMTP environment variables are not set.");
    return NextResponse.json({ error: `Our form is being set up. Please email ${settings.email} instead.` }, { status: 503 });
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
    if (saved) return NextResponse.json({ ok: true });
    return NextResponse.json({ error: "Sorry, your message couldn't be sent. Please email info@moneycoachinghub.com." }, { status: 500 });
  }
}
