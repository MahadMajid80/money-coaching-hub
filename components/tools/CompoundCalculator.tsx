"use client";

// Compound interest calculator. Monthly compounding at the average yearly return ÷ 12, with each
// month's contribution added at the start of the month (the same method as the blog articles).
// Optional: raise the monthly amount every year, and show the result in today's money.
// Chart colours were checked with the dataviz palette validator (green #1F7A52, gold #E8930C).

import { useMemo, useState } from "react";
import ToolSignup from "./ToolSignup";

const eur = (n: number) => "€" + Math.round(n).toLocaleString("en-IE");
const GREEN = "#1F7A52";
const GOLD = "#E8930C";

type Row = { year: number; paidIn: number; value: number };

function project(start: number, monthly: number, rate: number, years: number, raise: number): Row[] {
  const i = rate / 100 / 12;
  let bal = start;
  let paid = start;
  let m = monthly;
  const rows: Row[] = [{ year: 0, paidIn: start, value: start }];
  for (let y = 1; y <= years; y++) {
    for (let k = 0; k < 12; k++) {
      bal = (bal + m) * (1 + i);
      paid += m;
    }
    rows.push({ year: y, paidIn: paid, value: bal });
    m = m * (1 + raise / 100);
  }
  return rows;
}

function Field({ id, label, value, onChange, min, max, step, prefix, suffix, hint }: {
  id: string; label: string; value: number; onChange: (v: number) => void; min: number; max: number; step: number; prefix?: string; suffix?: string; hint?: string;
}) {
  const clamp = (v: number) => Math.min(max, Math.max(min, isFinite(v) ? v : min));
  return (
    <div className="calc-field">
      <label htmlFor={id} className="calc-label">{label}</label>
      <div className="calc-input">
        {prefix && <span>{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : ""}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(e.target.value === "" ? 0 : clamp(parseFloat(e.target.value)))}
        />
        {suffix && <span>{suffix}</span>}
      </div>
      <input type="range" aria-label={label} min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} />
      {hint && <span className="calc-hint">{hint}</span>}
    </div>
  );
}

function Chart({ rows, deflate }: { rows: Row[]; deflate: (v: number, y: number) => number }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 640, H = 300, L = 8, R = 8, T = 16, B = 28;
  const n = rows.length - 1 || 1;
  const max = Math.max(...rows.map((r) => deflate(r.value, r.year)), 1);
  const x = (y: number) => L + ((W - L - R) * y) / n;
  const yv = (v: number) => T + (H - T - B) * (1 - v / max);
  const line = (f: (r: Row) => number) => rows.map((r, k) => `${k ? "L" : "M"}${x(r.year).toFixed(1)},${yv(f(r)).toFixed(1)}`).join(" ");
  const paid = (r: Row) => Math.min(deflate(r.paidIn, r.year), deflate(r.value, r.year));
  const total = (r: Row) => deflate(r.value, r.year);
  const area = (f: (r: Row) => number, g?: (r: Row) => number) =>
    `${line(f)} ${g ? rows.slice().reverse().map((r) => `L${x(r.year).toFixed(1)},${yv(g(r)).toFixed(1)}`).join(" ") : `L${x(rows[rows.length - 1].year)},${yv(0)} L${x(0)},${yv(0)}`} Z`;
  const ticks = [0, Math.round(n / 4), Math.round(n / 2), Math.round((3 * n) / 4), n].filter((v, k, a) => a.indexOf(v) === k);
  const h = hover != null ? rows[hover] : null;

  return (
    <div className="calc-chart">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Chart of what you put in and how much it grows, year by year"
        onPointerMove={(e) => {
          const box = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
          const px = ((e.clientX - box.left) / box.width) * W;
          setHover(Math.max(0, Math.min(n, Math.round(((px - L) / (W - L - R)) * n))));
        }}
        onPointerLeave={() => setHover(null)}
      >
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line key={f} x1={L} x2={W - R} y1={yv(max * f)} y2={yv(max * f)} stroke="#EFE6CF" strokeWidth="1" />
        ))}
        <path d={area(total, paid)} fill={GOLD} opacity="0.9" />
        <path d={area(paid)} fill={GREEN} opacity="0.95" />
        <path d={line(total)} fill="none" stroke="#111" strokeWidth="2" />
        <line x1={L} x2={W - R} y1={yv(0)} y2={yv(0)} stroke="#111" strokeWidth="1.5" />
        {ticks.map((t) => (
          <text key={t} x={x(t)} y={H - 8} fontSize="12" fill="#6B6248" textAnchor={t === 0 ? "start" : t === n ? "end" : "middle"}>
            {t === 0 ? "Today" : `Year ${t}`}
          </text>
        ))}
        {h && (
          <>
            <line x1={x(h.year)} x2={x(h.year)} y1={T} y2={yv(0)} stroke="#111" strokeDasharray="3 3" />
            <circle cx={x(h.year)} cy={yv(total(h))} r="5" fill="#111" stroke="#fff" strokeWidth="2" />
          </>
        )}
      </svg>
      <div className="calc-legend">
        <span><i style={{ background: GREEN }} />What you put in</span>
        <span><i style={{ background: GOLD }} />Growth</span>
        {h ? (
          <span className="calc-tip">
            <strong>{h.year === 0 ? "Today" : `Year ${h.year}`}:</strong> {eur(total(h))} ({eur(paid(h))} put in)
          </span>
        ) : (
          <span className="calc-tip calc-tip--muted">Hover or tap the chart to see any year</span>
        )}
      </div>
    </div>
  );
}

