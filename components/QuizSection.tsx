"use client";

// The design's quiz + result sections, working: 78 words, live counter, scored result.
import { useMemo, useState } from "react";
import { DEFAULT_QUIZ, scoreWith, type QuizWord, type TypeSlug } from "@/lib/quiz";

const TYPES: Record<TypeSlug, { name: string; line: string }> = {
  innocent: { name: "Innocent", line: "Avoids looking at money and hopes it all works out." },
  victim: { name: "Victim", line: "Feels money happens to them, not by them." },
  warrior: { name: "Warrior", line: "In the driving seat: decisive and goal-driven." },
  martyr: { name: "Martyr", line: "Takes care of everyone else's needs first." },
  fool: { name: "Fool", line: "Loves the thrill. Hello, impulsive splurge." },
  creator: { name: "Creator", line: "Values meaning and freedom over money." },
  tyrant: { name: "Tyrant", line: "Uses money to keep control and feel safe." },
  magician: { name: "Magician", line: "Balanced, confident and at peace with money. The goal." },
};

const tile = (bg: string, color: string, weight: string, size: string) =>
  ({ aspectRatio: "1", borderRadius: "16px", background: bg, color, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "16px", boxSizing: "border-box", fontFamily: "Raleway,sans-serif", fontWeight: weight, fontSize: size }) as const;

