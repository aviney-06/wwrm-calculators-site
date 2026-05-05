import { IdealWeight_Calculator } from "@/components/Health-Fitness/IdealWeight/IdealWeight_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/ideal-weight-calculator";
const FALLBACK_TITLE = "Ideal Weight Calculator";
const FALLBACK_DESCRIPTION =
  "Devine formula ideal body weight from height and sex.";

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
      title="Ideal Weight Calculator"
      description="Classic Devine (1974) estimate — one of many ways people discuss “ideal” weight."
      breadcrumbLabel="ideal weight calculator"
    >
      <IdealWeight_Calculator />
    </HealthCalculatorPageLayout>
  );
}
