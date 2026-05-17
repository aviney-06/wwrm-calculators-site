import { InchesToFraction_Calculator } from "@/components/Maths/InchesToFraction/InchesToFraction_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/inches-to-fraction-calculator";
const FALLBACK_TITLE = "Inches to Fraction Calculator";
const FALLBACK_DESCRIPTION = "Convert decimal inches to a fractional inch (nearest 1/16).";

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
      title="Inches to Fraction Calculator"
      description="Convert decimal inches to a fractional inch (nearest 1/16)."
      breadcrumbLabel="inches to fraction calculator"
    >
      <InchesToFraction_Calculator />
    </MathsCalculatorPageLayout>
  );
}
