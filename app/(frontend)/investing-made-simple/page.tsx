import { pageContent, pageMetadata, R, renderMarkup } from "@/lib/cms/pageContent";
import { initials } from "@/components/cms";
import type { Metadata } from "next";
import { PageFooter, PageHeader } from "@/components/chrome";
import { getCourse } from "@/lib/cms/data";
const baseMetadata: Metadata = {
  title: "Investing Made Simple – Live Online Course in Maltese",
  description: "Four live online sessions, in Maltese, on how to invest your own money. Taught by a Certified Money Coach who sells no financial products. Next cohort starts 11 January 2027.",
  alternates: {
    canonical: "/investing-made-simple/"
  }
};
export function generateMetadata() {
  return pageMetadata("investing", baseMetadata);
}
export default async function Page() {
  const c = await pageContent("investing");
  const ims = await getCourse("investing-made-simple");
  const checkout = ims?.checkout || "/contact-us/?subject=Investing%20Made%20Simple";
  // When a first-session date is set on the course in the dashboard, it drives every date on this page.
  const d = ims?.startDate ? new Date(ims.startDate) : null;
  const fmt = (o: Intl.DateTimeFormatOptions) => (d ? d.toLocaleDateString("en-GB", { ...o, timeZone: "Europe/Malta" }) : "");
  const dayLong = fmt({ weekday: "long", day: "numeric", month: "long", year: "numeric" }).replace(",", "");
  const dayShort = fmt({ day: "numeric", month: "short", year: "numeric" });
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
              fontSize: "64px",
              lineHeight: "1.02",
              letterSpacing: "-0.02em",
              margin: "0"
            }}>{R(c, "hero.heading")}</h1>
            <p className="body" style={{
              fontSize: "21px",
              maxWidth: "560px"
            }}>{R(c, "hero.paragraph", [], [{
                style: {
                  color: "#111111"
                }
              }])}</p>
            <p className="body" style={{
              maxWidth: "560px"
            }}>{R(c, "hero.paragraph_2")}</p>
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
            {/* Who teaches it, so visitors from Luca's reels recognise him straight away */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "14px"
            }}>
              <img src={c.img("who_is_teaching.image")} alt="" width={56} height={56} style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                objectFit: "cover",
                objectPosition: "center 12%",
                border: "2px solid #FAAC15",
                flex: "0 0 auto"
              }} />
              <span style={{
                fontSize: "16px",
                lineHeight: "1.4",
                color: "#3A3A3A"
              }}>With <strong style={{
                  color: "#111111"
                }}>{R(c, "who_is_teaching.heading")}</strong><br />Certified Money Coach and Times of Malta columnist</span>
            </div>
          </div>
          <div style={{
            flex: "0 1 420px",
            minWidth: "300px"
          }}>
            <div style={{
              background: "#111111",
              color: "#ffffff",
              borderRadius: "24px",
              padding: "40px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: "22px"
            }}>
              <span style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                padding: "8px 14px",
                borderRadius: "999px",
                background: "#FAAC15",
                color: "#111111",
                fontWeight: "700",
                fontSize: "13px",
                letterSpacing: "0.08em",
                textTransform: "uppercase"
              }}>{R(c, "hero.text")}</span>
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px"
              }}>
                <span style={{
                  fontSize: "14px",
                  color: "#C9C3B1",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: "700"
                }}>{R(c, "hero.text_2")}</span>
                <span style={{
                  fontFamily: "Raleway,sans-serif",
                  fontWeight: "800",
                  fontSize: "40px",
                  lineHeight: "1"
                }}>{d ? dayLong : R(c, "hero.text_3")}</span>
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "16px"
              }}>
                <div style={{
                  background: "#1F1F1F",
                  borderRadius: "14px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px"
                }}><span style={{
                    fontSize: "13px",
                    color: "#C9C3B1"
                  }}>{R(c, "hero.text_4")}</span><span style={{
                    fontFamily: "Raleway,sans-serif",
                    fontWeight: "800",
                    fontSize: "20px",
                    color: "#FFD112"
                  }}>{R(c, "hero.text_5")}</span></div>
                <div style={{
                  background: "#1F1F1F",
                  borderRadius: "14px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px"
                }}><span style={{
                    fontSize: "13px",
                    color: "#C9C3B1"
                  }}>{R(c, "hero.text_6")}</span><span style={{
                    fontFamily: "Raleway,sans-serif",
                    fontWeight: "800",
                    fontSize: "26px",
                    color: "#FFD112"
                  }}>{ims?.price || R(c, "hero.text_7")}</span></div>
              </div>
              <p style={{
                margin: "0",
                fontSize: "15px",
                lineHeight: "1.5",
                color: "#C9C3B1"
              }}>{R(c, "hero.paragraph_3")}</p>
              <a href={c.t("hero.button_link")} className="btn btn-gold" style={{
                width: "100%"
              }}>{R(c, "hero.button")}</a>
              <span className="compliance" style={{
                color: "#8E8878"
              }}>{R(c, "hero.text_8")}</span>
              {/* One past student's words beside the first booking button */}
              <figure style={{
                margin: "0",
                paddingTop: "18px",
                borderTop: "1px solid #2A2A2A",
                display: "flex",
                flexDirection: "column",
                gap: "8px"
              }}>
                <blockquote style={{
                  margin: "0",
                  fontSize: "15px",
                  lineHeight: "1.55",
                  color: "#E8E2D0",
                  fontStyle: "italic"
                }}>&ldquo;{renderMarkup(c.t("past_students.paragraph_2").trim().replace(/^["“]+|["”]+$/g, ""))}&rdquo;</blockquote>
                <figcaption style={{
                  fontSize: "13px",
                  color: "#C9C3B1"
                }}>{R(c, "past_students.text_2")}, past student</figcaption>
              </figure>
            </div>
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
          <p className="body" style={{
            maxWidth: "640px"
          }}>{R(c, "who_it_s_for.paragraph")}</p>
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
          }}>{R(c, "who_it_s_for.paragraph_2", [], [{
              style: {
                color: "#111111"
              }
            }])}</p>
        </div>
      </section>}
      {/* THE FOUR EVENINGS */}
      {c.show("the_four_evenings") && <section style={{
        background: "#111111",
        color: "#ffffff",
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
            <span className="eyebrow" style={{
              color: "#FFD112"
            }}>{R(c, "the_four_evenings.eyebrow")}</span>
            <h2 className="h2" style={{
              color: "#ffffff"
            }}>{R(c, "the_four_evenings.heading")}</h2>
            <p className="body" style={{
              color: "#C9C3B1"
            }}>{R(c, "the_four_evenings.paragraph")}</p>
          </div>
          <div className="g2" style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "20px"
          }}>
            <article className="session"><span className="num">{R(c, "the_four_evenings.text")}</span><h3>{R(c, "the_four_evenings.heading_2")}</h3><ul><li>{R(c, "the_four_evenings.item")}</li><li>{R(c, "the_four_evenings.item_2")}</li><li>{R(c, "the_four_evenings.item_3")}</li><li>{R(c, "the_four_evenings.item_4")}</li></ul></article>
            <article className="session"><span className="num">{R(c, "the_four_evenings.text_2")}</span><h3>{R(c, "the_four_evenings.heading_3")}</h3><ul><li>{R(c, "the_four_evenings.item_5")}</li><li>{R(c, "the_four_evenings.item_6")}</li><li>{R(c, "the_four_evenings.item_7")}</li><li>{R(c, "the_four_evenings.item_8")}</li></ul></article>
            <article className="session"><span className="num">{R(c, "the_four_evenings.text_3")}</span><h3>{R(c, "the_four_evenings.heading_4")}</h3><ul><li>{R(c, "the_four_evenings.item_9")}</li><li>{R(c, "the_four_evenings.item_10")}</li><li>{R(c, "the_four_evenings.item_11")}</li><li>{R(c, "the_four_evenings.item_12")}</li></ul></article>
            <article className="session"><span className="num">{R(c, "the_four_evenings.text_4")}</span><h3>{R(c, "the_four_evenings.heading_5")}</h3><ul><li>{R(c, "the_four_evenings.item_13")}</li><li>{R(c, "the_four_evenings.item_14")}</li><li>{R(c, "the_four_evenings.item_15")}</li><li>{R(c, "the_four_evenings.item_16")}</li></ul></article>
          </div>
          <div><a href={c.t("the_four_evenings.button_link")} className="btn btn-gold">{R(c, "the_four_evenings.button")}</a></div>
        </div>
      </section>}
      {/* PHOTO STRIP */}
      {c.show("photo_strip") && <section style={{
        background: "#ffffff",
        padding: "0"
      }}>
        <div className="g3" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "4px"
        }}>
          <figure style={{
            margin: "0",
            position: "relative",
            overflow: "hidden"
          }}><img src={c.img("photo_strip.image")} alt={c.t("photo_strip.image_alt")} style={{
              width: "100%",
              aspectRatio: "4/3",
              objectFit: "cover",
              display: "block"
            }} /><figcaption style={{
              position: "absolute",
              left: "0",
              right: "0",
              bottom: "0",
              padding: "40px 20px 16px",
              background: "linear-gradient(to top,rgba(17,17,17,.9),rgba(17,17,17,0))",
              color: "#fff",
              fontWeight: "700",
              fontSize: "13px",
              letterSpacing: ".12em",
              textTransform: "uppercase"
            }}>{R(c, "photo_strip.text")}</figcaption></figure>
          <figure style={{
            margin: "0",
            position: "relative",
            overflow: "hidden"
          }}><img src={c.img("photo_strip.image_2")} alt={c.t("photo_strip.image_2_alt")} style={{
              width: "100%",
              aspectRatio: "4/3",
              objectFit: "cover",
              objectPosition: "center 30%",
              display: "block"
            }} /><figcaption style={{
              position: "absolute",
              left: "0",
              right: "0",
              bottom: "0",
              padding: "40px 20px 16px",
              background: "linear-gradient(to top,rgba(17,17,17,.9),rgba(17,17,17,0))",
              color: "#fff",
              fontWeight: "700",
              fontSize: "13px",
              letterSpacing: ".12em",
              textTransform: "uppercase"
            }}>{R(c, "photo_strip.text_2")}</figcaption></figure>
          <figure style={{
            margin: "0",
            position: "relative",
            overflow: "hidden"
          }}><img src={c.img("photo_strip.image_3")} alt={c.t("photo_strip.image_3_alt")} style={{
              width: "100%",
              aspectRatio: "4/3",
              objectFit: "cover",
              display: "block"
            }} /><figcaption style={{
              position: "absolute",
              left: "0",
              right: "0",
              bottom: "0",
              padding: "40px 20px 16px",
              background: "linear-gradient(to top,rgba(17,17,17,.9),rgba(17,17,17,0))",
              color: "#fff",
              fontWeight: "700",
              fontSize: "13px",
              letterSpacing: ".12em",
              textTransform: "uppercase"
            }}>{R(c, "photo_strip.text_3")}</figcaption></figure>
        </div>
      </section>}
      {/* INCLUDED */}
      {c.show("included") && <section style={{
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
            flexDirection: "column",
            gap: "14px",
            maxWidth: "720px"
          }}>
            <span className="eyebrow">{R(c, "included.eyebrow")}</span>
            <h2 className="h2">{R(c, "included.heading")}</h2>
          </div>
          <div className="g3" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "20px"
          }}>
            <div className="card"><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><h3 style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "700",
                fontSize: "20px",
                margin: "0"
              }}>{R(c, "included.heading_2")}</h3><p className="body" style={{
                fontSize: "16px"
              }}>{R(c, "included.paragraph")}</p></div>
            <div className="card"><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><h3 style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "700",
                fontSize: "20px",
                margin: "0"
              }}>{R(c, "included.heading_3")}</h3><p className="body" style={{
                fontSize: "16px"
              }}>{R(c, "included.paragraph_2")}</p></div>
            <div className="card"><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><h3 style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "700",
                fontSize: "20px",
                margin: "0"
              }}>{R(c, "included.heading_4")}</h3><p className="body" style={{
                fontSize: "16px"
              }}>{R(c, "included.paragraph_3")}</p></div>
            <div className="card"><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><h3 style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "700",
                fontSize: "20px",
                margin: "0"
              }}>{R(c, "included.heading_5")}</h3><p className="body" style={{
                fontSize: "16px"
              }}>{R(c, "included.paragraph_4")}</p></div>
            <div className="card"><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><h3 style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "700",
                fontSize: "20px",
                margin: "0"
              }}>{R(c, "included.heading_6")}</h3><p className="body" style={{
                fontSize: "16px"
              }}>{R(c, "included.paragraph_5")}</p></div>
            <div className="card" style={{
              background: "#111111",
              color: "#ffffff",
              borderColor: "#111111",
              justifyContent: "center"
            }}><span style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "800",
                fontSize: "40px",
                lineHeight: "1",
                color: "#FFD112"
              }}>{R(c, "included.text")}</span><span style={{
                fontSize: "15px",
                color: "#C9C3B1"
              }}>{R(c, "included.text_2")}</span><a href={c.t("included.button_link")} className="btn btn-gold" style={{
                alignSelf: "flex-start",
                marginTop: "6px"
              }}>{R(c, "included.button")}</a></div>
          </div>
        </div>
      </section>}
      {/* WHO IS TEACHING */}
      {c.show("who_is_teaching") && <section style={{
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
            flex: "0 1 400px",
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
                borderRadius: "24px"
              }}></div>
              <img src={c.img("who_is_teaching.image")} alt={c.t("who_is_teaching.image_alt")} style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4/5",
                objectFit: "cover",
                objectPosition: "center 10%",
                borderRadius: "24px",
                display: "block"
              }} />
            </div>
          </div>
          <div style={{
            flex: "1 1 480px",
            minWidth: "0",
            display: "flex",
            flexDirection: "column",
            gap: "22px"
          }}>
            <span className="eyebrow">{R(c, "who_is_teaching.eyebrow")}</span>
            <h2 className="h2">{R(c, "who_is_teaching.heading")}</h2>
            <p className="body">{R(c, "who_is_teaching.paragraph")}</p>
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
            }}>{R(c, "who_is_teaching.quote")}</blockquote>
            <p className="body">{R(c, "who_is_teaching.paragraph_2")}</p>
            <p className="body">{R(c, "who_is_teaching.paragraph_3")}</p>
          </div>
        </div>
      </section>}
      {/* PAST STUDENTS */}
      {c.show("past_students") && <section style={{
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
            <span className="eyebrow">{R(c, "past_students.eyebrow")}</span>
            <h2 className="h2">{R(c, "past_students.heading")}</h2>
          </div>
          <div className="proof-bar">
            <strong>100%</strong>
            <span>{R(c, "past_students.text_8")}</span>
          </div>
          <div className="quotes" style={{
            columns: "2",
            columnGap: "20px"
          }}>
            {(["", "_2", "_3", "_4", "_5", "_6", "_7"] as const).map((n) => {
              const name = c.t(`past_students.text${n}`);
              const quote = c.t(`past_students.paragraph${n}`);
              if (!name || !quote) return null;
              return <blockquote key={n || "_1"} className="quote" style={{
                margin: "0 0 20px"
              }}>
                <p>{renderMarkup(quote.trim().replace(/^["“]+|["”]+$/g, ""))}</p>
                <cite>
                  <span aria-hidden="true" className="avatar">{initials(name)}</span>
                  <span className="who">{name}<small>Facebook review · Recommends Luca</small></span>
                </cite>
              </blockquote>;
            })}
          </div>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "16px"
          }}>
            <a href="#apply" className="btn btn-dark">{R(c, "apply.button")}</a>
            <span style={{
              fontSize: "15px",
              color: "#6B6248"
            }}>Next cohort starts 11 January 2027</span>
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
            <details><summary>{R(c, "faq.question_3")}</summary><div className="answer">The live sessions are in Maltese. If you'd rather learn in English, <a href={c.t("faq.link_link")}>{R(c, "faq.link")}</a> and we'll find the right option for you.</div></details>
            <details><summary>{R(c, "faq.question_4")}</summary><div className="answer">{R(c, "faq.text_3")}</div></details>
            <details><summary>{R(c, "faq.question_5")}</summary><div className="answer">{R(c, "faq.text_4")}</div></details>
            <details><summary>{R(c, "faq.question_6")}</summary><div className="answer">{R(c, "faq.text_5")}</div></details>
          </div>
        </div>
      </section>}
      {/* APPLY */}
      {c.show("apply") && <section id="apply" style={{
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
          <span className="eyebrow" style={{
            color: "#111111"
          }}>{d ? `Starts ${dayLong}` : R(c, "apply.eyebrow")}</span>
          <h2 className="h2" style={{
            fontSize: "48px",
            maxWidth: "760px"
          }}>{R(c, "apply.heading")}</h2>
          <p className="body" style={{
            color: "#111111",
            maxWidth: "560px"
          }}>{R(c, "apply.paragraph")}</p>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center"
          }}>
            <span style={{
              fontFamily: "Raleway,sans-serif",
              fontWeight: "800",
              fontSize: "40px",
              lineHeight: "1"
            }}>{ims?.price || R(c, "apply.text")}</span>
            <a href={checkout} className="btn btn-dark" style={{
              minWidth: "280px"
            }}>{R(c, "apply.button")}</a>
            <span className="compliance" style={{
              color: "#5A4A1A",
              maxWidth: "460px"
            }}>{R(c, "apply.text_2")}</span>
          </div>
          <div style={{
            display: "flex",
            gap: "32px",
            flexWrap: "wrap",
            justifyContent: "center",
            paddingTop: "24px",
            borderTop: "1px solid rgba(17,17,17,.2)",
            fontSize: "13px",
            letterSpacing: ".1em",
            textTransform: "uppercase",
            fontWeight: "700",
            color: "#5A4A1A"
          }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px"
            }}><span>{R(c, "apply.text_3")}</span><b style={{
                color: "#111111"
              }}>{d ? dayShort : R(c, "apply.text_4")}</b></div>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px"
            }}><span>{R(c, "apply.text_5")}</span><b style={{
                color: "#111111"
              }}>{R(c, "apply.text_6")}</b></div>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px"
            }}><span>{R(c, "apply.text_7")}</span><b style={{
                color: "#111111"
              }}>{R(c, "apply.text_8")}</b></div>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px"
            }}><span>{R(c, "apply.text_9")}</span><b style={{
                color: "#111111"
              }}>{R(c, "apply.text_10")}</b></div>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px"
            }}><span>{R(c, "apply.text_11")}</span><b style={{
                color: "#111111"
              }}>{R(c, "apply.text_12")}</b></div>
          </div>
        </div>
      </section>}

      </main>
      <PageFooter />
    </>;
}