import { RandomNumber_Calculator } from "@/components/Maths/RandomNumber/RandomNumber_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/random-number-generator";
const FALLBACK_TITLE = "Random Number Generator";
const FALLBACK_DESCRIPTION = "Generate random integers in a custom range.";

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
      title="Random Number Generator"
      description="Generate random integers in a custom range."
      breadcrumbLabel="random number generator"
    >
      <RandomNumber_Calculator />
    </MathsCalculatorPageLayout>
  );
}
