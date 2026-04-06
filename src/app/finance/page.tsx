import { CategoryCalculatorIndex } from "@/components/globals/CategoryCalculatorIndex";
import { FINANCE_CALCULATOR_LINKS } from "@/data/calculatorCategoryLinks";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Finance Calculator",
  description:
    "Mortgage, loan, tax, retirement, and more free finance calculators.",
  path: "/finance",
});

export default function FinanceIndexPage() {
  return (
    <CategoryCalculatorIndex
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Finance calculator" },
      ]}
      title="Finance Calculator"
      description="Calculate loans, interest, taxes, and more."
      links={FINANCE_CALCULATOR_LINKS}
    />
  );
}
