"use client";
import { RefreshRouteOnSave } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/** When the site is shown inside the dashboard's live preview, refresh it every time something is saved. */
export function LivePreviewListener() {
  const router = useRouter();
  const [origin, setOrigin] = useState<string | null>(null);
  useEffect(() => {
    if (window.self !== window.top) setOrigin(window.location.origin);
  }, []);
  if (!origin) return null;
  return <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={origin} />;
}
