/** Full calculator lists per category — same as each category index page (`/health-fitness`, `/finance`, etc.). */

export type CalculatorLink = { href: string; label: string };

export const HEALTH_FITNESS_CALCULATOR_LINKS: CalculatorLink[] = [
  { href: "/health-fitness/anorexic-bmi-calculator", label: "Anorexic BMI Calculator" },
  { href: "/health-fitness/army-body-fat-calculator", label: "Army Body Fat Calculator" },
  { href: "/health-fitness/bac-calculator", label: "BAC Calculator" },
  { href: "/health-fitness/bmi-calculator", label: "BMI Calculator" },
  { href: "/health-fitness/bmr-calculator", label: "BMR Calculator" },
  { href: "/health-fitness/body-fat-calculator", label: "Body Fat Calculator" },
  { href: "/health-fitness/body-surface-area-calculator", label: "Body Surface Area Calculator" },
  { href: "/health-fitness/body-type-calculator", label: "Body Type Calculator" },
  { href: "/health-fitness/calorie-calculator", label: "Calorie Calculator" },
  { href: "/health-fitness/calories-burned-calculator", label: "Calories Burned Calculator" },
  { href: "/health-fitness/carbohydrate-calculator", label: "Carbohydrate Calculator" },
  { href: "/health-fitness/conception-calculator", label: "Conception Calculator" },
  { href: "/health-fitness/due-date-calculator", label: "Due Date Calculator" },
  { href: "/health-fitness/fat-intake-calculator", label: "Fat Intake Calculator" },
  { href: "/health-fitness/gfr-calculator", label: "GFR Calculator" },
  { href: "/health-fitness/healthy-weight-calculator", label: "Healthy Weight Calculator" },
  { href: "/health-fitness/ideal-weight-calculator", label: "Ideal Weight Calculator" },
  { href: "/health-fitness/lean-body-mass-calculator", label: "Lean Body Mass Calculator" },
  { href: "/health-fitness/macro-calculator", label: "Macro Calculator" },
  { href: "/health-fitness/one-rep-max-calculator", label: "One Rep Max Calculator" },
  { href: "/health-fitness/overweight-calculator", label: "Overweight Calculator" },
  { href: "/health-fitness/ovulation-calculator", label: "Ovulation Calculator" },
  { href: "/health-fitness/pace-calculator", label: "Pace Calculator" },
  { href: "/health-fitness/period-calculator", label: "Period Calculator" },
  { href: "/health-fitness/pregnancy-calculator", label: "Pregnancy Calculator" },
  { href: "/health-fitness/pregnancy-conception-calculator", label: "Pregnancy Conception Calculator" },
  { href: "/health-fitness/pregnancy-weight-gain-calculator", label: "Pregnancy Weight Gain Calculator" },
  { href: "/health-fitness/protein-calculator", label: "Protein Calculator" },
  { href: "/health-fitness/sleep-calculator", label: "Sleep Calculator" },
  { href: "/health-fitness/target-heart-rate-calculator", label: "Target Heart Rate Calculator" },
  { href: "/health-fitness/tdee-calculator", label: "TDEE Calculator" },
  { href: "/health-fitness/weight-watchers-calculator", label: "Weight Watchers Points Calculator" },
];

export const FINANCE_CALCULATOR_LINKS: CalculatorLink[] = [
  { href: "/finance/mortgage", label: "Mortgage Calculator" },
  { href: "/finance/loan", label: "Loan Calculator" },
  { href: "/finance/auto-loan", label: "Auto Loan Calculator" },
  { href: "/finance/inflation", label: "Inflation Calculator" },
  { href: "/finance/general", label: "Finance Calculator" },
  { href: "/finance/income-tax", label: "Income Tax Calculator" },
  { href: "/finance/interest", label: "Interest Calculator" },
  { href: "/finance/payment", label: "Payment Calculator" },
  { href: "/finance/retirement", label: "Retirement Calculator" },
  { href: "/finance/amortization", label: "Amortization Calculator" },
  { href: "/finance/investment", label: "Investment Calculator" },
  { href: "/finance/compound-interest", label: "Compound Interest Calculator" },
  { href: "/finance/salary", label: "Salary Calculator" },
  { href: "/finance/interest-rate", label: "Interest Rate Calculator" },
  { href: "/finance/sales-tax", label: "Sales Tax Calculator" },
];

export const MATHS_CALCULATOR_LINKS: CalculatorLink[] = [
  { href: "/maths/scientific-calculator", label: "Scientific Calculator" },
  { href: "/maths/fraction-calculator", label: "Fraction Calculator" },
  { href: "/maths/percentage-calculator", label: "Percentage Calculator" },
  { href: "/maths/triangle-calculator", label: "Triangle Calculator" },
  {
    href: "/maths/standard-deviation-calculator",
    label: "Standard Deviation Calculator",
  },
  { href: "/maths/random-number-generator", label: "Random Number Generator" },
];

export const OTHER_CALCULATOR_LINKS: CalculatorLink[] = [
  { href: "/other/age-calculator", label: "Age Calculator" },
  { href: "/other/date-calculator", label: "Date Calculator" },
  { href: "/other/time-calculator", label: "Time Calculator" },
  { href: "/other/hours-calculator", label: "Hours Calculator" },
  { href: "/other/gpa-calculator", label: "GPA Calculator" },
  { href: "/other/grade-calculator", label: "Grade Calculator" },
];

/** Maps `exploreHref` from home / category metadata to the full link list for that index. */
export const CALCULATOR_LINKS_BY_EXPLORE_HREF: Record<string, CalculatorLink[]> = {
  "/health-fitness": HEALTH_FITNESS_CALCULATOR_LINKS,
  "/finance": FINANCE_CALCULATOR_LINKS,
  "/maths": MATHS_CALCULATOR_LINKS,
  "/other": OTHER_CALCULATOR_LINKS,
};
