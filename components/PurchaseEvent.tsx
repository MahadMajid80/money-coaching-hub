"use client";

// Sends the Google Analytics "purchase" event on the course thank-you page.
// Only when Stripe sent the buyer here (?session_id=…), and only once per payment, so a refresh,
// a bookmark or someone finding the link never counts as a sale. The Stripe session id is the
// transaction id, so Google also drops any duplicate.

import { useEffect } from "react";

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    fbq?: (...args: unknown[]) => void;
  }
}

export function PurchaseEvent({ value, currency = "EUR", itemId, itemName }: { value: number; currency?: string; itemId: string; itemName: string }) {
  useEffect(() => {
    const sid = new URLSearchParams(window.location.search).get("session_id");
    if (!sid || !/^cs_[A-Za-z0-9_]+$/.test(sid)) return;
    const key = `mch-purchase-${sid}`;
    try {
      if (localStorage.getItem(key)) return;
      localStorage.setItem(key, "1");
    } catch {
      /* private mode: still send; Google de-duplicates on transaction_id */
    }
    // Works whether or not the Google tag has finished loading: it reads this queue when it does.
    window.dataLayer = window.dataLayer || [];
    const gtag: Gtag =
      window.gtag ||
      function () {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments);
      };
    gtag("event", "purchase", {
      transaction_id: sid,
      value,
      currency,
      items: [{ item_id: itemId, item_name: itemName, price: value, quantity: 1 }],
    });
    window.fbq?.("track", "Purchase", { value, currency });
  }, [value, currency, itemId, itemName]);
  return null;
}
