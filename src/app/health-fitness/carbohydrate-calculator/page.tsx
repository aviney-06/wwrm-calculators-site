import { Carbohydrate_Calculator } from "@/components/Health-Fitness/Carbohydrate/Carbohydrate_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/carbohydrate-calculator";
const FALLBACK_TITLE = "Carbohydrate Calculator";
const FALLBACK_DESCRIPTION =
  "Convert daily calories and carb percentage to grams of carbs.";

export async function generateMetadata() {
  return generateCalculatorPageMetadata({
    path: PATH,
    fallbackTitle: FALLBACK_TITLE,
    fallbackDescription: FALLBACK_DESCRIPTION,
  });
}

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path={PATH}
      title="Carbohydrate Calculator"
      description="How many grams of carbs per day at your calorie target and carb percentage?"
      breadcrumbLabel="carbohydrate calculator"
    >
      <Carbohydrate_Calculator />
    </HealthCalculatorPageLayout>
  );
}
