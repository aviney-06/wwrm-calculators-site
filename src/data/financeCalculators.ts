export type FinanceToolKey =
  | "loan-payment"
  | "compound-savings"
  | "amortization"
  | "sales-tax"
  | "inflation"
  | "simple-interest"
  | "salary-to-hourly"
  | "annual-income"
  | "mortgage-payoff"
  | "house-affordability"
  | "refinance"
  | "heloc"
  | "auto-lease"
  | "discount"
  | "currency"
  | "pay-raise"
  | "tax"
  | "interest-rate"
  | "rent"
  | "interest"
  | "profit-margin"
  | "annuity"
  | "rental-property";

export type FinanceCalculator = {
  slug: string;
  title: string;
  description: string;
  breadcrumbLabel: string;
  toolKey: FinanceToolKey;
  /** Variant key for loan-payment or compound-savings tools */
  variant?: string;
};

export const FINANCE_CALCULATORS: FinanceCalculator[] = [
  {
    slug: "mortgage-calculator",
    title: "Mortgage Calculator",
    description:
      "Estimate monthly principal and interest on a US home loan from amount, APR, and term.",
    breadcrumbLabel: "mortgage calculator",
    toolKey: "loan-payment",
    variant: "mortgage",
  },
  {
    slug: "auto-loan-calculator",
    title: "Auto Loan Calculator",
    description:
      "Calculate monthly car loan payments using standard US amortizing loan math.",
    breadcrumbLabel: "auto loan calculator",
    toolKey: "loan-payment",
    variant: "auto-loan",
  },
  {
    slug: "loan-calculator",
    title: "Loan Calculator",
    description:
      "Monthly payment and total interest for a fixed-rate installment loan.",
    breadcrumbLabel: "loan calculator",
    toolKey: "loan-payment",
    variant: "loan",
  },
  {
    slug: "payment-calculator",
    title: "Payment Calculator",
    description:
      "Find your monthly loan payment from principal, interest rate, and term.",
    breadcrumbLabel: "payment calculator",
    toolKey: "loan-payment",
    variant: "payment",
  },
  {
    slug: "personal-loan-calculator",
    title: "Personal Loan Calculator",
    description:
      "Estimate personal loan payments with US monthly compounding.",
    breadcrumbLabel: "personal loan calculator",
    toolKey: "loan-payment",
    variant: "personal-loan",
  },
  {
    slug: "home-equity-loan-calculator",
    title: "Home Equity Loan Calculator",
    description:
      "Monthly payment on a fixed home equity installment loan.",
    breadcrumbLabel: "home equity loan calculator",
    toolKey: "loan-payment",
    variant: "home-equity-loan",
  },
  {
    slug: "fha-loan-calculator",
    title: "FHA Loan Calculator",
    description:
      "FHA mortgage payment estimate with simplified monthly MIP.",
    breadcrumbLabel: "fha loan calculator",
    toolKey: "loan-payment",
    variant: "fha",
  },
  {
    slug: "finance-calculator",
    title: "Finance Calculator",
    description:
      "General loan payment and interest calculator for US fixed-rate loans.",
    breadcrumbLabel: "finance calculator",
    toolKey: "loan-payment",
    variant: "loan",
  },
  {
    slug: "amortization-calculator",
    title: "Amortization Calculator",
    description:
      "Monthly payment and first-payment principal vs interest split.",
    breadcrumbLabel: "amortization calculator",
    toolKey: "amortization",
  },
  {
    slug: "mortgage-payoff-calculator",
    title: "Mortgage Payoff Calculator",
    description:
      "Months to pay off a mortgage with optional extra principal payments.",
    breadcrumbLabel: "mortgage payoff calculator",
    toolKey: "mortgage-payoff",
  },
  {
    slug: "refinance-calculator",
    title: "Refinance Calculator",
    description:
      "Compare current vs new mortgage payment when refinancing.",
    breadcrumbLabel: "refinance calculator",
    toolKey: "refinance",
  },
  {
    slug: "house-affordability-calculator",
    title: "House Affordability Calculator",
    description:
      "Max home loan from income using a housing payment-to-income ratio.",
    breadcrumbLabel: "house affordability calculator",
    toolKey: "house-affordability",
  },
  {
    slug: "heloc-calculator",
    title: "HELOC Calculator",
    description:
      "Interest-only monthly payment on a home equity line of credit draw.",
    breadcrumbLabel: "heloc calculator",
    toolKey: "heloc",
  },
  {
    slug: "auto-lease-calculator",
    title: "Auto Lease Calculator",
    description:
      "Estimate US auto lease payment from cap cost, residual, and money factor.",
    breadcrumbLabel: "auto lease calculator",
    toolKey: "auto-lease",
  },
  {
    slug: "investment-calculator",
    title: "Investment Calculator",
    description:
      "Project investment growth with initial balance and monthly contributions.",
    breadcrumbLabel: "investment calculator",
    toolKey: "compound-savings",
    variant: "investment",
  },
  {
    slug: "savings-calculator",
    title: "Savings Calculator",
    description:
      "Future value of savings with regular monthly deposits.",
    breadcrumbLabel: "savings calculator",
    toolKey: "compound-savings",
    variant: "savings",
  },
  {
    slug: "retirement-calculator",
    title: "Retirement Calculator",
    description:
      "Project retirement account balance with ongoing contributions.",
    breadcrumbLabel: "retirement calculator",
    toolKey: "compound-savings",
    variant: "retirement",
  },
  {
    slug: "401k-calculator",
    title: "401K Calculator",
    description:
      "Estimate 401(k) balance at retirement from contributions and return.",
    breadcrumbLabel: "401k calculator",
    toolKey: "compound-savings",
    variant: "401k",
  },
  {
    slug: "roth-ira-calculator",
    title: "Roth IRA Calculator",
    description:
      "Future value of Roth IRA contributions with compound growth.",
    breadcrumbLabel: "roth ira calculator",
    toolKey: "compound-savings",
    variant: "roth-ira",
  },
  {
    slug: "cd-calculator",
    title: "CD Calculator",
    description:
      "Certificate of deposit maturity value at a fixed annual rate.",
    breadcrumbLabel: "cd calculator",
    toolKey: "compound-savings",
    variant: "cd",
  },
  {
    slug: "future-value-calculator",
    title: "Future Value Calculator",
    description:
      "Future value of a lump sum with compound interest.",
    breadcrumbLabel: "future value calculator",
    toolKey: "compound-savings",
    variant: "future-value",
  },
  {
    slug: "compound-interest-calculator",
    title: "Compound Interest Calculator",
    description:
      "How much a deposit grows with compound interest over time.",
    breadcrumbLabel: "compound interest calculator",
    toolKey: "compound-savings",
    variant: "compound-interest",
  },
  {
    slug: "interest-calculator",
    title: "Interest Calculator",
    description:
      "Interest earned on a principal amount over time (simple interest).",
    breadcrumbLabel: "interest calculator",
    toolKey: "interest",
  },
  {
    slug: "simple-interest-calculator",
    title: "Simple Interest Calculator",
    description:
      "Calculate simple interest: I = P × r × t.",
    breadcrumbLabel: "simple interest calculator",
    toolKey: "simple-interest",
  },
  {
    slug: "interest-rate-calculator",
    title: "Interest Rate Calculator",
    description:
      "Solve APR from loan amount, monthly payment, and term.",
    breadcrumbLabel: "interest rate calculator",
    toolKey: "interest-rate",
  },
  {
    slug: "sales-tax-calculator",
    title: "Sales Tax Calculator",
    description:
      "Add US state/local sales tax to a purchase price.",
    breadcrumbLabel: "sales tax calculator",
    toolKey: "sales-tax",
  },
  {
    slug: "inflation-calculator",
    title: "Inflation Calculator",
    description:
      "See how inflation affects purchasing power over the years.",
    breadcrumbLabel: "inflation calculator",
    toolKey: "inflation",
  },
  {
    slug: "salary-calculator",
    title: "Salary Calculator",
    description:
      "Convert hourly wage to annual and monthly gross income (US 2080 hr/yr).",
    breadcrumbLabel: "salary calculator",
    toolKey: "annual-income",
  },
  {
    slug: "salary-to-hourly-calculator",
    title: "Salary To Hourly Calculator",
    description:
      "Convert annual salary to hourly and weekly pay.",
    breadcrumbLabel: "salary to hourly calculator",
    toolKey: "salary-to-hourly",
  },
  {
    slug: "annual-income-calculator",
    title: "Annual Income Calculator",
    description:
      "Annual and monthly gross from hourly wage.",
    breadcrumbLabel: "annual income calculator",
    toolKey: "annual-income",
  },
  {
    slug: "pay-raise-calculator",
    title: "Pay Raise Calculator",
    description:
      "Percent and dollar increase between old and new salary.",
    breadcrumbLabel: "pay raise calculator",
    toolKey: "pay-raise",
  },
  {
    slug: "tax-calculator",
    title: "Tax Calculator",
    description:
      "Simplified US income tax estimate from effective federal and state rates.",
    breadcrumbLabel: "tax calculator",
    toolKey: "tax",
  },
  {
    slug: "income-tax-calculator",
    title: "Income Tax Calculator",
    description:
      "Estimate net income after federal and state effective tax rates.",
    breadcrumbLabel: "income tax calculator",
    toolKey: "tax",
  },
  {
    slug: "discount-calculator",
    title: "Discount Calculator",
    description:
      "Sale price and savings from a percent-off discount.",
    breadcrumbLabel: "discount calculator",
    toolKey: "discount",
  },
  {
    slug: "currency-calculator",
    title: "Currency Calculator",
    description:
      "Convert an amount using your exchange rate.",
    breadcrumbLabel: "currency calculator",
    toolKey: "currency",
  },
  {
    slug: "money-calculator",
    title: "Money Calculator",
    description:
      "Currency conversion with a custom exchange rate.",
    breadcrumbLabel: "money calculator",
    toolKey: "currency",
  },
  {
    slug: "rent-calculator",
    title: "Rent Calculator",
    description:
      "Maximum affordable rent from gross monthly income (30% rule).",
    breadcrumbLabel: "rent calculator",
    toolKey: "rent",
  },
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

export const FINANCE_BY_SLUG = Object.fromEntries(
  FINANCE_CALCULATORS.map((c) => [c.slug, c]),
) as Record<string, FinanceCalculator>;

/** @deprecated Use FINANCE_CALCULATORS */
export const FINANCE_EXTRA_CALCULATORS = FINANCE_CALCULATORS;
/** @deprecated Use FINANCE_BY_SLUG */
export const FINANCE_EXTRA_BY_SLUG = FINANCE_BY_SLUG;
