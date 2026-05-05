import { BMI_Calculator } from "@/components/Health-Fitness/BMI/BMI_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/bmi-calculator";
const FALLBACK_TITLE = "BMI Calculator";
const FALLBACK_DESCRIPTION = "Check your Body Mass Index (BMI) using your height and weight.";

export async function generateMetadata() {
  return generateCalculatorPageMetadata({
    path: PATH,
    fallbackTitle: FALLBACK_TITLE,
    fallbackDescription: FALLBACK_DESCRIPTION,
  });
}

export default function BMICalculatorPage() {
  return (
    <HealthCalculatorPageLayout
      path={PATH}
      title={FALLBACK_TITLE}
      description={FALLBACK_DESCRIPTION}
      breadcrumbLabel="bmi calculator"
    >
      <BMI_Calculator />
    </HealthCalculatorPageLayout>
  );
}
