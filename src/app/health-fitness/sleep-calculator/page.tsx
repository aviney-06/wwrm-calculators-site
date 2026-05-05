import { Sleep_Calculator } from "@/components/Health-Fitness/Sleep/Sleep_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/sleep-calculator";
const FALLBACK_TITLE = "Sleep Calculator";
const FALLBACK_DESCRIPTION =
  "Bedtime or wake times aligned with ~90-minute sleep cycles.";

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
      title="Sleep Calculator"
      description="Suggests times based on full sleep cycles and a few minutes to fall asleep."
      breadcrumbLabel="sleep calculator"
    >
      <Sleep_Calculator />
    </HealthCalculatorPageLayout>
  );
}
