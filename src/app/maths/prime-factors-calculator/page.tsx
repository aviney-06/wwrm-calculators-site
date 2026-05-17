import { PrimeFactors_Calculator } from "@/components/Maths/PrimeFactors/PrimeFactors_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/prime-factors-calculator";
const FALLBACK_TITLE = "Prime Factors Calculator";
const FALLBACK_DESCRIPTION = "Prime factorization of an integer.";

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
      title="Prime Factors Calculator"
      description="Prime factorization of an integer."
      breadcrumbLabel="prime factors calculator"
    >
      <PrimeFactors_Calculator />
    </MathsCalculatorPageLayout>
  );
}
