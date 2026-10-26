import type { Metadata } from "next";
import ServiceLayout from "@/components/ServiceLayout";
import { byTag } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "One-on-One Money Coaching Session",
  description:
    "A one-hour money coaching session with Luca Caruana, in person in Malta or via Google Meet. Get clarity on one money question and leave with clear next steps.",
  alternates: { canonical: "/services/one-time-session/" },
};

export default function Page() {
  return (
    <ServiceLayout
      crumb="One Time Session"
      eyebrow="The starting point"
      title={
        <>
          One-on-one money coaching <span className="mark">session</span>
        </>
      }
      lead={
        <p>
          A focused deep-dive on one money question. Property or stocks? Pay the loan or invest? One deep conversation, one breakthrough, and a
          personal direction to move forward.
        </p>
      }
      facts={[
        { label: "Length", value: "1 hour" },
        { label: "Where", value: "In person in Malta, or Google Meet" },
        { label: "First step", value: "Free 15-minute chat" },
      ]}
      introTitle="What to expect in a coaching session"
      intro={
        <>
          <p>
            Individual sessions are one hour long and can be in person (if you&apos;re in Malta) or via Google Meet. We can begin with a free
            15-minute chat to see if we&apos;re the right fit.
          </p>
          <p style={{ marginTop: 16 }}>You&apos;ll walk away with a clearer head, a lighter heart, and a simple money map with clear next steps.</p>
        </>
      }
      outcomesTitle="We'll explore"
      outcomes={["What's really keeping you stuck", "What your numbers are, without the overwhelm", "What's possible if you had clarity and a path forward"]}
      testimonials={byTag("coaching", 3)}
      cta="Book your session"
    />
  );
}
