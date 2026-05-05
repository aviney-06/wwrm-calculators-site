import { PregnancyWeightGain_Calculator } from "@/components/Health-Fitness/PregnancyWeightGain/PregnancyWeightGain_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/pregnancy-weight-gain-calculator";
const FALLBACK_TITLE = "Pregnancy Weight Gain Calculator";
const FALLBACK_DESCRIPTION =
  "IOM-style recommended total weight gain range from pre-pregnancy BMI.";

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
      title="Pregnancy Weight Gain Calculator"
      description="Total gain guidelines by pre-pregnancy BMI category (singleton pregnancy)."
      breadcrumbLabel="pregnancy weight gain calculator"
    >
      <PregnancyWeightGain_Calculator />
    </HealthCalculatorPageLayout>
  );
}
