import { WalkingCalorie_Calculator } from "@/components/Health-Fitness/WalkingCalorie/WalkingCalorie_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/walking-calorie-calculator";
const FALLBACK_TITLE = "Walking Calorie Calculator";
const FALLBACK_DESCRIPTION =
  "Estimate calories burned walking using MET values and the standard oxygen-based formula.";

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
      title="Walking Calorie Calculator"
      description="MET-based calories for common walking speeds (Compendium-style METs × weight × time)."
      breadcrumbLabel="walking calorie calculator"
    >
      <WalkingCalorie_Calculator />
    </HealthCalculatorPageLayout>
  );
}
