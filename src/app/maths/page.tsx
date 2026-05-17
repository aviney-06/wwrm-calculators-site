import { CategoryCalculatorIndex } from "@/components/globals/CategoryCalculatorIndex";
import { BreadcrumbSchema } from "@/components/Schema-Markup/BreadcrumbSchema";
import { MATHS_CALCULATOR_LINKS } from "@/data/calculatorCategoryLinks";
import { buildPageMetadata } from "@/lib/metadata";
import { getSiteUrl } from "@/lib/siteUrl";

export const metadata = buildPageMetadata({
  title: "Math Calculator",
  description:
    "Scientific, fraction, percentage, triangle, statistics, and more free maths tools.",
  path: "/maths",
});

export default function MathsIndexPage() {
  const baseUrl = getSiteUrl();
  return (
    <>
      <BreadcrumbSchema
        baseUrl={baseUrl}
        items={[
          { name: "calculators", href: "/" },
          { name: "math calculator", href: "/maths" },
        ]}
      />
      <CategoryCalculatorIndex
        breadcrumbItems={[
          { label: "calculators", href: "/" },
          { label: "math calculator" },
        ]}
        title="Math Calculator"
        description="Free online math calculators for scientific, fractions, percentages, geometry, and more."
        links={MATHS_CALCULATOR_LINKS}
      />
    </>
  );
}
