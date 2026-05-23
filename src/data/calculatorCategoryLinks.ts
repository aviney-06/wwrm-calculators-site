/** Full calculator lists per category — same as each category index page (`/health-fitness`, `/finance`, etc.). */

import { CONVERSION_CALCULATOR_LINKS } from "@/data/conversionCalculators";
import { FINANCE_EXTRA_CALCULATORS } from "@/data/financeExtraCalculators";
import { MATHS_EXTRA_CALCULATORS } from "@/data/mathsExtraCalculators";
import { OTHER_EXTRA_CALCULATORS } from "@/data/otherExtraCalculators";
import { TECHNOLOGY_EXTRA_CALCULATORS } from "@/data/technologyExtraCalculators";

export type CalculatorLink = { href: string; label: string };

export { CONVERSION_CALCULATOR_LINKS };

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
  { href: "/health-fitness/steps-to-calories-calculator", label: "Steps to Calories Calculator" },
  { href: "/health-fitness/target-heart-rate-calculator", label: "Target Heart Rate Calculator" },
  { href: "/health-fitness/tdee-calculator", label: "TDEE Calculator" },
  { href: "/health-fitness/walking-calorie-calculator", label: "Walking Calorie Calculator" },
  { href: "/health-fitness/weight-calculator", label: "Weight Calculator" },
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
  ...FINANCE_EXTRA_CALCULATORS.map((c) => ({
    href: `/finance/${c.slug}`,
    label: c.title,
  })),
];

