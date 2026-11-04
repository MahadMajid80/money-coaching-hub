"use client";

/** Shows the design's original image under an image field, so editors see what is there now. */
export function ImageDefault({ src }: { src?: string }) {
  if (!src) return null;
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 8, fontSize: 13, opacity: 0.85 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" style={{ width: 72, height: 52, objectFit: "cover", borderRadius: 6, border: "1px solid var(--theme-elevation-150)" }} />
      <span>Original image. Choose a new one above to replace it, or remove yours to bring this back.</span>
    </div>
  );
}
