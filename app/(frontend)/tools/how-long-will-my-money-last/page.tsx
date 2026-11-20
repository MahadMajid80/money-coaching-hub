import type { Metadata } from "next";
import ToolPage, { type Faq } from "@/components/tools/ToolPage";
import DrawdownCalculator from "@/components/tools/DrawdownCalculator";
import "../tools.css";

export const metadata: Metadata = {
  title: "How Long Will My Money Last? Retirement Drawdown Calculator (€)",
  description: "Free calculator: enter your savings or pension pot and what you want to take each month, and see how many years your money lasts, with inflation.",
  alternates: { canonical: "/tools/how-long-will-my-money-last/" },
  openGraph: { title: "How long will my money last? | Money Coaching Hub", description: "Free calculator: enter your savings or pension pot and what you want to take each month, and see how many years your money lasts, with inflation.", url: "/tools/how-long-will-my-money-last/" },
};

const FAQ: Faq[] = [
  {
    "q": "How long will €200,000 last in retirement?",
    "a": "It depends on what you take and what the rest earns. At €1,200 a month, rising 2% a year, with 4% a year growth, it lasts roughly 16 years. Take less, or earn more on what's left, and it lasts longer."
  },
  {
    "q": "What return should I assume in retirement?",
    "a": "Many people hold a more cautious mix once they start drawing money, so returns are often lower than in their working years. Try a few rates to see the range."
  },
  {
    "q": "Why raise my withdrawals every year?",
    "a": "Prices rise over time. If you take the same amount every year, it buys a little less each year. Raising it by inflation keeps your lifestyle the same."
  },
  {
    "q": "Does this include the state pension?",
    "a": "No. It only looks at your own savings or pension pot. Your state pension and any other income come on top, which means you may need to take less from your savings."
  }
];

export default function Page() {
  return (
    <ToolPage
      title="How long will my money last?"
      lead="Enter your savings or pension pot and what you'd like to take each month, and see how many years it could last."
      tool={<DrawdownCalculator />}
      faq={FAQ}
      cta={{ title: "Planning for retirement?", text: "A one-to-one session helps you see your full picture, with your savings, pension and plans together.", href: "/services/", button: "Book a session" }}
      explain={
        <>
      <h2 className="h2">Three things decide how long your money lasts</h2>
      <p className="body" style={{ marginTop: "14px" }}>How much you take, how much what's left keeps earning, and how much your withdrawals rise with prices. Small changes to any of them can add or remove years.</p>
      <p className="body" style={{ marginTop: "14px" }}>Many people also have the state pension and other income alongside their savings. This calculator looks at the savings part only, so add your other income to the picture before you decide.</p>
        </>
      }
    />
  );
}
