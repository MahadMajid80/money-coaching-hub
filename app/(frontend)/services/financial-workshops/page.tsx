import { pageContent, pageMetadata, R } from "@/lib/cms/pageContent";
import { ClientNames, QuoteCards } from "@/components/cms";
import { getClientLogos, getReviews } from "@/lib/cms/data";
import type { Metadata } from "next";
import { PageFooter, PageHeader } from "@/components/chrome";
import { EnquiryForm } from "@/components/forms";
const baseMetadata: Metadata = {
  title: "Financial Wellbeing Workshops for Companies",
  description: "Financial wellbeing workshops your team will actually enjoy. Delivered for HSBC, PwC Malta, MeDirect, Thomas Smith Group and more. On site in Malta, online anywhere.",
  alternates: {
    canonical: "/services/financial-workshops/"
  }
};
export function generateMetadata() {
  return pageMetadata("workshops", baseMetadata);
}
export default async function Page() {
  const c = await pageContent("workshops");
  return <>
      <PageHeader cta={{
      label: c.t("general.header_button"),
      href: c.t("general.header_button_link")
    }} />
      <main id="main">
      {/* HERO */}
      {c.show("hero") && <section style={{
        background: "#111111",
        color: "#ffffff",
        padding: "80px 0"
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
            <span className="eyebrow" style={{
              color: "#FFD112"
            }}>{R(c, "hero.eyebrow")}</span>
            <h1 style={{
              fontFamily: "Raleway,sans-serif",
              fontWeight: "800",
              fontSize: "60px",
              lineHeight: "1.02",
              letterSpacing: "-0.02em",
              margin: "0",
              color: "#ffffff"
            }}>{R(c, "hero.heading")}</h1>
            <p className="body" style={{
              fontSize: "20px",
              maxWidth: "560px",
              color: "#C9C3B1"
            }}>{R(c, "hero.paragraph")}</p>
            <div style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap"
            }}>
              <a href={c.t("hero.button_link")} className="btn btn-gold">{R(c, "hero.button")}</a>
              <a href={c.t("hero.button_2_link")} className="btn" style={{
                border: "2px solid #ffffff",
                color: "#ffffff"
              }}>{R(c, "hero.button_2")}</a>
            </div>
          </div>
          <div style={{
            flex: "0 1 520px",
            minWidth: "280px"
          }}>
            <img src={c.img("hero.image")} alt={c.t("hero.image_alt")} style={{
              width: "100%",
              aspectRatio: "3/2",
              objectFit: "cover",
              borderRadius: "20px",
              display: "block"
            }} />
          </div>
        </div>
      </section>}
      {/* LOGO STRIP */}
      {c.show("logo_strip") && <section style={{
        background: "#FDF7E8",
        padding: "28px 0",
        borderBottom: "1px solid #EFE9D9"
      }}>
        <div className="wrap" style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px"
        }}>
          <span style={{
            fontSize: "13px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#6B6248",
            fontWeight: "700"
          }}>{R(c, "logo_strip.text")}</span>
          <div style={{
            display: "flex",
            gap: "14px 36px",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Raleway,sans-serif",
            fontWeight: "700",
            fontSize: "15px",
            color: "#111111"
          }}>
            <ClientNames logos={await getClientLogos()} />
          </div>
        </div>
      </section>}
      {/* WHY */}
      {c.show("why") && <section style={{
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
            maxWidth: "760px"
          }}>
            <span className="eyebrow">{R(c, "why.eyebrow")}</span>
            <h2 className="h2">{R(c, "why.heading")}</h2>
            <p className="body">{R(c, "why.paragraph")}</p>
          </div>
          <div className="g3" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "20px"
          }}>
            <div className="card" style={{
              background: "#FDF7E8",
              borderColor: "#FDF7E8"
            }}><span style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "800",
                fontSize: "44px",
                lineHeight: "1"
              }}>{R(c, "why.text")}</span><p className="body" style={{
                fontSize: "16px"
              }}>{R(c, "why.paragraph_2")}</p><span style={{
                fontSize: "13px",
                color: "#6B6248"
              }}>{R(c, "why.text_2")}</span></div>
            <div className="card" style={{
              background: "#FDF7E8",
              borderColor: "#FDF7E8"
            }}><span style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "800",
                fontSize: "44px",
                lineHeight: "1"
              }}>{R(c, "why.text_3")}</span><p className="body" style={{
                fontSize: "16px"
              }}>{R(c, "why.paragraph_3")}</p><span style={{
                fontSize: "13px",
                color: "#6B6248"
              }}>{R(c, "why.text_4")}</span></div>
            <div className="card" style={{
              background: "#FDF7E8",
              borderColor: "#FDF7E8"
            }}><span style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "800",
                fontSize: "44px",
                lineHeight: "1"
              }}>{R(c, "why.text_5")}</span><p className="body" style={{
                fontSize: "16px"
              }}>{R(c, "why.paragraph_4")}</p><span style={{
                fontSize: "13px",
                color: "#6B6248"
              }}>{R(c, "why.text_6")}</span></div>
          </div>
        </div>
      </section>}
      {/* FORMATS */}
      {c.show("formats") && <section id="formats" style={{
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
              <span className="eyebrow">{R(c, "formats.eyebrow")}</span>
              <h2 className="h2">{R(c, "formats.heading")}</h2>
            </div>
            <a href={c.t("formats.button_link")} className="btn btn-ghost">{R(c, "formats.button")}</a>
          </div>
          <div className="g3" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "20px"
          }}>
            <div className="card"><span className="eyebrow" style={{
                color: "#6B6248"
              }}>{R(c, "formats.eyebrow_2")}</span><h3 style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "700",
                fontSize: "22px",
                margin: "0"
              }}>{R(c, "formats.heading_2")}</h3><p className="body" style={{
                fontSize: "16px"
              }}>{R(c, "formats.paragraph")}</p><span style={{
                fontSize: "14px",
                color: "#6B6248",
                marginTop: "auto"
              }}>{R(c, "formats.text")}</span></div>
            <div className="card" style={{
              borderColor: "#FAAC15",
              boxShadow: "0 0 0 2px #FAAC15 inset"
            }}><span className="eyebrow">{R(c, "formats.eyebrow_3")}</span><h3 style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "700",
                fontSize: "22px",
                margin: "0"
              }}>{R(c, "formats.heading_3")}</h3><p className="body" style={{
                fontSize: "16px"
              }}>{R(c, "formats.paragraph_2")}</p><span style={{
                fontSize: "14px",
                color: "#6B6248",
                marginTop: "auto"
              }}>{R(c, "formats.text_2")}</span></div>
            <div className="card"><span className="eyebrow" style={{
                color: "#6B6248"
              }}>{R(c, "formats.eyebrow_4")}</span><h3 style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "700",
                fontSize: "22px",
                margin: "0"
              }}>{R(c, "formats.heading_4")}</h3><p className="body" style={{
                fontSize: "16px"
              }}>{R(c, "formats.paragraph_3")}</p><span style={{
                fontSize: "14px",
                color: "#6B6248",
                marginTop: "auto"
              }}>{R(c, "formats.text_3")}</span></div>
          </div>
          <p className="body" style={{
            fontSize: "16px",
            color: "#6B6248"
          }}>{R(c, "formats.paragraph_4")}</p>
        </div>
      </section>}
      {/* WHAT THEY SAY */}
      {c.show("what_they_say") && <section style={{
        background: "#ffffff",
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
            <span className="eyebrow">{R(c, "what_they_say.eyebrow")}</span>
            <h2 className="h2">{R(c, "what_they_say.heading")}</h2>
          </div>
          <div className="quotes" style={{
            columns: "2",
            columnGap: "20px"
          }}>
            <QuoteCards reviews={await getReviews("workshops")} />
          </div>
        </div>
      </section>}
      {/* ENQUIRE */}
      {c.show("enquire") && <section id="enquire" style={{
        background: "#FAAC15",
        padding: "96px 0"
      }}>
        <div className="wrap" style={{
          display: "flex",
          gap: "56px",
          flexWrap: "wrap",
          alignItems: "flex-start"
        }}>
          <div style={{
            flex: "1 1 440px",
            minWidth: "0",
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}>
            <span className="eyebrow" style={{
              color: "#111111"
            }}>{R(c, "enquire.eyebrow")}</span>
            <h2 className="h2" style={{
              fontSize: "46px"
            }}>{R(c, "enquire.heading")}</h2>
            <p className="body" style={{
              color: "#111111"
            }}>Or skip the form: <a href={c.t("enquire.link_link")} style={{
                fontWeight: "700"
              }}>{R(c, "enquire.link")}</a> and we'll scope it together.</p>
            <p className="body" style={{
              color: "#5A4A1A",
              fontSize: "15px"
            }}>{R(c, "enquire.paragraph")}</p>
          </div>
          <EnquiryForm />
        </div>
      </section>}

      </main>
      <PageFooter />
    </>;
}