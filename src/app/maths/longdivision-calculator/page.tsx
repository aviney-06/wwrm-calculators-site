import { LongDivision_Calculator } from "@/components/Maths/LongDivision/LongDivision_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/longdivision-calculator";
const FALLBACK_TITLE = "Long Division Calculator";
const FALLBACK_DESCRIPTION = "Divide two numbers — quotient and remainder.";

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
      title="Long Division Calculator"
      description="Divide two numbers — quotient and remainder."
      breadcrumbLabel="long division calculator"
    >
      <LongDivision_Calculator />
    </MathsCalculatorPageLayout>
  );
}
