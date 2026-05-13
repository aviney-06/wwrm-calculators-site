import { TargetHeartRate_Calculator } from "@/components/Health-Fitness/TargetHeartRate/TargetHeartRate_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/target-heart-rate-calculator";
const FALLBACK_TITLE = "Target Heart Rate Calculator";
const FALLBACK_DESCRIPTION =
  "Light through maximum zones from 220 − age, plus optional Karvonen (resting HR).";

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
      description="Five standard zones (50–100% intensity) from max HR = 220 − age, with Karvonen bpm ranges when you add resting HR."
      breadcrumbLabel="target heart rate calculator"
    >
      <TargetHeartRate_Calculator />
    </HealthCalculatorPageLayout>
  );
}
