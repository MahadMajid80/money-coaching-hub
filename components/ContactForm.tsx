"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

const topics = [
  "A free 10-minute call",
  "One Time Session",
  "Individual Coaching",
  "Couples Coaching",
  "Investing Made Simple course",
  "Another online course",
  "Workshops for my company",
  "My money story (Times of Malta column)",
  "Something else",
];

export default function ContactForm() {
  const params = useSearchParams();
  const preset = params.get("subject") || "";
  const initialTopic = topics.find((t) => preset && t.toLowerCase().includes(preset.toLowerCase().slice(0, 12))) || (preset ? "Something else" : topics[0]);

  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/contact/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      form.reset();
      setState("ok");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("err");
    }
  }

  if (state === "ok") {
    return (
      <div className="form__status form__status--ok" role="status">
        <strong>Thank you, your message is on its way.</strong> Luca usually replies within one working day.
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <div className="form__row">
        <div className="field">
          <label htmlFor="c-name">Your name</label>
          <input id="c-name" name="name" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="c-email">Email</label>
          <input id="c-email" name="email" type="email" autoComplete="email" required />
        </div>
      </div>
      <div className="form__row">
        <div className="field">
          <label htmlFor="c-phone">Phone (optional)</label>
          <input id="c-phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div className="field">
          <label htmlFor="c-topic">I&apos;m interested in</label>
          <select id="c-topic" name="topic" defaultValue={initialTopic}>
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="c-msg">Message</label>
        <textarea id="c-msg" name="message" required placeholder="Tell me a little about where you are with money and what you'd like to change." />
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="c-web">Website</label>
        <input id="c-web" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {state === "err" && (
        <p className="form__status form__status--err" role="alert">
          {error}
        </p>
      )}
      <div>
        <button type="submit" className="btn btn--dark" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
