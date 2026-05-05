import { Pace_Calculator } from "@/components/Health-Fitness/Pace/Pace_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/pace-calculator";
const FALLBACK_TITLE = "Pace Calculator";
const FALLBACK_DESCRIPTION =
  "Calculate pace per mile or kilometer from distance and time.";

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
      title="Pace Calculator"
      description="Enter distance and time to get pace per mile or per kilometer."
      breadcrumbLabel="pace calculator"
    >
      <Pace_Calculator />
    </HealthCalculatorPageLayout>
  );
}
