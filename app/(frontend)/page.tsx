import { pageContent, pageMetadata, R } from "@/lib/cms/pageContent";

import { SiteFooter, SiteHeader } from "@/components/chrome";
import { UnspokenForm } from "@/components/forms";
import { ClientNames, longDate, ReviewCards } from "@/components/cms";
import { categoryName, getCategories, getPosts } from "@/lib/blog";
import { getClientLogos, getColumns, getCourse, getReviews } from "@/lib/cms/data";
const monthYear = (iso: string) => new Date(iso).toLocaleDateString("en-GB", {
  month: "short",
  year: "numeric"
});
export function generateMetadata() {
  return pageMetadata("home");
}
export default async function Home() {
  const c = await pageContent("home");
  const [{ items: latest }, cats, latestColumns, logos, reviews, ims] = await Promise.all([
    getPosts({ limit: 3 }),
    getCategories(),
    getColumns(2),
    getClientLogos(),
    getReviews("home"),
    getCourse("investing-made-simple"),
  ]);
  return <div className="home" style={{
    width: "100%",
    fontFamily: "Lato,sans-serif",
    color: "#111111",
    background: "#ffffff",
    display: "flex",
    flexDirection: "column"
  }}>
      <SiteHeader />
      <main id="main" style={{
      display: "contents"
    }}>
      {/* HERO */}
      {c.show("hero") && <section id="top" style={{
        background: "#FDF7E8",
        padding: "72px 0 0"
      }}>
        <div className="wrap" style={{
          display: "flex",
          gap: "48px",
          alignItems: "flex-end",
          flexWrap: "wrap"
        }}>
          <div style={{
            flex: "1 1 480px",
            minWidth: "0",
            paddingBottom: "72px",
            display: "flex",
            flexDirection: "column",
            gap: "28px"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}>
              <div style={{
                display: "flex",
                flexShrink: 0
              }}>
                <img src={c.img("hero.image")} alt="" style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#D9CFB3",
                  border: "2px solid #FDF7E8",
                  objectFit: "cover",
                  display: "block"
                }} />
                <img src={c.img("hero.image_2")} alt="" style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#C9BC9C",
                  border: "2px solid #FDF7E8",
                  marginLeft: "-10px",
                  objectFit: "cover",
                  display: "block"
                }} />
                <img src={c.img("hero.image_3")} alt="" style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#B8A986",
                  border: "2px solid #FDF7E8",
                  marginLeft: "-10px",
                  objectFit: "cover",
                  display: "block"
                }} />
              </div>
              <span style={{
                fontSize: "15px",
                color: "#3A3A3A"
              }}>{R(c, "hero.text", [], [{
                  style: {
                    color: "#111111"
                  }
                }, {
                  style: {
                    color: "#111111"
                  }
                }])}</span>
            </div>
            <h1 style={{
              fontFamily: "Raleway,sans-serif",
              fontWeight: "800",
              fontSize: "64px",
              lineHeight: "1.02",
              letterSpacing: "-0.02em",
              margin: "0",
              color: "#111111"
            }}>{R(c, "hero.heading", [{
                style: {
                  color: "#FAAC15"
                }
              }], [])}</h1>
            <p className="body" style={{
              fontSize: "20px",
              maxWidth: "520px"
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
            flex: "0 1 460px",
            minWidth: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "72px"
          }}>
            <div style={{
              position: "relative",
              width: "100%",
              maxWidth: "420px",
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
              <img src={c.img("hero.image_4")} alt={c.t("hero.image_4_alt")} style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4/5",
                objectFit: "cover",
                objectPosition: "center 15%",
                borderRadius: "28px",
                display: "block"
              }} />
              <div style={{
                position: "absolute",
                left: "-20px",
                bottom: "28px",
                background: "#ffffff",
                borderRadius: "14px",
                padding: "14px 18px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.14)",
                display: "flex",
                flexDirection: "column",
                gap: "2px"
              }}>
                <span style={{
                  fontFamily: "Raleway,sans-serif",
                  fontWeight: "800",
                  fontSize: "22px",
                  lineHeight: "1.15",
                  color: "#111111"
                }}>{R(c, "hero.text_2")}</span>
                <span style={{
                  fontSize: "13px",
                  color: "#6B6248"
                }}>{R(c, "hero.text_3")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>}
      {/* LOGO STRIP */}
      {c.show("logo_strip") && <section style={{
        background: "#111111",
        padding: "22px 0"
      }}>
        <div className="wrap" style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "18px"
        }}>
          <span style={{
            fontSize: "13px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#C9C3B1",
            fontWeight: "700"
          }}>{R(c, "logo_strip.text")}</span>
          <div style={{
            display: "flex",
            gap: "16px 36px",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Raleway,sans-serif",
            fontWeight: "700",
            fontSize: "15px",
            color: "#ffffff"
          }}>
            <ClientNames logos={logos} />
          </div>
        </div>
      </section>}
      {/* COURSE */}
      {c.show("course") && <section id="course" style={{
        background: "#ffffff",
        padding: "96px 0"
      }}>
        <div className="wrap" style={{
          display: "flex",
          gap: "56px",
          flexWrap: "wrap",
          alignItems: "stretch"
        }}>
          <div style={{
            flex: "1 1 520px",
            minWidth: "0",
            display: "flex",
            flexDirection: "column",
            gap: "24px"
          }}>
            <span className="eyebrow">{R(c, "course.eyebrow")}</span>
            <h2 className="h2" style={{
              fontSize: "52px"
            }}>{R(c, "course.heading")}</h2>
            <p className="body" style={{
              fontSize: "20px"
            }}>{R(c, "course.paragraph")}</p>
            <ul style={{
              margin: "0",
              padding: "0",
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              fontSize: "18px",
              color: "#111111"
            }}>
              <li style={{
                display: "flex",
                gap: "14px",
                alignItems: "flex-start"
              }}><span aria-hidden="true" style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  background: "#FAAC15",
                  flex: "0 0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><span>{R(c, "course.text")}</span></li>
              <li style={{
                display: "flex",
                gap: "14px",
                alignItems: "flex-start"
              }}><span aria-hidden="true" style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  background: "#FAAC15",
                  flex: "0 0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><span>{R(c, "course.text_2")}</span></li>
              <li style={{
                display: "flex",
                gap: "14px",
                alignItems: "flex-start"
              }}><span aria-hidden="true" style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  background: "#FAAC15",
                  flex: "0 0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><span>{R(c, "course.text_3")}</span></li>
            </ul>
            <blockquote style={{
              margin: "8px 0 0",
              padding: "20px 24px",
              borderLeft: "4px solid #FAAC15",
              background: "#FDF7E8",
              borderRadius: "0 16px 16px 0",
              fontSize: "17px",
              lineHeight: "1.5",
              color: "#3A3A3A"
            }}>{R(c, "course.quote", [{
                style: {
                  fontSize: "14px",
                  color: "#6B6248"
                }
              }], [])}</blockquote>
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
              gap: "22px",
              height: "100%"
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
              }}>{R(c, "course.text_4")}</span>
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
                }}>{R(c, "course.text_5")}</span>
                <span style={{
                  fontFamily: "Raleway,sans-serif",
                  fontWeight: "800",
                  fontSize: "40px",
                  lineHeight: "1"
                }}>{ims?.startDate ? longDate(ims.startDate) : R(c, "course.text_6")}</span>
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
                  }}>{R(c, "course.text_7")}</span><span style={{
                    fontFamily: "Raleway,sans-serif",
                    fontWeight: "800",
                    fontSize: "22px",
                    color: "#FFD112"
                  }}>{R(c, "course.text_8")}</span></div>
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
                  }}>{R(c, "course.text_9")}</span><span style={{
                    fontFamily: "Raleway,sans-serif",
                    fontWeight: "800",
                    fontSize: "26px",
                    color: "#FFD112"
                  }}>{ims?.price || R(c, "course.text_10")}</span></div>
              </div>
              <p style={{
                margin: "0",
                fontSize: "15px",
                lineHeight: "1.5",
                color: "#C9C3B1"
              }}>{R(c, "course.paragraph_2")}</p>
              <a href={c.t("course.button_link")} className="btn btn-gold" style={{
                width: "100%"
              }}>{R(c, "course.button")}</a>
              <a href={c.t("course.link_link")} style={{
                fontSize: "14px",
                color: "#C9C3B1",
                textAlign: "center",
                textDecoration: "underline"
              }}>{R(c, "course.link")}</a>
            </div>
          </div>
        </div>
        <div className="wrap" style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          paddingTop: "64px"
        }}>
          <span className="eyebrow" style={{
            color: "#6B6248"
          }}>{R(c, "course.eyebrow_2")}</span>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "20px"
          }}>
            <a href={c.t("course.card")} style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              padding: "24px",
              borderRadius: "16px",
              background: "#FDF7E8",
              color: "#111111"
            }}>
              <span style={{
                fontSize: "13px",
                color: "#6B6248"
              }}>{R(c, "course.text_11")}</span>
              <span style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "700",
                fontSize: "20px"
              }}>{R(c, "course.text_12")}</span>
              <span style={{
                fontSize: "15px",
                color: "#3A3A3A",
                lineHeight: "1.5"
              }}>{R(c, "course.text_13")}</span>
              <span style={{
                fontSize: "14px",
                fontWeight: "700",
                marginTop: "auto",
                paddingTop: "8px"
              }}>{R(c, "course.text_14")}</span>
            </a>
            <a href={c.t("course.card_2")} style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              padding: "24px",
              borderRadius: "16px",
              background: "#FDF7E8",
              color: "#111111",
              border: "1.5px solid #FAAC15"
            }}>
              <span style={{
                fontSize: "13px",
                color: "#B07400",
                fontWeight: "700"
              }}>{R(c, "course.text_15")}</span>
              <span style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "700",
                fontSize: "20px"
              }}>{R(c, "course.text_16")}</span>
              <span style={{
                fontSize: "15px",
                color: "#3A3A3A",
                lineHeight: "1.5"
              }}>{R(c, "course.text_17")}</span>
              <span style={{
                fontSize: "14px",
                fontWeight: "700",
                marginTop: "auto",
                paddingTop: "8px"
              }}>{R(c, "course.text_18")}</span>
            </a>
            <a href={c.t("course.card_3")} style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              padding: "24px",
              borderRadius: "16px",
              background: "#FDF7E8",
              color: "#111111"
            }}>
              <span style={{
                fontSize: "13px",
                color: "#6B6248"
              }}>{R(c, "course.text_19")}</span>
              <span style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "700",
                fontSize: "20px"
              }}>{R(c, "course.text_20")}</span>
              <span style={{
                fontSize: "15px",
                color: "#3A3A3A",
                lineHeight: "1.5"
              }}>{R(c, "course.text_21")}</span>
              <span style={{
                fontSize: "14px",
                fontWeight: "700",
                marginTop: "auto",
                paddingTop: "8px"
              }}>{R(c, "course.text_22")}</span>
            </a>
          </div>
        </div>
      </section>}
      {/* CONCERNS BRIDGE */}
      {c.show("concerns_bridge") && <section style={{
        background: "#FDF7E8",
        padding: "96px 0"
      }}>
        <div className="wrap" style={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          alignItems: "center",
          textAlign: "center"
        }}>
          <span className="eyebrow">{R(c, "concerns_bridge.eyebrow")}</span>
          <h2 className="h2" style={{
            maxWidth: "800px"
          }}>{R(c, "concerns_bridge.heading")}</h2>
          <div style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: "980px"
          }}>
            <span className="chip">{R(c, "concerns_bridge.chip")}</span>
            <span className="chip">{R(c, "concerns_bridge.chip_2")}</span>
            <span className="chip">{R(c, "concerns_bridge.chip_3")}</span>
            <span className="chip">{R(c, "concerns_bridge.chip_4")}</span>
            <span className="chip">{R(c, "concerns_bridge.chip_5")}</span>
            <span className="chip">{R(c, "concerns_bridge.chip_6")}</span>
          </div>
          <p className="body" style={{
            maxWidth: "640px"
          }}>{R(c, "concerns_bridge.paragraph")}</p>
          <a href={c.t("concerns_bridge.button_link")} className="btn btn-dark">{R(c, "concerns_bridge.button")}</a>
        </div>
      </section>}
      {/* COACHING */}
      {c.show("coaching") && <section id="coaching" style={{
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
              <span className="eyebrow">{R(c, "coaching.eyebrow")}</span>
              <h2 className="h2">{R(c, "coaching.heading")}</h2>
              <p className="body">{R(c, "coaching.paragraph")}</p>
            </div>
            <a href={c.t("coaching.button_link")} className="btn btn-ghost">{R(c, "coaching.button")}</a>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "20px"
          }}>
            <div className="card" style={{
              borderColor: "#FAAC15",
              boxShadow: "0 0 0 2px #FAAC15 inset",
              padding: "40px"
            }}><span className="eyebrow">{R(c, "coaching.eyebrow_2")}</span><h3 style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "700",
                fontSize: "26px",
                margin: "0"
              }}>{R(c, "coaching.heading_2")}</h3><p className="body" style={{
                fontSize: "17px"
              }}>{R(c, "coaching.paragraph_2")}</p><a href={c.t("coaching.link_link")} style={{
                fontSize: "15px",
                fontWeight: "700",
                marginTop: "auto"
              }}>{R(c, "coaching.link")}</a></div>
            <div className="card" style={{
              padding: "40px"
            }}><span className="eyebrow" style={{
                color: "#6B6248"
              }}>{R(c, "coaching.eyebrow_3")}</span><h3 style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "700",
                fontSize: "26px",
                margin: "0"
              }}>{R(c, "coaching.heading_3")}</h3><p className="body" style={{
                fontSize: "17px"
              }}>{R(c, "coaching.paragraph_3")}</p><a href={c.t("coaching.link_2_link")} style={{
                fontSize: "15px",
                fontWeight: "700",
                marginTop: "auto"
              }}>{R(c, "coaching.link_2")}</a></div>
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap",
            padding: "24px 32px",
            borderRadius: "16px",
            background: "#FDF7E8"
          }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px"
            }}>
              <span style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "700",
                fontSize: "18px"
              }}>{R(c, "coaching.text")}</span>
              <span style={{
                fontSize: "15px",
                color: "#3A3A3A"
              }}>{R(c, "coaching.text_2")}</span>
            </div>
            <a href={c.t("coaching.link_3_link")} style={{
              fontSize: "15px",
              fontWeight: "700",
              whiteSpace: "nowrap"
            }}>{R(c, "coaching.link_3")}</a>
          </div>
        </div>
      </section>}
      {/* ABOUT */}
      {c.show("about") && <section id="about" style={{
        background: "#FDF7E8",
        padding: "96px 0"
      }}>
        <div className="wrap" style={{
          display: "flex",
          gap: "64px",
          alignItems: "center",
          flexWrap: "wrap"
        }}>
          <div style={{
            flex: "0 1 420px",
            minWidth: "280px",
            display: "flex",
            justifyContent: "center"
          }}>
            <div style={{
              position: "relative",
              width: "400px",
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
              <img src={c.img("about.image")} alt={c.t("about.image_alt")} style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4/5",
                objectFit: "cover",
                objectPosition: "62% 20%",
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
            <span className="eyebrow">{R(c, "about.eyebrow")}</span>
            <h2 className="h2">{R(c, "about.heading")}</h2>
            <p className="body">{R(c, "about.paragraph")}</p>
            <p className="body">{R(c, "about.paragraph_2")}</p>
            <div className="stat-row" style={{
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
                  fontSize: "30px"
                }}>{R(c, "about.text")}</span><span style={{
                  fontSize: "14px",
                  color: "#6B6248"
                }}>{R(c, "about.text_2")}</span></div>
              <div style={{
                display: "flex",
                flexDirection: "column"
              }}><span style={{
                  fontFamily: "Raleway,sans-serif",
                  fontWeight: "800",
                  fontSize: "30px"
                }}>{R(c, "about.text_3")}</span><span style={{
                  fontSize: "14px",
                  color: "#6B6248"
                }}>{R(c, "about.text_4")}</span></div>
              <div style={{
                display: "flex",
                flexDirection: "column"
              }}><span style={{
                  fontFamily: "Raleway,sans-serif",
                  fontWeight: "800",
                  fontSize: "30px"
                }}>{R(c, "about.text_5")}</span><span style={{
                  fontSize: "14px",
                  color: "#6B6248"
                }}>{R(c, "about.text_6")}</span></div>
            </div>
            <div style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              paddingTop: "8px"
            }}>
              <a href={c.t("about.button_link")} className="btn btn-gold">{R(c, "about.button")}</a>
              <a href={c.t("about.button_2_link")} className="btn btn-ghost">{R(c, "about.button_2")}</a>
            </div>
          </div>
        </div>
      </section>}
      {/* COMPANIES */}
      {c.show("companies") && <section id="companies" style={{
        background: "#111111",
        color: "#ffffff",
        padding: "80px 0"
      }}>
        <div className="wrap" style={{
          display: "flex",
          gap: "48px",
          alignItems: "center",
          flexWrap: "wrap"
        }}>
          <div style={{
            flex: "0 1 520px",
            minWidth: "280px"
          }}>
            <img src={c.img("companies.image")} alt={c.t("companies.image_alt")} style={{
              width: "100%",
              aspectRatio: "3/2",
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "20px",
              display: "block"
            }} />
          </div>
          <div style={{
            flex: "1 1 460px",
            minWidth: "0",
            display: "flex",
            flexDirection: "column",
            gap: "18px"
          }}>
            <span className="eyebrow" style={{
              color: "#FFD112"
            }}>{R(c, "companies.eyebrow")}</span>
            <h2 className="h2" style={{
              color: "#ffffff"
            }}>{R(c, "companies.heading")}</h2>
            <p className="body" style={{
              color: "#C9C3B1"
            }}>{R(c, "companies.paragraph")}</p>
            <blockquote style={{
              margin: "0",
              fontSize: "17px",
              lineHeight: "1.5",
              color: "#ffffff"
            }}>{R(c, "companies.quote", [{
                style: {
                  fontSize: "14px",
                  color: "#C9C3B1"
                }
              }], [])}</blockquote>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              paddingTop: "8px",
              alignItems: "flex-start"
            }}>
              <a href={c.t("companies.button_link")} className="btn btn-gold">{R(c, "companies.button")}</a>
              <span style={{
                fontSize: "14px",
                color: "#C9C3B1"
              }}>{R(c, "companies.text")}</span>
            </div>
          </div>
        </div>
      </section>}
      {/* TIMES OF MALTA COLUMN */}
      {c.show("times_of_malta_column") && <section id="column" style={{
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
              maxWidth: "680px"
            }}>
              <span className="eyebrow">{R(c, "times_of_malta_column.eyebrow")}</span>
              <h2 className="h2">{R(c, "times_of_malta_column.heading")}</h2>
              <p className="body">{R(c, "times_of_malta_column.paragraph")}</p>
            </div>
            <a href={c.t("times_of_malta_column.button_link")} className="btn btn-ghost" target="_blank" rel="noopener">{R(c, "times_of_malta_column.button")}</a>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "20px"
          }}>
            {latestColumns.map(col => <a key={col.url} href={col.url} target="_blank" rel="noopener" style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              gap: "14px"
            }}>
              <img src={col.image || c.img("times_of_malta_column.image")} alt={c.t("times_of_malta_column.image_alt")} loading="lazy" style={{
                aspectRatio: "16/10",
                width: "100%",
                objectFit: "cover",
                borderRadius: "16px",
                background: "#E8DFC6",
                display: "block"
              }} />
              <span style={{
                fontSize: "13px",
                color: "#6B6248"
              }}>{col.date} · Times of Malta</span>
              <span style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "700",
                fontSize: "20px",
                lineHeight: "1.3"
              }}>{col.title}</span>
            </a>)}
            <div style={{
              borderRadius: "16px",
              background: "#111111",
              color: "#ffffff",
              padding: "32px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              justifyContent: "center"
            }}>
              <span style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "800",
                fontSize: "24px",
                lineHeight: "1.25"
              }}>{R(c, "times_of_malta_column.text")}</span>
              <p style={{
                margin: "0",
                fontSize: "15px",
                lineHeight: "1.5",
                color: "#C9C3B1"
              }}>{R(c, "times_of_malta_column.paragraph_2")}</p>
              <a href={c.t("times_of_malta_column.button_2_link")} className="btn btn-gold" style={{
                alignSelf: "flex-start"
              }}>{R(c, "times_of_malta_column.button_2")}</a>
            </div>
          </div>
        </div>
      </section>}
      {/* TESTIMONIALS */}
      {c.show("testimonials") && <section id="reviews" style={{
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
            alignItems: "center",
            textAlign: "center"
          }}>
            <span className="eyebrow">{R(c, "testimonials.eyebrow")}</span>
            <h2 className="h2">{R(c, "testimonials.heading")}</h2>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "20px"
          }}>
            <ReviewCards reviews={reviews} />
          </div>
          <div style={{
            display: "flex",
            justifyContent: "center"
          }}><a href={c.t("testimonials.link_link")} style={{
              fontWeight: "700",
              fontSize: "15px"
            }}>{R(c, "testimonials.link")}</a></div>
        </div>
      </section>}
      {/* MONEY TYPES */}
      {c.show("money_types") && <section id="types" style={{
        background: "#FDF7E8",
        padding: "96px 0"
      }}>
        <div className="wrap" style={{
          display: "flex",
          gap: "56px",
          alignItems: "center",
          flexWrap: "wrap"
        }}>
          <div style={{
            flex: "1 1 440px",
            minWidth: "0",
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}>
            <span className="eyebrow">{R(c, "money_types.eyebrow")}</span>
            <h2 className="h2">{R(c, "money_types.heading")}</h2>
            <p className="body">{R(c, "money_types.paragraph")}</p>
            <div style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap"
            }}>
              <a href={c.t("money_types.button_link")} className="btn btn-dark">{R(c, "money_types.button")}</a>
              <a href={c.t("money_types.button_2_link")} className="btn btn-ghost">{R(c, "money_types.button_2")}</a>
            </div>
          </div>
          <div style={{
            flex: "1 1 440px",
            minWidth: "0",
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "12px"
          }}>
            {(["innocent","victim","warrior","martyr","fool","creator","tyrant","magician"] as const).map((slug, i) => (
              <a key={slug} href={`/the-8-money-archetypes/#${slug}`} className="type-tile" style={{
                background: slug === "magician" ? "#FAAC15" : "#ffffff",
                borderColor: slug === "magician" ? "#FAAC15" : "#E6E0D0"
              }}>
                <img src={`/images/money-types/${slug}.webp`} alt="" loading="lazy" width={600} height={600} />
                <span>{R(c, `money_types.${i === 0 ? "text" : `text_${i + 1}`}`)}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="wrap" style={{
          paddingTop: "64px"
        }}>
          <a href={c.t("money_types.card")} style={{
            textDecoration: "none",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap",
            padding: "28px 32px",
            borderRadius: "20px",
            background: "#111111"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap"
            }}>
              <div aria-hidden="true" style={{
                display: "grid",
                gridTemplateColumns: "18px 18px 18px",
                gap: "3px"
              }}><span style={{
                  height: "14px",
                  borderRadius: "3px",
                  background: "#E3572B"
                }}></span><span style={{
                  height: "14px",
                  borderRadius: "3px",
                  background: "#FAAC15"
                }}></span><span style={{
                  height: "14px",
                  borderRadius: "3px",
                  background: "#FFD112"
                }}></span><span style={{
                  height: "14px",
                  borderRadius: "3px",
                  background: "#FAAC15"
                }}></span><span style={{
                  height: "14px",
                  borderRadius: "3px",
                  background: "#FFD112"
                }}></span><span style={{
                  height: "14px",
                  borderRadius: "3px",
                  background: "#F3E6B8"
                }}></span></div>
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px"
              }}>
                <span style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "#FFD112"
                }}>{R(c, "money_types.text_9")}</span>
                <span style={{
                  fontFamily: "Raleway,sans-serif",
                  fontWeight: "800",
                  fontSize: "22px",
                  color: "#ffffff"
                }}>{R(c, "money_types.text_10")}</span>
                <span style={{
                  fontSize: "15px",
                  color: "#C9C3B1"
                }}>{R(c, "money_types.text_11")}</span>
              </div>
            </div>
            <span className="btn btn-gold" style={{
              whiteSpace: "nowrap"
            }}>{R(c, "money_types.text_12")}</span>
          </a>
        </div>
      </section>}
      {/* BLOG */}
      {c.show("blog") && <section id="blog" style={{
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
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "24px",
            flexWrap: "wrap"
          }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px"
            }}><span className="eyebrow">{R(c, "blog.eyebrow")}</span><h2 className="h2">{R(c, "blog.heading")}</h2></div>
            <a href={c.t("blog.link_link")} style={{
              fontWeight: "700",
              fontSize: "15px"
            }}>{R(c, "blog.link")}</a>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "20px"
          }}>
            {latest.length ? latest.map(p => <a key={p.id} href={p.path} style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              gap: "14px"
            }}>{p.image ? <img src={p.image.src} alt={p.image.alt} loading="lazy" style={{
                aspectRatio: "16/10",
                width: "100%",
                objectFit: "cover",
                borderRadius: "16px",
                background: "#E8DFC6",
                display: "block"
              }} /> : <div style={{
                aspectRatio: "16/10",
                borderRadius: "16px",
                background: "#E8DFC6"
              }}></div>}<span style={{
                fontSize: "13px",
                color: "#6B6248"
              }}>{categoryName(p.category, cats)} · {monthYear(p.date)} · {p.readingTime} min read</span><span style={{
                fontFamily: "Raleway,sans-serif",
                fontWeight: "700",
                fontSize: "20px",
                lineHeight: "1.3"
              }}>{p.title}</span></a>) : <>
              <a href={c.t("blog.card")} style={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                gap: "14px"
              }}><div style={{
                  aspectRatio: "16/10",
                  borderRadius: "16px",
                  background: "#E8DFC6"
                }}></div><span style={{
                  fontSize: "13px",
                  color: "#6B6248"
                }}>{R(c, "blog.text")}</span><span style={{
                  fontFamily: "Raleway,sans-serif",
                  fontWeight: "700",
                  fontSize: "20px",
                  lineHeight: "1.3"
                }}>{R(c, "blog.text_2")}</span></a>
              <a href={c.t("blog.card_2")} style={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                gap: "14px"
              }}><div style={{
                  aspectRatio: "16/10",
                  borderRadius: "16px",
                  background: "#E8DFC6"
                }}></div><span style={{
                  fontSize: "13px",
                  color: "#6B6248"
                }}>{R(c, "blog.text_3")}</span><span style={{
                  fontFamily: "Raleway,sans-serif",
                  fontWeight: "700",
                  fontSize: "20px",
                  lineHeight: "1.3"
                }}>{R(c, "blog.text_4")}</span></a>
              <a href={c.t("blog.card_3")} style={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                gap: "14px"
              }}><div style={{
                  aspectRatio: "16/10",
                  borderRadius: "16px",
                  background: "#E8DFC6"
                }}></div><span style={{
                  fontSize: "13px",
                  color: "#6B6248"
                }}>{R(c, "blog.text_5")}</span><span style={{
                  fontFamily: "Raleway,sans-serif",
                  fontWeight: "700",
                  fontSize: "20px",
                  lineHeight: "1.3"
                }}>{R(c, "blog.text_6")}</span></a>
            </>}
          </div>
        </div>
      </section>}
      {/* CLOSING CTA + NEWSLETTER */}
      {c.show("closing_cta_newsletter") && <section id="contact" style={{
        background: "#FAAC15",
        padding: "96px 0"
      }}>
        <div className="wrap" style={{
          display: "flex",
          gap: "56px",
          flexWrap: "wrap",
          alignItems: "center"
        }}>
          <div style={{
            flex: "1 1 480px",
            minWidth: "0",
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}>
            <h2 className="h2" style={{
              fontSize: "48px"
            }}>{R(c, "closing_cta_newsletter.heading")}</h2>
            <p className="body" style={{
              color: "#111111"
            }}>{R(c, "closing_cta_newsletter.paragraph")}</p>
            <a href={c.t("closing_cta_newsletter.button_link")} className="btn btn-dark" style={{
              alignSelf: "flex-start"
            }}>{R(c, "closing_cta_newsletter.button")}</a>
          </div>
          <UnspokenForm />
        </div>
      </section>}

      </main>
      <SiteFooter />
    </div>;
}