export default function CompoundCalculator() {
  const [start, setStart] = useState(1000);
  const [monthly, setMonthly] = useState(100);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(20);
  const [raise, setRaise] = useState(0);
  const [real, setReal] = useState(false);
  const [inflation, setInflation] = useState(2.5);
  const [table, setTable] = useState(false);

  const rows = useMemo(() => project(start, monthly, rate, Math.max(1, Math.round(years)), raise), [start, monthly, rate, years, raise]);
  const deflate = (v: number, y: number) => (real ? v / Math.pow(1 + inflation / 100, y) : v);
  const last = rows[rows.length - 1];
  const value = deflate(last.value, last.year);
  const paidIn = deflate(last.paidIn, last.year);
  const growth = Math.max(0, value - paidIn);
  const share = value > 0 ? Math.round((growth / value) * 100) : 0;

  return (
    <div className="calc">
      <div className="calc-inputs">
        <Field id="cc-start" label="Starting amount" value={start} onChange={setStart} min={0} max={200000} step={500} prefix="€" />
        <Field id="cc-monthly" label="Monthly amount" value={monthly} onChange={setMonthly} min={0} max={5000} step={10} prefix="€" />
        <Field id="cc-rate" label="Average yearly return" value={rate} onChange={setRate} min={0} max={15} step={0.5} suffix="%" hint="Broad stock market funds have averaged around 7–10% a year over long periods, with big ups and downs along the way." />
        <Field id="cc-years" label="Years" value={years} onChange={setYears} min={1} max={50} step={1} suffix="years" />
        <details className="calc-more">
          <summary>More options</summary>
          <Field id="cc-raise" label="Increase my monthly amount every year by" value={raise} onChange={setRaise} min={0} max={10} step={0.5} suffix="%" hint="For example, 3% to keep pace with pay rises." />
          <label className="calc-check">
            <input type="checkbox" checked={real} onChange={(e) => setReal(e.target.checked)} />
            Show the result in today&apos;s money (after inflation)
          </label>
          {real && <Field id="cc-infl" label="Inflation" value={inflation} onChange={setInflation} min={0} max={8} step={0.5} suffix="%" />}
        </details>
      </div>

      <div className="calc-results" aria-live="polite">
        <span className="calc-eyebrow">After {last.year} years{real ? ", in today's money" : ""}</span>
        <span className="calc-big">{eur(value)}</span>
        <div className="calc-split">
          <div><span>You put in</span><strong style={{ color: GREEN }}>{eur(paidIn)}</strong></div>
          <div><span>Growth</span><strong style={{ color: "#B06A00" }}>{eur(growth)}</strong></div>
          <div><span>Share that is growth</span><strong>{share}%</strong></div>
        </div>
        <Chart rows={rows} deflate={deflate} />
        <button type="button" className="calc-link" onClick={() => setTable((t) => !t)} aria-expanded={table}>
          {table ? "Hide" : "Show"} year by year
        </button>
        {table && (
          <div className="calc-table-wrap">
            <table className="calc-table">
              <thead><tr><th>Year</th><th>Put in so far</th><th>Value</th><th>Growth</th></tr></thead>
              <tbody>
                {rows.slice(1).map((r) => {
                  const v = deflate(r.value, r.year), p = deflate(r.paidIn, r.year);
                  return <tr key={r.year}><td>{r.year}</td><td>{eur(p)}</td><td>{eur(v)}</td><td>{eur(Math.max(0, v - p))}</td></tr>;
                })}
              </tbody>
            </table>
          </div>
        )}
        <p className="calc-note">An illustration only. It assumes the same return every year, which markets never deliver, and leaves out fees and tax. Real returns can be lower, and you can lose money.</p>
      </div>

      <div className="calc-signup">
        <ToolSignup
          source="compound-calculator"
          title="Get practical money tips in your inbox"
          text="One true money story every fortnight from my column and coaching, plus the practical tips I share with clients. Free, and you can unsubscribe any time."
          button="Sign me up"
        />
      </div>
    </div>
  );
}
