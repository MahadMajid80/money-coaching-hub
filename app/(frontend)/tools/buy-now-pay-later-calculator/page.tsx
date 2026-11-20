import type { Metadata } from "next";
import ToolPage, { type Faq } from "@/components/tools/ToolPage";
import BnplCalculator from "@/components/tools/BnplCalculator";
import "../tools.css";
import { withShare } from "@/lib/seo";

export const metadata: Metadata = withShare({
  title: "Buy Now, Pay Later Calculator – What Does It Really Cost?",
  description: "Free buy now, pay later calculator. Enter the price and the monthly payments to see the extra you pay and the equivalent yearly interest rate.",
  alternates: { canonical: "/tools/buy-now-pay-later-calculator/" },
  openGraph: { title: "Buy now, pay later calculator | Money Coaching Hub", description: "Free buy now, pay later calculator. Enter the price and the monthly payments to see the extra you pay and the equivalent yearly interest rate.", url: "/tools/buy-now-pay-later-calculator/" },
});

const FAQ: Faq[] = [
  {
    "q": "Is buy now, pay later interest-free?",
    "a": "Some plans are, if every payment is on time. Others add interest or monthly fees, and missed payments usually bring charges. This calculator shows the real extra cost from the payments you'll make."
  },
  {
    "q": "What does the yearly interest rate mean here?",
    "a": "It's the rate a normal loan would need to charge to cost you the same, based on your payments. It makes plans easy to compare with a credit card or a personal loan."
  },
  {
    "q": "Is it better to pay in full?",
    "a": "If paying in full doesn't empty your emergency fund, it's usually cheaper. If it would, a small interest-free plan paid on time can be the safer choice."
  },
  {
    "q": "Do EU rules cover buy now, pay later?",
    "a": "From 20 November 2026, the EU's new Consumer Credit Directive brings most buy now, pay later plans under consumer credit rules, with clearer information before you sign."
  }
];

export default function Page() {
  return (
    <ToolPage
      title="Buy now, pay later calculator"
      lead="Enter the price and the monthly payments, and see what the plan really costs you on top, and what yearly interest rate that equals."
      tool={<BnplCalculator />}
      faq={FAQ}
      cta={{ title: "Small payments adding up?", text: "A one-to-one session helps you see where your money goes and build a plan you can keep.", href: "/services/", button: "See coaching" }}
      explain={
        <>
      <h2 className="h2">"Pay in 4" is designed to feel free</h2>
      <p className="body" style={{ marginTop: "14px" }}>Small monthly amounts make big purchases feel easy. That's exactly why it's worth checking the total before you click. A plan can be a useful tool if it's interest-free and you pay on time. It can also quietly cost a quarter of the price on top.</p>
      <p className="body" style={{ marginTop: "14px" }}><a href="/smart-financial-choices/buy-now-pay-later-convenience-or-trap/">Read: buy now, pay later, convenience or trap? →</a></p>
        </>
      }
    />
  );
}
