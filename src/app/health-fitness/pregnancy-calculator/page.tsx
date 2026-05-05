import { Pregnancy_Calculator } from "@/components/Health-Fitness/Pregnancy/Pregnancy_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/pregnancy-calculator";
const FALLBACK_TITLE = "Pregnancy Calculator";
const FALLBACK_DESCRIPTION =
  "Estimate due date from the first day of your last menstrual period.";

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
      title="Pregnancy Calculator"
      description="Estimated due date using 40 weeks (280 days) from LMP — for planning, not medical diagnosis."
      breadcrumbLabel="pregnancy calculator"
    >
      <Pregnancy_Calculator />
    </HealthCalculatorPageLayout>
  );
}
