import { Overweight_Calculator } from "@/components/Health-Fitness/Overweight/Overweight_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/overweight-calculator";
const FALLBACK_TITLE = "Overweight Calculator";
const FALLBACK_DESCRIPTION =
  "Approximate weight change to reach BMI 25 from height and current weight.";

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
      title="Overweight Calculator"
      description="For adults with BMI above 25, estimate pounds or kilograms to reach BMI 25."
      breadcrumbLabel="overweight calculator"
    >
      <Overweight_Calculator />
    </HealthCalculatorPageLayout>
  );
}
