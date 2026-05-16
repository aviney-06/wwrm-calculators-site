import { AveragePercentage_Calculator } from "@/components/Maths/AveragePercentage/AveragePercentage_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/average-percentage-calculator";
const FALLBACK_TITLE = "Average Percentage Calculator";
const FALLBACK_DESCRIPTION = "Simple average of multiple percentages.";

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
      title="Average Percentage Calculator"
      description="Simple average of multiple percentages."
      breadcrumbLabel="average percentage calculator"
    >
      <AveragePercentage_Calculator />
    </MathsCalculatorPageLayout>
  );
}
