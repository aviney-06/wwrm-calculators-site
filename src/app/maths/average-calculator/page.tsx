import { Average_Calculator } from "@/components/Maths/Average/Average_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/average-calculator";
const FALLBACK_TITLE = "Average Calculator";
const FALLBACK_DESCRIPTION = "Arithmetic mean of any list of numbers.";

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
      title="Average Calculator"
      description="Arithmetic mean of any list of numbers."
      breadcrumbLabel="average calculator"
    >
      <Average_Calculator />
    </MathsCalculatorPageLayout>
  );
}
