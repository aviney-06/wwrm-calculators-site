import { PercentChange_Calculator } from "@/components/Maths/PercentChange/PercentChange_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/percent-change-calculator";
const FALLBACK_TITLE = "Percent Change Calculator";
const FALLBACK_DESCRIPTION = "Percent change between a starting and ending value.";

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
      title="Percent Change Calculator"
      description="Percent change between a starting and ending value."
      breadcrumbLabel="percent change calculator"
    >
      <PercentChange_Calculator />
    </MathsCalculatorPageLayout>
  );
}
