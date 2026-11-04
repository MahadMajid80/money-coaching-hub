import { pageContent, pageMetadata, R } from "@/lib/cms/pageContent";
import type { Metadata } from "next";
import { PageFooter, PageHeader } from "@/components/chrome";
import { CallRequestForm } from "@/components/forms";
const baseMetadata: Metadata = {
  title: "Book a 10-minute call",
  description: "Free, 10 minutes, no pitch. Tell Luca what's going on with your money and he'll tell you honestly whether coaching, a course or a workshop is the right next step.",
  alternates: {
    canonical: "/contact-us/"
  }
};
export function generateMetadata() {
  return pageMetadata("contact", baseMetadata);
}
export default async function Page() {
  const c = await pageContent("contact");
  return <>
      <PageHeader plain cta={{
      label: c.t("general.header_button"),
      href: c.t("general.header_button_link")
    }} />
      <main id="main" style={{
      background: "#FDF7E8"
    }}>
      {c.show("section_1") && <section style={{
        padding: "72px 0 96px"
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
            gap: "22px"
          }}>
            <span className="eyebrow">{R(c, "section_1.eyebrow")}</span>
            <h1 style={{
              fontFamily: "Raleway,sans-serif",
              fontWeight: "800",
              fontSize: "56px",
              lineHeight: "1.02",
              letterSpacing: "-0.02em",
              margin: "0"
            }}>{R(c, "section_1.heading")}</h1>
            <p className="body" style={{
              fontSize: "19px",
              maxWidth: "520px"
            }}>{R(c, "section_1.paragraph")}</p>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              paddingTop: "8px"
            }}>
              <div style={{
                display: "flex",
                gap: "14px",
                alignItems: "flex-start"
              }}><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><span className="body" style={{
                  fontSize: "17px"
                }}>{R(c, "section_1.text")}</span></div>
              <div style={{
                display: "flex",
                gap: "14px",
                alignItems: "flex-start"
              }}><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><span className="body" style={{
                  fontSize: "17px"
                }}>{R(c, "section_1.text_2")}</span></div>
              <div style={{
                display: "flex",
                gap: "14px",
                alignItems: "flex-start"
              }}><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><span className="body" style={{
                  fontSize: "17px"
                }}>{R(c, "section_1.text_3")}</span></div>
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              paddingTop: "16px"
            }}>
              <img src={c.img("section_1.image")} alt="" style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                objectFit: "cover"
              }} />
              <span style={{
                fontSize: "15px",
                color: "#3A3A3A"
              }}>{R(c, "section_1.text_4", [{
                  style: {
                    color: "#6B6248"
                  }
                }], [])}</span>
            </div>
          </div>
          <div style={{
            flex: "0 1 480px",
            minWidth: "300px",
            background: "#ffffff",
            borderRadius: "24px",
            padding: "32px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            border: "1px solid #E6E0D0"
          }}>
            <span style={{
              fontFamily: "Raleway,sans-serif",
              fontWeight: "700",
              fontSize: "20px"
            }}>{R(c, "section_1.text_5")}</span>
            <CallRequestForm />
            <span style={{
              fontSize: "13px",
              color: "#6B6248",
              textAlign: "center"
            }}>Prefer email? <a href={c.t("section_1.link_link")}>{R(c, "section_1.link")}</a></span>
          </div>
        </div>
      </section>}

      </main>
      <PageFooter back={false} />
    </>;
}