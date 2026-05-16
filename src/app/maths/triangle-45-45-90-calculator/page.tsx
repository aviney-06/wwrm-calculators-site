import { Triangle454590_Calculator } from "@/components/Maths/Triangle454590/Triangle454590_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/triangle-45-45-90-calculator";
const FALLBACK_TITLE = "45-45-90 Triangle Calculator";
const FALLBACK_DESCRIPTION = "Sides of a 45°-45°-90° triangle from one known side.";

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
      title="45-45-90 Triangle Calculator"
      description="Sides of a 45°-45°-90° triangle from one known side."
      breadcrumbLabel="45 45 90 triangle calculator"
    >
      <Triangle454590_Calculator />
    </MathsCalculatorPageLayout>
  );
}
