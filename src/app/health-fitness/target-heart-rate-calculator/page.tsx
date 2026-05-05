import { TargetHeartRate_Calculator } from "@/components/Health-Fitness/TargetHeartRate/TargetHeartRate_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/target-heart-rate-calculator";
const FALLBACK_TITLE = "Target Heart Rate Calculator";
const FALLBACK_DESCRIPTION =
  "Training zones from age and optional resting heart rate.";

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
      title="Target Heart Rate Calculator"
      description="Heart rate zones using 220 − age, or Karvonen if you add resting HR."
      breadcrumbLabel="target heart rate calculator"
    >
      <TargetHeartRate_Calculator />
    </HealthCalculatorPageLayout>
  );
}
