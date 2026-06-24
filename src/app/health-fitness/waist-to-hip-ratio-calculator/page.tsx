import { WaistHipRatio_Calculator } from "@/components/Health-Fitness/WaistHipRatio/WaistHipRatio_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/waist-to-hip-ratio-calculator";
const FALLBACK_TITLE = "Waist to Hip Ratio Calculator";
const FALLBACK_DESCRIPTION =
  "Calculate your waist-to-hip ratio (WHR) and see your health risk category.";

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
      title="Waist to Hip Ratio Calculator"
      description="Divide waist by hip circumference to find your WHR and WHO health-risk category."
      breadcrumbLabel="waist to hip ratio calculator"
    >
      <WaistHipRatio_Calculator />
    </HealthCalculatorPageLayout>
  );
}
