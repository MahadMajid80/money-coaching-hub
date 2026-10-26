import Image from "next/image";
import Link from "next/link";
import { EMAIL, footerNav, legalNav, socials } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div>
            <Link href="/" aria-label="Money Coaching Hub home">
              <Image src="/images/logo-dark.webp" alt="Money Coaching Hub" width={559} height={459} className="footer__logo" />
            </Link>
            <p>Based in Malta (EU), working with clients all over the world.</p>
            <p>
              <a href={`mailto:${EMAIL}`} className="footer__mail">
                {EMAIL}
              </a>
            </p>
            <ul className="footer__social">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {footerNav.map((col) => (
            <nav key={col.title} className="footer__col" aria-label={col.title}>
              <h2>{col.title}</h2>
              {col.links.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <p className="footer__disclaimer">
          Money Coaching Hub provides financial education and coaching. Luca Caruana is a Certified Money Coach (CMC®), not a
          licensed investment adviser. Nothing on this website is financial advice or a personal recommendation.
        </p>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Money Coaching Hub. All rights reserved.</span>
          <nav aria-label="Legal">
            {legalNav.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
