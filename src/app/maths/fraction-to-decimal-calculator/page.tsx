import { FractionToDecimal_Calculator } from "@/components/Maths/FractionToDecimal/FractionToDecimal_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/fraction-to-decimal-calculator";
const FALLBACK_TITLE = "Fraction to Decimal Calculator";
const FALLBACK_DESCRIPTION = "Convert a fraction to a decimal.";

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
      title="Fraction to Decimal Calculator"
      description="Convert a fraction to a decimal."
      breadcrumbLabel="fraction to decimal calculator"
    >
      <FractionToDecimal_Calculator />
    </MathsCalculatorPageLayout>
  );
}
