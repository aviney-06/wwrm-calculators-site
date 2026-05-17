import { PercentToDecimal_Calculator } from "@/components/Maths/PercentToDecimal/PercentToDecimal_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/percent-to-decimal-calculator";
const FALLBACK_TITLE = "Percent to Decimal Calculator";
const FALLBACK_DESCRIPTION = "Convert a percent to a decimal.";

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
      title="Percent to Decimal Calculator"
      description="Convert a percent to a decimal."
      breadcrumbLabel="percent to decimal calculator"
    >
      <PercentToDecimal_Calculator />
    </MathsCalculatorPageLayout>
  );
}
