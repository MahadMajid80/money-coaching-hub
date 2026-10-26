"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { moneyTypes } from "@/lib/moneyTypes";
import { WORDS, score, type TypeSlug } from "@/lib/quiz";

const info = (slug: TypeSlug) => moneyTypes.find((t) => t.slug === slug)!;

export default function MoneyQuiz() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [done, setDone] = useState(false);
  const [sent, setSent] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const resultsRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => score(selected), [selected]);
  const dominant = results.filter((r) => r.hits > 0).slice(0, 2);

  const toggle = (w: string) =>
    setSelected((s) => {
      const n = new Set(s);
      if (n.has(w)) n.delete(w);
      else n.add(w);
      return n;
    });

  const showResults = () => {
    setDone(true);
    requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  async function emailResults(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSent("sending");
    const summary = results.map((r) => `${info(r.type).name}: ${r.pct}%`).join("\n");
    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          topic: "Money Type Quiz results",
          message: `Money Type Quiz results\n\nDominant: ${dominant.map((d) => info(d.type).name).join(", ") || "—"}\n\n${summary}\n\nWords chosen: ${[...selected].join(", ")}\n\n${fd.get("note") || ""}`,
          website: fd.get("website"),
        }),
      });
      setSent(res.ok ? "ok" : "err");
    } catch {
      setSent("err");
    }
  }

  return (
    <div className="quiz">
      <div className="quiz__bar">
        <p>
          <strong>{selected.size}</strong> word{selected.size === 1 ? "" : "s"} selected
        </p>
        <div className="btn-row" style={{ marginTop: 0 }}>
          {selected.size > 0 && (
            <button
              type="button"
              className="btn btn--line"
              onClick={() => {
                setSelected(new Set());
                setDone(false);
              }}
            >
              Clear
            </button>
          )}
          <button type="button" className="btn btn--dark" onClick={showResults} disabled={selected.size < 3}>
            See results
          </button>
        </div>
      </div>

      <ul className="quiz__words" aria-label="Words that describe your tendencies with money">
        {WORDS.map((w) => (
          <li key={w}>
            <button type="button" aria-pressed={selected.has(w)} onClick={() => toggle(w)}>
              {w}
            </button>
          </li>
        ))}
      </ul>
      {selected.size < 3 && <p className="quiz__hint">Pick at least 3 words to see your results.</p>}

      {done && selected.size >= 3 && (
        <div className="quiz__results" ref={resultsRef} aria-live="polite">
          <p className="mono mono--gold">Your results</p>
          <h2 className="h2">
            {dominant.length === 2 ? (
              <>
                You&apos;re mostly {info(dominant[0].type).name.replace("The ", "the ")} and {info(dominant[1].type).name.replace("The ", "the ")}
              </>
            ) : (
              <>You&apos;re mostly {info(dominant[0].type).name.replace("The ", "the ")}</>
            )}
          </h2>
          <p className="lead">
            Everyone is a mix of three or four money types, with one or two dominant. Here is how strongly each one shows up in the words you chose.
          </p>

          <ol className="quiz__bars">
            {results.map((r) => (
              <li key={r.type}>
                <span className="quiz__label">{info(r.type).name}</span>
                <span className="quiz__track">
                  <span className={`quiz__fill${r.type === dominant[0]?.type ? " is-top" : ""}`} style={{ width: `${Math.max(r.pct, 2)}%` }} />
                </span>
                <span className="quiz__pct">{r.pct}%</span>
              </li>
            ))}
          </ol>

          <div className="cols cols--2 quiz__types">
            {dominant.map((d) => {
              const t = info(d.type);
              return (
                <div key={t.slug} className="cell">
                  <p className="mono">{d.pct}% match</p>
                  <h3>{t.name}</h3>
                  <p>{t.body[0]}</p>
                  <Link href={`/the-8-money-archetypes/#${t.slug}`} className="link" style={{ display: "inline-block", marginTop: 14 }}>
                    Read more about {t.name.replace("The ", "the ")} →
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="card card--soft quiz__email">
            <h3>Want to talk through your results?</h3>
            <p>Send your results to Luca and he&apos;ll get back to you about what they mean and how to move towards the Warrior and the Magician. Your results are completely confidential.</p>
            {sent === "ok" ? (
              <p className="form__status form__status--ok" role="status">
                Sent! Luca will be in touch soon.
              </p>
            ) : (
              <form className="form" onSubmit={emailResults} style={{ marginTop: 16 }}>
                <div className="form__row">
                  <div className="field">
                    <label htmlFor="q-name">First name</label>
                    <input id="q-name" name="name" autoComplete="given-name" required />
                  </div>
                  <div className="field">
                    <label htmlFor="q-email">Email</label>
                    <input id="q-email" name="email" type="email" autoComplete="email" required />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="q-note">Anything you&apos;d like to add? (optional)</label>
                  <input id="q-note" name="note" />
                </div>
                <div className="hp" aria-hidden="true">
                  <label htmlFor="q-web">Website</label>
                  <input id="q-web" name="website" tabIndex={-1} autoComplete="off" />
                </div>
                {sent === "err" && (
                  <p className="form__status form__status--err" role="alert">
                    Sorry, that didn&apos;t send. Please try again or email info@moneycoachinghub.com.
                  </p>
                )}
                <div>
                  <button type="submit" className="btn btn--dark" disabled={sent === "sending"}>
                    {sent === "sending" ? "Sending…" : "Send my results to Luca"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
