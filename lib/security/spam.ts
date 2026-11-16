// Spam checks for the site's forms. Kept deliberately conservative: a real client writing about
// money should never be caught. Blocked messages are not emailed (enquiries are still saved in the
// dashboard, marked as spam, so nothing real is ever lost).

/** Email domains and addresses that only ever send spam. Extra ones can be added in Vercel as BLOCKED_SENDERS (comma-separated). */
const BLOCKED = ["jmailservice.com"];

function blockedSenders() {
  return [...BLOCKED, ...(process.env.BLOCKED_SENDERS || "").split(",")].map((s) => s.trim().toLowerCase().replace(/^@/, "")).filter(Boolean);
}

/** Sales pitches for SEO, web design, leads and similar, which arrive through contact forms every day. */
const PITCHES: RegExp[] = [
  /\blocal search(es|ers)?\b/i,
  /\b(first|top|1st) page (of|on|in) google\b/i,
  /\brank(ing)? (higher |better |#?1 )?(on|in) google\b/i,
  /\bgoogle (maps|business profile) (ranking|listing|optimi[sz]ation)\b/i,
  /\bback ?links?\b/i,
  /\blink[- ]building\b/i,
  /\bguest post(s|ing)?\b/i,
  /\bseo (services?|agency|expert|specialist|package|audit|report)\b/i,
  /\b(website|web) (re)?design (services?|agency|package)\b/i,
  /\b(get|put) your (business|website|company) in front of\b/i,
  /\bin front of (hundreds|thousands|millions) of\b/i,
  /\b(more|qualified|targeted) (leads|traffic|customers) (for|to) your (business|website)\b/i,
  /\bincrease (your )?(website )?traffic\b/i,
  /\bboost your (online )?(presence|sales|rankings?)\b/i,
  /\bwould you be interested\?? ?https?:\/\//i,
  /\b(unsubscribe|opt[- ]out)\b.*\breply\b/i,
  /\bvirtual assistant services?\b/i,
  /\b(app|software) development (company|services|agency)\b/i,
];

export type SpamVerdict = { spam: false } | { spam: true; reason: string };

/**
 * formAge: milliseconds the visitor had the page open before submitting (sent by the site's own forms).
 * Bots either post straight to the server (no formAge) or submit within a second of the page loading.
 */
export function checkSpam(input: { email: string; text?: string; formAge?: unknown }): SpamVerdict {
  const email = input.email.toLowerCase();
  const domain = email.split("@")[1] || "";
  for (const b of blockedSenders()) {
    if (b.includes("@") ? email === b : domain === b || domain.endsWith(`.${b}`)) return { spam: true, reason: `blocked sender (${b})` };
  }

  const age = Number(input.formAge);
  if (!Number.isFinite(age) || age <= 0) return { spam: true, reason: "not sent from the website's form" };
  if (age < 2500) return { spam: true, reason: "sent too fast for a person" };

  const text = input.text || "";
  const pitch = PITCHES.find((re) => re.test(text));
  if (pitch) return { spam: true, reason: "sales pitch" };

  return { spam: false };
}
