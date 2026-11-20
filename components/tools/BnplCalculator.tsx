"use client";

// Buy now, pay later true-cost checker: price vs total repayable, the extra in euros and %,
// and the equivalent yearly interest rate (solved from the monthly payments).

import { useState } from "react";
import ToolSignup from "./ToolSignup";
import { Field, Tiles, eur, eur2, GOLD, GREEN } from "./ui";

/** Monthly rate r where price = pmt × (1 − (1+r)^−n) / r. */
function monthlyRate(price: number, pmt: number, n: number) {
  if (pmt * n <= price + 0.005) return 0;
  let lo = 0, hi = 1;
  for (let k = 0; k < 80; k++) {
    const r = (lo + hi) / 2;
    const pv = (pmt * (1 - Math.pow(1 + r, -n))) / r;
    if (pv > price) lo = r; else hi = r;
  }
  return (lo + hi) / 2;
}

export default function BnplCalculator() {
  const [price, setPrice] = useState(2000);
  const [n, setN] = useState(24);
  const [pmt, setPmt] = useState(106.88);
  const [deposit, setDeposit] = useState(0);

  const financed = Math.max(0, price - deposit);
  const total = deposit + pmt * n;
  const extra = Math.max(0, total - price);
  const pctExtra = price > 0 ? (extra / price) * 100 : 0;
  const r = financed > 0 && n > 0 ? monthlyRate(financed, pmt, n) : 0;
  const apr = (Math.pow(1 + r, 12) - 1) * 100;
  const free = extra < 0.01;

  return (
    <div className="calc">
      <div className="calc-inputs">
        <Field id="bn-price" label="Price if you paid today" value={price} onChange={setPrice} min={10} max={20000} step={10} prefix="€" />
        <Field id="bn-dep" label="Paid upfront (if any)" value={deposit} onChange={setDeposit} min={0} max={20000} step={10} prefix="€" slider={false} />
        <Field id="bn-n" label="Number of monthly payments" value={n} onChange={setN} min={1} max={60} step={1} />
        <Field id="bn-pmt" label="Each monthly payment" value={pmt} onChange={setPmt} min={0} max={5000} step={0.01} prefix="€" slider={false}
          hint="Copy it from the checkout or the plan's terms, including any monthly fee." />
      </div>

      <div className="calc-results" aria-live="polite">
        <span className="calc-eyebrow">{free ? "This plan costs nothing extra" : "This plan costs you extra"}</span>
        <span className="calc-big">{free ? "€0" : eur2(extra)}</span>
        <Tiles items={[
          { label: "Total you pay", value: eur2(total) },
          { label: "Extra on the price", value: `${pctExtra.toFixed(1)}%`, color: free ? GREEN : "#B06A00" },
          { label: "Like a yearly interest rate of", value: free ? "0%" : `${apr.toFixed(1)}%`, color: free ? GREEN : "#B0122A" },
        ]} />
        <div className="calc-stack" aria-label="Price versus extra cost">
          <div style={{ width: `${(price / Math.max(total, price)) * 100}%`, background: GREEN }} />
          <div style={{ width: `${(extra / Math.max(total, price)) * 100}%`, background: GOLD }} />
        </div>
        <div className="calc-callout">
          {free
            ? "Interest-free, as long as every payment is on time. Late fees can change that quickly, so set up automatic payments."
            : `You'd pay ${eur(extra)} more than the price, the same as borrowing at about ${apr.toFixed(0)}% a year. If you can pay in full without touching your emergency fund, that's usually cheaper.`}
        </div>
        <p className="calc-note">An estimate from the numbers you enter. It doesn&apos;t include late fees or missed-payment charges.</p>
      </div>

      <div className="calc-signup">
        <ToolSignup source="bnpl-calculator" title="Get practical money tips in your inbox"
          text="One true money story every fortnight from my column and coaching, plus the practical tips I share with clients. Free, and you can unsubscribe any time." button="Sign me up" />
      </div>
    </div>
  );
}
