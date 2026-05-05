import { AnorexicBMI_Calculator } from "@/components/Health-Fitness/AnorexicBMI/AnorexicBMI_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/anorexic-bmi-calculator";
const FALLBACK_TITLE = "BMI Calculator (Recovery resources)";
const FALLBACK_DESCRIPTION =
  "BMI with mental health resources — not for promoting harmful goals.";

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
      title="BMI (with support resources)"
      description="Standard BMI math with links to eating-disorder support. If you are struggling, you are not alone."
      breadcrumbLabel="anorexic bmi calculator"
    >
      <AnorexicBMI_Calculator />
    </HealthCalculatorPageLayout>
  );
}
