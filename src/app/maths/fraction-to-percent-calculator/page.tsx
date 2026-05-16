import { FractionToPercent_Calculator } from "@/components/Maths/FractionToPercent/FractionToPercent_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/fraction-to-percent-calculator";
const FALLBACK_TITLE = "Fraction to Percent Calculator";
const FALLBACK_DESCRIPTION = "Convert a fraction to a percent.";

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
      title="Fraction to Percent Calculator"
      description="Convert a fraction to a percent."
      breadcrumbLabel="fraction to percent calculator"
    >
      <FractionToPercent_Calculator />
    </MathsCalculatorPageLayout>
  );
}
