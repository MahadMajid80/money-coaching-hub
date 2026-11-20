"use client";

// Fast page changes for the whole site, without a full reload.
// The pages and the dashboard use plain <a> links (many come from the dashboard), so instead of
// changing every link this turns clicks on internal links into Next.js navigations, preloads pages
// when a link is hovered or touched, shows a thin progress bar, closes the phone menu after a page
// change and counts the page view for the Meta Pixel (Google Analytics does this by itself).

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/** Same-site page link that Next.js can open itself (not the dashboard, an API, a file or a new tab). */
function internalHref(a: HTMLAnchorElement): string | null {
  if (!a.href || a.hasAttribute("download") || (a.target && a.target !== "_self") || a.dataset.reload !== undefined) return null;
  let url: URL;
  try {
    url = new URL(a.href, location.href);
  } catch {
    return null;
  }
  if (url.origin !== location.origin) return null;
  if (/^\/(admin|api|_next)(\/|$)/.test(url.pathname)) return null;
  if (/\.[a-z0-9]{2,5}$/i.test(url.pathname)) return null; // files: .pdf, .xml, .txt, images…
  return url.pathname + url.search + url.hash;
}

export function SiteNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const [loading, setLoading] = useState(false);
  const first = useRef(true);
  const prefetched = useRef(new Set<string>());

  // Clicks on internal links → Next.js navigation.
  useEffect(() => {
    const prefetch = (href: string) => {
      const path = href.split("#")[0];
      if (!path || prefetched.current.has(path) || path === location.pathname + location.search) return;
      prefetched.current.add(path);
      router.prefetch(path);
    };
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = internalHref(a);
      if (!href) return;
      const [path, hash] = href.split("#");
      // A jump to a section of the same page: let the browser scroll.
      if (path === location.pathname + location.search && hash !== undefined) return;
      e.preventDefault();
      if (path !== location.pathname + location.search) setLoading(true);
      router.push(href);
    };
    const onIntent = (e: Event) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      const href = a && internalHref(a);
      if (href) prefetch(href);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("mouseover", onIntent, { passive: true });
    document.addEventListener("touchstart", onIntent, { passive: true });
    document.addEventListener("focusin", onIntent);
    // When the browser is idle, preload the pages in the main menu.
    const idle = (cb: () => void) => (typeof window.requestIdleCallback === "function" ? window.requestIdleCallback(cb, { timeout: 4000 }) : setTimeout(cb, 2500));
    idle(() => document.querySelectorAll<HTMLAnchorElement>('header nav[aria-label="Main"] a[href]').forEach((a) => {
      const href = internalHref(a);
      if (href) prefetch(href);
    }));
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("mouseover", onIntent);
      document.removeEventListener("touchstart", onIntent);
      document.removeEventListener("focusin", onIntent);
    };
  }, [router]);

  // After every page change.
  useEffect(() => {
    setLoading(false);
    document.querySelectorAll<HTMLDetailsElement>("details.mnav[open]").forEach((d) => (d.open = false));
    // Desktop dropdowns open on focus: let go of the clicked menu item so the panel closes.
    const active = document.activeElement as HTMLElement | null;
    if (active?.closest(".nav-dd, .mnav")) active.blur();
    if (first.current) {
      first.current = false;
      return;
    }
    (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq?.("track", "PageView");
  }, [pathname, search]);

  return <div className={`nav-progress${loading ? " is-loading" : ""}`} aria-hidden="true" />;
}
