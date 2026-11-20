"use client";

// Emergency fund calculator: essential monthly costs × months of cover, minus what's saved,
// and how long it takes to get there at a monthly saving.

import { useState } from "react";
import ToolSignup from "./ToolSignup";
import { Choice, Field, LineItem, Tiles, eur, GREEN } from "./ui";

const LINES = [
  { id: "home", label: "Home loan or rent", v: 900 },
  { id: "food", label: "Groceries", v: 400 },
  { id: "bills", label: "Utilities and phone", v: 150 },
  { id: "insurance", label: "Insurance", v: 80 },
  { id: "transport", label: "Transport and fuel", v: 150 },
  { id: "kids", label: "Childcare and school", v: 0 },
  { id: "loans", label: "Other loan repayments", v: 0 },
  { id: "other", label: "Other essentials", v: 100, note: "Medicines, pet food, anything you can't skip" },
];

const SITUATIONS = [
  { value: 3, label: "3 months", why: "Two steady incomes, no dependants" },
  { value: 6, label: "6 months", why: "One income, or children at home" },
  { value: 9, label: "9 months", why: "Main earner with dependants" },
  { value: 12, label: "12 months", why: "Self-employed, or a job that feels at risk" },
];

export default function EmergencyFundCalculator() {
  const [costs, setCosts] = useState<Record<string, number>>(Object.fromEntries(LINES.map((l) => [l.id, l.v])));
  const [months, setMonths] = useState(6);
  const [saved, setSaved] = useState(2000);
  const [monthly, setMonthly] = useState(200);

  const essentials = Object.values(costs).reduce((a, b) => a + (b || 0), 0);
  const target = essentials * months;
  const gap = Math.max(0, target - saved);
  const toGo = monthly > 0 ? Math.ceil(gap / monthly) : Infinity;
  const pct = target > 0 ? Math.min(100, Math.round((saved / target) * 100)) : 0;
  const when = (m: number) => {
    if (!isFinite(m)) return "Add a monthly amount";
    if (m === 0) return "You're there";
    const d = new Date();
    d.setMonth(d.getMonth() + m);
    return `${m} month${m === 1 ? "" : "s"} (${d.toLocaleDateString("en-GB", { month: "long", year: "numeric" })})`;
  };

  return (
    <div className="calc">
      <div className="calc-inputs">
        <span className="calc-label">Your essential monthly costs</span>
        <span className="calc-hint" style={{ marginTop: "-14px" }}>Only what you couldn&apos;t avoid paying if your income stopped. Leave out eating out, holidays and subscriptions.</span>
        <div className="calc-lines">
          {LINES.map((l) => (
            <LineItem key={l.id} id={`ef-${l.id}`} label={l.label} note={l.note} value={costs[l.id]} onChange={(v) => setCosts((c) => ({ ...c, [l.id]: v }))} />
          ))}
        </div>
        <Choice label="Months of cover" value={months} onChange={setMonths} options={SITUATIONS.map((s) => ({ value: s.value, label: s.label }))} />
        <span className="calc-hint" style={{ marginTop: "-14px" }}>{SITUATIONS.find((s) => s.value === months)?.why}</span>
        <Field id="ef-saved" label="Already saved for emergencies" value={saved} onChange={setSaved} min={0} max={100000} step={250} prefix="€" />
        <Field id="ef-monthly" label="I can put aside each month" value={monthly} onChange={setMonthly} min={0} max={3000} step={25} prefix="€" />
      </div>

      <div className="calc-results" aria-live="polite">
        <span className="calc-eyebrow">Your emergency fund target</span>
        <span className="calc-big">{eur(target)}</span>
        <Tiles items={[
          { label: "Essentials a month", value: eur(essentials) },
          { label: "Still to save", value: eur(gap), color: "#B06A00" },
          { label: "Time to get there", value: when(toGo) },
        ]} />
        <div className="calc-progress" aria-label={`${pct}% of your target saved`}>
          <div style={{ width: `${pct}%`, background: GREEN }} />
        </div>
        <span className="calc-hint">{pct}% of your target saved so far</span>
        <div className="calc-callout">
          Keep this money somewhere safe and easy to reach, like a separate savings account. Not invested: you may need it on the same day the markets fall.
        </div>
        <p className="calc-note">A guide only. The right amount depends on your job, your family and how quickly you could cut costs.</p>
      </div>

      <div className="calc-signup">
        <ToolSignup source="emergency-fund-calculator" title="Get practical money tips in your inbox"
          text="One true money story every fortnight from my column and coaching, plus the practical tips I share with clients. Free, and you can unsubscribe any time." button="Sign me up" />
      </div>
    </div>
  );
}
