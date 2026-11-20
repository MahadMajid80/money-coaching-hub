// White logo files for the "Trusted by" and "Featured in" strips (public/logos/).
// Matched to dashboard names in lowercase, so "PwC Malta" finds pwc. A name with no file shows as text.
// aspect = width / height of the file, used to give every logo a similar visual weight.

type LogoFile = { src: string; aspect: number; label?: string };

export const CLIENT_LOGOS: Record<string, LogoFile> = {
  hsbc: { src: "/logos/clients/hsbc-symbol.svg", aspect: 1.42, label: "HSBC" },
  pwc: { src: "/logos/clients/pwc.png", aspect: 2.05 },
  medirect: { src: "/logos/clients/medirect.png", aspect: 4.0 },
  mga: { src: "/logos/clients/mga.png", aspect: 3.13 },
  evolution: { src: "/logos/clients/evolution.png", aspect: 5.45 },
  deriv: { src: "/logos/clients/deriv.png", aspect: 2.92 },
  "thomas smith": { src: "/logos/clients/thomas-smith.png", aspect: 2.08 },
  "alf mizzi": { src: "/logos/clients/amsm.png", aspect: 1.82 },
  nectar: { src: "/logos/clients/nectar.png", aspect: 4.15 },
  siegfried: { src: "/logos/clients/siegfried.png", aspect: 4.02 },
  livescore: { src: "/logos/clients/livescore.png", aspect: 5.64 },
  mapfre: { src: "/logos/clients/mapfre.png", aspect: 6.61 },
};

/** Clients with a logo but not yet in Dashboard → Client logos. */
export const EXTRA_CLIENTS = ["LiveScore", "Mapfre"];

export const MEDIA_LOGOS: Record<string, LogoFile> = {
  "times of malta": { src: "/logos/media/times-of-malta.png", aspect: 6.31 },
  "lovin malta": { src: "/logos/media/lovin-malta.png", aspect: 3.82 },
  "malta ceos": { src: "/logos/media/malta-ceos.png", aspect: 8.54 },
};

export function findLogo(name: string, table: Record<string, LogoFile>): LogoFile | undefined {
  const n = name.toLowerCase();
  const key = Object.keys(table).find((k) => n.includes(k));
  return key ? table[key] : undefined;
}

/** Height that gives wide and narrow logos a similar visual size. */
export function logoHeight(aspect: number, base: number) {
  return Math.round(Math.min(base * 0.8, Math.max(base * 0.34, base / Math.sqrt(aspect))));
}
