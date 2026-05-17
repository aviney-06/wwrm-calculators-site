import { Fraction_Calculator } from "@/components/Maths/Fraction/Fraction_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/fraction-calculator";
const FALLBACK_TITLE = "Fraction Calculator";
const FALLBACK_DESCRIPTION = "Add, subtract, multiply, and divide fractions.";

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
      title="Fraction Calculator"
      description="Add, subtract, multiply, and divide fractions."
      breadcrumbLabel="fraction calculator"
    >
      <Fraction_Calculator />
    </MathsCalculatorPageLayout>
  );
}
