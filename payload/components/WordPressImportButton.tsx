"use client";
import { useState } from "react";

/** Brings the blog posts over from the old WordPress site, a few at a time, with progress. */
export function WordPressImportButton() {
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function run() {
    setState("busy");
    let offset = 0;
    let added = 0;
    let skipped = 0;
    const failed: string[] = [];
    try {
      for (let guard = 0; guard < 100; guard++) {
        const res = await fetch(`/api/import-wordpress?offset=${offset}&limit=4`, { method: "POST", credentials: "include" });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Something went wrong");
        added += data.added.length;
        skipped += data.skipped;
        failed.push(...data.failed.map((f: { slug: string }) => f.slug));
        setMsg(`${Math.min(offset + 4, data.total)} of ${data.total} posts checked · ${added} imported`);
        if (data.next === null) break;
        offset = data.next;
      }
      setState(failed.length ? "error" : "done");
      setMsg(`Done: ${added} posts imported${skipped ? `, ${skipped} were already here` : ""}.${failed.length ? ` Not imported: ${failed.join(", ")}.` : ""}`);
    } catch (e) {
      setState("error");
      setMsg(`${(e as Error).message}. Press the button again to carry on where it stopped.`);
    }
  }

  return (
    <div style={{ padding: "18px 20px", borderRadius: 12, border: "1px solid var(--theme-elevation-150)", display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", justifyContent: "space-between" }}>
      <div>
        <strong>Bring over the blog from the old website</strong>
        <div style={{ opacity: 0.8, fontSize: 14 }}>Copies every post, with its images, categories and SEO description, keeping the same web addresses. Posts already here are skipped.</div>
        {msg && <div style={{ marginTop: 6, fontSize: 14, color: state === "error" ? "#c0392b" : undefined }}>{msg}</div>}
      </div>
      <button type="button" onClick={run} disabled={state === "busy"} className="btn btn--style-secondary btn--size-medium" style={{ margin: 0 }}>
        {state === "busy" ? "Importing… (a few minutes)" : state === "done" ? "Check again" : "Import blog posts"}
      </button>
    </div>
  );
}
