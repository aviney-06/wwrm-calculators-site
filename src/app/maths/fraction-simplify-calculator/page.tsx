import { FractionSimplify_Calculator } from "@/components/Maths/FractionSimplify/FractionSimplify_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/fraction-simplify-calculator";
const FALLBACK_TITLE = "Fraction Simplify Calculator";
const FALLBACK_DESCRIPTION = "Reduce a fraction to lowest terms.";

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
      title="Fraction Simplify Calculator"
      description="Reduce a fraction to lowest terms."
      breadcrumbLabel="fraction simplify calculator"
    >
      <FractionSimplify_Calculator />
    </MathsCalculatorPageLayout>
  );
}
