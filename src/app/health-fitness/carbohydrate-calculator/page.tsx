import { buildPageMetadata } from "@/lib/metadata";
import { Carbohydrate_Calculator } from "@/components/Health-Fitness/Carbohydrate/Carbohydrate_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "Carbohydrate Calculator",
  description:
    "Convert daily calories and carb percentage to grams of carbs.",
  path: "/health-fitness/carbohydrate-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/carbohydrate-calculator"
      title="Carbohydrate Calculator"
      description="How many grams of carbs per day at your calorie target and carb percentage?"
      breadcrumbLabel="carbohydrate calculator"
    >
      <Carbohydrate_Calculator />
    </HealthCalculatorPageLayout>
  );
}
