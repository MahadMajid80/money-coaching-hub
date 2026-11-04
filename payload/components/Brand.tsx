/* eslint-disable @next/next/no-img-element */

/** Logo on the dashboard login screen. */
export function Logo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <img src="/img/logo.png" alt="Money Coaching Hub" style={{ height: 110, width: "auto" }} />
      <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: ".08em", textTransform: "uppercase" }}>
        Website dashboard
      </span>
    </div>
  );
}

/** Small icon in the dashboard menu. */
export function Icon() {
  return <img src="/icon.png" alt="" style={{ width: 28, height: 28, borderRadius: 6 }} />;
}
