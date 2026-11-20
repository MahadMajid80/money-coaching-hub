import { mediaItems } from "@/lib/media";

/** "Featured in" row of outlet names linking to /media/. Outlets come from lib/media.ts. */
export function FeaturedIn({ dark = false, align = "center", label = "Featured in" }: { dark?: boolean; align?: "center" | "start"; label?: string }) {
  const outlets = Array.from(new Set(mediaItems.map((m) => m.outlet.replace(/\s*·.*$/, "")))).filter((o) => o !== "YouTube");
  return (
    <div className={dark ? "featured-in featured-in--dark" : "featured-in"} style={{ justifyContent: align === "center" ? "center" : "flex-start" }}>
      <span className="featured-in__label">{label}</span>
      {outlets.map((o) => (
        <span key={o} className="featured-in__name">{o}</span>
      ))}
      <a href="/media/" className="featured-in__link">See all <span aria-hidden="true">→</span></a>
    </div>
  );
}
