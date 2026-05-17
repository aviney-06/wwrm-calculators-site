import { StandardDeviation_Calculator } from "@/components/Maths/StandardDeviation/StandardDeviation_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/standard-deviation-calculator";
const FALLBACK_TITLE = "Standard Deviation Calculator";
const FALLBACK_DESCRIPTION = "Sample and population standard deviation from a data set.";

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
      title="Standard Deviation Calculator"
      description="Sample and population standard deviation from a data set."
      breadcrumbLabel="standard deviation calculator"
    >
      <StandardDeviation_Calculator />
    </MathsCalculatorPageLayout>
  );
}
