export type FinanceExtraToolKey =
  | "profit-margin"
  | "annuity"
  | "rental-property";

export type FinanceExtraCalculator = {
  slug: string;
  title: string;
  description: string;
  breadcrumbLabel: string;
  toolKey: FinanceExtraToolKey;
};

export const FINANCE_EXTRA_CALCULATORS: FinanceExtraCalculator[] = [
  {
    slug: "profit-margin-calculator",
    title: "Profit Margin Calculator",
    description:
      "Calculate profit dollars and profit margin percentage from revenue and cost.",
    breadcrumbLabel: "profit margin calculator",
    toolKey: "profit-margin",
  },
  {
    slug: "annuity-calculator",
    title: "Annuity Calculator",
    description:
      "Estimate monthly loan payment from principal, annual interest rate, and term in years.",
    breadcrumbLabel: "annuity calculator",
    toolKey: "annuity",
  },
  {
    slug: "rental-property-calculator",
    title: "Rental Property Calculator",
    description:
      "Monthly cash flow and cap rate from purchase price, rent, and expenses.",
    breadcrumbLabel: "rental property calculator",
    toolKey: "rental-property",
  },
];

export const FINANCE_EXTRA_BY_SLUG = Object.fromEntries(
  FINANCE_EXTRA_CALCULATORS.map((c) => [c.slug, c]),
) as Record<string, FinanceExtraCalculator>;
