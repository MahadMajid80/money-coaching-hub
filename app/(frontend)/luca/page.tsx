import { pageContent, pageMetadata, R } from "@/lib/cms/pageContent";
import { QuoteCards } from "@/components/cms";
import { getReviews } from "@/lib/cms/data";
import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/chrome";
const baseMetadata: Metadata = {
  title: "My story – Luca Caruana, Certified Money Coach",
  description: "Luca Caruana brought money coaching to Malta in 2023. Certified Money Coach (CMC®), financial wellbeing speaker, founder of Money Coaching Hub and Monipal, and Times of Malta columnist.",
  alternates: {
    canonical: "/luca/"
  }
};
export function generateMetadata() {
  return pageMetadata("luca", baseMetadata);
}
const quotes = [{
  name: "Lorraine Sammut",
  role: "Key Account Manager",
  text: "I was a mess when we started and you really helped me in more ways than I thought you could. Just 2 months later I'm already seeing the improvement on paper and mentally."
}, {
  name: "Christine Borg",
  role: "Engagement & Culture Manager, HSBC",
  text: "Luca is the only person that addresses the psychological aspect of money, and that part was definitely the most that got people involved and intrigued."
}, {
  name: "Carmelo Romano",
  role: "CTO",
  text: "Luca doesn't dictate investment choices. He opens up a world of possibilities, enabling me to make informed decisions about my savings."
}, {
  name: "Ieva Strekaite",
  role: "Entrepreneur",
  text: "The model Luca has shifted my understanding of money, my relationship with money, and eventually brought awareness to my true potential."
}];
export default async function LucaPage() {
  const c = await pageContent("luca");
  return <div className="home" style={{
    width: "100%",
    display: "flex",
    flexDirection: "column"
  }}>
      <SiteHeader />
      <main id="main" style={{
      display: "contents"
    }}>
        {/* HERO */}
        {c.show("hero") && <section style={{
        background: "#FDF7E8",
        padding: "72px 0"
      }}>
          <div className="wrap" style={{
          display: "flex",
          gap: "56px",
          flexWrap: "wrap",
          alignItems: "center"
        }}>
            <div style={{
            flex: "1 1 520px",
            minWidth: "0",
            display: "flex",
            flexDirection: "column",
            gap: "24px"
          }}>
              <span className="eyebrow">{R(c, "hero.eyebrow")}</span>
              <h1 style={{
              fontFamily: "Raleway,sans-serif",
              fontWeight: "800",
              fontSize: "60px",
              lineHeight: "1.02",
              letterSpacing: "-0.02em",
              margin: "0"
            }}>{R(c, "hero.heading")}</h1>
              <p className="body" style={{
              fontSize: "20px",
              maxWidth: "560px"
            }}>{R(c, "hero.paragraph")}</p>
              <div style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap"
            }}>
                <a href={c.t("hero.button_link")} className="btn btn-gold">{R(c, "hero.button")}</a>
                <a href={c.t("hero.button_2_link")} className="btn btn-ghost" target="_blank" rel="noopener">{R(c, "hero.button_2")}</a>
              </div>
              <div style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap"
            }}>
                {["Certified Money Coach (CMC®)", "No products, no commissions", "Columnist, Times of Malta"].map(t => <span key={t} className="chip" style={{
                borderColor: "#E0D5B7",
                background: "transparent",
                fontSize: "14px",
                padding: "8px 14px"
              }}>{t}</span>)}
              </div>
            </div>
            <div style={{
            flex: "0 1 420px",
            minWidth: "280px",
            display: "flex",
            justifyContent: "center"
          }}>
              <div style={{
              position: "relative",
              width: "380px",
              maxWidth: "100%",
              marginLeft: "20px"
            }}>
                <div aria-hidden="true" style={{
                position: "absolute",
                left: "-20px",
                top: "20px",
                width: "100%",
                height: "100%",
                background: "#FAAC15",
                borderRadius: "28px"
              }}></div>
                <img src={c.img("hero.image")} alt={c.t("hero.image_alt")} style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4/5",
                objectFit: "cover",
                objectPosition: "center 20%",
                borderRadius: "28px",
                display: "block"
              }} />
              </div>
            </div>
          </div>
        </section>}

        {/* STATS */}
        {c.show("stats") && <section className="strip-22" style={{
        background: "#111111",
        padding: "22px 0"
      }}>
          <div className="wrap" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "16px",
          color: "#ffffff"
        }}>
            {[["2023", "brought money coaching to Malta"], ["Hundreds", "of clients coached one-to-one"], ["1,000+", "workshop participants"], ["70+", "Times of Malta columns"]].map(([v, l]) => <div key={l} style={{
            display: "flex",
            flexDirection: "column",
            padding: "8px 0"
          }}>
                <span style={{
              fontFamily: "Raleway,sans-serif",
              fontWeight: "800",
              fontSize: "30px",
              color: "#FFD112"
            }}>{v}</span>
                <span style={{
              fontSize: "14px",
              color: "#C9C3B1"
            }}>{l}</span>
              </div>)}
          </div>
        </section>}

        {/* STORY */}
        {c.show("story") && <section style={{
        background: "#ffffff",
        padding: "96px 0"
      }}>
          <div className="wrap" style={{
          display: "flex",
          gap: "64px",
          alignItems: "center",
          flexWrap: "wrap"
        }}>
            <div style={{
            flex: "1 1 480px",
            minWidth: "0",
            display: "flex",
            flexDirection: "column",
            gap: "22px"
          }}>
              <span className="eyebrow">{R(c, "story.eyebrow")}</span>
              <h2 className="h2">{R(c, "story.heading")}</h2>
              <p className="body">{R(c, "story.paragraph")}</p>
              <p className="body">{R(c, "story.paragraph_2")}</p>
              <blockquote style={{
              margin: "0",
              padding: "20px 24px",
              borderLeft: "4px solid #FAAC15",
              background: "#FDF7E8",
              borderRadius: "0 16px 16px 0",
              fontFamily: "Raleway,sans-serif",
              fontWeight: "700",
              fontSize: "22px",
              lineHeight: "1.3"
            }}>{R(c, "story.quote")}</blockquote>
              <p className="body">{R(c, "story.paragraph_3")}</p>
            </div>
            <div style={{
            flex: "0 1 460px",
            minWidth: "280px"
          }}>
              <img src={c.img("story.image")} alt={c.t("story.image_alt")} loading="lazy" style={{
              width: "100%",
              aspectRatio: "4/5",
              objectFit: "cover",
              objectPosition: "center 30%",
              borderRadius: "20px",
              display: "block"
            }} />
            </div>
          </div>
        </section>}

        {/* REVIEWS */}
        {c.show("reviews") && <section id="reviews" style={{
        background: "#FDF7E8",
        padding: "96px 0"
      }}>
          <div className="wrap" style={{
          display: "flex",
          flexDirection: "column",
          gap: "36px"
        }}>
            <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            maxWidth: "720px"
          }}>
              <span className="eyebrow">{R(c, "reviews.eyebrow")}</span>
              <h2 className="h2">{R(c, "reviews.heading")}</h2>
            </div>
            <div className="quotes" style={{
            columns: "2",
            columnGap: "20px"
          }}>
              <QuoteCards reviews={await getReviews("luca")} />
            </div>
          </div>
        </section>}

        {/* CTA */}
        {c.show("cta") && <section style={{
        background: "#FAAC15",
        padding: "96px 0"
      }}>
          <div className="wrap" style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          alignItems: "center",
          textAlign: "center"
        }}>
            <h2 className="h2" style={{
            fontSize: "48px",
            maxWidth: "760px"
          }}>{R(c, "cta.heading")}</h2>
            <p className="body" style={{
            color: "#111111",
            maxWidth: "560px"
          }}>{R(c, "cta.paragraph")}</p>
            <a href={c.t("cta.button_link")} className="btn btn-dark" style={{
            minWidth: "280px"
          }}>{R(c, "cta.button")}</a>
          </div>
        </section>}
      </main>
      <SiteFooter />
    </div>;
}