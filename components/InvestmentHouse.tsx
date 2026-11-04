"use client";

// The €10,000 Investment House tool, styled to the design pack, with the
// sign-up gate (first name + email → UNSPOKEN list) before "Analyse my house".

import { useMemo, useState } from "react";

type Risk = "very-low" | "low" | "medium" | "high" | "very-high";
type Cat = "Equities" | "Bonds" | "Thematic" | "Defensive";
type Brick = { id: string; name: string; ret: number; risk: Risk; cat: Cat; info: string };

// Approximate 10-year annualised returns in USD, as published on the original tool.
const BRICKS: Brick[] = [
  { id: "sp500", name: "S&P 500 ETF", ret: 13.8, risk: "medium", cat: "Equities", info: "The 500 largest US companies in one fund." },
  { id: "global", name: "Global equities ETF", ret: 12.5, risk: "medium", cat: "Equities", info: "Thousands of companies across developed markets." },
  { id: "europe", name: "European equities ETF", ret: 8.5, risk: "medium", cat: "Equities", info: "Large and mid-sized companies across Europe." },
  { id: "em", name: "Emerging markets ETF", ret: 10.5, risk: "high", cat: "Equities", info: "Companies in fast-growing economies like India, China and Brazil." },
  { id: "gbonds", name: "Global bonds ETF", ret: 1.7, risk: "low", cat: "Bonds", info: "Government and corporate bonds from around the world." },
  { id: "eubonds", name: "European govt bonds", ret: 1.0, risk: "low", cat: "Bonds", info: "Bonds issued by European governments." },
  { id: "short", name: "Short-term bonds ETF", ret: 1.5, risk: "very-low", cat: "Bonds", info: "Bonds that mature soon, so prices move very little." },
  { id: "tech", name: "Technology ETF", ret: 23.4, risk: "high", cat: "Thematic", info: "Technology companies, from chips to software." },
  { id: "ai", name: "AI & innovation ETF", ret: 15.2, risk: "very-high", cat: "Thematic", info: "Companies building artificial intelligence and robotics." },
  { id: "defence", name: "Defence ETF", ret: 14.0, risk: "high", cat: "Thematic", info: "Aerospace and defence companies." },
  { id: "clean", name: "Clean energy ETF", ret: 2.7, risk: "very-high", cat: "Thematic", info: "Solar, wind and other clean energy companies." },
  { id: "gold", name: "Gold", ret: 14.8, risk: "low", cat: "Defensive", info: "A traditional store of value that often holds up in crises." },
  { id: "silver", name: "Silver", ret: 7.8, risk: "medium", cat: "Defensive", info: "A precious and industrial metal, more volatile than gold." },
  { id: "infra", name: "Infrastructure ETF", ret: 6.8, risk: "low", cat: "Defensive", info: "Roads, utilities, pipelines and towers." },
  { id: "cash", name: "Cash buffer", ret: 2.5, risk: "very-low", cat: "Defensive", info: "Money held aside, ready to use." },
];

// Risk colours from the design pack.
const RISK: Record<Risk, { label: string; bg: string; fg: string; score: number }> = {
  "very-low": { label: "Very low", bg: "#F3E6B8", fg: "#111111", score: 1 },
  low: { label: "Low", bg: "#FFD112", fg: "#111111", score: 2 },
  medium: { label: "Medium", bg: "#FAAC15", fg: "#111111", score: 3 },
  high: { label: "High", bg: "#E3572B", fg: "#ffffff", score: 4 },
  "very-high": { label: "Very high", bg: "#B0122A", fg: "#ffffff", score: 5 },
};

const MAX = 10; // 10 bricks × €1,000
const cats = ["All", "Equities", "Bonds", "Thematic", "Defensive"] as const;
const eur = (n: number) => "€" + Math.round(n).toLocaleString("en-IE");

