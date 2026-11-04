import { pageContent, pageMetadata, R } from "@/lib/cms/pageContent";
import type { Metadata } from "next";
import { PageFooter, PageHeader } from "@/components/chrome";
import QuizSection from "@/components/QuizSection";
import { getQuizWords } from "@/lib/cms/data";
const baseMetadata: Metadata = {
  title: "Money Type Quiz",
  description: "Which money types are running your money life? Take the three-minute Money Type Quiz and find out.",
  alternates: {
    canonical: "/take-money-type-quiz/"
  }
};
export function generateMetadata() {
  return pageMetadata("quiz", baseMetadata);
}
export default async function Page() {
  const c = await pageContent("quiz");
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
          flexDirection: "column",
          gap: "24px",
          alignItems: "center",
          textAlign: "center"
        }}>
          <span className="eyebrow">{R(c, "hero.eyebrow")}</span>
          <h1 style={{
            fontFamily: "Raleway,sans-serif",
            fontWeight: "800",
            fontSize: "60px",
            lineHeight: "1.02",
            letterSpacing: "-0.02em",
            margin: "0",
            maxWidth: "860px"
          }}>{R(c, "hero.heading")}</h1>
          <p className="body" style={{
            fontSize: "20px",
            maxWidth: "640px"
          }}>{R(c, "hero.paragraph")}</p>
          <a href={c.t("hero.button_link")} className="btn btn-gold">{R(c, "hero.button")}</a>
          <span style={{
            fontSize: "13px",
            color: "#6B6248"
          }}>{R(c, "hero.text", [{}], [])}</span>
        </div>
      </section>}
      <QuizSection words={await getQuizWords()} />
      {/* THE EIGHT, SHORT */}
      {c.show("the_eight_short") && <section style={{
        background: "#FDF7E8",
        padding: "96px 0"
      }}>
        <div className="wrap" style={{
          display: "flex",
          flexDirection: "column",
          gap: "32px"
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
            }}><span className="eyebrow">{R(c, "the_eight_short.eyebrow")}</span><h2 className="h2">{R(c, "the_eight_short.heading")}</h2></div>
            <a href={c.t("the_eight_short.link_link")} style={{
              fontWeight: "700",
              fontSize: "15px"
            }}>{R(c, "the_eight_short.link")}</a>
          </div>
          <div className="g4" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "16px"
          }}>
            <a href={c.t("the_eight_short.card")} className="type"><strong style={{
                fontFamily: "Raleway,sans-serif",
                fontSize: "18px"
              }}>{R(c, "the_eight_short.text")}</strong><span style={{
                fontSize: "15px",
                color: "#3A3A3A"
              }}>{R(c, "the_eight_short.text_2")}</span></a>
            <a href={c.t("the_eight_short.card_2")} className="type"><strong style={{
                fontFamily: "Raleway,sans-serif",
                fontSize: "18px"
              }}>{R(c, "the_eight_short.text_3")}</strong><span style={{
                fontSize: "15px",
                color: "#3A3A3A"
              }}>{R(c, "the_eight_short.text_4")}</span></a>
            <a href={c.t("the_eight_short.card_3")} className="type"><strong style={{
                fontFamily: "Raleway,sans-serif",
                fontSize: "18px"
              }}>{R(c, "the_eight_short.text_5")}</strong><span style={{
                fontSize: "15px",
                color: "#3A3A3A"
              }}>{R(c, "the_eight_short.text_6")}</span></a>
            <a href={c.t("the_eight_short.card_4")} className="type"><strong style={{
                fontFamily: "Raleway,sans-serif",
                fontSize: "18px"
              }}>{R(c, "the_eight_short.text_7")}</strong><span style={{
                fontSize: "15px",
                color: "#3A3A3A"
              }}>{R(c, "the_eight_short.text_8")}</span></a>
            <a href={c.t("the_eight_short.card_5")} className="type"><strong style={{
                fontFamily: "Raleway,sans-serif",
                fontSize: "18px"
              }}>{R(c, "the_eight_short.text_9")}</strong><span style={{
                fontSize: "15px",
                color: "#3A3A3A"
              }}>{R(c, "the_eight_short.text_10")}</span></a>
            <a href={c.t("the_eight_short.card_6")} className="type"><strong style={{
                fontFamily: "Raleway,sans-serif",
                fontSize: "18px"
              }}>{R(c, "the_eight_short.text_11")}</strong><span style={{
                fontSize: "15px",
                color: "#3A3A3A"
              }}>{R(c, "the_eight_short.text_12")}</span></a>
            <a href={c.t("the_eight_short.card_7")} className="type"><strong style={{
                fontFamily: "Raleway,sans-serif",
                fontSize: "18px"
              }}>{R(c, "the_eight_short.text_13")}</strong><span style={{
                fontSize: "15px",
                color: "#3A3A3A"
              }}>{R(c, "the_eight_short.text_14")}</span></a>
            <a href={c.t("the_eight_short.card_8")} className="type" style={{
              background: "#FAAC15",
              borderColor: "#FAAC15"
            }}><strong style={{
                fontFamily: "Raleway,sans-serif",
                fontSize: "18px"
              }}>{R(c, "the_eight_short.text_15")}</strong><span style={{
                fontSize: "15px",
                color: "#111111"
              }}>{R(c, "the_eight_short.text_16")}</span></a>
          </div>
        </div>
      </section>}

      </main>
      <PageFooter note={<>The Money Types are from <em>{R(c, "general.text")}</em> by Deborah L. Price, used with permission. This quiz is for self-reflection, not diagnosis or financial advice.</>} />
    </>;
}