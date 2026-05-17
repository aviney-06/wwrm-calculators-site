import { SolveForX_Calculator } from "@/components/Maths/SolveForX/SolveForX_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/solve-for-x-calculator";
const FALLBACK_TITLE = "Solve for X Calculator";
const FALLBACK_DESCRIPTION = "Solve linear equations ax + b = c.";

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
      title="Solve for X Calculator"
      description="Solve linear equations ax + b = c."
      breadcrumbLabel="solve for x calculator"
    >
      <SolveForX_Calculator />
    </MathsCalculatorPageLayout>
  );
}
