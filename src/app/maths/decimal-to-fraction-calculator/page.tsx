import { DecimalToFraction_Calculator } from "@/components/Maths/DecimalToFraction/DecimalToFraction_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/decimal-to-fraction-calculator";
const FALLBACK_TITLE = "Decimal to Fraction Calculator";
const FALLBACK_DESCRIPTION = "Convert a decimal to a simplified fraction.";

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
      title="Decimal to Fraction Calculator"
      description="Convert a decimal to a simplified fraction."
      breadcrumbLabel="decimal to fraction calculator"
    >
      <DecimalToFraction_Calculator />
    </MathsCalculatorPageLayout>
  );
}
