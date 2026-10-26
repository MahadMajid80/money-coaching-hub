import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Testimonial } from "@/lib/testimonials";
import { bookCall } from "@/lib/site";

export const Check = ({ size = 16, stroke = 2 }: { size?: number; stroke?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const delay = (s: number) => ({ "--delay": `${s}s` }) as React.CSSProperties;

/** Smart link: internal routes use next/link, external open in a new tab. */
export function A({ href, className, children, style }: { href: string; className?: string; children: ReactNode; style?: React.CSSProperties }) {
  if (/^https?:\/\//.test(href) || href.startsWith("mailto:")) {
    return (
      <a href={href} className={className} style={style} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  );
}

export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="crumbs">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        {items.map((c) => (
          <li key={c.label}>{c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  actions,
  aside,
  crumbs,
  tone = "light",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  crumbs?: { label: string; href?: string }[];
  tone?: "light" | "soft";
}) {
  return (
    <section className={`row row--first page-hero${tone === "soft" ? " row--soft" : ""}`}>
      <div className="pad split page-hero__inner">
        <div className="page-hero__text">
          {crumbs && <Crumbs items={crumbs} />}
          {eyebrow && <p className="mono mono--gold up">{eyebrow}</p>}
          <h1 className="page-hero__title up d1">{title}</h1>
          {lead && <div className="page-hero__lead up d2">{lead}</div>}
          {actions && <div className="hero__ctas up d3">{actions}</div>}
        </div>
        {aside && <div className="page-hero__aside up d2">{aside}</div>}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, lead, action, center }: { eyebrow?: string; title: ReactNode; lead?: ReactNode; action?: ReactNode; center?: boolean }) {
  return (
    <div className={`pad pad--tight-bottom ${center ? "center" : "section-head"}`}>
      <div className={center ? "reveal" : "section-head__text reveal"}>
        {eyebrow && <p className="mono">{eyebrow}</p>}
        <h2 className="h2">{title}</h2>
        {lead && <p className={`lead${center ? " lead--center" : ""}`}>{lead}</p>}
      </div>
      {action && <div className="reveal">{action}</div>}
    </div>
  );
}

export function TestimonialGrid({ items }: { items: Testimonial[] }) {
  return (
    <div className={`cols cols--${Math.min(items.length, 3)} reviews`}>
      {items.map((r, i) => (
        <figure key={r.name} className="cell review reveal" style={delay(0.06 * i)}>
          <blockquote>&ldquo;{r.text}&rdquo;</blockquote>
          <figcaption>
            {r.photo ? (
              <Image src={r.photo} alt="" width={48} height={48} className="avatar avatar--lg" />
            ) : (
              <span className="avatar avatar--lg avatar--initial" aria-hidden="true">
                {r.name.charAt(0)}
              </span>
            )}
            <span>
              <strong>{r.name}</strong>
              <small>{r.role}</small>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q} className="faq__item reveal">
          <summary>
            <span>{f.q}</span>
            <span className="faq__icon" aria-hidden="true" />
          </summary>
          <div className="faq__a">{f.a}</div>
        </details>
      ))}
    </div>
  );
}

export function CheckList({ items, className = "" }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={`points ${className}`}>
      {items.map((p, i) => (
        <li key={i}>
          <span className="check">
            <Check size={13} stroke={3} />
          </span>
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}

export function CtaBand({
  title = "Want your money working as hard as you do?",
  text = "Let me show you how. Based in Malta (EU), coaching clients all over the world via Google Meet.",
  cta = { label: "Book a 10-minute call", href: bookCall },
  secondary,
}: {
  title?: ReactNode;
  text?: ReactNode;
  cta?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="row row--gold">
      <div className="pad cta-band reveal">
        <h2 className="h2 h2--xl">{title}</h2>
        <p>{text}</p>
        <div className="btn-row">
          <A href={cta.href} className="btn btn--dark">
            {cta.label}
          </A>
          {secondary && (
            <A href={secondary.href} className="btn btn--line">
              {secondary.label}
            </A>
          )}
        </div>
      </div>
    </section>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt>{value}</dt>
      <dd>{label}</dd>
    </div>
  );
}
