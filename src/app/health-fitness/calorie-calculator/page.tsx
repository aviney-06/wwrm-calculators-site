import { Calorie_Calculator } from "@/components/Health-Fitness/Calorie/Calorie_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/calorie-calculator";
const FALLBACK_TITLE = "Calorie Calculator";
const FALLBACK_DESCRIPTION =
  "Daily maintenance calories from your stats and activity level.";

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
      title="Calorie Calculator"
      description="Estimate how many calories you burn per day at maintenance (same method as TDEE)."
      breadcrumbLabel="calorie calculator"
    >
      <Calorie_Calculator />
    </HealthCalculatorPageLayout>
  );
}
