import type { Metadata } from "next";
import ToolPage, { type Faq } from "@/components/tools/ToolPage";
import EmergencyFundCalculator from "@/components/tools/EmergencyFundCalculator";
import "../tools.css";
import { withShare } from "@/lib/seo";

export const metadata: Metadata = withShare({
  title: "Emergency Fund Calculator (€) – How Much Should I Have Saved?",
  description: "Free emergency fund calculator. Add up your essential monthly costs, choose how many months of cover you need, and see how long it takes to get there.",
  alternates: { canonical: "/tools/emergency-fund-calculator/" },
  openGraph: { title: "Emergency fund calculator | Money Coaching Hub", description: "Free emergency fund calculator. Add up your essential monthly costs, choose how many months of cover you need, and see how long it takes to get there.", url: "/tools/emergency-fund-calculator/" },
});

const FAQ: Faq[] = [
  {
    "q": "How many months of expenses should I save?",
    "a": "Three to six months is a common starting point. Main earners with dependants, the self-employed and anyone whose job feels at risk often aim for nine to twelve months."
  },
  {
    "q": "What counts as an essential cost?",
    "a": "Anything you couldn't avoid paying if your income stopped: home loan or rent, groceries, utilities, insurance, transport to work, childcare and loan repayments."
  },
  {
    "q": "Where should I keep my emergency fund?",
    "a": "Somewhere safe and easy to reach quickly, such as a separate savings account. Not invested, because you may need it at the same time markets are down."
  },
  {
    "q": "Should I invest before my emergency fund is full?",
    "a": "Many people build the emergency fund first, or split their monthly savings between the two. Without a safety net, an emergency can force you to sell investments at the wrong time."
  }
];

export default function Page() {
  return (
    <ToolPage
      title="Emergency fund calculator"
      lead="Find out how big your safety net should be, based on what you really need each month, and when you'll get there."
      tool={<EmergencyFundCalculator />}
      faq={FAQ}
      cta={{ title: "Want a plan you'll actually stick to?", text: "In one-to-one coaching we build your safety net and your savings plan around your real life.", href: "/services/", button: "See coaching" }}
      explain={
        <>
      <h2 className="h2">Why your emergency fund comes first</h2>
      <p className="body" style={{ marginTop: "14px" }}>An emergency fund is what stops a broken car or a lost job from becoming debt. It is also what lets you leave your investments alone when markets fall.</p>
      <p className="body" style={{ marginTop: "14px" }}>Base it on your essentials, not your lifestyle. Most people are surprised how much lower the number is once they strip it back to what they truly can't avoid paying.</p>
      <p className="body" style={{ marginTop: "14px" }}><a href="/employee-financial-wellness/will-ai-take-my-job-protect-your-finances/">Read: will AI take my job? How to protect your finances either way →</a></p>
        </>
      }
    />
  );
}
