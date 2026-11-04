import { pageContent, pageMetadata, R } from "@/lib/cms/pageContent";
import type { Metadata } from "next";
import { PageFooter, PageHeader } from "@/components/chrome";
import InvestmentHouse from "@/components/InvestmentHouse";
const baseMetadata: Metadata = {
  title: "Build Your €10,000 Investment House – Free Tool",
  description: "A free tool: lay a foundation, stack bricks of different risk, and see what €10,000 could become over 10, 20 or 30 years.",
  alternates: {
    canonical: "/portfolio-management/"
  }
};
export function generateMetadata() {
  return pageMetadata("house", baseMetadata);
}
export default async function Page() {
  const c = await pageContent("house");
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
              gap: "28px",
              flexWrap: "wrap",
              paddingTop: "8px"
            }}>
              <div style={{
                display: "flex",
                flexDirection: "column"
              }}><span style={{
                  fontFamily: "Raleway,sans-serif",
                  fontWeight: "800",
                  fontSize: "28px"
                }}>{R(c, "hero.text")}</span><span style={{
                  fontSize: "14px",
                  color: "#6B6248"
                }}>{R(c, "hero.text_2")}</span></div>
              <div style={{
                display: "flex",
                flexDirection: "column"
              }}><span style={{
                  fontFamily: "Raleway,sans-serif",
                  fontWeight: "800",
                  fontSize: "28px"
                }}>{R(c, "hero.text_3")}</span><span style={{
                  fontSize: "14px",
                  color: "#6B6248"
                }}>{R(c, "hero.text_4")}</span></div>
              <div style={{
                display: "flex",
                flexDirection: "column"
              }}><span style={{
                  fontFamily: "Raleway,sans-serif",
                  fontWeight: "800",
                  fontSize: "28px"
                }}>{R(c, "hero.text_5")}</span><span style={{
                  fontSize: "14px",
                  color: "#6B6248"
                }}>{R(c, "hero.text_6")}</span></div>
            </div>
          </div>
          <div style={{
            flex: "0 1 420px",
            minWidth: "280px",
            display: "flex",
            justifyContent: "center"
          }}>
            <div aria-hidden="true" style={{
              width: "100%",
              maxWidth: "380px",
              display: "flex",
              flexDirection: "column",
              gap: "6px"
            }}>
              <div className="roof" style={{
                height: "0",
                borderLeft: "190px solid transparent",
                borderRight: "190px solid transparent",
                borderBottom: "90px solid #111111"
              }}></div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: "6px"
              }}>
                <div style={{
                  height: "44px",
                  borderRadius: "8px",
                  background: "#B0122A"
                }}></div><div style={{
                  height: "44px",
                  borderRadius: "8px",
                  background: "#E3572B"
                }}></div><div style={{
                  height: "44px",
                  borderRadius: "8px",
                  background: "#E3572B"
                }}></div><div style={{
                  height: "44px",
                  borderRadius: "8px",
                  background: "#FAAC15"
                }}></div>
                <div style={{
                  height: "44px",
                  borderRadius: "8px",
                  background: "#FAAC15"
                }}></div><div style={{
                  height: "44px",
                  borderRadius: "8px",
                  background: "#FAAC15"
                }}></div><div style={{
                  height: "44px",
                  borderRadius: "8px",
                  background: "#FFD112"
                }}></div><div style={{
                  height: "44px",
                  borderRadius: "8px",
                  background: "#FFD112"
                }}></div>
                <div style={{
                  height: "44px",
                  borderRadius: "8px",
                  background: "#FFD112"
                }}></div><div style={{
                  height: "44px",
                  borderRadius: "8px",
                  background: "#F3E6B8"
                }}></div><div style={{
                  height: "44px",
                  borderRadius: "8px",
                  background: "#F3E6B8"
                }}></div><div style={{
                  height: "44px",
                  borderRadius: "8px",
                  background: "#F3E6B8"
                }}></div>
              </div>
              <div style={{
                height: "34px",
                borderRadius: "8px",
                background: "#111111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFD112",
                fontFamily: "Raleway,sans-serif",
                fontWeight: "800",
                fontSize: "13px",
                letterSpacing: ".1em"
              }}>{R(c, "hero.text_7")}</div>
            </div>
          </div>
        </div>
      </section>}
      {/* HOW */}
      {c.show("how") && <section id="how" style={{
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
            <span className="eyebrow">{R(c, "how.eyebrow")}</span>
            <h2 className="h2">{R(c, "how.heading")}</h2>
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
              }}>{R(c, "how.text")}</span><h3 style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "700",
                fontSize: "22px",
                margin: "0"
              }}>{R(c, "how.heading_2")}</h3><p className="body" style={{
                fontSize: "16px"
              }}>{R(c, "how.paragraph")}</p></div>
            <div className="card"><span style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "800",
                fontSize: "40px",
                lineHeight: "1",
                color: "#FAAC15"
              }}>{R(c, "how.text_2")}</span><h3 style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "700",
                fontSize: "22px",
                margin: "0"
              }}>{R(c, "how.heading_3")}</h3><p className="body" style={{
                fontSize: "16px"
              }}>{R(c, "how.paragraph_2")}</p></div>
            <div className="card"><span style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "800",
                fontSize: "40px",
                lineHeight: "1",
                color: "#FAAC15"
              }}>{R(c, "how.text_3")}</span><h3 style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "700",
                fontSize: "22px",
                margin: "0"
              }}>{R(c, "how.heading_4")}</h3><p className="body" style={{
                fontSize: "16px"
              }}>{R(c, "how.paragraph_3")}</p></div>
          </div>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px"
          }}>
            <span className="eyebrow" style={{
              color: "#6B6248"
            }}>{R(c, "how.eyebrow_2")}</span>
            <div className="g3" style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "12px"
            }}>
              <div className="brick"><span className="swatch" style={{
                  background: "#F3E6B8"
                }}></span><span>{R(c, "how.text_4", [], [{}])}</span></div>
              <div className="brick"><span className="swatch" style={{
                  background: "#FFD112"
                }}></span><span>{R(c, "how.text_5", [], [{}])}</span></div>
              <div className="brick"><span className="swatch" style={{
                  background: "#FAAC15"
                }}></span><span>{R(c, "how.text_6", [], [{}])}</span></div>
              <div className="brick"><span className="swatch" style={{
                  background: "#E3572B"
                }}></span><span>{R(c, "how.text_7", [], [{}])}</span></div>
              <div className="brick"><span className="swatch" style={{
                  background: "#B0122A"
                }}></span><span>{R(c, "how.text_8", [], [{}])}</span></div>
            </div>
            <span style={{
              fontSize: "14px",
              color: "#6B6248"
            }}>{R(c, "how.text_9")}</span>
          </div>
        </div>
      </section>}
      {/* TOOL */}
      {c.show("tool") && <section id="tool" style={{
        background: "#FDF7E8",
        padding: "96px 0"
      }}>
        <div className="wrap" style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            maxWidth: "720px"
          }}>
            <span className="eyebrow">{R(c, "tool.eyebrow")}</span>
            <h2 className="h2">{R(c, "tool.heading")}</h2>
          </div>
          <InvestmentHouse />
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
            fontSize: "46px",
            maxWidth: "760px"
          }}>{R(c, "cta.heading")}</h2>
          <p className="body" style={{
            color: "#111111",
            maxWidth: "600px"
          }}>{R(c, "cta.paragraph")}</p>
          <div style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center"
          }}>
            <a href={c.t("cta.button_link")} className="btn btn-dark">{R(c, "cta.button")}</a>
            <a href={c.t("cta.button_2_link")} className="btn btn-ghost">{R(c, "cta.button_2")}</a>
          </div>
          <span className="compliance" style={{
            color: "#5A4A1A",
            maxWidth: "560px"
          }}>{R(c, "cta.text")}</span>
        </div>
      </section>}

      </main>
      <PageFooter note={c.t("general.footer_note")} />
    </>;
}