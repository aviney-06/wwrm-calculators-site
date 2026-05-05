import { HealthyWeight_Calculator } from "@/components/Health-Fitness/HealthyWeight/HealthyWeight_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/healthy-weight-calculator";
const FALLBACK_TITLE = "Healthy Weight Calculator";
const FALLBACK_DESCRIPTION =
  "Approximate weight range for BMI 18.5–24.9 at your height.";

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
      title="Healthy Weight Calculator"
      description="See a typical weight range that corresponds to a BMI between 18.5 and 24.9."
      breadcrumbLabel="healthy weight calculator"
    >
      <HealthyWeight_Calculator />
    </HealthCalculatorPageLayout>
  );
}
