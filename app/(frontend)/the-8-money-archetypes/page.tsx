import { pageContent, pageMetadata, R } from "@/lib/cms/pageContent";
import type { Metadata } from "next";
import { PageFooter, PageHeader } from "@/components/chrome";
const baseMetadata: Metadata = {
  title: "The 8 Money Types",
  description: "The Innocent, Victim, Warrior, Martyr, Fool, Creator, Tyrant and Magician: the eight money types as Luca Caruana sees them in the coaching room.",
  alternates: {
    canonical: "/the-8-money-archetypes/"
  }
};
export function generateMetadata() {
  return pageMetadata("money-types", baseMetadata);
}
export default async function Page() {
  const c = await pageContent("money-types");
  return <>
      <PageHeader cta={{
      label: c.t("general.header_button"),
      href: c.t("general.header_button_link")
    }} />
      <main id="main">
      {c.show("section_1") && <section style={{
        background: "#FDF7E8",
        padding: "72px 0"
      }}>
        <div className="wrap" style={{
          display: "flex",
          flexDirection: "column",
          gap: "22px",
          maxWidth: "860px"
        }}>
          <span className="eyebrow">{R(c, "section_1.eyebrow")}</span>
          <h1 style={{
            fontFamily: "Raleway,sans-serif",
            fontWeight: "800",
            fontSize: "60px",
            lineHeight: "1.02",
            letterSpacing: "-0.02em",
            margin: "0"
          }}>{R(c, "section_1.heading")}</h1>
          <p className="body" style={{
            fontSize: "20px"
          }}>{R(c, "section_1.paragraph")}</p>
          <p className="body">{R(c, "section_1.paragraph_2")}</p>
          <a href={c.t("section_1.button_link")} className="btn btn-gold" style={{
            alignSelf: "flex-start"
          }}>{R(c, "section_1.button")}</a>
        </div>
      </section>}
      {c.show("section_2") && <section style={{
        background: "#ffffff",
        padding: "96px 0"
      }}>
        <div className="wrap" style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "960px"
        }}>
          <article id="innocent" className="tcard"><div className="icon" style={{
              fontSize: "44px",
              color: "#B07400"
            }}>{R(c, "section_2.text")}</div><div style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}><span className="tag">{R(c, "section_2.text_2")}</span><h3>{R(c, "section_2.heading")}</h3><p>{R(c, "section_2.paragraph")}</p><span className="line">{R(c, "section_2.text_3")}</span></div></article>
          <article id="victim" className="tcard"><div className="icon" style={{
              fontSize: "44px",
              color: "#B07400"
            }}>{R(c, "section_2.text_4")}</div><div style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}><span className="tag">{R(c, "section_2.text_5")}</span><h3>{R(c, "section_2.heading_2")}</h3><p>{R(c, "section_2.paragraph_2", [{}], [])}</p><span className="line">{R(c, "section_2.text_6")}</span></div></article>
          <article id="warrior" className="tcard"><div className="icon" style={{
              fontSize: "44px",
              color: "#B07400"
            }}>{R(c, "section_2.text_7")}</div><div style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}><span className="tag">{R(c, "section_2.text_8")}</span><h3>{R(c, "section_2.heading_3")}</h3><p>{R(c, "section_2.paragraph_3")}</p><span className="line">{R(c, "section_2.text_9")}</span></div></article>
          <article id="martyr" className="tcard"><div className="icon" style={{
              fontSize: "44px",
              color: "#B07400"
            }}>{R(c, "section_2.text_10")}</div><div style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}><span className="tag">{R(c, "section_2.text_11")}</span><h3>{R(c, "section_2.heading_4")}</h3><p>{R(c, "section_2.paragraph_4")}</p><span className="line">{R(c, "section_2.text_12")}</span></div></article>
          <article id="fool" className="tcard"><div className="icon" style={{
              fontSize: "44px",
              color: "#B07400"
            }}>{R(c, "section_2.text_13")}</div><div style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}><span className="tag">{R(c, "section_2.text_14")}</span><h3>{R(c, "section_2.heading_5")}</h3><p>{R(c, "section_2.paragraph_5")}</p><span className="line">{R(c, "section_2.text_15")}</span></div></article>
          <article id="creator" className="tcard"><div className="icon" style={{
              fontSize: "44px",
              color: "#B07400"
            }}>{R(c, "section_2.text_16")}</div><div style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}><span className="tag">{R(c, "section_2.text_17")}</span><h3>{R(c, "section_2.heading_6")}</h3><p>{R(c, "section_2.paragraph_6")}</p><span className="line">{R(c, "section_2.text_18")}</span></div></article>
          <article id="tyrant" className="tcard"><div className="icon" style={{
              fontSize: "44px",
              color: "#B07400"
            }}>{R(c, "section_2.text_19")}</div><div style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}><span className="tag">{R(c, "section_2.text_20")}</span><h3>{R(c, "section_2.heading_7")}</h3><p>{R(c, "section_2.paragraph_7")}</p><span className="line">{R(c, "section_2.text_21")}</span></div></article>
          <article id="magician" className="tcard" style={{
            background: "#FAAC15",
            borderColor: "#FAAC15"
          }}><div className="icon" style={{
              background: "#FFD112",
              color: "#111111",
              fontSize: "44px"
            }}>{R(c, "section_2.text_22")}</div><div style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}><span className="tag" style={{
                color: "#111111"
              }}>{R(c, "section_2.text_23")}</span><h3>{R(c, "section_2.heading_8")}</h3><p style={{
                color: "#111111"
              }}>{R(c, "section_2.paragraph_8")}</p><span className="line">{R(c, "section_2.text_24")}</span></div></article>
        </div>
      </section>}
      {c.show("section_3") && <section style={{
        background: "#111111",
        color: "#ffffff",
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
            color: "#ffffff",
            maxWidth: "760px"
          }}>{R(c, "section_3.heading")}</h2>
          <p className="body" style={{
            color: "#C9C3B1",
            maxWidth: "560px"
          }}>{R(c, "section_3.paragraph")}</p>
          <div style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center"
          }}>
            <a href={c.t("section_3.button_link")} className="btn btn-gold">{R(c, "section_3.button")}</a>
            <a href={c.t("section_3.button_2_link")} className="btn" style={{
              border: "2px solid #ffffff",
              color: "#ffffff"
            }}>{R(c, "section_3.button_2")}</a>
          </div>
        </div>
      </section>}

      </main>
      <PageFooter divider contactLine={false} note={c.t("general.footer_note")} />
    </>;
}