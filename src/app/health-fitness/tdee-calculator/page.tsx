import { TDEE_Calculator } from "@/components/Health-Fitness/TDEE/TDEE_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/tdee-calculator";
const FALLBACK_TITLE = "TDEE Calculator";
const FALLBACK_DESCRIPTION =
  "Total Daily Energy Expenditure using Mifflin–St Jeor and activity level.";

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
      title="TDEE Calculator"
      description="Estimate maintenance calories (TDEE) from age, sex, height, weight, and activity."
      breadcrumbLabel="tdee calculator"
    >
      <TDEE_Calculator />
    </HealthCalculatorPageLayout>
  );
}
