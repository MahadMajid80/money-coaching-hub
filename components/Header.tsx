"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { links, nav } from "@/lib/content";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth > 1080 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="header">
      <div className="header__inner">
        <a href="#top" className="header__logo" aria-label="Money Coaching Hub, back to top">
          <Image src="/images/logo.webp" alt="Money Coaching Hub" width={559} height={459} priority />
        </a>

        <nav className="header__nav" aria-label="Main">
          {nav.map((item, i) => (
            <a key={item.href} href={item.href} className={i === 0 ? "is-primary" : undefined}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <a href={links.bookCall} className="btn btn--dark header__cta">
            Book a 10-minute call
          </a>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      <nav id="mobile-nav" className={`mobile-nav${open ? " is-open" : ""}`} aria-label="Mobile">
        {nav.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a href={links.bookCall} className="btn btn--dark">
          Book a 10-minute call
        </a>
      </nav>
    </header>
  );
}
