"use client";

import { useMemo, useState } from "react";

type Risk = "very-low" | "low" | "medium" | "high" | "very-high";
type Brick = { id: string; name: string; ret: number; risk: Risk; cat: "Equities" | "Bonds" | "Thematic" | "Defensive"; info: string };

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

const RISK: Record<Risk, { label: string; color: string; text: string; score: number }> = {
  "very-low": { label: "Very low", color: "#bfe6c3", text: "#14532d", score: 1 },
  low: { label: "Low", color: "#6cc57a", text: "#0b3d17", score: 2 },
  medium: { label: "Medium", color: "#f8c43a", text: "#3a2a00", score: 3 },
  high: { label: "High", color: "#ef7d3c", text: "#3d1300", score: 4 },
  "very-high": { label: "Very high", color: "#b42318", text: "#ffffff", score: 5 },
};

const START = 10000;
const BRICK_VALUE = 1000; // each brick is €1,000, so 10 bricks = 100%
const MAX = START / BRICK_VALUE;
const cats = ["All", "Equities", "Bonds", "Thematic", "Defensive"] as const;
const eur = (n: number) => "€" + Math.round(n).toLocaleString("en-IE");

export default function InvestmentHouse() {
  const [stack, setStack] = useState<string[]>([]);
  const [filter, setFilter] = useState<(typeof cats)[number]>("All");
  const [hover, setHover] = useState<Brick | null>(null);

  const placed = stack.map((id) => BRICKS.find((b) => b.id === id)!);
  const allocated = placed.length * 10;
  const full = placed.length >= MAX;

  const projection = useMemo(() => {
    const years = [10, 20, 30];
    return years.map((y) => ({ y, v: placed.reduce((sum, b) => sum + BRICK_VALUE * Math.pow(1 + b.ret / 100, y), 0) + (MAX - placed.length) * BRICK_VALUE }));
  }, [placed]);

  const avgRisk = placed.length ? placed.reduce((s, b) => s + RISK[b.risk].score, 0) / placed.length : 0;
  const riskLabel = !placed.length ? "—" : avgRisk < 1.8 ? "Very low" : avgRisk < 2.6 ? "Low" : avgRisk < 3.4 ? "Medium" : avgRisk < 4.2 ? "High" : "Very high";
  const avgReturn = placed.length ? placed.reduce((s, b) => s + b.ret, 0) / placed.length : 0;

  const add = (id: string) => !full && setStack((s) => [...s, id]);
  const removeAt = (i: number) => setStack((s) => s.filter((_, j) => j !== i));

  // Build rows of the house: 2 bricks per row, bottom-up.
  const rows: { b: Brick; i: number }[][] = [];
  placed.forEach((b, i) => {
    if (i % 2 === 0) rows.push([]);
    rows[rows.length - 1].push({ b, i });
  });

  return (
    <div className="ih">
      <div className="ih__house" aria-label="Your portfolio house">
        <div className="ih__roof" aria-hidden="true" />
        <div className="ih__walls">
          {placed.length === 0 && <p className="ih__empty">Your emergency fund is your base. Pick bricks to build.</p>}
          {[...rows].reverse().map((row, ri) => (
            <div className="ih__row" key={ri}>
              {row.map(({ b, i }) => (
                <button
                  type="button"
                  key={i}
                  className="ih__brick"
                  style={{ background: RISK[b.risk].color, color: RISK[b.risk].text }}
                  onClick={() => removeAt(i)}
                  aria-label={`Remove ${b.name}`}
                  title="Click to remove"
                >
                  <span>{b.name}</span>
                  <small>€1,000 · ~{b.ret}%/yr</small>
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="ih__foundation">
          <strong>Emergency fund</strong>
          <span>Foundation: 3–6 months of expenses, always in place first</span>
        </div>

        <dl className="ih__stats">
          <div>
            <dt>Bricks</dt>
            <dd>
              {placed.length}/{MAX}
            </dd>
          </div>
          <div>
            <dt>Allocated</dt>
            <dd>{allocated}%</dd>
          </div>
          <div>
            <dt>Avg. return</dt>
            <dd>{placed.length ? `~${avgReturn.toFixed(1)}%` : "—"}</dd>
          </div>
          <div>
            <dt>Risk</dt>
            <dd>{riskLabel}</dd>
          </div>
        </dl>

        <div className="ih__projection">
          <p className="mono">What €10,000 could become</p>
          <div className="ih__years">
            {projection.map((p) => (
              <div key={p.y}>
                <span>{p.y} years</span>
                <strong>{eur(p.v)}</strong>
              </div>
            ))}
          </div>
          {placed.length < MAX && placed.length > 0 && <p className="ih__hint">Unallocated money is shown as cash at 0% growth.</p>}
        </div>

        <div className="btn-row" style={{ marginTop: 20 }}>
          <button type="button" className="btn btn--line" onClick={() => setStack([])} disabled={!placed.length}>
            Start over
          </button>
          <a href="/contact-us/?subject=Investment%20House" className="btn btn--dark">
            Build the real one with Luca
          </a>
        </div>
      </div>

      <div className="ih__picker">
        <p className="mono">Choose a brick</p>
        <div className="ih__filters" role="tablist" aria-label="Filter instruments">
          {cats.map((c) => (
            <button key={c} type="button" role="tab" aria-selected={filter === c} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>
        <ul className="ih__list">
          {BRICKS.filter((b) => filter === "All" || b.cat === filter).map((b) => (
            <li key={b.id}>
              <button type="button" onClick={() => add(b.id)} disabled={full} onMouseEnter={() => setHover(b)} onFocus={() => setHover(b)}>
                <span className="ih__swatch" style={{ background: RISK[b.risk].color }} aria-hidden="true" />
                <span className="ih__name">
                  {b.name}
                  <small>
                    ~{b.ret}%/yr · {RISK[b.risk].label} risk
                  </small>
                </span>
                <span className="ih__add" aria-hidden="true">
                  +
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="ih__info" aria-live="polite">
          {full ? "Your house is complete: all €10,000 is allocated. Click a brick in the house to swap it out." : hover ? `${hover.name}: ${hover.info}` : "Hover or focus a brick to learn more."}
        </p>
        <p className="ih__legal">Returns shown are approximate 10-year USD averages. Past performance does not guarantee future results. Educational only, not financial advice.</p>
      </div>
    </div>
  );
}

export { RISK };
