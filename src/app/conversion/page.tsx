import { CategoryCalculatorIndex } from "@/components/globals/CategoryCalculatorIndex";
import { BreadcrumbSchema } from "@/components/Schema-Markup/BreadcrumbSchema";
import { CONVERSION_CALCULATOR_LINKS } from "@/data/conversionCalculators";
import { buildPageMetadata } from "@/lib/metadata";
import { getSiteUrl } from "@/lib/siteUrl";

export const metadata = buildPageMetadata({
  title: "Conversion Calculators",
  description:
    "Free unit converters for weight, temperature, distance, volume, and more.",
  path: "/conversion",
});

export default function ConversionIndexPage() {
  const baseUrl = getSiteUrl();

  return (
    <>
      <BreadcrumbSchema
        baseUrl={baseUrl}
        items={[
          { name: "calculators", href: "/" },
          { name: "conversion calculator", href: "/conversion" },
        ]}
      />
      <CategoryCalculatorIndex
        breadcrumbItems={[
          { label: "calculators", href: "/" },
          { label: "conversion calculator" },
        ]}
        title="Conversion Calculator"
        description="Free online unit converters for pounds, kilograms, temperature, distance, and more."
        links={CONVERSION_CALCULATOR_LINKS}
      />
    </>
  );
}
