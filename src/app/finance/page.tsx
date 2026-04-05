import { CategoryCalculatorIndex } from "@/components/globals/CategoryCalculatorIndex";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Finance Calculator",
  description:
    "Mortgage, loan, tax, retirement, and more free finance calculators.",
  path: "/finance",
});

const CALCULATORS: { href: string; label: string }[] = [
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

export default function FinanceIndexPage() {
  return (
    <CategoryCalculatorIndex
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Finance calculator" },
      ]}
      title="Finance Calculator"
      description="Calculate loans, interest, taxes, and more."
      links={CALCULATORS}
    />
  );
}
