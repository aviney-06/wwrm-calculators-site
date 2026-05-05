import { Period_Calculator } from "@/components/Health-Fitness/Period/Period_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/period-calculator";
const FALLBACK_TITLE = "Period Calculator";
const FALLBACK_DESCRIPTION =
  "Next period start date from last period and cycle length.";

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
      title="Period Calculator"
      description="Adds your average cycle length to your last period start date."
      breadcrumbLabel="period calculator"
    >
      <Period_Calculator />
    </HealthCalculatorPageLayout>
  );
}
