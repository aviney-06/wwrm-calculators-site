import type { HomeCategorySectionData } from "./types";

export const homeCategorySections: HomeCategorySectionData[] = [
  {
    title: "Health & Fitness Calculator",
    imageSrc:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Fitness training and health",
    links: [
      { label: "BMI Calculator", href: "/health-fitness/bmi-calculator" },
      { label: "Body Fat Calculator", href: "/health-fitness/body-fat-calculator" },
      { label: "TDEE Calculator", href: "/health-fitness/tdee-calculator" },
      { label: "Calorie Calculator", href: "/health-fitness/calorie-calculator" },
      { label: "BMR Calculator", href: "/health-fitness/bmr-calculator" },
      { label: "Macro Calculator", href: "/health-fitness/macro-calculator" },
      { label: "Sleep Calculator", href: "/health-fitness/sleep-calculator" },
      { label: "Pace Calculator", href: "/health-fitness/pace-calculator" },
      { label: "Pregnancy Calculator", href: "/health-fitness/pregnancy-calculator" },
    ],
    exploreHref: "/health-fitness",
  },
  {
    title: "Finance Calculator",
    imageSrc:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Coins and cash savings",
    links: [
      { label: "Mortgage Calculator", href: "/finance/mortgage" },
      { label: "Loan Calculator", href: "/finance/loan" },
      { label: "Auto Loan Calculator", href: "/finance/auto-loan" },
      { label: "Inflation Calculator", href: "/finance/inflation" },
      { label: "Finance Calculator", href: "/finance/general" },
      { label: "Income Tax Calculator", href: "/finance/income-tax" },
    ],
    exploreHref: "/finance",
    disabled: true,
  },
  {
    title: "Maths Calculator",
    imageSrc:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Mathematical formulas on a chalkboard",
    links: [
      { label: "Scientific Calculator", href: "/maths/scientific-calculator" },
      { label: "Fraction Calculator", href: "/maths/fraction-calculator" },
      { label: "Percentage Calculator", href: "/maths/percentage-calculator" },
      { label: "Triangle Calculator", href: "/maths/triangle-calculator" },
      {
        label: "Standard Deviation Calculator",
        href: "/maths/standard-deviation-calculator",
      },
      { label: "Random Number Generator", href: "/maths/random-number-generator" },
    ],
    exploreHref: "/maths",
    disabled: true,
  },
  {
    title: "Other Calculators",
    imageSrc:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Calculator and technical drawings on a desk",
    links: [
      { label: "Age Calculator", href: "/other/age-calculator" },
      { label: "Date Calculator", href: "/other/date-calculator" },
      { label: "Time Calculator", href: "/other/time-calculator" },
      { label: "Hours Calculator", href: "/other/hours-calculator" },
      { label: "GPA Calculator", href: "/other/gpa-calculator" },
      { label: "Grade Calculator", href: "/other/grade-calculator" },
    ],
    exploreHref: "/other",
    disabled: true,
  },
];
