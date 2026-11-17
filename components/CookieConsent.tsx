"use client";

// Cookie banner + Google Consent Mode v2.
// The "default: denied" signal is sent by an inline script in the layout <head> (lib/consent.ts),
// before Google Analytics loads. This banner records the visitor's choice and passes it on to Google
// (gtag consent update) and to the Meta Pixel (fbq consent). The choice is kept in localStorage.

import { useEffect, useState } from "react";

import { CONSENT_KEY as KEY, CONSENT_OPEN_EVENT as OPEN_EVENT } from "@/lib/consent";

type Choice = { v: 1; analytics: boolean; ads: boolean; at: string };

function read(): Choice | null {
  try {
    const c = JSON.parse(localStorage.getItem(KEY) || "null");
    return c && c.v === 1 ? c : null;
  } catch {
    return null;
  }
}

function apply(c: Choice) {
  const ads = c.ads ? "granted" : "denied";
  window.gtag?.("consent", "update", { ad_storage: ads, ad_user_data: ads, ad_personalization: ads, analytics_storage: c.analytics ? "granted" : "denied" });
  window.fbq?.("consent", c.ads ? "grant" : "revoke");
}

export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [ads, setAds] = useState(true);

  useEffect(() => {
    const saved = read();
    if (!saved) setOpen(true);
    const reopen = () => {
      const c = read();
      setAnalytics(c ? c.analytics : true);
      setAds(c ? c.ads : true);
      setDetails(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  function save(a: boolean, d: boolean) {
    const c: Choice = { v: 1, analytics: a, ads: d, at: new Date().toISOString() };
    try {
      localStorage.setItem(KEY, JSON.stringify(c));
    } catch {
      /* private mode: applies to this visit only */
    }
    apply(c);
    setOpen(false);
    setDetails(false);
  }

  if (!open) return null;
  return (
    <div className="cookie-banner" role="dialog" aria-modal="false" aria-labelledby="cookie-title">
      <strong id="cookie-title" style={{ fontFamily: "Raleway,sans-serif", fontSize: "17px" }}>
        Cookies on this site
      </strong>
      <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.5", color: "#3A3A3A" }}>
        I use cookies to see which pages help people and to measure my Google and Meta ads. Nothing is shared until you say yes.{" "}
        <a href="/cookie-policy/" style={{ color: "#111111" }}>
          Cookie policy
        </a>
      </p>
      {details && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label className="cookie-row">
            <input type="checkbox" checked disabled />
            <span>
              <strong>Essential</strong> · keeps the site and its forms working. Always on.
            </span>
          </label>
          <label className="cookie-row">
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
            <span>
              <strong>Analytics</strong> · Google Analytics: which pages are read.
            </span>
          </label>
          <label className="cookie-row">
            <input type="checkbox" checked={ads} onChange={(e) => setAds(e.target.checked)} />
            <span>
              <strong>Advertising</strong> · Google Ads and Meta: whether ads lead to sign-ups.
            </span>
          </label>
        </div>
      )}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {details ? (
          <button type="button" className="btn btn-dark" onClick={() => save(analytics, ads)}>
            Save my choice
          </button>
        ) : (
          <button type="button" className="btn btn-dark" onClick={() => save(true, true)}>
            Accept all
          </button>
        )}
        <button type="button" className="btn btn-ghost" onClick={() => save(false, false)}>
          Reject all
        </button>
        {!details && (
          <button type="button" className="cookie-link" onClick={() => setDetails(true)}>
            Choose
          </button>
        )}
      </div>
    </div>
  );
}

/** Footer link that reopens the banner. */
export function CookieSettingsLink({ style }: { style?: React.CSSProperties }) {
  return (
    <button type="button" className="cookie-link" style={style} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Cookie settings
    </button>
  );
}
