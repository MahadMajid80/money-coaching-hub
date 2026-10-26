import type { Metadata } from "next";
import ServiceLayout from "@/components/ServiceLayout";
import { testimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Individual Money Coaching – The Financial Transformation Package",
  description:
    "Redefine your relationship with money. Four interactive coaching sessions over two months to dissolve money blocks, build lasting habits and leave with an action plan.",
  alternates: { canonical: "/services/individual-coaching/" },
};

export default function Page() {
  return (
    <ServiceLayout
      crumb="Individual Coaching"
      eyebrow="The Financial Transformation Package"
      title={
        <>
          Individual <span className="mark">money</span> coaching
        </>
      }
      lead={
        <p>
          Do you want to redefine your relationship with money? Through four interactive sessions over two months, we&apos;ll rewrite your money
          story, build habits that last and create an action plan for every one of your financial goals.
        </p>
      }
      facts={[
        { label: "Format", value: "4 interactive sessions" },
        { label: "Duration", value: "2 months" },
        { label: "Support", value: "Accountability between sessions" },
      ]}
      introTitle="A package built around you"
      intro={
        <>
          <p>
            From personal coaching sessions to worksheets, calculators and relevant tests, the package gives you all the tools and support you need
            to reach your goals.
          </p>
          <p style={{ marginTop: 16 }}>Book a free 15–30 minute chat to discover if it&apos;s right for you.</p>
        </>
      }
      outcomesTitle="Together we'll"
      outcomes={[
        "Uncover and dissolve the blocks holding you back from a financially secure future",
        "Create positive habits that will stay with you for good",
        "Craft an action plan to reach all of your personal financial goals",
        "Keep you on track with accountability support along the way",
      ]}
      topicsTitle="What we'll tackle in this package"
      topics={[
        { title: "Your money biography", text: "Where your beliefs about money came from, and how they show up today." },
        { title: "Mother / father mirroring", text: "The money patterns you inherited, and which ones you want to keep." },
        { title: "Money types & behaviours", text: "Your money archetypes and how they drive your everyday decisions." },
        { title: "Practical steps to results", text: "Budgeting, saving and investing steps you can actually stick to." },
      ]}
      testimonials={[testimonials[0], testimonials[5], testimonials[4]]}
      cta="Book a free chat"
    />
  );
}
