import { CLIENT_LOGOS, EXTRA_CLIENTS, findLogo, logoHeight } from "@/lib/logos";

type Client = { name: string; logo?: string | null; url?: string | null };

/** Client logos in one colour, scrolling slowly in a single row (static for reduced motion). */
export function ClientLogoStrip({ logos, dark = true }: { logos: Client[]; dark?: boolean }) {
  const names = logos.map((l) => l.name);
  const all: Client[] = [...logos, ...EXTRA_CLIENTS.filter((e) => !names.some((n) => n.toLowerCase().includes(e.toLowerCase()))).map((name) => ({ name }))];
  const items = all.map((c) => {
    const f = findLogo(c.name, CLIENT_LOGOS);
    const h = f ? logoHeight(f.aspect, 52) : 0;
    return (
      <li key={c.name} className="ls-item" title={c.name}>
        {f ? (
          <span className="ls-logo">
            <img src={f.src} alt={c.name} height={h} style={{ height: `${h}px`, width: "auto" }} loading="lazy" />
            {f.label && <span className="ls-label">{f.label}</span>}
          </span>
        ) : (
          <span className="ls-name">{c.name}</span>
        )}
      </li>
    );
  });
  return (
    <div className={dark ? "ls ls--dark" : "ls ls--light"}>
      <div className="ls-track">
        <ul className="ls-row">{items}</ul>
        <ul className="ls-row" aria-hidden="true">{items}</ul>
      </div>
    </div>
  );
}
