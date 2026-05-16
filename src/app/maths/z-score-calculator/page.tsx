import { ZScore_Calculator } from "@/components/Maths/ZScore/ZScore_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/z-score-calculator";
const FALLBACK_TITLE = "Z Score Calculator";
const FALLBACK_DESCRIPTION = "Standard score: (x − mean) ÷ standard deviation.";

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
      title="Z Score Calculator"
      description="Standard score: (x − mean) ÷ standard deviation."
      breadcrumbLabel="z score calculator"
    >
      <ZScore_Calculator />
    </MathsCalculatorPageLayout>
  );
}
