"use client";

// The €10,000 Investment House tool, styled to the design pack, with the
// sign-up gate (first name + email → UNSPOKEN list) before "Analyse my house".
// Same maths as the original WordPress tool: each instrument gets a share (1–100%) of the €10,000,
// the shares add up to 100%, and the projection grows €10,000 at the mix's weighted average return.

import { useEffect, useMemo, useRef, useState } from "react";

type Risk = "very-low" | "low" | "medium" | "high" | "very-high";
type Cat = "Equities" | "Bonds" | "Thematic" | "Defensive";
// p = the share suggested when the instrument is picked (the person can change it with the slider).
type Brick = { id: string; name: string; ret: number; risk: Risk; cat: Cat; p: number; tk?: string; info: string };

// Approximate 10-year average annual returns in USD, as published on the original tool.
const BRICKS: Brick[] = [
  { id: "sp500", name: "S&P 500 ETF", ret: 13.8, risk: "medium", cat: "Equities", p: 40, tk: "CSPX / VUAA", info: "Tracks the 500 biggest US companies: Apple, Microsoft, Amazon. ~13.8% average annual return in USD over the past decade. The most popular core holding for new investors." },
  { id: "global", name: "Global equities ETF", ret: 12.5, risk: "medium", cat: "Equities", p: 35, tk: "VWRL / IWDA", info: "One fund holding thousands of companies worldwide: US, Europe, Asia. ~12.5% average annual return in USD over the past decade. Genuinely diversified across developed markets." },
  { id: "europe", name: "European equities ETF", ret: 8.5, risk: "medium", cat: "Equities", p: 15, tk: "MEUD / EXSA", info: "Europe's biggest companies. ~8.5% average annual return in USD over the past decade. It lagged the US, but trades at much cheaper valuations now." },
  { id: "em", name: "Emerging markets ETF", ret: 10.5, risk: "high", cat: "Equities", p: 10, tk: "EIMI / VFEM", info: "China, India, Brazil and more. ~10.5% average annual return in USD over 10 years, boosted by the 2024–2025 recovery. High volatility, a long-horizon play." },
  { id: "gbonds", name: "Global bonds ETF", ret: 1.7, risk: "low", cat: "Bonds", p: 15, tk: "AGGG / AGGU", info: "Government and corporate bonds worldwide. ~1.7% average annual return in USD over 10 years. Low return, but its job is cushioning when shares fall hard." },
  { id: "eubonds", name: "European govt bonds", ret: 1.0, risk: "low", cat: "Bonds", p: 10, tk: "VGEA / IBCI", info: "Bonds issued by European governments. ~1.0% average annual return, very defensive. For euro-based investors this reduces currency risk compared with global bonds." },
  { id: "short", name: "Short-term bonds ETF", ret: 1.5, risk: "very-low", cat: "Bonds", p: 8, tk: "IBTE / CSH2", info: "Short-duration bonds. ~1.5% average annual return in USD with very low volatility, and much less sensitive to interest rates than longer bonds. A stable, cash-like buffer." },
  { id: "tech", name: "Technology ETF", ret: 23.4, risk: "high", cat: "Thematic", p: 10, tk: "IITU / QDVE", info: "The biggest tech companies: semiconductors, software, cloud. ~23.4% average annual return in USD over 10 years, the highest of any major sector, but it fell 35%+ in 2022." },
  { id: "ai", name: "AI & innovation ETF", ret: 15.2, risk: "very-high", cat: "Thematic", p: 8, tk: "AIAI / WTAI", info: "AI infrastructure and platforms. ~15.2% average return over a 5-year track record (launched after 2019, so no full 10-year history). High conviction, very high volatility." },
  { id: "defence", name: "Defence ETF", ret: 14.0, risk: "high", cat: "Thematic", p: 8, tk: "DFEN / NATO", info: "Aerospace and defence. ~14.0% average annual return in USD, up sharply since 2022 as NATO budgets rose. Geopolitically sensitive: it can fall fast on peace news." },
  { id: "clean", name: "Clean energy ETF", ret: 2.7, risk: "very-high", cat: "Thematic", p: 8, tk: "INRG / RENW", info: "Solar, wind and grid infrastructure. ~2.7% average annual return in USD over 10 years, the most disappointing of any sector despite the compelling story. Rate-sensitive; very long horizon only." },
  { id: "gold", name: "Gold", ret: 14.8, risk: "low", cat: "Defensive", p: 5, tk: "SGLD / PHAU", info: "Physical gold in USD. ~14.8% average annual return over the past decade, boosted by the 2024–2025 surge. The classic crisis hedge." },
  { id: "silver", name: "Silver", ret: 7.8, risk: "medium", cat: "Defensive", p: 4, tk: "PHAG / SLVR", info: "Physical silver in USD. ~7.8% average annual return over the past decade. Volatile, but industrial demand from solar panels adds a growth element." },
  { id: "infra", name: "Infrastructure ETF", ret: 6.8, risk: "low", cat: "Defensive", p: 8, tk: "SXLP / CORE", info: "Toll roads, airports, utilities. ~6.8% average annual return in USD, with steady income and low correlation with stock markets. A reliable stabiliser." },
  { id: "cash", name: "Cash buffer", ret: 2.5, risk: "very-low", cat: "Defensive", p: 5, info: "Cash or a USD money market fund. ~2.5% average return, better since 2022 as central banks raised rates. Not here to grow: here to give you options when markets fall." },
];

