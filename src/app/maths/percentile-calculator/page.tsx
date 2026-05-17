import { Percentile_Calculator } from "@/components/Maths/Percentile/Percentile_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/percentile-calculator";
const FALLBACK_TITLE = "Percentile Calculator";
const FALLBACK_DESCRIPTION = "Find a percentile value from a data set.";

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
      title="Percentile Calculator"
      description="Find a percentile value from a data set."
      breadcrumbLabel="percentile calculator"
    >
      <Percentile_Calculator />
    </MathsCalculatorPageLayout>
  );
}
