// Share images.
//   /og/?t=Title&k=Eyebrow    a branded card with the page title (PNG)
//   /og/?img=<blob image>     a blog cover converted to a 1200x630 JPEG, because LinkedIn
//                             and some apps don't show WebP previews
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { OgCard, OG_SIZE } from "@/lib/ogCard";

export const runtime = "nodejs";

const CACHE = "public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400";
const asset = (f: string) => readFile(join(process.cwd(), "assets/og", f));

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;

  const img = q.get("img");
  if (img) {
    let u: URL;
    try { u = new URL(img); } catch { return new Response("Bad image", { status: 400 }); }
    if (u.protocol !== "https:" || !u.hostname.endsWith(".public.blob.vercel-storage.com")) return new Response("Not allowed", { status: 400 });
    const r = await fetch(u);
    if (!r.ok) return new Response("Not found", { status: 404 });
    const out = await sharp(Buffer.from(await r.arrayBuffer())).resize(1200, 630, { fit: "cover", position: "attention" }).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    return new Response(new Uint8Array(out), { headers: { "Content-Type": "image/jpeg", "Cache-Control": CACHE } });
  }

  const title = (q.get("t") || "Money Coaching Hub").slice(0, 120);
  const eyebrow = (q.get("k") || "Money Coaching Hub").slice(0, 40);
  const [raleway, lato, latoBold, face, logo] = await Promise.all([
    asset("raleway-800.woff"), asset("lato-400.woff"), asset("lato-700.woff"), asset("luca.jpg"), asset("logo.png"),
  ]);
  const res = new ImageResponse(
    <OgCard title={title} eyebrow={eyebrow} face={`data:image/jpeg;base64,${face.toString("base64")}`} logo={`data:image/png;base64,${logo.toString("base64")}`} />,
    {
      ...OG_SIZE,
      fonts: [
        { name: "Raleway", data: raleway, weight: 800, style: "normal" },
        { name: "Lato", data: lato, weight: 400, style: "normal" },
        { name: "Lato", data: latoBold, weight: 700, style: "normal" },
      ],
    },
  );
  res.headers.set("Cache-Control", CACHE);
  return res;
}
