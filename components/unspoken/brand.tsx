// Unspoken brand pieces for the website: font, wordmark and the two logo arrangements.
// Colours, type and rules come from the Unspoken design system (night, cream, gold; Fraunces Soft + Lato).

import { Fraunces } from "next/font/google";
import { UnspokenMarks } from "./Marks";
import "./unspoken.css";

/** Fraunces with its soft axis, used for the wordmark, headlines and quotes. */
export const fraunces = Fraunces({ subsets: ["latin"], axes: ["SOFT", "WONK", "opsz"], variable: "--font-fraunces", display: "swap" });

export const UK = {
  night: "#17203A",
  nightDeep: "#0F1628",
  cream: "#F4EDE0",
  paper: "#FBF7EF",
  gold: "#FAAC15",
  goldMarkLight: "#E39A00",
  goldTextLight: "#A86F00",
  mist: "#B9BFCE",
  mistLight: "#D9DDE6",
  dusk: "#4B5468",
  hairlineNight: "#3A4568",
  hairlineCream: "#DED4C2",
} as const;

/** Wide logo: marks, a thin line, the word. For headers. `size` = the word's font size in px. */
export function UnspokenWide({ size = 26, onLight = false }: { size?: number; onLight?: boolean }) {
  return (
    <span className="uk-wide" style={{ gap: `${Math.round(size * 0.34)}px` }}>
      <UnspokenMarks height={Math.round(size * 0.46)} color={onLight ? UK.goldMarkLight : UK.gold} />
      <span aria-hidden="true" style={{ width: "1px", height: `${Math.round(size * 0.8)}px`, background: onLight ? UK.hairlineCream : UK.hairlineNight }} />
      <span className="uk-word" style={{ fontSize: `${size}px`, color: onLight ? UK.night : UK.cream }}>
        unspoken
      </span>
    </span>
  );
}

/** Main logo: the marks above the word. `size` = the word's font size in px. */
export function UnspokenMain({ size = 64, onLight = false }: { size?: number; onLight?: boolean }) {
  return (
    <span className="uk-main" style={{ gap: `${Math.round(size * 0.2)}px` }}>
      <UnspokenMarks height={Math.round(size * 0.5)} color={onLight ? UK.goldMarkLight : UK.gold} />
      <span className="uk-word" style={{ fontSize: `${size}px`, color: onLight ? UK.night : UK.cream }}>
        unspoken
      </span>
    </span>
  );
}
