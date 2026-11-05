import { NextResponse } from "next/server";
import { cms } from "@/lib/cms/payload";
import { cleanLine, clientIp, ipHash, readFormBody, tooMany } from "@/lib/security/rateLimit";

// Adds a subscriber to MailerLite (the UNSPOKEN list).
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

  const email = cleanLine(body.email, 200).toLowerCase();
  const name = cleanLine(body.name, 100);
  const list = body.list === "side-hustle" ? "side-hustle" : "unspoken";
  const source = cleanLine(body.source, 60).replace(/[^\w-]/g, "") || "website";
  if (!/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });

  // Keep every sign-up in the dashboard (Inbox → Newsletter sign-ups).
  let recordId: string | number | null = null;
  try {
    const payload = await cms();
    const doc = await payload.create({ collection: "subscribers", overrideAccess: true, data: { email, firstName: name, source, list, ipHash: hash } });
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

  const key = process.env.MAILERLITE_API_KEY;
  const group = list === "side-hustle" ? process.env.MAILERLITE_GROUP_SIDE_HUSTLE || process.env.MAILERLITE_GROUP_ID : process.env.MAILERLITE_GROUP_ID;
  if (!key || !group) {
    console.error("Subscribe: MAILERLITE_API_KEY / MAILERLITE_GROUP_ID not set.");
    if (recordId != null) return NextResponse.json({ ok: true });
    return NextResponse.json({ error: "Sign-up is being set up. Please email info@moneycoachinghub.com and we'll add you." }, { status: 503 });
  }

  try {
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ email, fields: { name, source }, groups: [group] }),
    });
    if (!res.ok) {
      console.error("MailerLite error", res.status, await res.text());
      if (recordId != null) return NextResponse.json({ ok: true });
      return NextResponse.json({ error: "Sorry, that didn't work. Please try again." }, { status: 502 });
    }
    await markSynced();
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("MailerLite request failed", e);
    return NextResponse.json({ error: "Sorry, that didn't work. Please try again." }, { status: 502 });
  }
}
