import { Slope_Calculator } from "@/components/Maths/Slope/Slope_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/slope-calculator";
const FALLBACK_TITLE = "Slope Calculator";
const FALLBACK_DESCRIPTION = "Slope between two points (rise over run).";

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
      title="Slope Calculator"
      description="Slope between two points (rise over run)."
      breadcrumbLabel="slope calculator"
    >
      <Slope_Calculator />
    </MathsCalculatorPageLayout>
  );
}
