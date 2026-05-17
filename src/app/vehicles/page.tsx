import { CategoryCalculatorIndex } from "@/components/globals/CategoryCalculatorIndex";
import { BreadcrumbSchema } from "@/components/Schema-Markup/BreadcrumbSchema";
import { VEHICLES_CALCULATOR_LINKS } from "@/data/calculatorCategoryLinks";
import { buildPageMetadata } from "@/lib/metadata";
import { getSiteUrl } from "@/lib/siteUrl";

export const metadata = buildPageMetadata({
  title: "Vehicles Calculators",
  description:
    "Tire size comparison, fuel mileage (MPG), and other free automotive calculators.",
  path: "/vehicles",
});

export default function VehiclesIndexPage() {
  const baseUrl = getSiteUrl();

  return (
    <>
      <BreadcrumbSchema
        baseUrl={baseUrl}
        items={[
          { name: "calculators", href: "/" },
          { name: "vehicles calculator", href: "/vehicles" },
        ]}
      />
      <CategoryCalculatorIndex
        breadcrumbItems={[
          { label: "calculators", href: "/" },
          { label: "vehicles calculator" },
        ]}
        title="Vehicles Calculator"
        description="Free online vehicle calculators for tire size, fuel mileage, and more."
        links={VEHICLES_CALCULATOR_LINKS}
      />
    </>
  );
}
