"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { bookCall, mainNav } from "@/lib/site";

const Chevron = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();

  // Close menus whenever the page changes.
  useEffect(() => {
    setOpen(false);
    setOpenGroup(null);
  }, [pathname]);

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

  const isActive = (href: string) => href !== "/" && pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <header className="header">
      <div className="header__inner">
        <Link href="/" className="header__logo" aria-label="Money Coaching Hub home">
          <Image src="/images/logo.webp" alt="Money Coaching Hub" width={559} height={459} priority />
        </Link>

        <nav className="header__nav" aria-label="Main">
          {mainNav.map((item) =>
            item.children ? (
              <div key={item.label} className="dd">
                <Link href={item.href} className={`dd__trigger${isActive(item.href) ? " is-active" : ""}`} aria-haspopup="true">
                  {item.label} <Chevron />
                </Link>
                <div className="dd__panel">
                  <ul>
                    {item.children.map((c) => (
                      <li key={c.href + c.label}>
                        <Link href={c.href}>
                          <span>{c.label}</span>
                          {c.note && <small>{c.note}</small>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link key={item.label} href={item.href} className={isActive(item.href) ? "is-active" : undefined}>
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="header__actions">
          <Link href={bookCall} className="btn btn--dark header__cta">
            Book a 10-minute call
          </Link>
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
        {mainNav.map((item) =>
          item.children ? (
            <div key={item.label} className="mobile-group">
              <button
                type="button"
                className="mobile-group__btn"
                aria-expanded={openGroup === item.label}
                onClick={() => setOpenGroup((g) => (g === item.label ? null : item.label))}
              >
                {item.label} <Chevron />
              </button>
              {openGroup === item.label && (
                <ul>
                  {item.children.map((c) => (
                    <li key={c.href + c.label}>
                      <Link href={c.href}>{c.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <Link key={item.label} href={item.href} className="mobile-link">
              {item.label}
            </Link>
          )
        )}
        <Link href={bookCall} className="btn btn--dark">
          Book a 10-minute call
        </Link>
      </nav>
    </header>
  );
}
