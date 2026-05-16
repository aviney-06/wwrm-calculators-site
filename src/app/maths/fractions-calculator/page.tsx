import { Fraction_Calculator } from "@/components/Maths/Fraction/Fraction_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/fractions-calculator";
const FALLBACK_TITLE = "Fractions Calculator";
const FALLBACK_DESCRIPTION = "Add, subtract, multiply, or divide fractions.";

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
      title="Fractions Calculator"
      description="Add, subtract, multiply, or divide fractions."
      breadcrumbLabel="fractions calculator"
    >
      <Fraction_Calculator />
    </MathsCalculatorPageLayout>
  );
}
