import { StepsToCalories_Calculator } from "@/components/Health-Fitness/StepsToCalories/StepsToCalories_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/steps-to-calories-calculator";
const FALLBACK_TITLE = "Steps to Calories Calculator";
const FALLBACK_DESCRIPTION =
  "Turn steps and stride into distance, then estimate calories from body weight (US or metric).";

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
      title="Steps to Calories Calculator"
      description="Distance from steps × stride; calories from miles × 0.57 × lb or km × 1.036 × kg, plus a 0.04 kcal/step check."
      breadcrumbLabel="steps to calories calculator"
    >
      <StepsToCalories_Calculator />
    </HealthCalculatorPageLayout>
  );
}
