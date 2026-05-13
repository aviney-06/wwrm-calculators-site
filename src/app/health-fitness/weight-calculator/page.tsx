import { Weight_Calculator } from "@/components/Health-Fitness/Weight/Weight_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/weight-calculator";
const FALLBACK_TITLE = "Weight Calculator";
const FALLBACK_DESCRIPTION =
  "Convert body weight between pounds, kilograms, and stone.";

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
      title="Weight Calculator"
      description="Quick conversion among pounds (lb), kilograms (kg), and stone (st) for tracking and recipes."
      breadcrumbLabel="weight calculator"
    >
      <Weight_Calculator />
    </HealthCalculatorPageLayout>
  );
}
