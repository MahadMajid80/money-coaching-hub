import { mediaItems } from "@/lib/media";
import { MEDIA_LOGOS, findLogo, logoHeight } from "@/lib/logos";

/** "Featured in" row of outlets linking to /media/. Outlets come from lib/media.ts. */
export function FeaturedIn({ dark = false, align = "center", label = "Featured in" }: { dark?: boolean; align?: "center" | "start"; label?: string }) {
  const outlets = Array.from(new Set(mediaItems.map((m) => m.outlet.replace(/\s*·.*$/, "")))).filter((o) => o !== "YouTube");
  return (
    <div className={dark ? "featured-in featured-in--dark" : "featured-in"} style={{ justifyContent: align === "center" ? "center" : "flex-start" }}>
      <span className="featured-in__label">{label}</span>
      {outlets.map((o) => {
        const f = findLogo(o, MEDIA_LOGOS);
        return f ? (
          <img key={o} className="featured-in__logo" src={f.src} alt={o} style={{ height: `${logoHeight(f.aspect, 46)}px`, width: "auto" }} loading="lazy" />
        ) : (
          <span key={o} className="featured-in__name">{o}</span>
        );
      })}
      <a href="/media/" className="featured-in__link">See all <span aria-hidden="true">→</span></a>
    </div>
  );
}
