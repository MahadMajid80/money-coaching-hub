import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { mediaItems, type MediaItem } from "@/lib/media";
import "./media.css";

export const metadata: Metadata = {
  title: "Luca Caruana in the media – Money Coaching Hub",
  description:
    "Interviews, articles, TV appearances, podcasts and talks featuring Luca Caruana, Certified Money Coach in Malta.",
  alternates: { canonical: "/media/" },
};

const fmt = (d?: string) => !d ? "" :
  new Date(d + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

function Meta({ m }: { m: MediaItem }) {
  return (
    <p className="md-meta">
      <span className="md-outlet">{m.outlet}</span>
      <span aria-hidden="true">·</span>
      <span className="md-type">{m.type}</span>
      {m.date && (
        <>
          <span aria-hidden="true">·</span>
          <time dateTime={m.date}>{fmt(m.date)}</time>
        </>
      )}
    </p>
  );
}

function linkLabel(m: MediaItem) {
  if (m.youtubeId) return "Watch on YouTube";
  if (m.type === "TV" || m.type === "Talk" || m.type === "Video") return "Watch";
  if (m.type === "Podcast") return "Listen";
  if (m.type === "Interview") return "Read the interview";
  if (m.type === "Opinion") return "Read Luca’s article";
  return "Read the article";
}

function Card({ m, big = false }: { m: MediaItem; big?: boolean }) {
  return (
    <article className={big ? "md-card md-card-big" : "md-card"}>
      <Meta m={m} />
      <h2 className="md-title">
        <a href={m.url} target="_blank" rel="noopener noreferrer">{m.title}</a>
      </h2>
      {m.youtubeId && (
        <div className="md-video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${m.youtubeId}`}
            title={m.title}
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      )}
      <p className="md-summary">{m.summary}</p>
      {m.quote && (
        <blockquote className="md-quote">
          <p>“{m.quote}”</p>
        </blockquote>
      )}
      <div className="md-foot">
        {m.byline && <span className="md-byline">By {m.byline}</span>}
        {m.listenUrl && (
          <a className="md-link" href={m.listenUrl} target="_blank" rel="noopener noreferrer">
            Listen on Spotify <span aria-hidden="true">→</span>
          </a>
        )}
        <a className="md-link" href={m.url} target="_blank" rel="noopener noreferrer">
          {linkLabel(m)} <span aria-hidden="true">→</span>
          <span className="sr-only"> (opens {m.outlet})</span>
        </a>
      </div>
    </article>
  );
}

export default function MediaPage() {
  const items = [...mediaItems].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  const featured = items.find((m) => m.featured);
  const rest = items.filter((m) => m !== featured);
  const outlets = Array.from(new Set(items.map((m) => m.outlet)));

  return (
    <div className="home" style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <SiteHeader />
      <main id="main">
        <section className="md-hero">
          <div className="wrap">
            <span className="eyebrow">Media</span>
            <h1>
              Luca in the <span className="md-hl">media</span>
            </h1>
            <p className="md-intro">
              Interviews, articles, TV, podcasts and talks about money, the stress it brings and how to take back control.
            </p>
            <p className="md-outlets" aria-label="Featured in">
              <span>Featured in</span>
              {outlets.map((o) => (
                <strong key={o}>{o}</strong>
              ))}
            </p>
          </div>
        </section>

        <section className="md-list">
          <div className="wrap">
            {featured && <Card m={featured} big />}
            {rest.length > 0 && (
              <div className="md-grid">
                {rest.map((m) => (
                  <Card key={m.url} m={m} />
                ))}
              </div>
            )}
            <div className="md-cta">
              <p>
                Journalist, producer or event organiser? I&apos;m happy to talk about money, financial wellbeing and the
                stories people never tell.
              </p>
              <a href="/contact-us/" className="btn btn-dark">Get in touch</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
