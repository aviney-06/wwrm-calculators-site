import { Ratio_Calculator } from "@/components/Maths/Ratio/Ratio_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/ratio-calculator";
const FALLBACK_TITLE = "Ratio Calculator";
const FALLBACK_DESCRIPTION = "Simplify a ratio and show decimal form.";

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
      title="Ratio Calculator"
      description="Simplify a ratio and show decimal form."
      breadcrumbLabel="ratio calculator"
    >
      <Ratio_Calculator />
    </MathsCalculatorPageLayout>
  );
}
