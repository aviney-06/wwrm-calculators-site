import { Factors_Calculator } from "@/components/Maths/Factors/Factors_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/factors-calculator";
const FALLBACK_TITLE = "Factors Calculator";
const FALLBACK_DESCRIPTION = "List all factors (divisors) of an integer.";

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
      title="Factors Calculator"
      description="List all factors (divisors) of an integer."
      breadcrumbLabel="factors calculator"
    >
      <Factors_Calculator />
    </MathsCalculatorPageLayout>
  );
}
