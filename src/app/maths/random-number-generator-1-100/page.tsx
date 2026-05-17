import { RandomNumber1to100_Calculator } from "@/components/Maths/RandomNumber1to100/RandomNumber1to100_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/random-number-generator-1-100";
const FALLBACK_TITLE = "Random Number Generator 1–100";
const FALLBACK_DESCRIPTION = "Pick a random integer from 1 to 100.";

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
      title="Random Number Generator 1–100"
      description="Pick a random integer from 1 to 100."
      breadcrumbLabel="random number generator 1 100"
    >
      <RandomNumber1to100_Calculator />
    </MathsCalculatorPageLayout>
  );
}
