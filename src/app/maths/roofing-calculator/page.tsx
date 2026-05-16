import { Roofing_Calculator } from "@/components/Maths/Roofing/Roofing_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/roofing-calculator";
const FALLBACK_TITLE = "Roofing Calculator";
const FALLBACK_DESCRIPTION = "Estimate roof area from footprint and pitch.";

export async function generateMetadata() {
  return generateCalculatorPageMetadata({
    path: PATH,
    fallbackTitle: FALLBACK_TITLE,
    fallbackDescription: FALLBACK_DESCRIPTION,
  });
}

export default function Page() {
  return (
    <MathsCalculatorPageLayout
      path={PATH}
      title="Roofing Calculator"
      description="Estimate roof area from footprint and pitch."
      breadcrumbLabel="roofing calculator"
    >
      <Roofing_Calculator />
    </MathsCalculatorPageLayout>
  );
}
