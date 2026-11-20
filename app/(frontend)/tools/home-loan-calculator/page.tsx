import type { Metadata } from "next";
import ToolPage, { type Faq } from "@/components/tools/ToolPage";
import LoanCalculator from "@/components/tools/LoanCalculator";
import "../tools.css";
import { withShare } from "@/lib/seo";

export const metadata: Metadata = withShare({
  title: "Home Loan Calculator Malta (€) – Repayments, Interest and Overpaying",
  description: "Free home loan calculator in euros. See your monthly repayment, the total interest, and how much paying a little extra each month saves you.",
  alternates: { canonical: "/tools/home-loan-calculator/" },
  openGraph: { title: "Home loan calculator | Money Coaching Hub", description: "Free home loan calculator in euros. See your monthly repayment, the total interest, and how much paying a little extra each month saves you.", url: "/tools/home-loan-calculator/" },
});

const FAQ: Faq[] = [
  {
    "q": "How is the monthly repayment worked out?",
    "a": "It uses the standard formula banks use for repayment loans: the same payment every month, with interest charged monthly at the yearly rate divided by 12. Early on, most of the payment is interest; by the end, most of it pays off the loan."
  },
  {
    "q": "Are Maltese home loans fixed or variable?",
    "a": "Most are variable, linked to the bank's base rate plus a margin, so your repayment can go up or down. Some banks offer a fixed rate for the first few years before switching to variable."
  },
  {
    "q": "Should I pay off my home loan early or invest?",
    "a": "It depends on your interest rate, your emergency fund and how you feel about debt. Paying extra is a guaranteed saving; investing may grow more but with no guarantee. Many people do a bit of both."
  },
  {
    "q": "Does this include stamp duty and fees?",
    "a": "No. It covers the loan repayments only. Stamp duty, notary fees, bank fees and insurance are extra, so ask your bank and notary for the full picture."
  },
  {
    "q": "How long can a home loan in Malta last?",
    "a": "Banks commonly offer terms of up to 40 years, often depending on your age at the end of the loan. A longer term lowers the monthly payment but raises the total interest."
  }
];

export default function Page() {
  return (
    <ToolPage
      title="Home loan calculator"
      lead="Work out your monthly repayment and the total interest, then see how much a small extra payment each month could save you."
      tool={<LoanCalculator />}
      faq={FAQ}
      cta={{ title: "Not sure whether to overpay or invest?", text: "A one-to-one session helps you weigh your home loan against your other goals, with your real numbers.", href: "/services/", button: "Book a session" }}
      explain={
        <>
      <h2 className="h2">Why a little extra goes a long way</h2>
      <p className="body" style={{ marginTop: "14px" }}>In the early years of a home loan, most of each repayment is interest. Anything extra you pay goes straight off the amount you owe, so it stops earning interest for the bank for the rest of the loan.</p>
      <p className="body" style={{ marginTop: "14px" }}>That is why €100 a month extra can take years off a long loan. Before you do it, check two things: that your emergency fund is in place, and whether your bank charges a fee for paying early.</p>
      <p className="body" style={{ marginTop: "14px" }}><a href="/investment-coaching/pay-off-home-loan-or-invest/">Read: should I pay off my home loan early, or invest the money? →</a></p>
        </>
      }
    />
  );
}
