"use client";

// Wedding budget calculator: guests × food and drinks per guest, plus the other big items,
// then how much to save each month until the wedding. Starting figures are estimates to change.

import { useState } from "react";
import ToolSignup from "./ToolSignup";
import { Field, LineItem, Tiles, eur, GOLD, GREEN } from "./ui";

const ITEMS = [
  { id: "church", label: "Ceremony, church or civil fees", v: 600 },
  { id: "attire", label: "Dress, suits and accessories", v: 3500 },
  { id: "photo", label: "Photography and video", v: 3000 },
  { id: "flowers", label: "Flowers and decoration", v: 2000 },
  { id: "music", label: "Music, band or DJ", v: 1500 },
  { id: "rings", label: "Wedding rings", v: 1500 },
  { id: "beauty", label: "Hair and make-up", v: 600 },
  { id: "cars", label: "Cars and transport", v: 500 },
  { id: "stationery", label: "Invitations and favours", v: 800 },
  { id: "honeymoon", label: "Honeymoon", v: 4000 },
  { id: "other", label: "Other and buffer", v: 1500, note: "Things always cost more than planned" },
];

export default function WeddingCalculator() {
  const [guests, setGuests] = useState(250);
  const [perGuest, setPerGuest] = useState(120);
  const [items, setItems] = useState<Record<string, number>>(Object.fromEntries(ITEMS.map((i) => [i.id, i.v])));
  const [months, setMonths] = useState(18);
  const [saved, setSaved] = useState(5000);
  const [gifts, setGifts] = useState(0);

  const reception = guests * perGuest;
  const rest = Object.values(items).reduce((a, b) => a + (b || 0), 0);
  const total = reception + rest;
  const toSave = Math.max(0, total - saved - gifts);
  const perMonth = months > 0 ? toSave / months : toSave;
  const recPct = total > 0 ? Math.round((reception / total) * 100) : 0;

  return (
    <div className="calc">
      <div className="calc-inputs">
        <Field id="wd-guests" label="Number of guests" value={guests} onChange={setGuests} min={10} max={600} step={10} />
        <Field id="wd-pp" label="Food and drinks per guest" value={perGuest} onChange={setPerGuest} min={20} max={300} step={5} prefix="€"
          hint="Maltese wedding planners quote around €100–€120 per guest for the reception. Ask your venue for its own figure." />
        <span className="calc-label">Everything else</span>
        <span className="calc-hint" style={{ marginTop: "-14px" }}>Starting estimates. Change them to your own quotes, or set any you don&apos;t need to €0.</span>
        <div className="calc-lines">
          {ITEMS.map((i) => (
            <LineItem key={i.id} id={`wd-${i.id}`} label={i.label} note={i.note} value={items[i.id]} onChange={(v) => setItems((s) => ({ ...s, [i.id]: v }))} />
          ))}
        </div>
        <Field id="wd-months" label="Months until the wedding" value={months} onChange={setMonths} min={1} max={48} step={1} suffix="months" />
        <Field id="wd-saved" label="Already saved" value={saved} onChange={setSaved} min={0} max={150000} step={500} prefix="€" />
        <Field id="wd-gifts" label="Help from family, if any" value={gifts} onChange={setGifts} min={0} max={100000} step={500} prefix="€"
          hint="Only count money that's been promised. Don't count on wedding gifts to pay suppliers." />
      </div>

      <div className="calc-results" aria-live="polite">
        <span className="calc-eyebrow">Your wedding, all in</span>
        <span className="calc-big">{eur(total)}</span>
        <Tiles items={[
          { label: "Reception", value: eur(reception), color: "#B06A00" },
          { label: "Everything else", value: eur(rest), color: GREEN },
          { label: "Per guest, all in", value: eur(guests > 0 ? total / guests : 0) },
        ]} />
        <div className="calc-stack" aria-label={`Reception ${recPct}%, everything else ${100 - recPct}%`}>
          <div style={{ width: `${recPct}%`, background: GOLD }} />
          <div style={{ width: `${100 - recPct}%`, background: GREEN }} />
        </div>
        <span className="calc-hint">The reception is {recPct}% of the budget, so the guest list is the biggest lever.</span>
        <div className="calc-callout">
          To have it all saved in time, put aside <strong>{eur(perMonth)} a month</strong> for the next {months} month{months === 1 ? "" : "s"}.
          {perMonth > 0 && guests > 50 && <> Inviting 50 fewer guests would bring that down to <strong>{eur(Math.max(0, total - 50 * perGuest - saved - gifts) / Math.max(1, months))}</strong>.</>}
        </div>
        <p className="calc-note">A planning guide with estimated costs. Real quotes vary a lot by venue, season and day of the week.</p>
      </div>

      <div className="calc-signup">
        <ToolSignup source="wedding-calculator" title="Planning a wedding together?"
          text="One true money story every fortnight from my column and coaching, including the money conversations couples rarely have. Free, and you can unsubscribe any time." button="Sign me up" />
      </div>
    </div>
  );
}
