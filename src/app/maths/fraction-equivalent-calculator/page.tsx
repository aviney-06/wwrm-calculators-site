import { FractionEquivalent_Calculator } from "@/components/Maths/FractionEquivalent/FractionEquivalent_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/fraction-equivalent-calculator";
const FALLBACK_TITLE = "Equivalent Fraction Calculator";
const FALLBACK_DESCRIPTION = "Find an equivalent fraction with a new denominator.";

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
      title="Equivalent Fraction Calculator"
      description="Find an equivalent fraction with a new denominator."
      breadcrumbLabel="equivalent fraction calculator"
    >
      <FractionEquivalent_Calculator />
    </MathsCalculatorPageLayout>
  );
}
