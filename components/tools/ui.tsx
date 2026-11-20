"use client";

// Shared pieces for the money calculators: number fields, result tiles and a simple line chart.
// Styles live in app/(frontend)/tools/tools.css (calc-* classes).

import { useState, type ReactNode } from "react";

export const eur = (n: number) => (n < 0 ? "−" : "") + "€" + Math.round(Math.abs(n)).toLocaleString("en-IE");
export const eur2 = (n: number) => "€" + n.toLocaleString("en-IE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const short = (n: number) => (n >= 1e6 ? `€${(n / 1e6).toFixed(1)}m` : n >= 1e3 ? `€${Math.round(n / 1e3)}k` : `€${Math.round(n)}`);
export const GREEN = "#1F7A52";
export const GOLD = "#E8930C";

export function Field({ id, label, value, onChange, min, max, step, prefix, suffix, hint, slider = true }: {
  id: string; label: string; value: number; onChange: (v: number) => void; min: number; max: number; step: number;
  prefix?: string; suffix?: string; hint?: ReactNode; slider?: boolean;
}) {
  const clamp = (v: number) => Math.min(max, Math.max(min, isFinite(v) ? v : min));
  return (
    <div className="calc-field">
      <label htmlFor={id} className="calc-label">{label}</label>
      <div className="calc-input">
        {prefix && <span>{prefix}</span>}
        <input id={id} type="number" inputMode="decimal" value={Number.isFinite(value) ? value : ""} min={min} max={max} step={step}
          onChange={(e) => onChange(e.target.value === "" ? 0 : clamp(parseFloat(e.target.value)))} />
        {suffix && <span>{suffix}</span>}
      </div>
      {slider && <input type="range" aria-label={label} min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} />}
      {hint && <span className="calc-hint">{hint}</span>}
    </div>
  );
}

/** A compact euro input for lists (budget lines, monthly costs). */
export function LineItem({ id, label, value, onChange, note }: { id: string; label: string; value: number; onChange: (v: number) => void; note?: string }) {
  return (
    <div className="calc-line">
      <label htmlFor={id}>
        {label}
        {note && <small>{note}</small>}
      </label>
      <div className="calc-input calc-input--sm">
        <span>€</span>
        <input id={id} type="number" inputMode="decimal" min={0} step={10} value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Math.max(0, parseFloat(e.target.value) || 0))} />
      </div>
    </div>
  );
}

export function Tiles({ items }: { items: { label: string; value: string; color?: string }[] }) {
  return (
    <div className="calc-split">
      {items.map((t) => (
        <div key={t.label}>
          <span>{t.label}</span>
          <strong style={t.color ? { color: t.color } : undefined}>{t.value}</strong>
        </div>
      ))}
    </div>
  );
}

export function Choice<T extends string | number>({ label, options, value, onChange }: { label: string; options: { value: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="calc-field">
      <span className="calc-label">{label}</span>
      <div className="calc-choice" role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <button key={String(o.value)} type="button" role="radio" aria-checked={o.value === value} onClick={() => onChange(o.value)}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

type Series = { name: string; color: string; values: number[]; dashed?: boolean };

/** Line chart over years (index 0 = today). Hover or tap shows every series for that year. */
export function LineChart({ series, label, xLabel = (i: number) => (i === 0 ? "Today" : `Year ${i}`) }: { series: Series[]; label: string; xLabel?: (i: number) => string }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 640, H = 280, L = 8, R = 8, T = 16, B = 28;
  const n = Math.max(1, Math.max(...series.map((s) => s.values.length)) - 1);
  const max = Math.max(1, ...series.flatMap((s) => s.values));
  const x = (i: number) => L + ((W - L - R) * i) / n;
  const y = (v: number) => T + (H - T - B) * (1 - Math.max(0, v) / max);
  const path = (v: number[]) => v.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p).toFixed(1)}`).join(" ");
  const ticks = [0, Math.round(n / 4), Math.round(n / 2), Math.round((3 * n) / 4), n].filter((v, k, a) => a.indexOf(v) === k);
  return (
    <div className="calc-chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label}
        onPointerMove={(e) => {
          const box = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
          const px = ((e.clientX - box.left) / box.width) * W;
          setHover(Math.max(0, Math.min(n, Math.round(((px - L) / (W - L - R)) * n))));
        }}
        onPointerLeave={() => setHover(null)}>
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <g key={f}>
            <line x1={L} x2={W - R} y1={y(max * f)} y2={y(max * f)} stroke="#EFE6CF" strokeWidth="1" />
            <text x={L + 2} y={y(max * f) - 5} fontSize="11" fill="#6B6248">{short(max * f)}</text>
          </g>
        ))}
        {series.map((s) => (
          <path key={s.name} d={path(s.values)} fill="none" stroke={s.color} strokeWidth="2.5" strokeDasharray={s.dashed ? "6 5" : undefined} strokeLinejoin="round" />
        ))}
        <line x1={L} x2={W - R} y1={y(0)} y2={y(0)} stroke="#111" strokeWidth="1.5" />
        {ticks.map((t) => (
          <text key={t} x={x(t)} y={H - 8} fontSize="12" fill="#6B6248" textAnchor={t === 0 ? "start" : t === n ? "end" : "middle"}>{xLabel(t)}</text>
        ))}
        {hover != null && (
          <>
            <line x1={x(hover)} x2={x(hover)} y1={T} y2={y(0)} stroke="#111" strokeDasharray="3 3" />
            {series.map((s) => s.values[hover] != null && <circle key={s.name} cx={x(hover)} cy={y(s.values[hover])} r="5" fill={s.color} stroke="#fff" strokeWidth="2" />)}
          </>
        )}
      </svg>
      <div className="calc-legend">
        {series.map((s) => (
          <span key={s.name}><i style={{ background: s.color }} />{s.name}</span>
        ))}
        {hover != null ? (
          <span className="calc-tip">
            <strong>{xLabel(hover)}:</strong> {series.map((s) => (s.values[hover] != null ? `${s.name} ${eur(s.values[hover])}` : "")).filter(Boolean).join(" · ")}
          </span>
        ) : (
          <span className="calc-tip calc-tip--muted">Hover or tap the chart to see any year</span>
        )}
      </div>
    </div>
  );
}
