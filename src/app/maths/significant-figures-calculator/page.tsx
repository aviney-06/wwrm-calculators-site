import { SignificantFigures_Calculator } from "@/components/Maths/SignificantFigures/SignificantFigures_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/significant-figures-calculator";
const FALLBACK_TITLE = "Significant Figures Calculator";
const FALLBACK_DESCRIPTION = "Count significant figures in a number.";

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
      title="Significant Figures Calculator"
      description="Count significant figures in a number."
      breadcrumbLabel="significant figures calculator"
    >
      <SignificantFigures_Calculator />
    </MathsCalculatorPageLayout>
  );
}
