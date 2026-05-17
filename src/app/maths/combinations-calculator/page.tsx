import { Combinations_Calculator } from "@/components/Maths/Combinations/Combinations_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/combinations-calculator";
const FALLBACK_TITLE = "Combinations Calculator";
const FALLBACK_DESCRIPTION = "Combinations n choose r (nCr).";

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
      title="Combinations Calculator"
      description="Combinations n choose r (nCr)."
      breadcrumbLabel="combinations calculator"
    >
      <Combinations_Calculator />
    </MathsCalculatorPageLayout>
  );
}
