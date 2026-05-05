import { BAC_Calculator } from "@/components/Health-Fitness/BAC/BAC_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/bac-calculator";
const FALLBACK_TITLE = "BAC Calculator";
const FALLBACK_DESCRIPTION =
  "Very rough blood alcohol trend estimate — not for legal use.";

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
      title="BAC Calculator"
      description="Educational only — never drink and drive; legal limits vary."
      breadcrumbLabel="bac calculator"
    >
      <BAC_Calculator />
    </HealthCalculatorPageLayout>
  );
}
