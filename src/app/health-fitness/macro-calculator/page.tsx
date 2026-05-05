import { Macro_Calculator } from "@/components/Health-Fitness/Macro/Macro_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/macro-calculator";
const FALLBACK_TITLE = "Macro Calculator";
const FALLBACK_DESCRIPTION =
  "Estimate daily calories (TDEE) and protein, fat, and carbohydrate targets.";

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
      title="Macro Calculator"
      description="Get TDEE from your stats and activity, then split into daily protein, fat, and carbs."
      breadcrumbLabel="macro calculator"
    >
      <Macro_Calculator />
    </HealthCalculatorPageLayout>
  );
}
