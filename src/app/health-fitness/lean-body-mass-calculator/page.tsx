import { LeanBodyMass_Calculator } from "@/components/Health-Fitness/LeanBodyMass/LeanBodyMass_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/lean-body-mass-calculator";
const FALLBACK_TITLE = "Lean Body Mass Calculator";
const FALLBACK_DESCRIPTION =
  "Estimate lean body mass with the Boer formula.";

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
      title="Lean Body Mass Calculator"
      description="Boer equation from height, weight, and sex — an estimate of non-fat mass."
      breadcrumbLabel="lean body mass calculator"
    >
      <LeanBodyMass_Calculator />
    </HealthCalculatorPageLayout>
  );
}
