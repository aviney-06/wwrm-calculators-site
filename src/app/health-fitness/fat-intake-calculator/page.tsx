import { FatIntake_Calculator } from "@/components/Health-Fitness/FatIntake/FatIntake_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/fat-intake-calculator";
const FALLBACK_TITLE = "Fat Intake Calculator";
const FALLBACK_DESCRIPTION =
  "Grams of fat per day from calories and fat percentage.";

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
      title="Fat Intake Calculator"
      description="At 9 calories per gram of fat — split your calorie target by fat percentage."
      breadcrumbLabel="fat intake calculator"
    >
      <FatIntake_Calculator />
    </HealthCalculatorPageLayout>
  );
}
