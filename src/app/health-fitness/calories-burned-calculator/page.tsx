import { CaloriesBurned_Calculator } from "@/components/Health-Fitness/CaloriesBurned/CaloriesBurned_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/calories-burned-calculator";
const FALLBACK_TITLE = "Calories Burned Calculator";
const FALLBACK_DESCRIPTION =
  "Rough calories burned from MET, weight, and duration.";

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
      title="Calories Burned Calculator"
      description="MET × body weight × time — useful for comparing activities, not exact energy expenditure."
      breadcrumbLabel="calories burned calculator"
    >
      <CaloriesBurned_Calculator />
    </HealthCalculatorPageLayout>
  );
}
