"use client";

// Google reCAPTCHA v2 "I'm not a robot" checkbox, shared by the site's forms.
// Google's script loads only when a form comes near the screen, so pages without forms stay fast.
// The server checks the answer with RECAPTCHA_SECRET_KEY (see lib/security/recaptcha.ts).

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeHBiMuAAAAADiSf4zEPc3VI408oUkbugi6o-lS";

type Grecaptcha = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => number;
  getResponse: (id?: number) => string;
  reset: (id?: number) => void;
};
declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
    __mchRecaptchaReady?: () => void;
  }
}

let loader: Promise<Grecaptcha> | null = null;
function loadRecaptcha(): Promise<Grecaptcha> {
  if (loader) return loader;
  loader = new Promise((resolve, reject) => {
    if (window.grecaptcha?.render) return resolve(window.grecaptcha);
    window.__mchRecaptchaReady = () => resolve(window.grecaptcha!);
    const s = document.createElement("script");
    s.src = "https://www.google.com/recaptcha/api.js?onload=__mchRecaptchaReady&render=explicit";
    s.async = true;
    s.defer = true;
    s.onerror = () => {
      loader = null;
      reject(new Error("reCAPTCHA could not load"));
    };
    document.head.appendChild(s);
  });
  return loader;
}

export type RecaptchaHandle = {
  /** The visitor's answer, or "" if they haven't ticked the box. "unavailable" if Google couldn't load (e.g. a blocker). */
  token: () => string;
  reset: () => void;
};

export const Recaptcha = forwardRef<RecaptchaHandle, { theme?: "light" | "dark" }>(function Recaptcha({ theme = "light" }, ref) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<number | null>(null);
  const [failed, setFailed] = useState(false);

  useImperativeHandle(ref, () => ({
    token: () => {
      if (failed) return "unavailable";
      if (widget.current === null || !window.grecaptcha) return "";
      return window.grecaptcha.getResponse(widget.current) || "";
    },
    reset: () => {
      if (widget.current !== null) window.grecaptcha?.reset(widget.current);
    },
  }));

  useEffect(() => {
    const el = box.current;
    if (!el || !RECAPTCHA_SITE_KEY) return;
    let cancelled = false;
    const start = () => {
      loadRecaptcha()
        .then((g) => {
          if (cancelled || widget.current !== null || !box.current) return;
          // The standard box is 304px wide; use the compact one on very narrow screens.
          const size = box.current.clientWidth < 304 ? "compact" : "normal";
          widget.current = g.render(box.current, { sitekey: RECAPTCHA_SITE_KEY, theme, size });
        })
        .catch(() => !cancelled && setFailed(true));
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          start();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, [theme]);

  return <div ref={box} className="recaptcha-box" style={{ minHeight: "78px" }} />;
});

/** Checks the box before sending; returns the answer, or throws a message for the visitor. */
export function captchaToken(ref: React.RefObject<RecaptchaHandle | null>): string {
  const t = ref.current?.token() ?? "";
  if (t === "unavailable")
    throw new Error("The “I'm not a robot” check couldn't load (an ad blocker may be blocking it). Please allow it, or email info@moneycoachinghub.com.");
  if (!t) throw new Error("Please tick “I'm not a robot” first.");
  return t;
}
