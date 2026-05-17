import { MeanMedianMode_Calculator } from "@/components/Maths/MeanMedianMode/MeanMedianMode_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/mean-median-mode-calculator";
const FALLBACK_TITLE = "Mean Median Mode Calculator";
const FALLBACK_DESCRIPTION = "Mean, median, and mode for a list of numbers.";

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
      title="Mean Median Mode Calculator"
      description="Mean, median, and mode for a list of numbers."
      breadcrumbLabel="mean median mode calculator"
    >
      <MeanMedianMode_Calculator />
    </MathsCalculatorPageLayout>
  );
}
