"use client";

import { useState } from "react";

// Set NEXT_PUBLIC_NEWSLETTER_ACTION in Vercel to your email provider's form URL
// (for example a Mailchimp or Brevo embedded-form action). Until it is set,
// the form does not send anywhere.
const ACTION = process.env.NEXT_PUBLIC_NEWSLETTER_ACTION;

export default function NewsletterForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="newsletter"
      action={ACTION || undefined}
      method="post"
      target={ACTION ? "_blank" : undefined}
      onSubmit={(e) => {
        if (!ACTION) {
          e.preventDefault();
          return;
        }
        setSent(true);
      }}
    >
      <p className="mono mono--gold">Money Talks newsletter</p>
      <h3>Monthly tips to manage, grow and protect your money.</h3>
      <label htmlFor="nl-email">Email address</label>
      <input id="nl-email" name="EMAIL" type="email" placeholder="you@example.com" autoComplete="email" required />
      <button type="submit" className="btn btn--dark">
        Join today
      </button>
      {sent && (
        <p className="newsletter__msg" role="status">
          Thanks! Check your inbox to confirm your subscription.
        </p>
      )}
    </form>
  );
}
