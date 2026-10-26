import Link from "next/link";

export default function NotFound() {
  return (
    <div className="frame">
      <section className="row row--first">
        <div className="pad center" style={{ paddingTop: 120, paddingBottom: 120 }}>
          <p className="mono mono--gold">Error 404</p>
          <h1 className="page-hero__title" style={{ marginTop: 14 }}>
            This page has gone <span className="mark">missing</span>.
          </h1>
          <p className="lead lead--center">It may have moved when we rebuilt the site. Try one of these instead:</p>
          <div className="btn-row" style={{ justifyContent: "center" }}>
            <Link href="/" className="btn btn--dark">
              Home
            </Link>
            <Link href="/blog/" className="btn btn--line">
              Knowledge Hub
            </Link>
            <Link href="/services/" className="btn btn--line">
              Coaching
            </Link>
            <Link href="/contact-us/" className="btn btn--line">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
