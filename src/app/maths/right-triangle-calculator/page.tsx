import { RightTriangle_Calculator } from "@/components/Maths/RightTriangle/RightTriangle_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/right-triangle-calculator";
const FALLBACK_TITLE = "Right Triangle Calculator";
const FALLBACK_DESCRIPTION = "Solve for the hypotenuse or a leg using the Pythagorean theorem.";

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
      title="Right Triangle Calculator"
      description="Solve for the hypotenuse or a leg using the Pythagorean theorem."
      breadcrumbLabel="right triangle calculator"
    >
      <RightTriangle_Calculator />
    </MathsCalculatorPageLayout>
  );
}
