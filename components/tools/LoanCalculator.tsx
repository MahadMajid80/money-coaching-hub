"use client";

// Home loan calculator: standard monthly repayment (annuity), total interest, and what an extra
// monthly payment saves in years and interest. Interest is charged monthly at the yearly rate ÷ 12.

import { useMemo, useState } from "react";
import ToolSignup from "./ToolSignup";
import { Field, LineChart, Tiles, eur, eur2, GREEN, GOLD } from "./ui";

type Run = { months: number; interest: number; balances: number[] };

function payment(P: number, rate: number, months: number) {
  const i = rate / 100 / 12;
  return i === 0 ? P / months : (P * i) / (1 - Math.pow(1 + i, -months));
}

function run(P: number, rate: number, pmt: number, maxMonths: number): Run {
  const i = rate / 100 / 12;
  let bal = P, interest = 0, m = 0;
  const balances = [P];
  while (bal > 0.005 && m < maxMonths + 1) {
    const int = bal * i;
    interest += int;
    bal = bal + int - pmt;
    m++;
    if (m % 12 === 0 || bal <= 0.005) balances.push(Math.max(0, bal));
  }
  return { months: m, interest, balances };
}

const yrs = (m: number) => {
  const y = Math.floor(m / 12), r = m % 12;
  return `${y} year${y === 1 ? "" : "s"}${r ? ` ${r} month${r === 1 ? "" : "s"}` : ""}`;
};

export default function LoanCalculator() {
  const [amount, setAmount] = useState(250000);
  const [rate, setRate] = useState(3);
  const [years, setYears] = useState(35);
  const [extra, setExtra] = useState(100);
  const [table, setTable] = useState(false);

  const r = useMemo(() => {
    const months = Math.max(1, Math.round(years)) * 12;
    const pmt = payment(amount, rate, months);
    const base = run(amount, rate, pmt, months);
    const fast = run(amount, rate, pmt + extra, months);
    return { pmt, base, fast, months };
  }, [amount, rate, years, extra]);

  const savedInterest = Math.max(0, r.base.interest - r.fast.interest);
  const savedMonths = Math.max(0, r.base.months - r.fast.months);
  const padded = (b: number[]) => [...b, ...Array(Math.max(0, r.base.balances.length - b.length)).fill(0)];

  return (
    <div className="calc">
      <div className="calc-inputs">
        <Field id="hl-amount" label="Loan amount" value={amount} onChange={setAmount} min={10000} max={1000000} step={5000} prefix="€" />
        <Field id="hl-rate" label="Interest rate" value={rate} onChange={setRate} min={0} max={10} step={0.05} suffix="% a year"
          hint="Most Maltese home loans are variable and follow the bank's base rate, so your repayment can change. Check your bank's current rate." />
        <Field id="hl-years" label="Loan term" value={years} onChange={setYears} min={5} max={40} step={1} suffix="years" />
        <Field id="hl-extra" label="Extra I could pay each month" value={extra} onChange={setExtra} min={0} max={2000} step={25} prefix="€"
          hint="Many Maltese banks allow extra payments; some charge a fee for paying off early. Check your loan terms." />
      </div>

      <div className="calc-results" aria-live="polite">
        <span className="calc-eyebrow">Your monthly repayment</span>
        <span className="calc-big">{eur2(r.pmt)}</span>
        <Tiles items={[
          { label: "Total interest", value: eur(r.base.interest), color: "#B06A00" },
          { label: "Total you repay", value: eur(amount + r.base.interest) },
          { label: "Loan term", value: yrs(r.base.months) },
        ]} />
        {extra > 0 && (
          <div className="calc-callout">
            <strong>Paying {eur(extra)} extra a month</strong> clears the loan in {yrs(r.fast.months)}, {savedMonths >= 12 ? `${Math.floor(savedMonths / 12)} year${savedMonths >= 24 ? "s" : ""}` : `${savedMonths} months`} sooner, and saves about <strong>{eur(savedInterest)}</strong> in interest.
          </div>
        )}
        <LineChart label="Loan balance over time, with and without extra payments"
          series={[
            { name: "Standard repayments", color: GOLD, values: r.base.balances },
            ...(extra > 0 ? [{ name: `With ${eur(extra)} extra`, color: GREEN, values: padded(r.fast.balances) }] : []),
          ]} />
        <button type="button" className="calc-link" onClick={() => setTable((t) => !t)} aria-expanded={table}>{table ? "Hide" : "Show"} year by year</button>
        {table && (
          <div className="calc-table-wrap">
            <table className="calc-table">
              <thead><tr><th>Year</th><th>Balance</th>{extra > 0 && <th>With extra</th>}</tr></thead>
              <tbody>
                {r.base.balances.slice(1).map((b, k) => (
                  <tr key={k}><td>{k + 1}</td><td>{eur(b)}</td>{extra > 0 && <td>{eur(padded(r.fast.balances)[k + 1] ?? 0)}</td>}</tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="calc-note">An estimate only. It assumes the rate stays the same for the whole term and leaves out bank fees, insurance and stamp duty. Your bank&apos;s offer is what counts.</p>
      </div>

      <div className="calc-signup">
        <ToolSignup source="loan-calculator" title="Get practical money tips in your inbox"
          text="One true money story every fortnight from my column and coaching, plus the practical tips I share with clients. Free, and you can unsubscribe any time." button="Sign me up" />
      </div>
    </div>
  );
}
