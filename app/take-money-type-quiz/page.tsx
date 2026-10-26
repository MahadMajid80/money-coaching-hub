import type { Metadata } from "next";
import Link from "next/link";
import MoneyQuiz from "@/components/MoneyQuiz";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Take the Money Type Quiz",
  description:
    "Which money type is running your money life? Pick the words that describe your tendencies with money and discover your dominant money archetypes.",
  alternates: { canonical: "/take-money-type-quiz/" },
};

export default function QuizPage() {
  return (
    <div className="frame">
      <PageHero
        crumbs={[{ label: "Money Types", href: "/the-8-money-archetypes/" }, { label: "Quiz" }]}
        eyebrow="Money Type Quiz · 3 minutes"
        title={
          <>
            Which money type is running your <span className="mark">money life?</span>
          </>
        }
        lead={
          <p>
            Click each word that describes your tendencies with money. Go with your gut: there are no right or wrong answers. When you&apos;re done,
            press <strong>See results</strong>.
          </p>
        }
        actions={
          <Link href="/the-8-money-archetypes/" className="btn btn--line">
            Read about the 8 money types first
          </Link>
        }
      />
      <section className="row">
        <div className="pad" style={{ paddingTop: 48 }}>
          <MoneyQuiz />
        </div>
        <p className="source">The Eight Money Types and the Money Type Quiz are excerpted from the book Money Magic by Deborah L. Price © 2001. All rights reserved. Used with permission.</p>
      </section>
    </div>
  );
}
