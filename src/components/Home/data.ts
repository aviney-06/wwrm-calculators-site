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
      { label: "Math Calculator", href: "/maths/math-calculator" },
      { label: "45-45-90 Right Angled Triangle Calculator", href: "/maths/45-45-90-right-angled-triangle-calculator" },
      {
        label: "Standard Deviation Calculator",
        href: "/maths/standard-deviation-calculator",
      },
      { label: "Random Number Generator", href: "/maths/random-number-generator" },
    ],
    exploreHref: "/maths",
    disabled: false,
  },
  {
    title: "Technology Calculator",
    imageSrc:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Network cables and server technology",
    links: [
      {
        label: "IP Subnet Calculator",
        href: "/technology/ip-subnet-calculator",
      },
    ],
    exploreHref: "/technology",
    disabled: false,
  },
  {
    title: "Conversion Calculator",
    imageSrc:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Measuring scales and conversion tools",
    links: [
      {
        label: "Pounds to Kilograms",
        href: "/conversion/pounds-to-kilograms-calculator",
      },
      {
        label: "Celsius to Fahrenheit",
        href: "/conversion/celsius-to-fahrenheit-calculator",
      },
      {
        label: "Kilometers to Miles",
        href: "/conversion/kilometers-to-miles-calculator",
      },
      {
        label: "Mm to Inches",
        href: "/conversion/mm-to-inches-calculator",
      },
      {
        label: "Kilograms to Pounds",
        href: "/conversion/kilograms-to-pounds-calculator",
      },
      {
        label: "Height Cm to In and Ft",
        href: "/conversion/height-cm-to-in-and-ft-calculator",
      },
    ],
    exploreHref: "/conversion",
    disabled: false,
  },
  {
    title: "Vehicles Calculator",
    imageSrc:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Car on the road",
    links: [
      {
        label: "Tire Size Calculator",
        href: "/vehicles/tire-size-calculator",
      },
      {
        label: "Mileage Calculator",
        href: "/vehicles/mileage-calculator",
      },
    ],
    exploreHref: "/vehicles",
    disabled: false,
  },
  {
    title: "Education Calculator",
    imageSrc:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Student studying with books and laptop",
    links: [
      { label: "Grade Calculator", href: "/education/grade-calculator" },
      { label: "GPA Calculator", href: "/education/gpa-calculator" },
      { label: "Test Grade Calculator", href: "/education/test-grade-calculator" },
    ],
    exploreHref: "/education",
    disabled: false,
  },
  {
    title: "Other Calculators",
    imageSrc:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Calculator and technical drawings on a desk",
    links: [
      {
        label: "Days Until Christmas",
        href: "/other/days-until-christmas-calculator",
      },
      {
        label: "Days Until Halloween",
        href: "/other/days-until-halloween-calculator",
      },
      { label: "Dice Roller", href: "/other/dice-roller-calculator" },
      {
        label: "Random Card Picker",
        href: "/other/random-card-picker-calculator",
      },
    ],
    exploreHref: "/other",
    disabled: false,
  },
];
