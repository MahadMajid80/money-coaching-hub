"use client";

import { useEffect } from "react";

/** Shows one `.view` (#view-<name>) at a time, chosen by the URL hash (#notify, #intro…). */
export default function HashViews({ names, initial }: { names: string[]; initial: string }) {
  useEffect(() => {
    const show = (name: string, toTop: boolean) => {
      names.forEach((n) => {
        const el = document.getElementById(`view-${n}`);
        if (el) el.hidden = n !== name;
      });
      if (toTop) window.scrollTo(0, 0);
    };
    const fromHash = (toTop: boolean) => {
      const h = window.location.hash.replace("#", "");
      if (names.includes(h)) show(h, toTop);
      else if (!h) show(initial, false);
    };
    const onHash = () => fromHash(true);
    fromHash(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [names, initial]);
  return null;
}
