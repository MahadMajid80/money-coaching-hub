"use client";

// Working versions of the design's forms. Markup and inline styles follow the design pack.

import { useState } from "react";

type State = "idle" | "sending" | "ok" | "err";

async function post(url: string, data: Record<string, unknown>) {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
}

const inputStyle = { height: "48px", border: "1.5px solid #D9CFB3", borderRadius: "12px", padding: "0 14px", fontFamily: "Lato,sans-serif", fontSize: "16px" } as const;
const labelStyle = { fontSize: "14px", color: "#6B6248" } as const;

const Honeypot = ({ id }: { id: string }) => (
  <div className="hp" aria-hidden="true">
    <label htmlFor={id}>Website</label>
    <input id={id} name="website" tabIndex={-1} autoComplete="off" />
  </div>
);

/** Homepage closing card: "UNSPOKEN, the letter". */
export function UnspokenForm() {
  const [state, setState] = useState<State>("idle");
  const [err, setErr] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    try {
      await post("/api/subscribe/", { name: f.get("name"), email: f.get("email"), website: f.get("website"), source: "homepage" });
      setState("ok");
    } catch (x) {
      setErr((x as Error).message);
      setState("err");
    }
  }
  return (
    <form
      onSubmit={submit}
      style={{ flex: "0 1 420px", minWidth: "300px", background: "#ffffff", borderRadius: "24px", padding: "32px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "14px" }}
    >
      <span className="eyebrow">UNSPOKEN, the letter</span>
      <span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "20px", lineHeight: "1.3" }}>One true money story, every fortnight. The kind nobody tells at dinner.</span>
      <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.5", color: "#3A3A3A" }}>
        Real people, real numbers, names changed. What they did, what it cost them, and what you can take from it. No tips lists, no hard sell.
      </p>
      {state === "ok" ? (
        <p className="form-msg form-msg--ok" role="status">
          You&apos;re in. Look out for the next story in your inbox (and check your spam folder for the confirmation).
        </p>
      ) : (
        <>
          <label htmlFor="nl-name" style={labelStyle}>First name</label>
          <input id="nl-name" name="name" type="text" autoComplete="given-name" placeholder="So I can write to you properly" style={inputStyle} />
          <label htmlFor="nl-email" style={labelStyle}>Email address</label>
          <input id="nl-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" style={inputStyle} />
          <Honeypot id="nl-web" />
          {state === "err" && <p className="form-msg form-msg--err" role="alert">{err}</p>}
          <button type="submit" className="btn btn-dark" style={{ border: "0", cursor: "pointer", width: "100%" }} disabled={state === "sending"}>
            {state === "sending" ? "Sending…" : "Send me the next story"}
          </button>
        </>
      )}
      <span style={{ fontSize: "13px", color: "#6B6248" }}>500+ readers. Unsubscribe any time.</span>
    </form>
  );
}

