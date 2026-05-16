import { Math_Calculator } from "@/components/Maths/Math/Math_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/math-calculator";
const FALLBACK_TITLE = "Math Calculator";
const FALLBACK_DESCRIPTION = "Evaluate basic math expressions (+, −, ×, ÷, parentheses).";

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
      title="Math Calculator"
      description="Evaluate basic math expressions (+, −, ×, ÷, parentheses)."
      breadcrumbLabel="math calculator"
    >
      <Math_Calculator />
    </MathsCalculatorPageLayout>
  );
}
