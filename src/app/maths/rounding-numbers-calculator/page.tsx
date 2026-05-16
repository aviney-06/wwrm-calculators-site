import { RoundingNumbers_Calculator } from "@/components/Maths/RoundingNumbers/RoundingNumbers_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/rounding-numbers-calculator";
const FALLBACK_TITLE = "Rounding Numbers Calculator";
const FALLBACK_DESCRIPTION = "Round a number to a chosen number of decimal places.";

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
      title="Rounding Numbers Calculator"
      description="Round a number to a chosen number of decimal places."
      breadcrumbLabel="rounding numbers calculator"
    >
      <RoundingNumbers_Calculator />
    </MathsCalculatorPageLayout>
  );
}
