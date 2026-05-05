import { BodyFat_Calculator } from "@/components/Health-Fitness/BodyFat/BodyFat_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/body-fat-calculator";
const FALLBACK_TITLE = "Body Fat Calculator";
const FALLBACK_DESCRIPTION =
  "Estimate body fat percentage using the US Navy circumference method.";

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
      title="Body Fat Calculator"
      description="Estimate body fat using neck, waist, and hip (women) measurements and height."
      breadcrumbLabel="body fat calculator"
    >
      <BodyFat_Calculator />
    </HealthCalculatorPageLayout>
  );
}
