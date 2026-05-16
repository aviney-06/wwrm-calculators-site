import { PercentDifference_Calculator } from "@/components/Maths/PercentDifference/PercentDifference_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/percent-difference-calculator";
const FALLBACK_TITLE = "Percent Difference Calculator";
const FALLBACK_DESCRIPTION = "Percent difference relative to the average of two values.";

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
      title="Percent Difference Calculator"
      description="Percent difference relative to the average of two values."
      breadcrumbLabel="percent difference calculator"
    >
      <PercentDifference_Calculator />
    </MathsCalculatorPageLayout>
  );
}
