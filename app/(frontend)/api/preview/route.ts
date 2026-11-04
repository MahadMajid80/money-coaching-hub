import { draftMode, headers } from "next/headers";
import { redirect } from "next/navigation";
import { cms } from "@/lib/cms/payload";

/** Opened from the dashboard's Preview button: shows drafts to logged-in editors. */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const path = url.searchParams.get("path") || "/";
  if (!path.startsWith("/") || path.startsWith("//")) return new Response("Bad path", { status: 400 });
  const payload = await cms();
  const { user } = await payload.auth({ headers: await headers() });
  if (!user) return new Response("Please log in to the dashboard first.", { status: 401 });
  (await draftMode()).enable();
  redirect(path);
}
