import { SquareRoots_Calculator } from "@/components/Maths/SquareRoots/SquareRoots_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/square-roots-calculator";
const FALLBACK_TITLE = "Square Roots Calculator";
const FALLBACK_DESCRIPTION = "Square root and other roots of a number.";

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
      title="Square Roots Calculator"
      description="Square root and other roots of a number."
      breadcrumbLabel="square roots calculator"
    >
      <SquareRoots_Calculator />
    </MathsCalculatorPageLayout>
  );
}
