import { BMR_Calculator } from "@/components/Health-Fitness/BMR/BMR_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/bmr-calculator";
const FALLBACK_TITLE = "BMR Calculator";
const FALLBACK_DESCRIPTION =
  "Basal metabolic rate using the Mifflin–St Jeor equation.";

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
      title="BMR Calculator"
      description="Resting metabolic rate — calories you’d burn at complete rest (Mifflin–St Jeor)."
      breadcrumbLabel="bmr calculator"
    >
      <BMR_Calculator />
    </HealthCalculatorPageLayout>
  );
}
