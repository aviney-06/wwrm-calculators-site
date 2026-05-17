import { ScientificCalculator } from "@/components/Maths/ScientificCalculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/scientific-calculator";
const FALLBACK_TITLE = "Scientific Calculator";
const FALLBACK_DESCRIPTION =
  "Free online scientific calculator with trig, logs, powers, memory, and mathjs evaluation.";

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
      title="Scientific Calculator"
      description="Trigonometry, logarithms, powers, roots, memory, and standard arithmetic — powered by mathjs."
      breadcrumbLabel="scientific calculator"
    >
      <ScientificCalculator />
    </MathsCalculatorPageLayout>
  );
}