export default function QuizSection({ words: list }: { words?: QuizWord[] }) {
  const quiz = list && list.length ? list : DEFAULT_QUIZ;
  const WORDS = quiz.map((w) => w.word);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [shown, setShown] = useState(false);
  const results = useMemo(() => scoreWith(quiz, picked), [quiz, picked]);
  const ranked = results.filter((r) => r.hits > 0);
  const top = ranked.slice(0, 2);
  const tiles = results.slice(0, 4);

  const toggle = (w: string) =>
    setPicked((s) => {
      const n = new Set(s);
      if (n.has(w)) n.delete(w);
      else n.add(w);
      return n;
    });

  const see = () => {
    if (picked.size < 3) return;
    setShown(true);
    requestAnimationFrame(() => document.getElementById("result")?.scrollIntoView({ behavior: "smooth" }));
  };

  return (
    <>
      {/* QUIZ */}
      <section id="quiz" style={{ background: "#ffffff", padding: "96px 0" }}>
        <div className="wrap" style={{ maxWidth: "960px", display: "flex", flexDirection: "column", gap: "28px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <span className="eyebrow">The quiz</span>
            <h2 className="h2">Tap every word that sounds like you.</h2>
            <p className="body">Don&apos;t overthink it. First instinct. There are no wrong answers and nobody sees this but you.</p>
          </div>
          <div style={{ padding: "28px", borderRadius: "20px", background: "#FDF7E8", display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {WORDS.map((w) => (
                <button key={w} type="button" className="word" aria-pressed={picked.has(w)} onClick={() => toggle(w)}>
                  {w}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", paddingTop: "8px", borderTop: "1px solid #E6E0D0" }}>
              <span style={{ fontSize: "15px", color: "#6B6248" }} aria-live="polite">
                {picked.size} of {WORDS.length} selected{picked.size > 0 && picked.size < 3 ? " · pick at least 3" : ""}
              </span>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {picked.size > 0 && (
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => {
                      setPicked(new Set());
                      setShown(false);
                    }}
                  >
                    Start again
                  </button>
                )}
                <button type="button" className="btn btn-dark" onClick={see} disabled={picked.size < 3}>
                  See my results
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULT */}
      <section id="result" style={{ background: "#111111", color: "#ffffff", padding: "96px 0", scrollMarginTop: "0" }}>
        <div className="wrap" style={{ display: "flex", gap: "48px", flexWrap: "wrap", alignItems: "center" }}>
          {shown && top.length ? (
            <>
              <div style={{ flex: "1 1 460px", minWidth: "0", display: "flex", flexDirection: "column", gap: "18px" }}>
                <span className="eyebrow" style={{ color: "#FFD112" }}>Your result</span>
                <h2 className="h2" style={{ color: "#ffffff" }}>
                  Your money life is being run by the <span style={{ color: "#FFD112" }}>{TYPES[top[0].type].name}</span>
                  {top[1] && (
                    <>
                      {" "}
                      and the <span style={{ color: "#FFD112" }}>{TYPES[top[1].type].name}</span>
                    </>
                  )}
                  .
                </h2>
                {top.map((t) => (
                  <p key={t.type} className="body" style={{ color: "#C9C3B1" }}>
                    <strong style={{ color: "#ffffff" }}>The {TYPES[t.type].name}:</strong> {TYPES[t.type].line}{" "}
                    <a href={`/the-8-money-archetypes/#${t.type}`} style={{ color: "#FFD112", fontWeight: "700" }}>
                      Read more →
                    </a>
                  </p>
                ))}
                <p className="body" style={{ color: "#C9C3B1" }}>
                  The good news: the types aren&apos;t fixed. They&apos;re patterns, and patterns can be changed. The goal is the Magician: calm, clear and in charge.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "4px" }}>
                  {results.map((r) => (
                    <div key={r.type} className="qbar">
                      <span style={{ color: r.type === top[0].type ? "#FFD112" : "#ffffff", fontWeight: "700" }}>{TYPES[r.type].name}</span>
                      <span className="qbar__track">
                        <span className={`qbar__fill${r.type === top[0].type || r.type === top[1]?.type ? " is-top" : ""}`} style={{ width: `${Math.max(r.pct, 2)}%` }} />
                      </span>
                      <span className="qbar__pct">{r.pct}%</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", paddingTop: "8px" }}>
                  <a href="/the-8-money-archetypes/" className="btn btn-gold">Read about all eight types</a>
                  <a href="/contact-us/" className="btn btn-light">Talk it through with Luca</a>
                </div>
              </div>
              <div style={{ flex: "0 1 380px", minWidth: "260px", display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "12px" }}>
                {tiles.map((t, i) =>
                  i === 0 ? (
                    <div key={t.type} style={tile("#FAAC15", "#111111", "800", "18px")}>
                      {TYPES[t.type].name}
                      <span style={{ fontSize: "13px", fontWeight: "700" }}>1st · {t.pct}%</span>
                    </div>
                  ) : i === 1 ? (
                    <div key={t.type} style={tile("#FFD112", "#111111", "800", "18px")}>
                      {TYPES[t.type].name}
                      <span style={{ fontSize: "13px", fontWeight: "700" }}>2nd · {t.pct}%</span>
                    </div>
                  ) : (
                    <div key={t.type} style={tile("#2A2A2A", "#C9C3B1", "700", "16px")}>
                      {TYPES[t.type].name}
                      <span style={{ fontSize: "13px", fontWeight: "700" }}>{t.pct}%</span>
                    </div>
                  )
                )}
              </div>
            </>
          ) : (
            <>
              <div style={{ flex: "1 1 460px", minWidth: "0", display: "flex", flexDirection: "column", gap: "18px" }}>
                <span className="eyebrow" style={{ color: "#FFD112" }}>Example result</span>
                <h2 className="h2" style={{ color: "#ffffff" }}>
                  Your money life is being run by the <span style={{ color: "#FFD112" }}>Martyr</span> and the <span style={{ color: "#FFD112" }}>Innocent</span>.
                </h2>
                <p className="body" style={{ color: "#C9C3B1" }}>
                  You take care of everyone else&apos;s needs first, and you&apos;d rather someone else handled the numbers. Which is why you&apos;re generous, loved, and quietly worried about your own future.
                </p>
                <p className="body" style={{ color: "#C9C3B1" }}>
                  The good news: the types aren&apos;t fixed. They&apos;re patterns, and patterns can be changed. The goal is the Magician: calm, clear and in charge.
                </p>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", paddingTop: "8px" }}>
                  <a href="/the-8-money-archetypes/" className="btn btn-gold">Read about all eight types</a>
                  <a href="/contact-us/" className="btn btn-light">Talk it through with Luca</a>
                </div>
              </div>
              <div style={{ flex: "0 1 380px", minWidth: "260px", display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "12px" }}>
                <div style={tile("#FAAC15", "#111111", "800", "18px")}>
                  Martyr<span style={{ fontSize: "13px", fontWeight: "700" }}>1st</span>
                </div>
                <div style={tile("#FFD112", "#111111", "800", "18px")}>
                  Innocent<span style={{ fontSize: "13px", fontWeight: "700" }}>2nd</span>
                </div>
                <div style={tile("#2A2A2A", "#C9C3B1", "700", "16px")}>Warrior</div>
                <div style={tile("#2A2A2A", "#C9C3B1", "700", "16px")}>Creator</div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
