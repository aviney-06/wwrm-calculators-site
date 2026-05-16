import { RandomNumber1to10_Calculator } from "@/components/Maths/RandomNumber1to10/RandomNumber1to10_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/random-number-generator-1-10";
const FALLBACK_TITLE = "Random Number Generator 1–10";
const FALLBACK_DESCRIPTION = "Pick a random integer from 1 to 10.";

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
      title="Random Number Generator 1–10"
      description="Pick a random integer from 1 to 10."
      breadcrumbLabel="random number 1 10"
    >
      <RandomNumber1to10_Calculator />
    </MathsCalculatorPageLayout>
  );
}