/** Companies page enquiry form → emailed to Luca. */
export function EnquiryForm() {
  const [state, setState] = useState<State>("idle");
  const [err, setErr] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    try {
      await post("/api/contact/", {
        name: f.get("name"),
        email: f.get("email"),
        topic: `Workshop enquiry – ${f.get("company") || "company not given"}`,
        message: `Company: ${f.get("company") || "-"}\n\n${f.get("message") || ""}`,
        website: f.get("website"),
      });
      setState("ok");
    } catch (x) {
      setErr((x as Error).message);
      setState("err");
    }
  }
  return (
    <form
      onSubmit={submit}
      style={{ flex: "0 1 460px", minWidth: "300px", background: "#ffffff", borderRadius: "24px", padding: "32px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "14px" }}
    >
      {state === "ok" ? (
        <p className="form-msg form-msg--ok" role="status">
          <strong>Thank you.</strong> Your enquiry is with Luca, and you&apos;ll have a proposal within two working days.
        </p>
      ) : (
        <>
          <label htmlFor="c-name" style={labelStyle}>Your name</label>
          <input id="c-name" name="name" type="text" autoComplete="name" required style={inputStyle} />
          <label htmlFor="c-company" style={labelStyle}>Company</label>
          <input id="c-company" name="company" type="text" autoComplete="organization" style={inputStyle} />
          <label htmlFor="c-email" style={labelStyle}>Work email</label>
          <input id="c-email" name="email" type="email" autoComplete="email" required style={inputStyle} />
          <label htmlFor="c-size" style={labelStyle}>Team size and what you have in mind</label>
          <textarea id="c-size" name="message" rows={3} required style={{ border: "1.5px solid #D9CFB3", borderRadius: "12px", padding: "12px 14px", fontFamily: "Lato,sans-serif", fontSize: "16px", resize: "vertical" }}></textarea>
          <Honeypot id="c-web" />
          {state === "err" && <p className="form-msg form-msg--err" role="alert">{err}</p>}
          <button type="submit" className="btn btn-dark" style={{ border: "0", cursor: "pointer", width: "100%" }} disabled={state === "sending"}>
            {state === "sending" ? "Sending…" : "Send enquiry"}
          </button>
        </>
      )}
    </form>
  );
}

/** Contact page card: request a 10-minute call (until a booking calendar is connected). */
export function CallRequestForm() {
  const [state, setState] = useState<State>("idle");
  const [err, setErr] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    try {
      await post("/api/contact/", {
        name: f.get("name"),
        email: f.get("email"),
        phone: f.get("phone"),
        topic: `10-minute call – ${f.get("topic")}`,
        message: `Best time: ${f.get("when") || "-"}\n\n${f.get("message") || ""}`,
        website: f.get("website"),
      });
      setState("ok");
    } catch (x) {
      setErr((x as Error).message);
      setState("err");
    }
  }
  if (state === "ok")
    return (
      <p className="form-msg form-msg--ok" role="status">
        <strong>Thanks, that&apos;s with Luca.</strong> He&apos;ll reply within one working day with a time for your call.
      </p>
    );
  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <label htmlFor="b-name" style={labelStyle}>Your name</label>
      <input id="b-name" name="name" autoComplete="name" required style={inputStyle} />
      <label htmlFor="b-email" style={labelStyle}>Email</label>
      <input id="b-email" name="email" type="email" autoComplete="email" required style={inputStyle} />
      <label htmlFor="b-phone" style={labelStyle}>Phone (if you&apos;d rather talk by phone)</label>
      <input id="b-phone" name="phone" type="tel" autoComplete="tel" style={inputStyle} />
      <label htmlFor="b-topic" style={labelStyle}>What it&apos;s about</label>
      <select id="b-topic" name="topic" style={{ ...inputStyle, background: "#fff" }} defaultValue="Coaching">
        <option>Coaching</option>
        <option>Couples coaching</option>
        <option>Investing Made Simple course</option>
        <option>Another course</option>
        <option>A workshop for my company</option>
        <option>My money story (Times of Malta column)</option>
        <option>Not sure yet</option>
      </select>
      <label htmlFor="b-when" style={labelStyle}>Best days and times for you</label>
      <input id="b-when" name="when" placeholder="e.g. weekday evenings after 6pm" style={inputStyle} />
      <label htmlFor="b-msg" style={labelStyle}>Anything you&apos;d like Luca to know (optional)</label>
      <textarea id="b-msg" name="message" rows={3} style={{ border: "1.5px solid #D9CFB3", borderRadius: "12px", padding: "12px 14px", fontFamily: "Lato,sans-serif", fontSize: "16px", resize: "vertical" }}></textarea>
      <Honeypot id="b-web" />
      {state === "err" && <p className="form-msg form-msg--err" role="alert">{err}</p>}
      <button type="submit" className="btn btn-gold" style={{ width: "100%" }} disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Request my call"}
      </button>
    </form>
  );
}

/** Side hustle "Notify me" (email only), matching the design's pill input. */
export function NotifyForm({ id, note }: { id: string; note: string }) {
  const [state, setState] = useState<State>("idle");
  const [err, setErr] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    try {
      await post("/api/subscribe/", { email: f.get("email"), website: f.get("website"), list: "side-hustle", source: "side-hustle" });
      setState("ok");
    } catch (x) {
      setErr((x as Error).message);
      setState("err");
    }
  }
  return (
    <form id={id} onSubmit={submit} style={{ margin: "0", display: "flex", flexDirection: "column", gap: "10px", width: "100%", maxWidth: "540px" }}>
      {state === "ok" ? (
        <p className="form-msg form-msg--ok" role="status" style={{ fontSize: "17px" }}>
          <strong>You&apos;re on the list.</strong> You&apos;ll be the first to know when booking opens.
        </p>
      ) : (
        <>
          <label htmlFor={`${id}-email`} style={{ fontSize: "14px", fontWeight: "700", color: "#111111" }}>Email address</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <input
              id={`${id}-email`}
              className="field"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              style={{ flex: "1 1 240px", minWidth: "0", height: "56px", boxSizing: "border-box", border: "1.5px solid #D9CCA6", borderRadius: "999px", padding: "0 22px", fontFamily: "Lato,'Segoe UI',sans-serif", fontSize: "17px", background: "#FFFFFF", color: "#111111" }}
            />
            <button type="submit" className="btn btn-gold" style={{ minHeight: "56px", padding: "0 32px", fontSize: "17px" }} disabled={state === "sending"}>
              {state === "sending" ? "Sending…" : "Notify me"}
            </button>
          </div>
          <Honeypot id={`${id}-web`} />
          {state === "err" && <p className="form-msg form-msg--err" role="alert">{err}</p>}
          <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.5", color: "#3A3A3A" }}>{note}</p>
        </>
      )}
    </form>
  );
}
