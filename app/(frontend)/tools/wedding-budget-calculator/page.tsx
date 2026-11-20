import type { Metadata } from "next";
import ToolPage, { type Faq } from "@/components/tools/ToolPage";
import WeddingCalculator from "@/components/tools/WeddingCalculator";
import "../tools.css";

export const metadata: Metadata = {
  title: "Wedding Budget Calculator Malta (€) – What Will Our Wedding Cost?",
  description: "Free Maltese wedding budget calculator. Add your guests and costs, see the total and cost per guest, and how much to save each month until the big day.",
  alternates: { canonical: "/tools/wedding-budget-calculator/" },
  openGraph: { title: "Wedding budget calculator | Money Coaching Hub", description: "Free Maltese wedding budget calculator. Add your guests and costs, see the total and cost per guest, and how much to save each month until the big day.", url: "/tools/wedding-budget-calculator/" },
};

const FAQ: Faq[] = [
  {
    "q": "How much does a wedding cost in Malta?",
    "a": "It varies a lot with the guest list, venue and season. A Maltese wedding planner quoted in the press estimated an average of €35,000–€40,000, with around €120 per guest for food, venue and drinks. Use your own quotes for a real number."
  },
  {
    "q": "How much should we save each month for our wedding?",
    "a": "Take your total budget, subtract what you have already saved and any money family has promised, and divide by the months left. The calculator does this for you."
  },
  {
    "q": "Should we take a loan for our wedding?",
    "a": "It's usually better to plan a wedding you can pay for in cash. Starting married life with a loan to repay, often alongside a home loan, adds pressure at the very start."
  },
  {
    "q": "Can we count on wedding gifts to pay for the wedding?",
    "a": "It's safer not to. Gifts often arrive after suppliers need paying, and the amounts are hard to predict. Treat them as a bonus."
  }
];

export default function Page() {
  return (
    <ToolPage
      title="Wedding budget calculator"
      lead="See what your wedding could cost all in, what each guest really costs, and how much to save each month until the big day."
      tool={<WeddingCalculator />}
      faq={FAQ}
      cta={{ title: "Getting married and talking money?", text: "Couples coaching helps you plan the wedding, the home and your money together, without the arguments.", href: "/services/", button: "See couples coaching" }}
      explain={
        <>
      <h2 className="h2">The guest list is your biggest money decision</h2>
      <p className="body" style={{ marginTop: "14px" }}>In Malta, food and drinks for the reception are usually the largest part of the budget, so every extra table adds up fast. Deciding the guest list together, early, saves more than any discount on flowers.</p>
      <p className="body" style={{ marginTop: "14px" }}>Agree on a total before you start booking, keep a buffer for the surprises, and try not to start married life paying off the wedding.</p>
        </>
      }
    />
  );
}
