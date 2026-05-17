import { PercentageDecrease_Calculator } from "@/components/Maths/PercentageDecrease/PercentageDecrease_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/percentage-decrease-calculator";
const FALLBACK_TITLE = "Percentage Decrease Calculator";
const FALLBACK_DESCRIPTION = "Percent decrease from original to new value.";

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
      title="Percentage Decrease Calculator"
      description="Percent decrease from original to new value."
      breadcrumbLabel="percentage decrease calculator"
    >
      <PercentageDecrease_Calculator />
    </MathsCalculatorPageLayout>
  );
}
