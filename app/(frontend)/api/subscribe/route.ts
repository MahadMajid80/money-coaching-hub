import { NextResponse } from "next/server";
import { cms } from "@/lib/cms/payload";

// Adds a subscriber to MailerLite (the UNSPOKEN list).
// Set in Vercel → Settings → Environment Variables:
//   MAILERLITE_API_KEY     – MailerLite → Integrations → API → generate a token
//   MAILERLITE_GROUP_ID    – the UNSPOKEN group's ID (MailerLite → Subscribers → Groups)
//   MAILERLITE_GROUP_SIDE_HUSTLE (optional) – a separate group for side-hustle notifications

export const runtime = "nodejs";

const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 8;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ ok: true }); // honeypot

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });

  const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 100) : "";
  const list = body.list === "side-hustle" ? "side-hustle" : "unspoken";
  const source = typeof body.source === "string" ? body.source.slice(0, 60) : "website";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });

  // Keep every sign-up in the dashboard (Inbox → Newsletter sign-ups).
  let recordId: string | number | null = null;
  try {
    const payload = await cms();
    const doc = await payload.create({ collection: "subscribers", overrideAccess: true, data: { email, firstName: name, source, list } });
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
