import { CategoryCalculatorIndex } from "@/components/globals/CategoryCalculatorIndex";
import { MATHS_CALCULATOR_LINKS } from "@/data/calculatorCategoryLinks";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Maths Calculator",
  description:
    "Scientific, fraction, percentage, triangle, statistics, and more free maths tools.",
  path: "/maths",
});

export default function MathsIndexPage() {
  return (
    <CategoryCalculatorIndex
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Maths calculator" },
      ]}
      title="Maths Calculator"
      description="Scientific, fractions, percentages, geometry, and more."
      links={MATHS_CALCULATOR_LINKS}
    />
  );
}
