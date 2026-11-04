"use client";
import { useState } from "react";

/** One-click import of the site's current content into an empty dashboard. */
export function SeedButton() {
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  async function run() {
    setState("busy");
    try {
      const res = await fetch("/api/seed-content", { method: "POST", credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong");
      setState("done");
      setMsg(`Loaded ${data.added.length} items. Reloading…`);
      setTimeout(() => window.location.reload(), 1200);
    } catch (e) {
      setState("error");
      setMsg((e as Error).message);
    }
  }
  return (
    <div style={{ padding: "18px 20px", borderRadius: 12, border: "1px solid #FAAC15", background: "rgba(250,172,21,.12)", display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", justifyContent: "space-between" }}>
      <div>
        <strong>The dashboard is empty.</strong>
        <div style={{ opacity: 0.8, fontSize: 14 }}>Load the site’s current courses, reviews, columns, client names, quiz words and pages so you can start editing.</div>
        {msg && <div style={{ marginTop: 6, fontSize: 14, color: state === "error" ? "#c0392b" : undefined }}>{msg}</div>}
      </div>
      <button type="button" onClick={run} disabled={state === "busy" || state === "done"} className="btn btn--style-primary btn--size-medium" style={{ margin: 0 }}>
        {state === "busy" ? "Loading… (about a minute)" : "Load starting content"}
      </button>
    </div>
  );
}