export const MATHS_CALCULATOR_LINKS: CalculatorLink[] = [
  { href: "/maths/scientific-calculator", label: "Scientific Calculator" },
  { href: "/maths/random-number-generator", label: "Random Number Generator" },
  { href: "/maths/random-number-generator-1-10", label: "Random Number Generator 1–10" },
  { href: "/maths/fraction-calculator", label: "Fraction Calculator" },
  { href: "/maths/fraction-to-decimal-calculator", label: "Fraction to Decimal Calculator" },
  { href: "/maths/decimal-to-fraction-calculator", label: "Decimal to Fraction Calculator" },
  { href: "/maths/percent-calculator", label: "Percent Calculator" },
  { href: "/maths/percentage-increase-calculator", label: "Percentage Increase Calculator" },
  { href: "/maths/percent-change-calculator", label: "Percent Change Calculator" },
  { href: "/maths/percent-difference-calculator", label: "Percent Difference Calculator" },
  { href: "/maths/percent-off-calculator", label: "Percent Off Calculator" },
  { href: "/maths/rounding-numbers-calculator", label: "Rounding Numbers Calculator" },
  { href: "/maths/standard-deviation-calculator", label: "Standard Deviation Calculator" },
  { href: "/maths/mean-median-mode-calculator", label: "Mean Median Mode Calculator" },
  { href: "/maths/average-calculator", label: "Average Calculator" },
  { href: "/maths/z-score-calculator", label: "Z Score Calculator" },
  { href: "/maths/circumference-calculator", label: "Circumference Calculator" },
  { href: "/maths/area-of-circle-calculator", label: "Area of a Circle Calculator" },
  { href: "/maths/area-calculator", label: "Area Calculator" },
  { href: "/maths/triangle-calculator", label: "Triangle Calculator" },
  { href: "/maths/right-triangle-calculator", label: "Right Triangle Calculator" },
  { href: "/maths/pythagorean-theorem-calculator", label: "Pythagorean Theorem Calculator" },
  { href: "/maths/volume-calculator", label: "Volume Calculator" },
  { href: "/maths/cylinder-volume-calculator", label: "Cylinder Volume Calculator" },
  { href: "/maths/distance-calculator", label: "Distance Calculator" },
  { href: "/maths/speed-distance-time-calculator", label: "Speed Distance Time Calculator" },
  { href: "/maths/binary-calculator", label: "Binary Calculator" },
  { href: "/maths/mixed-numbers-calculator", label: "Mixed Numbers Calculator" },
  { href: "/maths/percentage-decrease-calculator", label: "Percentage Decrease Calculator" },
  { href: "/maths/ratio-calculator", label: "Ratio Calculator" },
  { href: "/maths/circumference-to-diameter-calculator", label: "Circumference to Diameter Calculator" },
  { href: "/maths/math-calculator", label: "Math Calculator" },
  { href: "/maths/fraction-simplify-calculator", label: "Fraction Simplify Calculator" },
  { href: "/maths/long-division-calculator", label: "Long Division Calculator" },
  { href: "/maths/scientific-notation-converter", label: "Scientific Notation Converter" },
  { href: "/maths/gcf-calculator", label: "GCF Calculator" },
  { href: "/maths/percent-error-calculator", label: "Percent Error Calculator" },
  { href: "/maths/random-number-generator-1-100", label: "Random Number Generator 1–100" },
  { href: "/maths/slope-calculator", label: "Slope Calculator" },
  { href: "/maths/midpoint-calculator", label: "Midpoint Calculator" },
  { href: "/maths/solve-for-x-calculator", label: "Solve for X Calculator" },
  { href: "/maths/fractions-calculator", label: "Fractions Calculator" },
  { href: "/maths/lcm-calculator", label: "LCM Calculator" },
  { href: "/maths/surface-area-calculator", label: "Surface Area Calculator" },
  { href: "/maths/log-calculator", label: "Log Calculator" },
  { href: "/maths/arc-length-calculator", label: "Arc Length Calculator" },
  { href: "/maths/square-roots-calculator", label: "Square Roots Calculator" },
  { href: "/maths/kinetic-energy-calculator", label: "Kinetic Energy Calculator" },
  { href: "/maths/roofing-calculator", label: "Roofing Calculator" },
  { href: "/maths/circle-calculator", label: "Circle Calculator" },
  { href: "/maths/graph-calculator", label: "Graph Calculator" },
  { href: "/maths/sphere-volume-calculator", label: "Sphere Volume Calculator" },
  { href: "/maths/hypotenuse-calculator", label: "Hypotenuse Calculator" },
  { href: "/maths/radius-of-circle-calculator", label: "Radius of a Circle Calculator" },
  { href: "/maths/combinations-calculator", label: "Combinations Calculator" },
  { href: "/maths/circle-diameter-calculator", label: "Circle Diameter Calculator" },
  { href: "/maths/lcd-calculator", label: "LCD Calculator" },
  { href: "/maths/winning-percentage-calculator", label: "Winning Percentage Calculator" },
  { href: "/maths/semicircle-area-calculator", label: "Semicircle Area Calculator" },
  { href: "/maths/prime-factors-calculator", label: "Prime Factors Calculator" },
  { href: "/maths/triangle-area-calculator", label: "Triangle Area Calculator" },
  { href: "/maths/cone-volume-calculator", label: "Cone Volume Calculator" },
  { href: "/maths/percent-to-decimal-calculator", label: "Percent to Decimal Calculator" },
  { href: "/maths/longdivision-calculator", label: "Long Division Calculator" },
  { href: "/maths/trigonometry-calculator", label: "Trigonometry Calculator" },
  { href: "/maths/fraction-to-percent-calculator", label: "Fraction to Percent Calculator" },
  { href: "/maths/factors-calculator", label: "Factors Calculator" },
  { href: "/maths/45-45-90-right-angled-triangle-calculator", label: "45-45-90 Right Angled Triangle Calculator" },
  { href: "/maths/square-footage-circle-calculator", label: "Square Footage of a Circle Calculator" },
  { href: "/maths/significant-figures-calculator", label: "Significant Figures Calculator" },
  { href: "/maths/remainder-calculator", label: "Remainder Calculator" },
  { href: "/maths/modulo-calculator", label: "Modulo Calculator" },
  { href: "/maths/sector-area-calculator", label: "Sector Area Calculator" },
  { href: "/maths/average-percentage-calculator", label: "Average Percentage Calculator" },
  { href: "/maths/inches-to-fraction-calculator", label: "Inches to Fraction Calculator" },
  { href: "/maths/circle-perimeter-calculator", label: "Circle Perimeter Calculator" },
  { href: "/maths/percentile-calculator", label: "Percentile Calculator" },
  { href: "/maths/fraction-equivalent-calculator", label: "Equivalent Fraction Calculator" },
  { href: "/maths/long-multiplication-calculator", label: "Long Multiplication Calculator" },
  { href: "/maths/surface-area-of-cylinder-calculator", label: "Surface Area of a Cylinder Calculator" },
  ...MATHS_EXTRA_CALCULATORS.map((c) => ({
    href: `/maths/${c.slug}`,
    label: c.title,
  })),
];

