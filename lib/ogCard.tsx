// The share card shown when a page is posted on Facebook, LinkedIn, WhatsApp or X (1200 x 630).
// Rendered by app/og/route.tsx with next/og. Only flexbox and inline styles work here.

export const OG_SIZE = { width: 1200, height: 630 };

export function OgCard({ title, eyebrow, face, logo }: { title: string; eyebrow: string; face: string; logo: string }) {
  const size = title.length > 70 ? 54 : title.length > 45 ? 62 : 72;
  return (
    <div style={{ width: 1200, height: 630, display: "flex", background: "#FDF7E8", fontFamily: "Lato" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "56px 56px 48px 64px" }}>
        <img src={logo} width={120} height={100} style={{ objectFit: "contain", objectPosition: "left" }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#B06A00", marginBottom: 18 }}>
            {eyebrow}
          </div>
          <div style={{ fontFamily: "Raleway", fontWeight: 800, fontSize: size, lineHeight: 1.08, letterSpacing: -1, color: "#111111" }}>
            {title}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 22, color: "#3A3A3A", whiteSpace: "nowrap" }}>
          <div style={{ width: 44, height: 6, borderRadius: 3, background: "#FAAC15", marginRight: 16 }} />
          <span style={{ fontWeight: 700, color: "#111111", flexShrink: 0 }}>Luca Caruana</span>
          <span style={{ margin: "0 10px" }}>·</span>
          <span style={{ flexShrink: 0 }}>Certified Money Coach</span>
          <span style={{ margin: "0 10px" }}>·</span>
          <span style={{ flexShrink: 0 }}>moneycoachinghub.com</span>
        </div>
      </div>
      <img src={face} width={420} height={630} style={{ objectFit: "cover", flexShrink: 0 }} />
    </div>
  );
}
