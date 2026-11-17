import { NextResponse } from "next/server";
import { cms } from "@/lib/cms/payload";
import { notifyOwner } from "@/lib/mail";
import { checkSpam } from "@/lib/security/spam";
import { verifyRecaptcha } from "@/lib/security/recaptcha";
import { cleanLine, clientIp, ipHash, readFormBody, tooMany } from "@/lib/security/rateLimit";

// Saves a newsletter sign-up in the dashboard, emails it to the site owner, and (when connected) adds it to MailerLite.
// Set in Vercel → Settings → Environment Variables:
//   MAILERLITE_API_KEY     – MailerLite → Integrations → API → generate a token
//   MAILERLITE_GROUP_ID    – the UNSPOKEN group's ID (MailerLite → Subscribers → Groups)
//   MAILERLITE_GROUP_SIDE_HUSTLE (optional) – a separate group for side-hustle notifications

export const runtime = "nodejs";

export async function POST(req: Request) {
  const parsed = await readFormBody(req, 4_000);
  if ("error" in parsed) return NextResponse.json({ error: parsed.error }, { status: parsed.status });
  const body = parsed.body;
  if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ ok: true }); // honeypot

  // At most 5 sign-ups per visitor per 10 minutes, 15 per day.
  const hash = ipHash(clientIp(req));
  if ((await tooMany("subscribers", hash, 5, 10)) || (await tooMany("subscribers", hash, 15, 24 * 60))) {
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  }

  // reCAPTCHA "I'm not a robot" (checked with Google when RECAPTCHA_SECRET_KEY is set).
  const captcha = await verifyRecaptcha(body.recaptcha, clientIp(req));
  if (!captcha.ok) {
    console.log(`reCAPTCHA failed (${captcha.reason})`);
    return NextResponse.json({ error: "Please tick “I'm not a robot” and try again." }, { status: 400 });
  }

  const email = cleanLine(body.email, 200).toLowerCase();
  const name = cleanLine(body.name, 100);
  const lastName = cleanLine(body.lastName, 100);
  const fullName = [name, lastName].filter(Boolean).join(" ");
  const list = body.list === "side-hustle" ? "side-hustle" : "unspoken";
  const source = cleanLine(body.source, 60).replace(/[^\w-]/g, "") || "website";
  if (!/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });

  // Spam (blocked senders, bots): answered as if it worked, but not saved or emailed.
  const verdict = checkSpam({ email, text: fullName, formAge: body.formAge });
  if (verdict.spam) {
    console.log(`Subscribe: spam ignored (${verdict.reason})`);
    return NextResponse.json({ ok: true });
  }

  // Keep every sign-up in the dashboard (Inbox → Newsletter sign-ups).
  let recordId: string | number | null = null;
  try {
    const payload = await cms();
    const doc = await payload.create({ collection: "subscribers", overrideAccess: true, data: { email, firstName: fullName, source, list, ipHash: hash } });
    recordId = doc.id;
  } catch (err) {
    console.error("Subscribe: could not save sign-up", err);
  }
  const markSynced = async () => {
    if (recordId == null) return;
    try {
      const payload = await cms();
      await payload.update({ collection: "subscribers", id: recordId, overrideAccess: true, data: { syncedToMailerLite: true } });
    } catch {}
  };

  // Email each new sign-up to the site owner (same address as contact enquiries).
  const listName = list === "side-hustle" ? "Side Hustle (notify me)" : "Newsletter";
  const emailed = await notifyOwner({
    subject: `New sign-up: ${email} – ${listName}`,
    text: `New newsletter sign-up\n\nEmail: ${email}\nName: ${fullName || "-"}\nList: ${listName}\nForm: ${source}`,
    rows: [
      ["Email", email],
      ["Name", fullName],
      ["List", listName],
      ["Form", source],
    ],
    replyTo: { name: fullName || email, email },
  });

  const key = process.env.MAILERLITE_API_KEY;
  const group = list === "side-hustle" ? process.env.MAILERLITE_GROUP_SIDE_HUSTLE || process.env.MAILERLITE_GROUP_ID : process.env.MAILERLITE_GROUP_ID;
  if (!key || !group) {
    if (recordId != null || emailed) return NextResponse.json({ ok: true });
    return NextResponse.json({ error: "Sign-up is being set up. Please email info@moneycoachinghub.com and we'll add you." }, { status: 503 });
  }

  try {
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${key}` },
      // Only send names that were filled in, so an empty box never wipes a name MailerLite already has.
      body: JSON.stringify({ email, fields: { ...(name ? { name } : {}), ...(lastName ? { last_name: lastName } : {}), source }, groups: [group] }),
    });
    if (!res.ok) {
      console.error("MailerLite error", res.status, await res.text());
      if (recordId != null || emailed) return NextResponse.json({ ok: true });
      return NextResponse.json({ error: "Sorry, that didn't work. Please try again." }, { status: 502 });
    }
    await markSynced();
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("MailerLite request failed", e);
    if (recordId != null || emailed) return NextResponse.json({ ok: true });
    return NextResponse.json({ error: "Sorry, that didn't work. Please try again." }, { status: 502 });
  }
}