export const VEHICLES_CALCULATOR_LINKS: CalculatorLink[] = [
  {
    href: "/vehicles/tire-size-calculator",
    label: "Tire Size Calculator",
  },
  {
    href: "/vehicles/mileage-calculator",
    label: "Mileage Calculator",
  },
  {
    href: "/vehicles/fuel-cost-calculator",
    label: "Fuel Cost Calculator",
  },
];

export const TECHNOLOGY_CALCULATOR_LINKS: CalculatorLink[] = [
  {
    href: "/technology/ip-subnet-calculator",
    label: "IP Subnet Calculator",
  },
  ...TECHNOLOGY_EXTRA_CALCULATORS.map((c) => ({
    href: `/technology/${c.slug}`,
    label: c.title,
  })),
];

export const EDUCATION_CALCULATOR_LINKS: CalculatorLink[] = [
  { href: "/education/grade-calculator", label: "Grade Calculator" },
  { href: "/education/gpa-calculator", label: "GPA Calculator" },
  { href: "/education/test-grade-calculator", label: "Test Grade Calculator" },
];

export const OTHER_CALCULATOR_LINKS: CalculatorLink[] = [
  {
    href: "/other/days-until-christmas-calculator",
    label: "Days Until Christmas",
  },
  {
    href: "/other/days-until-halloween-calculator",
    label: "Days Until Halloween",
  },
  {
    href: "/other/days-until-new-year-calculator",
    label: "Days Until New Year",
  },
  { href: "/other/dice-roller-calculator", label: "Dice Roller" },
  {
    href: "/other/random-card-picker-calculator",
    label: "Random Card Picker",
  },
  ...OTHER_EXTRA_CALCULATORS.map((c) => ({
    href: `/other/${c.slug}`,
    label: c.title,
  })),
];

export type FooterCalculatorCategory = {
  id: string;
  label: string;
  exploreHref: string;
  links: CalculatorLink[];
};

/** Footer category tabs — only categories with published calculator lists. */
export const FOOTER_CALCULATOR_CATEGORIES: FooterCalculatorCategory[] = [
  {
    id: "health-fitness",
    label: "Health & Fitness",
    exploreHref: "/health-fitness",
    links: HEALTH_FITNESS_CALCULATOR_LINKS,
  },
  {
    id: "maths",
    label: "Maths",
    exploreHref: "/maths",
    links: MATHS_CALCULATOR_LINKS,
  },
  {
    id: "conversion",
    label: "Conversion",
    exploreHref: "/conversion",
    links: CONVERSION_CALCULATOR_LINKS,
  },
  {
    id: "technology",
    label: "Technology",
    exploreHref: "/technology",
    links: TECHNOLOGY_CALCULATOR_LINKS,
  },
  {
    id: "vehicles",
    label: "Vehicles",
    exploreHref: "/vehicles",
    links: VEHICLES_CALCULATOR_LINKS,
  },
  {
    id: "education",
    label: "Education",
    exploreHref: "/education",
    links: EDUCATION_CALCULATOR_LINKS,
  },
  {
    id: "other",
    label: "Other",
    exploreHref: "/other",
    links: OTHER_CALCULATOR_LINKS,
  },
];

/** Maps `exploreHref` from home / category metadata to the full link list for that index. */
export const CALCULATOR_LINKS_BY_EXPLORE_HREF: Record<string, CalculatorLink[]> = {
  "/health-fitness": HEALTH_FITNESS_CALCULATOR_LINKS,
  "/finance": FINANCE_CALCULATOR_LINKS,
  "/maths": MATHS_CALCULATOR_LINKS,
  "/technology": TECHNOLOGY_CALCULATOR_LINKS,
  "/conversion": CONVERSION_CALCULATOR_LINKS,
  "/vehicles": VEHICLES_CALCULATOR_LINKS,
  "/education": EDUCATION_CALCULATOR_LINKS,
  "/other": OTHER_CALCULATOR_LINKS,
};
