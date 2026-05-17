import { PercentageIncrease_Calculator } from "@/components/Maths/PercentageIncrease/PercentageIncrease_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/percentage-increase-calculator";
const FALLBACK_TITLE = "Percentage Increase Calculator";
const FALLBACK_DESCRIPTION = "Percent increase from an original value to a new value.";

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
      title="Percentage Increase Calculator"
      description="Percent increase from an original value to a new value."
      breadcrumbLabel="percentage increase calculator"
    >
      <PercentageIncrease_Calculator />
    </MathsCalculatorPageLayout>
  );
}
