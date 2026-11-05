/**
 * The web addresses the dashboard may be used from. Login cookies sent from any other
 * site are ignored (CSRF protection), and other sites can't call the API from a browser (CORS).
 */
export function allowedOrigins(): string[] {
  const list = new Set<string>(["https://moneycoachinghub.com", "https://www.moneycoachinghub.com"]);
  const add = (v?: string) => {
    if (!v) return;
    const url = v.startsWith("http") ? v : `https://${v}`;
    try {
      list.add(new URL(url).origin);
    } catch {}
  };
  add(process.env.NEXT_PUBLIC_SITE_URL);
  // Vercel's own addresses for this project (production, this deployment, this branch).
  add(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  add(process.env.VERCEL_URL);
  add(process.env.VERCEL_BRANCH_URL);
  for (const extra of (process.env.EXTRA_ALLOWED_ORIGINS || "").split(",")) add(extra.trim());
  if (process.env.NODE_ENV !== "production") {
    for (const port of [3000, 3100, 3200]) list.add(`http://localhost:${port}`);
  }
  return [...list];
}
