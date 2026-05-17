import { PythagoreanTheorem_Calculator } from "@/components/Maths/PythagoreanTheorem/PythagoreanTheorem_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/pythagorean-theorem-calculator";
const FALLBACK_TITLE = "Pythagorean Theorem Calculator";
const FALLBACK_DESCRIPTION = "Find the hypotenuse c = √(a² + b²) from two legs.";

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
      title="Pythagorean Theorem Calculator"
      description="Find the hypotenuse c = √(a² + b²) from two legs."
      breadcrumbLabel="pythagorean theorem calculator"
    >
      <PythagoreanTheorem_Calculator />
    </MathsCalculatorPageLayout>
  );
}
