import { pageContent, pageMetadata, R } from "@/lib/cms/pageContent";
import { QuoteCards } from "@/components/cms";
import { getReviews } from "@/lib/cms/data";
import type { Metadata } from "next";
import { PageFooter, PageHeader } from "@/components/chrome";
const baseMetadata: Metadata = {
  title: "Coaching, one-to-one – Individual & Couples Money Coaching",
  description: "One-to-one and couples money coaching with Luca Caruana, Certified Money Coach. Online from anywhere, or in person in Malta.",
  alternates: {
    canonical: "/services/"
  }
};
export function generateMetadata() {
  return pageMetadata("coaching", baseMetadata);
}
export default async function Page() {
  const c = await pageContent("coaching");
  return <>
      <PageHeader cta={{
      label: c.t("general.header_button"),
      href: c.t("general.header_button_link")
    }} />
      <main id="main">
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
              <a href={c.t("hero.button_2_link")} className="btn btn-ghost">{R(c, "hero.button_2")}</a>
            </div>
            <div style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap"
            }}>
              <span className="chip" style={{
                borderColor: "#E0D5B7",
                background: "transparent",
                fontSize: "14px",
                padding: "8px 14px"
              }}>{R(c, "hero.chip")}</span>
              <span className="chip" style={{
                borderColor: "#E0D5B7",
                background: "transparent",
                fontSize: "14px",
                padding: "8px 14px"
              }}>{R(c, "hero.chip_2")}</span>
              <span className="chip" style={{
                borderColor: "#E0D5B7",
                background: "transparent",
                fontSize: "14px",
                padding: "8px 14px"
              }}>{R(c, "hero.chip_3")}</span>
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
                borderRadius: "28px",
                display: "block"
              }} />
            </div>
          </div>
        </div>
      </section>}
      {/* HOW IT WORKS */}
      {c.show("how_it_works") && <section style={{
        background: "#ffffff",
        padding: "96px 0"
      }}>
        <div className="wrap" style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            maxWidth: "720px"
          }}>
            <span className="eyebrow">{R(c, "how_it_works.eyebrow")}</span>
            <h2 className="h2">{R(c, "how_it_works.heading")}</h2>
          </div>
          <div className="g3" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "20px"
          }}>
            <div className="card"><span style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "800",
                fontSize: "40px",
                lineHeight: "1",
                color: "#FAAC15"
              }}>{R(c, "how_it_works.text")}</span><h3 style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "700",
                fontSize: "22px",
                margin: "0"
              }}>{R(c, "how_it_works.heading_2")}</h3><p className="body" style={{
                fontSize: "16px"
              }}>{R(c, "how_it_works.paragraph")}</p></div>
            <div className="card"><span style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "800",
                fontSize: "40px",
                lineHeight: "1",
                color: "#FAAC15"
              }}>{R(c, "how_it_works.text_2")}</span><h3 style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "700",
                fontSize: "22px",
                margin: "0"
              }}>{R(c, "how_it_works.heading_3")}</h3><p className="body" style={{
                fontSize: "16px"
              }}>{R(c, "how_it_works.paragraph_2")}</p></div>
            <div className="card"><span style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "800",
                fontSize: "40px",
                lineHeight: "1",
                color: "#FAAC15"
              }}>{R(c, "how_it_works.text_3")}</span><h3 style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "700",
                fontSize: "22px",
                margin: "0"
              }}>{R(c, "how_it_works.heading_4")}</h3><p className="body" style={{
                fontSize: "16px"
              }}>{R(c, "how_it_works.paragraph_3")}</p></div>
          </div>
        </div>
      </section>}
      {/* OPTIONS */}
      {c.show("options") && <section id="options" style={{
        background: "#FDF7E8",
        padding: "96px 0"
      }}>
        <div className="wrap" style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "24px",
            flexWrap: "wrap"
          }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              maxWidth: "640px"
            }}>
              <span className="eyebrow">{R(c, "options.eyebrow")}</span>
              <h2 className="h2">{R(c, "options.heading")}</h2>
            </div>
            <a href={c.t("options.button_link")} className="btn btn-ghost">{R(c, "options.button")}</a>
          </div>
          <div className="g2" style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "20px"
          }}>
            <div className="card" style={{
              borderColor: "#FAAC15",
              boxShadow: "0 0 0 2px #FAAC15 inset",
              padding: "40px",
              gap: "18px"
            }}>
              <span className="eyebrow">{R(c, "options.eyebrow_2")}</span>
              <h3 style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "700",
                fontSize: "28px",
                margin: "0"
              }}>{R(c, "options.heading_2")}</h3>
              <p className="body" style={{
                fontSize: "17px"
              }}>{R(c, "options.paragraph")}</p>
              <ul style={{
                margin: "0",
                padding: "0",
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontSize: "16px",
                color: "#111111"
              }}>
                <li style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start"
                }}><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><span>{R(c, "options.text")}</span></li>
                <li style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start"
                }}><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><span>{R(c, "options.text_2")}</span></li>
                <li style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start"
                }}><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><span>{R(c, "options.text_3")}</span></li>
              </ul>
              <a href={c.t("options.button_2_link")} className="btn btn-gold" style={{
                alignSelf: "flex-start"
              }}>{R(c, "options.button_2")}</a>
            </div>
            <div className="card" style={{
              padding: "40px",
              gap: "18px"
            }}>
              <span className="eyebrow" style={{
                color: "#6B6248"
              }}>{R(c, "options.eyebrow_3")}</span>
              <h3 style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "700",
                fontSize: "28px",
                margin: "0"
              }}>{R(c, "options.heading_3")}</h3>
              <p className="body" style={{
                fontSize: "17px"
              }}>{R(c, "options.paragraph_2")}</p>
              <ul style={{
                margin: "0",
                padding: "0",
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontSize: "16px",
                color: "#111111"
              }}>
                <li style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start"
                }}><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><span>{R(c, "options.text_4")}</span></li>
                <li style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start"
                }}><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><span>{R(c, "options.text_5")}</span></li>
                <li style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start"
                }}><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><span>{R(c, "options.text_6")}</span></li>
              </ul>
              <a href={c.t("options.button_3_link")} className="btn btn-ghost" style={{
                alignSelf: "flex-start"
              }}>{R(c, "options.button_3")}</a>
            </div>
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap",
            padding: "28px 32px",
            borderRadius: "16px",
            background: "#ffffff",
            border: "1px solid #E6E0D0"
          }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px"
            }}>
              <span style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "700",
                fontSize: "20px"
              }}>{R(c, "options.text_7")}</span>
              <span style={{
                fontSize: "16px",
                color: "#3A3A3A"
              }}>{R(c, "options.text_8")}</span>
            </div>
            <a href={c.t("options.button_4_link")} className="btn btn-dark" style={{
              whiteSpace: "nowrap"
            }}>{R(c, "options.button_4")}</a>
          </div>
        </div>
      </section>}
      {/* WHO IT'S FOR */}
      {c.show("who_it_s_for") && <section style={{
        background: "#ffffff",
        padding: "96px 0"
      }}>
        <div className="wrap" style={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          alignItems: "center",
          textAlign: "center"
        }}>
          <span className="eyebrow">{R(c, "who_it_s_for.eyebrow")}</span>
          <h2 className="h2" style={{
            maxWidth: "800px"
          }}>{R(c, "who_it_s_for.heading")}</h2>
          <div style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: "980px"
          }}>
            <span className="chip">{R(c, "who_it_s_for.chip")}</span>
            <span className="chip">{R(c, "who_it_s_for.chip_2")}</span>
            <span className="chip">{R(c, "who_it_s_for.chip_3")}</span>
            <span className="chip">{R(c, "who_it_s_for.chip_4")}</span>
            <span className="chip">{R(c, "who_it_s_for.chip_5")}</span>
          </div>
          <p className="body" style={{
            maxWidth: "640px"
          }}>{R(c, "who_it_s_for.paragraph")}</p>
        </div>
      </section>}
      {/* TESTIMONIALS */}
      {c.show("testimonials") && <section id="reviews" style={{
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
            <span className="eyebrow">{R(c, "testimonials.eyebrow")}</span>
            <h2 className="h2">{R(c, "testimonials.heading")}</h2>
          </div>
          <div className="quotes" style={{
            columns: "2",
            columnGap: "20px"
          }}>
            <QuoteCards reviews={await getReviews("services")} />
          </div>
        </div>
      </section>}
      {/* FAQ */}
      {c.show("faq") && <section style={{
        background: "#ffffff",
        padding: "96px 0"
      }}>
        <div className="wrap" style={{
          maxWidth: "860px",
          display: "flex",
          flexDirection: "column",
          gap: "28px"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px"
          }}>
            <span className="eyebrow">{R(c, "faq.eyebrow")}</span>
            <h2 className="h2">{R(c, "faq.heading")}</h2>
          </div>
          <div style={{
            borderTop: "1px solid #E6E0D0"
          }}>
            <details open><summary>{R(c, "faq.question")}</summary><div className="answer">{R(c, "faq.text")}</div></details>
            <details><summary>{R(c, "faq.question_2")}</summary><div className="answer">{R(c, "faq.text_2")}</div></details>
            <details><summary>{R(c, "faq.question_3")}</summary><div className="answer">{R(c, "faq.text_3")}</div></details>
            <details><summary>{R(c, "faq.question_4")}</summary><div className="answer">{R(c, "faq.text_4")}</div></details>
            <details><summary>{R(c, "faq.question_5")}</summary><div className="answer">{R(c, "faq.text_5")}</div></details>
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
      <PageFooter />
    </>;
}