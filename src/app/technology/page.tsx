import { CategoryCalculatorIndex } from "@/components/globals/CategoryCalculatorIndex";
import { BreadcrumbSchema } from "@/components/Schema-Markup/BreadcrumbSchema";
import { TECHNOLOGY_CALCULATOR_LINKS } from "@/data/calculatorCategoryLinks";
import { buildPageMetadata } from "@/lib/metadata";
import { getSiteUrl } from "@/lib/siteUrl";

export const metadata = buildPageMetadata({
  title: "Technology Calculators",
  description:
    "IP subnet, networking, and other free technology tools for IT and developers.",
  path: "/technology",
});

export default function TechnologyIndexPage() {
  const baseUrl = getSiteUrl();

  return (
    <>
      <BreadcrumbSchema
        baseUrl={baseUrl}
        items={[
          { name: "calculators", href: "/" },
          { name: "technology calculator", href: "/technology" },
        ]}
      />
      <CategoryCalculatorIndex
        breadcrumbItems={[
          { label: "calculators", href: "/" },
          { label: "technology calculator" },
        ]}
        title="Technology Calculator"
        description="Free online technology calculators for networking, IP addressing, and more."
        links={TECHNOLOGY_CALCULATOR_LINKS}
      />
    </>
  );
}
