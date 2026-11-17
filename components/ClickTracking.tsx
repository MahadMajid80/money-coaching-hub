"use client";

// Google Analytics events for important clicks, anywhere on the site:
//  - whatsapp_click: any WhatsApp link (wa.me / whatsapp.com), incl. the floating button
//  - begin_checkout: any Stripe payment link ("Book my place" buttons)
// These can be marked as key events in GA4 and imported into Google Ads as secondary conversions.

import { useEffect } from "react";

export function ClickTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || !window.gtag) return;
      const href = a.href;
      const label = (a.textContent || a.getAttribute("aria-label") || "").trim().slice(0, 80);
      if (/(^|\/\/)(wa\.me|api\.whatsapp\.com|(www\.)?whatsapp\.com)\//i.test(href)) {
        window.gtag("event", "whatsapp_click", { link_url: href, link_text: label, page_path: location.pathname, transport_type: "beacon" });
      } else if (/\/\/buy\.stripe\.com\//i.test(href)) {
        window.gtag("event", "begin_checkout", { currency: "EUR", link_url: href, link_text: label, page_path: location.pathname, transport_type: "beacon" });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
