import { CategoryCalculatorIndex } from "@/components/globals/CategoryCalculatorIndex";
import { BreadcrumbSchema } from "@/components/Schema-Markup/BreadcrumbSchema";
import { HEALTH_FITNESS_CALCULATOR_LINKS } from "@/data/calculatorCategoryLinks";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Health & Fitness Calculators",
  description:
    "BMI, body fat, TDEE, pregnancy, pace, sleep, and more free health calculators.",
  path: "/health-fitness",
});

export default function HealthFitnessIndexPage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return (
    <>
      <BreadcrumbSchema
        baseUrl={baseUrl}
        items={[
          { name: "Home", href: "/" },
          { name: "Health calculator", href: "/health-fitness" },
        ]}
      />
      <CategoryCalculatorIndex
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Health calculator" },
        ]}
        title="Health & Fitness Calculator"
        description="BMI, calories, pregnancy, sleep, and more."
        links={HEALTH_FITNESS_CALCULATOR_LINKS}
      />
    </>
  );
}
