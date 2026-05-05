import { GFR_Calculator } from "@/components/Health-Fitness/GFR/GFR_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/gfr-calculator";
const FALLBACK_TITLE = "GFR Calculator";
const FALLBACK_DESCRIPTION =
  "Estimated glomerular filtration rate (MDRD) from creatinine, age, and sex.";

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
      title="GFR Calculator"
      description="Adult eGFR estimate (MDRD-style). Use lab values from your clinician."
      breadcrumbLabel="gfr calculator"
    >
      <GFR_Calculator />
    </HealthCalculatorPageLayout>
  );
}
