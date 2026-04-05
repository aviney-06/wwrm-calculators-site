import { buildPageMetadata } from "@/lib/metadata";
import { Macro_Calculator } from "@/components/Health-Fitness/Macro/Macro_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "Macro Calculator",
  description:
    "Estimate daily calories (TDEE) and protein, fat, and carbohydrate targets.",
  path: "/health-fitness/macro-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/macro-calculator"
      title="Macro Calculator"
      description="Get TDEE from your stats and activity, then split into daily protein, fat, and carbs."
      breadcrumbLabel="macro calculator"
    >
      <Macro_Calculator />
    </HealthCalculatorPageLayout>
  );
}
