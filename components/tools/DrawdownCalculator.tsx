"use client";

// "How long will my money last?": a savings pot, a monthly withdrawal that can rise with inflation,
// and a yearly return on what's left. Monthly steps: grow, then withdraw. Also solves the monthly
// amount that would last a chosen number of years.

import { useMemo, useState } from "react";
import ToolSignup from "./ToolSignup";
import { Field, LineChart, Tiles, eur, GREEN } from "./ui";

const LIMIT = 100 * 12;

function simulate(pot: number, monthly: number, rate: number, rise: number) {
  const i = Math.pow(1 + rate / 100, 1 / 12) - 1;
  let bal = pot, w = monthly, m = 0, taken = 0;
  const years = [pot];
  while (bal > 0 && m < LIMIT) {
    bal *= 1 + i;
    const take = Math.min(bal, w);
    bal -= take;
    taken += take;
    m++;
    if (m % 12 === 0) {
      years.push(Math.max(0, bal));
      w *= 1 + rise / 100;
    }
  }
  if (m % 12 !== 0) years.push(Math.max(0, bal));
  return { months: bal > 0 ? Infinity : m, years, taken };
}

/** Largest starting monthly withdrawal that lasts `target` years (bisection). */
function sustainable(pot: number, rate: number, rise: number, target: number) {
  let lo = 0, hi = pot;
  for (let k = 0; k < 50; k++) {
    const mid = (lo + hi) / 2;
    const r = simulate(pot, mid, rate, rise);
    if (r.months >= target * 12) lo = mid; else hi = mid;
  }
  return lo;
}

export default function DrawdownCalculator() {
  const [pot, setPot] = useState(200000);
  const [monthly, setMonthly] = useState(1200);
  const [rate, setRate] = useState(4);
  const [rise, setRise] = useState(2);
  const [goal, setGoal] = useState(25);

  const r = useMemo(() => simulate(pot, monthly, rate, rise), [pot, monthly, rate, rise]);
  const safe = useMemo(() => sustainable(pot, rate, rise, goal), [pot, rate, rise, goal]);
  const forever = !isFinite(r.months);
  const y = Math.floor(r.months / 12), mo = r.months % 12;

  return (
    <div className="calc">
      <div className="calc-inputs">
        <Field id="dd-pot" label="Savings or pension pot" value={pot} onChange={setPot} min={5000} max={2000000} step={5000} prefix="€" />
        <Field id="dd-monthly" label="I'd like to take each month" value={monthly} onChange={setMonthly} min={0} max={10000} step={50} prefix="€" />
        <Field id="dd-rate" label="Yearly return on what's left" value={rate} onChange={setRate} min={0} max={10} step={0.5} suffix="%"
          hint="A cautious mix of investments might aim for 3–5% a year; cash in the bank usually earns less." />
        <Field id="dd-rise" label="Raise what I take every year by" value={rise} onChange={setRise} min={0} max={6} step={0.5} suffix="%"
          hint="To keep up with inflation, so your money buys the same each year." />
        <Field id="dd-goal" label="I'd like it to last" value={goal} onChange={setGoal} min={5} max={50} step={1} suffix="years" />
      </div>

      <div className="calc-results" aria-live="polite">
        <span className="calc-eyebrow">Your money lasts</span>
        <span className="calc-big">{forever ? "100+ years" : `${y} year${y === 1 ? "" : "s"}${mo ? `, ${mo} month${mo === 1 ? "" : "s"}` : ""}`}</span>
        <Tiles items={[
          { label: "Taken out in total", value: eur(r.taken) },
          { label: `To last ${goal} years, take up to`, value: `${eur(safe)}/month`, color: GREEN },
          { label: "Your target", value: forever || r.months >= goal * 12 ? "On track" : "Runs out early", color: forever || r.months >= goal * 12 ? GREEN : "#B0122A" },
        ]} />
        <LineChart label="What's left in the pot each year" series={[{ name: "Money left", color: GREEN, values: r.years.slice(0, 61) }]} />
        <div className="calc-callout">
          {forever
            ? "At this rate the returns cover what you take, so the pot keeps going. Real returns jump around, so review it every year."
            : r.months >= goal * 12
              ? `You're on track: the money lasts longer than the ${goal} years you want.`
              : `To make it last ${goal} years, start at about ${eur(safe)} a month, or look at a higher return, a later start or a smaller rise each year.`}
        </div>
        <p className="calc-note">An illustration only. It assumes the same return every year and leaves out tax and fees. A bad few years early on can shorten how long money lasts.</p>
      </div>

      <div className="calc-signup">
        <ToolSignup source="drawdown-calculator" title="Get practical money tips in your inbox"
          text="One true money story every fortnight from my column and coaching, plus the practical tips I share with clients. Free, and you can unsubscribe any time." button="Sign me up" />
      </div>
    </div>
  );
}
