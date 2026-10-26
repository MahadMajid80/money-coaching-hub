import type { Metadata } from "next";
import ServiceLayout from "@/components/ServiceLayout";
import { testimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Couples Money Coaching – Improve Your Finances Together",
  description:
    "Money coaching for couples: explore each other's money story, resolve lingering issues and build a shared plan without power struggles.",
  alternates: { canonical: "/services/couples-coaching/" },
};

export default function Page() {
  return (
    <ServiceLayout
      crumb="Couples Coaching"
      eyebrow="Money Talks for Two"
      title={
        <>
          Couples <span className="mark">coaching</span>
        </>
      }
      lead={
        <p>
          Conversations about money can be difficult, especially when emotions are involved. But open and honest dialogue is essential to a strong
          bond between partners. Think of it as the key to financial intimacy.
        </p>
      }
      facts={[
        { label: "Sessions", value: "6–8 sessions" },
        { label: "Length", value: "2 hours each" },
        { label: "Where", value: "In person in Malta, or Google Meet" },
      ]}
      introTitle="Real conversations. Shared goals. Less tension."
      intro={
        <>
          <p>
            Money coaching for couples works much like individual coaching, but needs a minimum of 6–8 sessions of two hours each. You don&apos;t
            need to fight about money. You just need a safe space to understand it, together.
          </p>
        </>
      }
      outcomesTitle="Outcomes"
      outcomes={[
        "Explore and connect with each other's money story, and how your beliefs shape the way you manage finances",
        "Uncover lingering financial issues that have grown over time, and find solutions that work",
        "Open up an honest dialogue about the feelings, emotions and needs tied to money",
        "Build harmony around a shared plan, so you reach mutual goals without giving up individual ones",
      ]}
      includes="The package includes coaching sessions, relevant profile tests, worksheets, calculators, financial resources and recommended strategies."
      testimonials={[testimonials[6], testimonials[1], testimonials[2]]}
      cta="Book a couples coaching chat"
    />
  );
}
