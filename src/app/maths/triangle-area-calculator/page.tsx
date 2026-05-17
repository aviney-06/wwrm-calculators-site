import { TriangleArea_Calculator } from "@/components/Maths/TriangleArea/TriangleArea_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/triangle-area-calculator";
const FALLBACK_TITLE = "Triangle Area Calculator";
const FALLBACK_DESCRIPTION = "Triangle area from base and height.";

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
      title="Triangle Area Calculator"
      description="Triangle area from base and height."
      breadcrumbLabel="triangle area calculator"
    >
      <TriangleArea_Calculator />
    </MathsCalculatorPageLayout>
  );
}