export default function InvestmentHouse() {
  const [stack, setStack] = useState<string[]>([]);
  const [filter, setFilter] = useState<(typeof cats)[number]>("All");
  const [hover, setHover] = useState<Brick | null>(null);
  const [gate, setGate] = useState<"closed" | "open" | "sending" | "done">("closed");
  const [err, setErr] = useState("");

  const placed = stack.map((id) => BRICKS.find((b) => b.id === id)!);
  const full = placed.length >= MAX;
  const avgRisk = placed.length ? placed.reduce((s, b) => s + RISK[b.risk].score, 0) / placed.length : 0;
  const riskLabel = !placed.length ? "—" : avgRisk < 1.8 ? "Very low" : avgRisk < 2.6 ? "Low" : avgRisk < 3.4 ? "Medium" : avgRisk < 4.2 ? "High" : "Very high";
  const avgRet = placed.length ? placed.reduce((s, b) => s + b.ret, 0) / placed.length : 0;
  const projection = useMemo(
    () => [10, 20, 30].map((y) => ({ y, v: placed.reduce((s, b) => s + 1000 * Math.pow(1 + b.ret / 100, y), 0) + (MAX - placed.length) * 1000 })),
    [placed]
  );

  const rows: { b: Brick; i: number }[][] = [];
  placed.forEach((b, i) => {
    if (i % 2 === 0) rows.push([]);
    rows[rows.length - 1].push({ b, i });
  });

  const analysis = () => {
    const byRisk = (Object.keys(RISK) as Risk[]).map((r) => ({ r, n: placed.filter((b) => b.risk === r).length })).filter((x) => x.n);
    const byCat = (["Equities", "Bonds", "Thematic", "Defensive"] as Cat[]).map((c) => ({ c, n: placed.filter((b) => b.cat === c).length })).filter((x) => x.n);
    const thematic = placed.filter((b) => b.cat === "Thematic").length;
    const highish = placed.filter((b) => b.risk === "high" || b.risk === "very-high").length;
    const notes: string[] = [];
    if (placed.length < MAX) notes.push(`${MAX - placed.length * 1} of your 10 bricks are still unplaced: that's ${eur((MAX - placed.length) * 1000)} sitting idle at 0% in this projection.`);
    if (highish >= 5) notes.push("Half or more of your house is high or very-high risk bricks. Expect big swings in both directions; make sure the emergency fund underneath is solid.");
    if (thematic >= 4) notes.push("You're leaning heavily on themes. Themes can run hot for years and then go cold; a core of broad ETFs usually carries the weight.");
    if (!placed.some((b) => b.cat === "Equities")) notes.push("There's no broad equity ETF in your house. For long horizons, a core equity brick is usually the load-bearing wall.");
    if (placed.length && placed.every((b) => b.risk === "very-low" || b.risk === "low")) notes.push("This is a very cautious house. Safe, but over 20–30 years inflation may quietly eat into it.");
    if (!notes.length) notes.push("A balanced mix: a core of broad ETFs with some defensive and thematic bricks around it. The real question now is your timeline and what you're building towards.");
    return { byRisk, byCat, notes };
  };

  async function unlock(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setGate("sending");
    setErr("");
    try {
      const res = await fetch("/api/subscribe/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: f.get("name"), email: f.get("email"), website: f.get("website"), source: "investment-house" }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Something went wrong.");
      setGate("done");
    } catch (x) {
      setErr((x as Error).message);
      setGate("open");
    }
  }

  const a = gate === "done" ? analysis() : null;

  return (
    <div className="ih">
      <div className="ih-house">
        <div className="ih-roof" aria-hidden="true" />
        <div className="ih-walls" aria-label="Your house">
          {!placed.length && (
            <p className="ih-empty">
              Your emergency fund is your base.
              <br />
              Pick bricks to build. Each brick is €1,000.
            </p>
          )}
          {[...rows].reverse().map((row, ri) => (
            <div key={ri} className={`ih-row${row.length === 1 ? " ih-row--one" : ""}`}>
              {row.map(({ b, i }) => (
                <button
                  key={i}
                  type="button"
                  className="ih-brick"
                  style={{ background: RISK[b.risk].bg, color: RISK[b.risk].fg }}
                  onClick={() => {
                    setStack((s) => s.filter((_, j) => j !== i));
                    setGate((g) => (g === "done" ? "done" : "closed"));
                  }}
                  aria-label={`Remove ${b.name}`}
                  title="Click to remove"
                >
                  <strong>{b.name}</strong>
                  <small>€1,000 · ~{b.ret}%/yr</small>
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="ih-foundation">EMERGENCY FUND · 3 TO 6 MONTHS</div>

        <div className="ih-stats">
          <div>
            <span>Bricks</span>
            <strong>
              {placed.length}/{MAX}
            </strong>
          </div>
          <div>
            <span>Allocated</span>
            <strong>{placed.length * 10}%</strong>
          </div>
          <div>
            <span>Avg. return</span>
            <strong>{placed.length ? `~${avgRet.toFixed(1)}%` : "—"}</strong>
          </div>
          <div>
            <span>Risk</span>
            <strong>{riskLabel}</strong>
          </div>
        </div>

        <div className="ih-proj">
          <span className="eyebrow" style={{ color: "#FFD112" }}>What €10,000 could become</span>
          <div className="ih-years">
            {projection.map((p) => (
              <div key={p.y}>
                <span>{p.y} years</span>
                <strong>{eur(p.v)}</strong>
              </div>
            ))}
          </div>
          {placed.length > 0 && placed.length < MAX && <p style={{ margin: "10px 0 0", fontSize: "13px", color: "#C9C3B1" }}>Unplaced money is shown as cash at 0% growth.</p>}
        </div>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "16px" }}>
          <button type="button" className="btn btn-dark" disabled={!placed.length} onClick={() => setGate((g) => (g === "done" ? "done" : "open"))}>
            Analyse my house
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            disabled={!placed.length}
            onClick={() => {
              setStack([]);
              setGate((g) => (g === "done" ? "done" : "closed"));
            }}
          >
            Start over
          </button>
        </div>

        {(gate === "open" || gate === "sending") && (
          <form className="ih-gate" onSubmit={unlock}>
            <span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "18px" }}>Get your house analysed</span>
            <span style={{ fontSize: "15px", color: "#3A3A3A", lineHeight: "1.5" }}>Leave your first name and email to see the analysis. You&apos;ll also get UNSPOKEN, one true money story every fortnight. Unsubscribe any time.</span>
            <label htmlFor="ih-name" className="field-label">First name</label>
            <input id="ih-name" name="name" className="field-input" autoComplete="given-name" required />
            <label htmlFor="ih-email" className="field-label">Email address</label>
            <input id="ih-email" name="email" type="email" className="field-input" autoComplete="email" required />
            <div className="hp" aria-hidden="true">
              <label htmlFor="ih-web">Website</label>
              <input id="ih-web" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            {err && <p className="form-msg form-msg--err" role="alert">{err}</p>}
            <button type="submit" className="btn btn-gold" disabled={gate === "sending"}>
              {gate === "sending" ? "One moment…" : "Show my analysis"}
            </button>
          </form>
        )}

        {a && placed.length > 0 && (
          <div className="ih-gate" aria-live="polite">
            <span className="eyebrow">Your house, analysed</span>
            <span style={{ fontSize: "15px", color: "#111111" }}>
              <strong>By risk:</strong> {a.byRisk.map((x) => `${RISK[x.r].label} ${x.n * 10}%`).join(" · ")}
            </span>
            <span style={{ fontSize: "15px", color: "#111111" }}>
              <strong>By type:</strong> {a.byCat.map((x) => `${x.c} ${x.n * 10}%`).join(" · ")}
            </span>
            <ul style={{ margin: "0", paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px", lineHeight: "1.5", color: "#3A3A3A" }}>
              {a.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            <a href="/contact-us/?subject=Investment%20House" className="btn btn-dark" style={{ alignSelf: "flex-start" }}>
              Build the real one with Luca
            </a>
          </div>
        )}
      </div>

      <div className="ih-picker">
        <span className="eyebrow" style={{ color: "#6B6248" }}>Choose a brick</span>
        <div className="ih-filters" role="tablist" aria-label="Filter instruments">
          {cats.map((c) => (
            <button key={c} type="button" role="tab" aria-selected={filter === c} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>
        <ul className="ih-list">
          {BRICKS.filter((b) => filter === "All" || b.cat === filter).map((b) => (
            <li key={b.id}>
              <button type="button" className="brick" disabled={full} onClick={() => !full && setStack((s) => [...s, b.id])} onMouseEnter={() => setHover(b)} onFocus={() => setHover(b)}>
                <span className="swatch" style={{ background: RISK[b.risk].bg, border: b.risk === "very-low" ? "1px solid #E0D5B7" : undefined }} />
                <span className="ih-name">
                  <strong>{b.name}</strong>
                  <small>
                    ~{b.ret}%/yr · {RISK[b.risk].label} risk
                  </small>
                </span>
                <span className="ih-add" aria-hidden="true">
                  +
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="ih-info" aria-live="polite">
          {full ? "Your house is complete: all €10,000 is placed. Click a brick in the house to swap it out." : hover ? `${hover.name}: ${hover.info}` : "Hover or tap a brick to learn more, then add it to your house."}
        </p>
        <p className="compliance" style={{ margin: "12px 0 0", fontSize: "12px" }}>
          Approximate 10-year USD averages. Past performance does not guarantee future results. Educational only, not financial advice.
        </p>
      </div>
    </div>
  );
}