// Risk colours from the design pack; score 0–4 as on the original tool.
const RISK: Record<Risk, { label: string; bg: string; fg: string; score: number }> = {
  "very-low": { label: "Very low", bg: "#F3E6B8", fg: "#111111", score: 0 },
  low: { label: "Low", bg: "#FFD112", fg: "#111111", score: 1 },
  medium: { label: "Medium", bg: "#FAAC15", fg: "#111111", score: 2 },
  high: { label: "High", bg: "#E3572B", fg: "#ffffff", score: 3 },
  "very-high": { label: "Very high", bg: "#B0122A", fg: "#ffffff", score: 4 },
};

const TOTAL = 10000;
const HORIZONS = [10, 20, 30] as const;
const cats = ["All", "Equities", "Bonds", "Thematic", "Defensive"] as const;
const eur = (n: number) => (n < 0 ? "−" : "") + "€" + Math.round(Math.abs(n)).toLocaleString("en-IE");
/** What €10,000 becomes after y years at an average annual return of ret %. */
const fv = (ret: number, y: number) => TOTAL * Math.pow(1 + ret / 100, y);

type Placed = Brick & { pct: number };

export default function InvestmentHouse() {
  const [placed, setPlaced] = useState<Placed[]>([]);
  const [filter, setFilter] = useState<(typeof cats)[number]>("All");
  const [hover, setHover] = useState<Brick | null>(null);
  // The instrument being added (or, with editing, changed): its share and what's typed in the box.
  const [pending, setPending] = useState<{ b: Brick; pct: number; typed: string; editing: boolean } | null>(null);
  const pickRef = useRef<HTMLDivElement>(null);
  const [horizon, setHorizon] = useState<(typeof HORIZONS)[number]>(10);
  const [gate, setGate] = useState<"closed" | "open" | "sending" | "done">("closed");
  const [err, setErr] = useState("");

  const allocated = placed.reduce((s, b) => s + b.pct, 0);
  const remaining = 100 - allocated;
  const full = remaining <= 0;
  const avgRisk = placed.length ? placed.reduce((s, b) => s + RISK[b.risk].score, 0) / placed.length : null;
  const riskLabel = avgRisk === null ? "—" : avgRisk < 0.8 ? "Very low" : avgRisk < 1.5 ? "Low" : avgRisk < 2.2 ? "Medium" : avgRisk < 3 ? "High" : "Very high";
  // Weighted average return of the mix (each instrument counts by its share), as on the original tool.
  const avgRet = allocated ? placed.reduce((s, b) => s + b.ret * (b.pct / allocated), 0) : 0;
  const projection = useMemo(() => HORIZONS.map((y) => ({ y, v: fv(avgRet, y) })), [avgRet]);
  const chosen = fv(avgRet, horizon);
  const gain = chosen - TOTAL;

  // Most this instrument can take: what's unplaced, plus its own share when it's being changed.
  const maxFor = (p: { b: Brick; editing: boolean }) => remaining + (p.editing ? placed.find((x) => x.id === p.b.id)?.pct ?? 0 : 0);
  const clamp = (n: number, max: number) => Math.max(1, Math.min(Math.round(n) || 1, max));

  function pick(b: Brick) {
    setHover(b);
    const inHouse = placed.find((x) => x.id === b.id);
    if (inHouse) {
      setPending({ b, pct: inHouse.pct, typed: String(inHouse.pct), editing: true });
      return;
    }
    if (full) return;
    const pct = clamp(b.p, remaining);
    setPending({ b, pct, typed: String(pct), editing: false });
  }
  function setPct(value: string) {
    if (!pending) return;
    const digits = value.replace(/[^\d]/g, "").slice(0, 3);
    const n = Number(digits);
    setPending({ ...pending, typed: digits, pct: digits ? clamp(n, maxFor(pending)) : pending.pct });
  }
  function confirm() {
    if (!pending) return;
    const pct = clamp(pending.typed ? Number(pending.typed) : pending.pct, maxFor(pending));
    setPlaced((s) => (pending.editing ? s.map((x) => (x.id === pending.b.id ? { ...x, pct } : x)) : [...s, { ...pending.b, pct }]));
    setPending(null);
  }
  function remove(id: string) {
    setPlaced((s) => s.filter((x) => x.id !== id));
    setPending((p) => (p?.b.id === id ? null : p));
  }

  // Changing a brick from the house opens the panel in the picker column; bring it into view on phones.
  useEffect(() => {
    if (pending?.editing) pickRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [pending?.editing, pending?.b.id]);

  const analysis = () => {
    const share = (f: (b: Placed) => boolean) => Math.round((placed.filter(f).reduce((s, b) => s + b.pct, 0) / (allocated || 1)) * 100);
    const byRisk = (Object.keys(RISK) as Risk[]).map((r) => ({ r, n: share((b) => b.risk === r) })).filter((x) => x.n);
    const byCat = (["Equities", "Bonds", "Thematic", "Defensive"] as Cat[]).map((c) => ({ c, n: share((b) => b.cat === c) })).filter((x) => x.n);
    const thematic = share((b) => b.cat === "Thematic");
    const highish = share((b) => b.risk === "high" || b.risk === "very-high");
    const notes: string[] = [];
    if (remaining > 0) notes.push(`${remaining}% of your €10,000 (${eur((remaining / 100) * TOTAL)}) isn't placed yet. The projection assumes it follows the same mix; place it to see the real picture.`);
    if (highish >= 50) notes.push("Half or more of your house is high or very-high risk. Expect big swings in both directions; make sure the emergency fund underneath is solid.");
    if (thematic >= 40) notes.push("You're leaning heavily on themes. Themes can run hot for years and then go cold; a core of broad ETFs usually carries the weight.");
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
              Pick instruments and choose how much of your €10,000 goes into each.
            </p>
          )}
          {[...placed].reverse().map((b) => (
            <button
              key={b.id}
              type="button"
              className="ih-brick"
              style={{ background: RISK[b.risk].bg, color: RISK[b.risk].fg, minHeight: `${Math.round(40 + b.pct * 1.6)}px` }}
              onClick={() => pick(b)}
              aria-label={`Change or remove ${b.name} (${b.pct}%)`}
              title="Click to change the amount or remove it"
            >
              <strong>
                {b.name} · {b.pct}%
              </strong>
              <small>
                {eur((b.pct / 100) * TOTAL)} · ~{b.ret}%/yr
              </small>
            </button>
          ))}
        </div>
        <div className="ih-foundation">EMERGENCY FUND · 3 TO 6 MONTHS</div>

        <div className="ih-stats">
          <div>
            <span>Instruments</span>
            <strong>{placed.length}</strong>
          </div>
          <div>
            <span>Allocated</span>
            <strong style={{ color: allocated === 100 ? "#2E7D32" : undefined }}>{allocated}%</strong>
          </div>
          <div>
            <span>Remaining</span>
            <strong style={{ color: remaining === 0 ? "#2E7D32" : undefined }}>{Math.max(0, remaining)}%</strong>
          </div>
          <div>
            <span>Risk</span>
            <strong>{riskLabel}</strong>
          </div>
        </div>

        <div className="ih-proj">
          <span className="eyebrow" style={{ color: "#FFD112" }}>What €10,000 could become</span>
          {placed.length ? (
            <>
              <div className="ih-years" role="tablist" aria-label="Time horizon">
                {projection.map((p) => (
                  <button key={p.y} type="button" role="tab" aria-selected={horizon === p.y} className="ih-year" onClick={() => setHorizon(p.y)}>
                    <span>{p.y} years</span>
                    <strong>{eur(p.v)}</strong>
                  </button>
                ))}
              </div>
              <p style={{ margin: "12px 0 0", fontSize: "15px", color: "#ffffff" }}>
                <strong style={{ color: gain >= 0 ? "#9BE39F" : "#FF8A80" }}>
                  {gain >= 0 ? "+" : ""}
                  {eur(gain)} gain ({Math.round((chosen / TOTAL - 1) * 100)}%)
                </strong>{" "}
                in {horizon} years, based on a ~{avgRet.toFixed(1)}% weighted average annual return.
              </p>
              {remaining > 0 && <p style={{ margin: "6px 0 0", fontSize: "13px", color: "#C9C3B1" }}>{remaining}% still to place. Until then, the whole €10,000 is shown following your current mix.</p>}
            </>
          ) : (
            <p style={{ margin: "10px 0 0", fontSize: "15px", color: "#C9C3B1" }}>Add your first instrument to see the 10, 20 and 30-year picture.</p>
          )}
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
              setPlaced([]);
              setPending(null);
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
              <strong>By risk:</strong> {a.byRisk.map((x) => `${RISK[x.r].label} ${x.n}%`).join(" · ")}
            </span>
            <span style={{ fontSize: "15px", color: "#111111" }}>
              <strong>By type:</strong> {a.byCat.map((x) => `${x.c} ${x.n}%`).join(" · ")}
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
        {pending && (
          <div ref={pickRef} className="ih-pick" role="group" aria-label={`How much goes into ${pending.b.name}`}>
            <div className="ih-pick-prev" style={{ background: RISK[pending.b.risk].bg, color: RISK[pending.b.risk].fg }}>
              {pending.b.name} · ~{pending.b.ret.toFixed(1)}%/yr
            </div>
            <div className="ih-pick-row">
              <label htmlFor="ih-pct-num">How much of your €10,000?</label>
              <span className="ih-pct-box">
                <input
                  id="ih-pct-num"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  aria-describedby="ih-pct-hint"
                  value={pending.typed}
                  onChange={(e) => setPct(e.target.value)}
                  onBlur={() => setPending({ ...pending, typed: String(pending.pct) })}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      confirm();
                    }
                  }}
                />
                <span aria-hidden="true">%</span>
              </span>
            </div>
            <input
              id="ih-pct"
              type="range"
              aria-label={`Share for ${pending.b.name}`}
              min={1}
              max={Math.max(1, maxFor(pending))}
              step={1}
              value={pending.pct}
              onChange={(e) => setPending({ ...pending, pct: Number(e.target.value), typed: e.target.value })}
            />
            <small id="ih-pct-hint" style={{ color: "#6B6248" }}>
              {pending.pct}% = <strong style={{ color: "#111111" }}>{eur((pending.pct / 100) * TOTAL)}</strong> · type any amount from 1% to {maxFor(pending)}%
              {pending.typed && Number(pending.typed) > maxFor(pending) ? ` (only ${maxFor(pending)}% is left, so it's capped there)` : ""}
            </small>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button type="button" className="btn btn-dark" onClick={confirm} style={{ minHeight: "44px" }}>
                {pending.editing ? "Save" : "Add to my house"}
              </button>
              {pending.editing && (
                <button type="button" className="btn btn-ghost" onClick={() => remove(pending.b.id)} style={{ minHeight: "44px" }}>
                  Remove from house
                </button>
              )}
              <button type="button" className="btn btn-ghost" onClick={() => setPending(null)} style={{ minHeight: "44px" }}>
                Cancel
              </button>
            </div>
          </div>
        )}
        <ul className="ih-list">
          {BRICKS.filter((b) => filter === "All" || b.cat === filter).map((b) => {
            const inHouse = placed.find((x) => x.id === b.id);
            return (
              <li key={b.id}>
                <button type="button" className="brick" disabled={full && !inHouse} aria-pressed={pending?.b.id === b.id} onClick={() => pick(b)} onMouseEnter={() => setHover(b)} onFocus={() => setHover(b)}>
                  <span className="swatch" style={{ background: RISK[b.risk].bg, border: b.risk === "very-low" ? "1px solid #E0D5B7" : undefined }} />
                  <span className="ih-name">
                    <strong>{b.name}</strong>
                    <small>
                      ~{b.ret}%/yr · {RISK[b.risk].label} risk{b.tk ? ` · ${b.tk}` : ""}
                    </small>
                  </span>
                  <span className="ih-add" aria-hidden="true">
                    {inHouse ? `${inHouse.pct}%` : "+"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="ih-info" aria-live="polite">
          {full
            ? "Your house is complete: all €10,000 is placed. Click any brick to change its amount or remove it."
            : hover
              ? `${hover.name}: ${hover.info}`
              : "Hover or tap an instrument to learn more, then choose how much of your €10,000 goes into it."}
        </p>
        <p className="compliance" style={{ margin: "12px 0 0", fontSize: "12px" }}>
          Approximate 10-year USD averages. Past performance does not guarantee future results. Educational only, not financial advice.
        </p>
      </div>
    </div>
  );
}
