"use client";

// Sign-up box shown under a tool's results. Posts to /api/subscribe (same list as the
// Investment House and UNSPOKEN), tagged with the tool's source so Luca sees where it came from.

import { useRef, useState } from "react";
import { Recaptcha, captchaToken, type RecaptchaHandle } from "../Recaptcha";

export default function ToolSignup({ source, title, text, button = "Send it to me" }: { source: string; title: string; text: string; button?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [err, setErr] = useState("");
  const cap = useRef<RecaptchaHandle>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    let recaptcha: string;
    try {
      recaptcha = captchaToken(cap);
    } catch (x) {
      setErr((x as Error).message);
      return;
    }
    setState("sending");
    setErr("");
    try {
      const res = await fetch("/api/subscribe/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formAge: Math.round(performance.now()), recaptcha, name: f.get("name"), email: f.get("email"), website: f.get("website"), source }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Something went wrong.");
      setState("done");
    } catch (x) {
      cap.current?.reset();
      setErr((x as Error).message);
      setState("idle");
    }
  }

  if (state === "done")
    return (
      <div className="tool-signup" aria-live="polite">
        <span className="tool-signup__title">You&apos;re in. Thank you!</span>
        <span className="tool-signup__text">Check your inbox for a welcome email from Luca. If it isn&apos;t there in a few minutes, look in your spam or promotions folder.</span>
      </div>
    );

  return (
    <form className="tool-signup" onSubmit={submit}>
      <span className="tool-signup__title">{title}</span>
      <span className="tool-signup__text">{text}</span>
      <div className="tool-signup__row">
        <div className="tool-signup__field">
          <label htmlFor={`${source}-name`} className="field-label">First name</label>
          <input id={`${source}-name`} name="name" className="field-input" autoComplete="given-name" required />
        </div>
        <div className="tool-signup__field">
          <label htmlFor={`${source}-email`} className="field-label">Email address</label>
          <input id={`${source}-email`} name="email" type="email" className="field-input" autoComplete="email" required />
        </div>
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor={`${source}-web`}>Website</label>
        <input id={`${source}-web`} name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <Recaptcha ref={cap} />
      {err && <p className="form-msg form-msg--err" role="alert">{err}</p>}
      <button type="submit" className="btn btn-gold" disabled={state === "sending"} style={{ alignSelf: "flex-start" }}>
        {state === "sending" ? "One moment…" : button}
      </button>
    </form>
  );
}
