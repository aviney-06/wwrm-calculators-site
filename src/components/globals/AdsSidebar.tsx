"use client";

import { useEffect, useState } from "react";

const ROTATE_MS = 10_000;

const FACTS = [
  {
    title: "Published formulas",
    body: "Our tools use widely cited math—loan amortization schedules, BMI as weight divided by height squared (kg/m²), and established calorie equations—so results stay consistent and checkable against textbooks and official references.",
  },
  {
    title: "Planning, not prescriptions",
    body: "Outputs are for education and rough planning. They are not medical diagnoses, tax filings, investment advice, or legal guidance. Use a qualified professional when decisions carry real risk or liability.",
  },
  {
    title: "Inputs drive everything",
    body: "A small change to interest rate, loan term, body weight, or unit system (lb vs kg) can move results a lot. Always confirm you picked the right units and double-checked numbers before acting on a number.",
  },
  {
    title: "BMI is a screening tool",
    body: "Body Mass Index is a population-level screen; it does not measure body fat directly and can misclassify very muscular people. Health decisions should involve context—activity, diet, and a clinician when needed.",
  },
  {
    title: "Loan numbers are estimates",
    body: "Payment calculators usually assume fixed rates and steady schedules. Real loans can include fees, variable rates, insurance, and rounding—your lender’s disclosure is the source of truth for exact costs.",
  },
  {
    title: "Rounding and display",
    body: "Intermediate steps may be rounded for display. If two calculators differ slightly, it is often due to rounding order, day-count conventions, or APR versus nominal rate—compare methodology, not only the final digit.",
  },
] as const;

export function AdsSidebar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % FACTS.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  const fact = FACTS[index];

  return (
    <aside
      aria-label="Site information"
      className="w-full shrink-0 rounded-lg border border-neutral-3 bg-neutral-3/60 p-5 text-neutral-1 md:w-[min(30%,320px)] lg:max-w-[320px]"
    >
      <div className="flex items-start justify-between gap-2 border-b border-neutral-3 pb-2">
        <h2 className="text-sm font-semibold text-primary">Did you know?</h2>
        <span
          className="shrink-0 text-[10px] font-medium tabular-nums text-neutral-1/50"
          aria-hidden
        >
          {index + 1}/{FACTS.length}
        </span>
      </div>

      <div
        key={index}
        className="ads-sidebar-fact mt-4"
        aria-live="polite"
      >
        <h3 className="text-sm font-semibold text-neutral-1">{fact.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-1/90">
          {fact.body}
        </p>
      </div>

      <p className="mt-5 border-t border-neutral-3 pt-4 text-xs text-neutral-1/65">
        Promotional placements may appear here in the future; content will stay
        separate from calculator logic.
      </p>
    </aside>
  );
}
