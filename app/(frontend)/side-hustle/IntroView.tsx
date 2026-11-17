import type { ReactNode } from "react";
import { R, type PageContent } from "@/lib/cms/pageContent";
import { SiteHeader } from "@/components/chrome";

/** The "Intro session" view of the Side Hustle page. Shared by /side-hustle/#intro
 *  and the hidden waitlist page /side-hustle-early/ (different checkout link, optional banner). */
export default function IntroView({ c, checkout, banner = null }: { c: PageContent; checkout: string; banner?: ReactNode }) {
  return (
      <div style={{
        width: "100%",
        fontFamily: "Lato,'Segoe UI',sans-serif",
        color: "#111111",
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column"
      }}>
        <SiteHeader cta={{ label: c.t("general.button_2"), href: c.t("general.button_2_link") }} />
        {banner}
        {c.show("in_top") && <section id="in-top" style={{
          background: "#FDF7E8",
          overflow: "hidden"
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
            padding: "64px clamp(20px,4vw,40px) 0",
            boxSizing: "border-box",
            display: "flex",
            flexWrap: "wrap",
            gap: "40px 64px",
            alignItems: "flex-end"
          }}>
            <div style={{
              flex: "1 1 520px",
              minWidth: "0",
              paddingBottom: "72px",
              display: "flex",
              flexDirection: "column",
              gap: "26px"
            }}>
              <p style={{
                margin: "0",
                alignSelf: "flex-start",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "9px 16px",
                borderRadius: "20px",
                border: "1.5px solid #E2D6B4",
                background: "#FFFFFF",
                fontSize: "15px",
                fontWeight: "700",
                lineHeight: "1.4",
                color: "#111111"
              }}><span aria-hidden="true" style={{
                  flex: "0 0 auto",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#FAAC15"
                }}></span><span>{R(c, "in_top.text", [{
                    className: "ph"
                  }], [])}</span></p>
              <h1 className="disp" style={{
                margin: "0",
                fontWeight: "800",
                fontSize: "clamp(42px,4.8vw,66px)",
                lineHeight: "1.04",
                letterSpacing: "-0.02em",
                color: "#111111"
              }}>{R(c, "in_top.heading", [{
                  style: {
                    textDecoration: "underline",
                    textDecorationColor: "#FAAC15",
                    textDecorationThickness: "0.14em",
                    textUnderlineOffset: "0.08em",
                    textDecorationSkipInk: "none"
                  }
                }], [])}</h1>
              <p className="body" style={{
                fontSize: "20px",
                maxWidth: "34em"
              }}>{R(c, "in_top.paragraph")}</p>
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                alignItems: "flex-start"
              }}>
                <a href={c.t("in_top.button_link")} className="btn btn-gold" style={{
                  minHeight: "56px",
                  padding: "0 32px",
                  fontSize: "17px"
                }}>{R(c, "in_top.button")}</a>
                <p style={{
                  margin: "0",
                  fontSize: "15px",
                  lineHeight: "1.5",
                  color: "#3A3A3A"
                }}>{R(c, "in_top.paragraph_2")}</p>
              </div>
            </div>
            <div style={{
              flex: "0 1 460px",
              minWidth: "0",
              display: "flex",
              justifyContent: "center"
            }}>
              <div style={{
                position: "relative",
                width: "100%",
                maxWidth: "460px",
                aspectRatio: "23/28",
                marginTop: "24px",
                borderRadius: "28px 28px 0 0",
                background: "#FFD112",
                overflow: "hidden"
              }}>
                <img src={c.img("in_top.image")} alt={c.t("in_top.image_alt")} style={{
                  position: "absolute",
                  left: "50%",
                  bottom: "0",
                  transform: "translateX(-50%)",
                  width: "108%",
                  maxWidth: "none",
                  height: "auto",
                  display: "block"
                }} />
                <div style={{
                  position: "absolute",
                  left: "20px",
                  bottom: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  padding: "14px 18px",
                  borderRadius: "16px",
                  background: "#FFFFFF",
                  boxShadow: "0 12px 32px rgba(17,17,17,0.18)"
                }}>
                  <span className="disp" style={{
                    fontWeight: "800",
                    fontSize: "22px",
                    lineHeight: "1.15",
                    color: "#111111"
                  }}>{R(c, "in_top.text_2")}</span>
                  <span style={{
                    fontSize: "13px",
                    lineHeight: "1.4",
                    color: "#3A3A3A"
                  }}>{R(c, "in_top.text_3")}</span>
                </div>
              </div>
            </div>
          </div>
        </section>}
        {c.show("section_3") && <section style={{
          background: "#FFFFFF"
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
            padding: "80px clamp(20px,4vw,40px)",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: "48px"
          }}>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "40px 56px",
              alignItems: "center"
            }}>
              <div style={{
                flex: "1 1 460px",
                minWidth: "0",
                display: "flex",
                flexDirection: "column",
                gap: "18px"
              }}>
                <span className="eyebrow">{R(c, "section_3.eyebrow")}</span>
                <h2 className="h2">{R(c, "section_3.heading")}</h2>
                <p className="body">{R(c, "section_3.paragraph")}</p>
                <p className="body">{R(c, "section_3.paragraph_2")}</p>
              </div>
              <ul style={{
                flex: "1 1 420px",
                minWidth: "0",
                margin: "0",
                padding: "0",
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                alignItems: "flex-start"
              }}>
                <li className="disp" style={{
                  boxSizing: "border-box",
                  padding: "16px 22px",
                  borderRadius: "22px 22px 22px 6px",
                  background: "#FDF7E8",
                  border: "1.5px solid #EFE2BF",
                  fontWeight: "700",
                  fontSize: "21px",
                  lineHeight: "1.35",
                  color: "#111111"
                }}>{R(c, "section_3.item")}</li>
                <li className="disp" style={{
                  boxSizing: "border-box",
                  marginLeft: "clamp(0px,5vw,64px)",
                  padding: "16px 22px",
                  borderRadius: "22px 22px 22px 6px",
                  background: "#FDF7E8",
                  border: "1.5px solid #EFE2BF",
                  fontWeight: "700",
                  fontSize: "21px",
                  lineHeight: "1.35",
                  color: "#111111"
                }}>{R(c, "section_3.item_2")}</li>
                <li className="disp" style={{
                  boxSizing: "border-box",
                  marginLeft: "clamp(0px,2.5vw,32px)",
                  padding: "16px 22px",
                  borderRadius: "22px 22px 22px 6px",
                  background: "#FDF7E8",
                  border: "1.5px solid #EFE2BF",
                  fontWeight: "700",
                  fontSize: "21px",
                  lineHeight: "1.35",
                  color: "#111111"
                }}>{R(c, "section_3.item_3")}</li>
              </ul>
            </div>
            <div style={{
              borderTop: "1px solid #EFE6CF",
              paddingTop: "36px",
              display: "flex",
              flexWrap: "wrap",
              gap: "12px 40px",
              alignItems: "baseline"
            }}>
              <p className="disp" style={{
                margin: "0",
                flex: "1 1 520px",
                minWidth: "0",
                fontWeight: "800",
                fontSize: "clamp(24px,2.4vw,32px)",
                lineHeight: "1.25",
                color: "#111111"
              }}>{R(c, "section_3.paragraph_3")}</p>
              <p className="body" style={{
                flex: "1 1 340px",
                minWidth: "0"
              }}>{R(c, "section_3.paragraph_4")}</p>
            </div>
          </div>
        </section>}
        {c.show("section_4") && <section style={{
          background: "#FDF7E8"
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
            padding: "80px clamp(20px,4vw,40px)",
            boxSizing: "border-box",
            display: "flex",
            flexWrap: "wrap",
            gap: "40px 64px",
            alignItems: "flex-start"
          }}>
            <div style={{
              flex: "1 1 300px",
              minWidth: "0",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              alignItems: "flex-start"
            }}>
              <h2 className="h2">{R(c, "section_4.heading")}</h2>
              <a href={c.t("section_4.button_link")} className="btn btn-dark">{R(c, "section_4.button")}</a>
            </div>
            <ol style={{
              flex: "2 1 560px",
              minWidth: "0",
              margin: "0",
              padding: "0",
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              borderBottom: "1px solid #E9DDBC"
            }}>
              <li style={{
                display: "flex",
                gap: "20px",
                alignItems: "flex-start",
                padding: "22px 0",
                borderTop: "1px solid #E9DDBC"
              }}><span aria-hidden="true" className="disp" style={{
                  flex: "0 0 auto",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "#FAAC15",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "800",
                  fontSize: "17px",
                  color: "#111111"
                }}>{R(c, "section_4.text")}</span><span style={{
                  flex: "1 1 auto",
                  minWidth: "0",
                  paddingTop: "8px",
                  fontSize: "19px",
                  lineHeight: "1.55",
                  color: "#111111"
                }}>{R(c, "section_4.text_2")}</span></li>
              <li style={{
                display: "flex",
                gap: "20px",
                alignItems: "flex-start",
                padding: "22px 0",
                borderTop: "1px solid #E9DDBC"
              }}><span aria-hidden="true" className="disp" style={{
                  flex: "0 0 auto",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "#FAAC15",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "800",
                  fontSize: "17px",
                  color: "#111111"
                }}>{R(c, "section_4.text_3")}</span><span style={{
                  flex: "1 1 auto",
                  minWidth: "0",
                  paddingTop: "8px",
                  fontSize: "19px",
                  lineHeight: "1.55",
                  color: "#111111"
                }}>{R(c, "section_4.text_4")}</span></li>
              <li style={{
                display: "flex",
                gap: "20px",
                alignItems: "flex-start",
                padding: "22px 0",
                borderTop: "1px solid #E9DDBC"
              }}><span aria-hidden="true" className="disp" style={{
                  flex: "0 0 auto",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "#FAAC15",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "800",
                  fontSize: "17px",
                  color: "#111111"
                }}>{R(c, "section_4.text_5")}</span><span style={{
                  flex: "1 1 auto",
                  minWidth: "0",
                  paddingTop: "8px",
                  fontSize: "19px",
                  lineHeight: "1.55",
                  color: "#111111"
                }}>{R(c, "section_4.text_6")}</span></li>
              <li style={{
                display: "flex",
                gap: "20px",
                alignItems: "flex-start",
                padding: "22px 0",
                borderTop: "1px solid #E9DDBC"
              }}><span aria-hidden="true" className="disp" style={{
                  flex: "0 0 auto",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "#FAAC15",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "800",
                  fontSize: "17px",
                  color: "#111111"
                }}>{R(c, "section_4.text_7")}</span><span style={{
                  flex: "1 1 auto",
                  minWidth: "0",
                  paddingTop: "8px",
                  fontSize: "19px",
                  lineHeight: "1.55",
                  color: "#111111"
                }}>{R(c, "section_4.text_8")}</span></li>
              <li style={{
                display: "flex",
                gap: "20px",
                alignItems: "flex-start",
                padding: "22px 0",
                borderTop: "1px solid #E9DDBC"
              }}><span aria-hidden="true" className="disp" style={{
                  flex: "0 0 auto",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "#FAAC15",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "800",
                  fontSize: "17px",
                  color: "#111111"
                }}>{R(c, "section_4.text_9")}</span><span style={{
                  flex: "1 1 auto",
                  minWidth: "0",
                  paddingTop: "8px",
                  fontSize: "19px",
                  lineHeight: "1.55",
                  color: "#111111"
                }}>{R(c, "section_4.text_10")}</span></li>
            </ol>
          </div>
        </section>}
        {c.show("section_5") && <section style={{
          background: "#FFFFFF"
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
            padding: "80px clamp(20px,4vw,40px)",
            boxSizing: "border-box",
            display: "flex",
            flexWrap: "wrap",
            gap: "40px 64px",
            alignItems: "flex-start"
          }}>
            <div style={{
              flex: "0 1 420px",
              minWidth: "0",
              display: "flex",
              flexDirection: "column",
              gap: "20px"
            }}>
              <img src={c.img("section_5.image")} alt={c.t("section_5.image_alt")} style={{
                width: "100%",
                maxWidth: "420px",
                aspectRatio: "4/5",
                height: "auto",
                objectFit: "cover",
                objectPosition: "50% 22%",
                borderRadius: "24px",
                display: "block"
              }} />
              <figure style={{
                margin: "0",
                padding: "22px 24px",
                borderRadius: "20px",
                background: "#FDF7E8",
                display: "flex",
                flexDirection: "column",
                gap: "14px"
              }}>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px"
                }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                    fontSize: "14px",
                    color: "#6B6248"
                  }}><span>{R(c, "section_5.text")}</span><span style={{
                      fontWeight: "700",
                      color: "#111111"
                    }}>{R(c, "section_5.text_2")}</span></div>
                  <div style={{
                    height: "14px",
                    borderRadius: "7px",
                    background: "#EFE4C6",
                    overflow: "hidden"
                  }}><div style={{
                      width: "1%",
                      minWidth: "4px",
                      height: "100%",
                      borderRadius: "7px",
                      background: "#FAAC15"
                    }}></div></div>
                </div>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px"
                }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                    fontSize: "14px",
                    color: "#6B6248"
                  }}><span>{R(c, "section_5.text_3")}</span><span style={{
                      fontWeight: "700",
                      color: "#111111"
                    }}>{R(c, "section_5.text_4")}</span></div>
                  <div style={{
                    height: "14px",
                    borderRadius: "7px",
                    background: "#EFE4C6",
                    overflow: "hidden"
                  }}><div style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "7px",
                      background: "#FAAC15"
                    }}></div></div>
                </div>
                <figcaption style={{
                  fontSize: "13px",
                  lineHeight: "1.4",
                  color: "#6B6248"
                }}>{R(c, "section_5.text_5")}</figcaption>
              </figure>
            </div>
            <div style={{
              flex: "1 1 480px",
              minWidth: "0",
              display: "flex",
              flexDirection: "column",
              gap: "18px"
            }}>
              <span className="eyebrow">{R(c, "section_5.eyebrow")}</span>
              <h2 className="h2">{R(c, "section_5.heading")}</h2>
              <p className="body" style={{
                fontSize: "21px",
                color: "#111111"
              }}>{R(c, "section_5.paragraph")}</p>
              <p className="body">{R(c, "section_5.paragraph_2")}</p>
              <p style={{
                margin: "0",
                padding: "14px 18px",
                border: "1.5px dashed #D9C48A",
                borderRadius: "14px",
                fontSize: "15px",
                lineHeight: "1.55",
                color: "#6B6248"
              }}>{R(c, "section_5.paragraph_3")}</p>
              <ul style={{
                margin: "6px 0 0",
                padding: "0",
                listStyle: "none",
                display: "flex",
                flexWrap: "wrap",
                gap: "10px"
              }}>
                <li style={{
                  padding: "8px 14px",
                  borderRadius: "999px",
                  border: "1.5px solid #E2D6B4",
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#111111"
                }}>{R(c, "section_5.item")}</li>
                <li style={{
                  padding: "8px 14px",
                  borderRadius: "999px",
                  border: "1.5px solid #E2D6B4",
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#111111"
                }}>{R(c, "section_5.item_2")}</li>
                <li style={{
                  padding: "8px 14px",
                  borderRadius: "999px",
                  border: "1.5px solid #E2D6B4",
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#111111"
                }}>{R(c, "section_5.item_3")}</li>
                <li style={{
                  padding: "8px 14px",
                  borderRadius: "999px",
                  border: "1.5px solid #E2D6B4",
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#111111"
                }}>{R(c, "section_5.item_4")}</li>
                <li style={{
                  padding: "8px 14px",
                  borderRadius: "999px",
                  border: "1.5px solid #E2D6B4",
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#111111"
                }}>{R(c, "section_5.item_5")}</li>
              </ul>
            </div>
          </div>
        </section>}
        {c.show("in_book") && <section id="in-book" style={{
          background: "#FDF7E8"
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
            padding: "80px clamp(20px,4vw,40px)",
            boxSizing: "border-box",
            display: "flex",
            flexWrap: "wrap",
            gap: "40px 64px",
            alignItems: "center"
          }}>
            <div style={{
              flex: "1 1 440px",
              minWidth: "0",
              display: "flex",
              flexDirection: "column",
              gap: "18px"
            }}>
              <h2 className="h2">{R(c, "in_book.heading")}</h2>
              <p className="body">{R(c, "in_book.paragraph")}</p>
              <p className="body">{R(c, "in_book.paragraph_2", [], [{
                  style: {
                    color: "#111111"
                  }
                }])}</p>
            </div>
            <div style={{
              flex: "0 1 460px",
              minWidth: "0",
              background: "#111111",
              color: "#FFFFFF",
              borderRadius: "24px",
              padding: "36px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: "22px"
            }}>
              <span style={{
                alignSelf: "flex-start",
                padding: "7px 14px",
                borderRadius: "999px",
                background: "#FAAC15",
                color: "#111111",
                fontWeight: "700",
                fontSize: "13px",
                letterSpacing: ".1em",
                textTransform: "uppercase"
              }}>{R(c, "in_book.text")}</span>
              <div style={{
                display: "flex",
                gap: "18px",
                alignItems: "center"
              }}>
                <div aria-hidden="true" style={{
                  flex: "0 0 auto",
                  width: "76px",
                  borderRadius: "14px",
                  overflow: "hidden",
                  background: "#FFFFFF",
                  textAlign: "center"
                }}>
                  <div style={{
                    background: "#FAAC15",
                    color: "#111111",
                    fontWeight: "700",
                    fontSize: "12px",
                    letterSpacing: ".14em",
                    padding: "5px 0"
                  }}>{R(c, "in_book.text_2")}</div>
                  <div className="disp" style={{
                    fontWeight: "800",
                    fontSize: "34px",
                    lineHeight: "1",
                    padding: "8px 0 10px",
                    color: "#111111"
                  }}>{R(c, "in_book.text_3")}</div>
                </div>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  minWidth: "0"
                }}>
                  <span className="disp" style={{
                    fontWeight: "800",
                    fontSize: "22px",
                    lineHeight: "1.25",
                    color: "#FFFFFF"
                  }}>{R(c, "in_book.text_4")}</span>
                  <span style={{
                    fontSize: "16px",
                    color: "#C9C3B1"
                  }}><span className="ph-d">{R(c, "in_book.text_5")}</span></span>
                </div>
              </div>
              <dl style={{
                margin: "0",
                display: "flex",
                flexDirection: "column",
                borderBottom: "1px solid #2E2E2E"
              }}>
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "4px 16px",
                  padding: "14px 0",
                  borderTop: "1px solid #2E2E2E"
                }}><dt style={{
                    flex: "0 0 96px",
                    fontSize: "12px",
                    fontWeight: "700",
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    color: "#C9C3B1",
                    paddingTop: "3px"
                  }}>{R(c, "in_book.text_6")}</dt><dd style={{
                    margin: "0",
                    flex: "1 1 200px",
                    minWidth: "0",
                    fontSize: "16px",
                    lineHeight: "1.5",
                    color: "#FFFFFF"
                  }}>{R(c, "in_book.text_7", [{
                      className: "ph-d"
                    }], [])}</dd></div>
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "4px 16px",
                  padding: "14px 0",
                  borderTop: "1px solid #2E2E2E"
                }}><dt style={{
                    flex: "0 0 96px",
                    fontSize: "12px",
                    fontWeight: "700",
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    color: "#C9C3B1",
                    paddingTop: "3px"
                  }}>{R(c, "in_book.text_8")}</dt><dd style={{
                    margin: "0",
                    flex: "1 1 200px",
                    minWidth: "0",
                    fontSize: "16px",
                    lineHeight: "1.5",
                    color: "#FFFFFF"
                  }}>{R(c, "in_book.text_9")}</dd></div>
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "4px 16px",
                  padding: "14px 0",
                  borderTop: "1px solid #2E2E2E"
                }}><dt style={{
                    flex: "0 0 96px",
                    fontSize: "12px",
                    fontWeight: "700",
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    color: "#C9C3B1",
                    paddingTop: "3px"
                  }}>{R(c, "in_book.text_10")}</dt><dd style={{
                    margin: "0",
                    flex: "1 1 200px",
                    minWidth: "0",
                    fontSize: "16px",
                    lineHeight: "1.5",
                    color: "#FFFFFF"
                  }}>{R(c, "in_book.text_11")}</dd></div>
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "4px 16px",
                  padding: "14px 0",
                  borderTop: "1px solid #2E2E2E"
                }}><dt style={{
                    flex: "0 0 96px",
                    fontSize: "12px",
                    fontWeight: "700",
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    color: "#C9C3B1",
                    paddingTop: "3px"
                  }}>{R(c, "in_book.text_12")}</dt><dd style={{
                    margin: "0",
                    flex: "1 1 200px",
                    minWidth: "0",
                    fontSize: "16px",
                    lineHeight: "1.5",
                    color: "#FFFFFF"
                  }}><span className="ph-d">{R(c, "in_book.text_13")}</span></dd></div>
              </dl>
              <a href={checkout} className="btn btn-gold" style={{
                width: "100%"
              }}>{R(c, "in_book.button")}</a>
            </div>
          </div>
        </section>}
        {c.show("section_7") && <section style={{
          background: "#FFFFFF"
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
            padding: "80px clamp(20px,4vw,40px)",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: "36px"
          }}>
            <h2 className="h2">{R(c, "section_7.heading")}</h2>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px"
            }}>
              <div style={{
                flex: "1 1 440px",
                minWidth: "0",
                boxSizing: "border-box",
                background: "#FDF7E8",
                borderRadius: "20px",
                padding: "28px 30px",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}>
                <h3 className="disp" style={{
                  margin: "0",
                  fontWeight: "800",
                  fontSize: "20px",
                  lineHeight: "1.3",
                  color: "#111111"
                }}>{R(c, "section_7.heading_2")}</h3>
                <p className="body" style={{
                  fontSize: "17px",
                  lineHeight: "1.6"
                }}>{R(c, "section_7.paragraph")}</p>
              </div>
              <div style={{
                flex: "1 1 440px",
                minWidth: "0",
                boxSizing: "border-box",
                background: "#FDF7E8",
                borderRadius: "20px",
                padding: "28px 30px",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}>
                <h3 className="disp" style={{
                  margin: "0",
                  fontWeight: "800",
                  fontSize: "20px",
                  lineHeight: "1.3",
                  color: "#111111"
                }}>{R(c, "section_7.heading_3")}</h3>
                <p className="body" style={{
                  fontSize: "17px",
                  lineHeight: "1.6"
                }}>{R(c, "section_7.paragraph_2")}</p>
              </div>
              <div style={{
                flex: "1 1 440px",
                minWidth: "0",
                boxSizing: "border-box",
                background: "#FDF7E8",
                borderRadius: "20px",
                padding: "28px 30px",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}>
                <h3 className="disp" style={{
                  margin: "0",
                  fontWeight: "800",
                  fontSize: "20px",
                  lineHeight: "1.3",
                  color: "#111111"
                }}>{R(c, "section_7.heading_4")}</h3>
                <p className="body" style={{
                  fontSize: "17px",
                  lineHeight: "1.6"
                }}>{R(c, "section_7.paragraph_3")}</p>
              </div>
              <div style={{
                flex: "1 1 440px",
                minWidth: "0",
                boxSizing: "border-box",
                background: "#FDF7E8",
                borderRadius: "20px",
                padding: "28px 30px",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}>
                <h3 className="disp" style={{
                  margin: "0",
                  fontWeight: "800",
                  fontSize: "20px",
                  lineHeight: "1.3",
                  color: "#111111"
                }}>{R(c, "section_7.heading_5")}</h3>
                <p className="body" style={{
                  fontSize: "17px",
                  lineHeight: "1.6"
                }}><span className="ph">{R(c, "section_7.text")}</span></p>
              </div>
            </div>
          </div>
        </section>}
        {c.show("section_8") && <section style={{
          background: "#FAAC15"
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
            padding: "80px clamp(20px,4vw,40px)",
            boxSizing: "border-box",
            display: "flex",
            flexWrap: "wrap",
            gap: "28px 48px",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{
              flex: "1 1 560px",
              minWidth: "0",
              display: "flex",
              flexDirection: "column",
              gap: "14px"
            }}>
              <h2 className="h2" style={{
                fontSize: "clamp(34px,4vw,52px)"
              }}>{R(c, "section_8.heading")}</h2>
              <p style={{
                margin: "0",
                fontSize: "18px",
                lineHeight: "1.5",
                color: "#111111"
              }}>{R(c, "section_8.paragraph", [{
                  className: "ph"
                }], [])}</p>
            </div>
            <a href={c.t("section_8.button_link")} className="btn btn-dark" style={{
              minHeight: "58px",
              padding: "0 34px",
              fontSize: "17px"
            }}>{R(c, "section_8.button")}</a>
          </div>
        </section>}
        <footer style={{
          background: "#111111",
          color: "#C9C3B1"
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
            padding: "44px clamp(20px,4vw,40px)",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: "18px"
          }}>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px"
            }}>
              <span className="disp" style={{
                fontWeight: "800",
                fontSize: "18px",
                letterSpacing: ".04em",
                color: "#FFFFFF"
              }}>{R(c, "general.text_2")}</span>
              <nav aria-label="Legal" style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                fontSize: "14px"
              }}><a href={c.t("general.link_4_link")} className="lk-d">{R(c, "general.link_4")}</a><a href={c.t("general.link_5_link")} className="lk-d">{R(c, "general.link_5")}</a><a href={c.t("general.link_6_link")} className="lk-d">{R(c, "general.link_6")}</a></nav>
            </div>
            <p style={{
              margin: "0",
              maxWidth: "62em",
              fontSize: "15px",
              lineHeight: "1.6",
              color: "#FFFFFF"
            }}>{R(c, "general.paragraph_4")}</p>
            <p style={{
              margin: "0",
              maxWidth: "62em",
              fontSize: "13px",
              lineHeight: "1.6"
            }}>{R(c, "general.paragraph_5")}</p>
            <p style={{
              margin: "0",
              fontSize: "13px"
            }}>{R(c, "general.paragraph_6")}</p>
          </div>
        </footer>
      </div>
  );
}
