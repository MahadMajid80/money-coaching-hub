"use client";
import { useRowLabel } from "@payloadcms/ui";

export function LinkRowLabel() {
  const { data, rowNumber } = useRowLabel<{ label?: string; url?: string }>();
  return <span>{data?.label ? `${data.label}${data.url ? ` → ${data.url}` : ""}` : `Link ${(rowNumber ?? 0) + 1}`}</span>;
}

export function WordRowLabel() {
  const { data, rowNumber } = useRowLabel<{ word?: string; type?: string }>();
  return <span>{data?.word ? `${data.word}${data.type ? ` · ${data.type}` : ""}` : `Word ${(rowNumber ?? 0) + 1}`}</span>;
}
