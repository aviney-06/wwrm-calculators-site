import { PercentOff_Calculator } from "@/components/Maths/PercentOff/PercentOff_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/percent-off-calculator";
const FALLBACK_TITLE = "Percent Off Calculator";
const FALLBACK_DESCRIPTION = "Sale price after a percent discount.";

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
      title="Percent Off Calculator"
      description="Sale price after a percent discount."
      breadcrumbLabel="percent off calculator"
    >
      <PercentOff_Calculator />
    </MathsCalculatorPageLayout>
  );
}
