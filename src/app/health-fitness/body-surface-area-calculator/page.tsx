import { BSA_Calculator } from "@/components/Health-Fitness/BSA/BSA_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/body-surface-area-calculator";
const FALLBACK_TITLE = "Body Surface Area Calculator";
const FALLBACK_DESCRIPTION =
  "BSA in m² using the Mosteller formula from height and weight.";

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
      title="Body Surface Area Calculator"
      description="Mosteller body surface area from height and weight."
      breadcrumbLabel="body surface area calculator"
    >
      <BSA_Calculator />
    </HealthCalculatorPageLayout>
  );
}
