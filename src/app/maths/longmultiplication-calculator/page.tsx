import { LongMultiplication_Calculator } from "@/components/Maths/LongMultiplication/LongMultiplication_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/longmultiplication-calculator";
const FALLBACK_TITLE = "Long Multiplication Calculator";
const FALLBACK_DESCRIPTION = "Multiply two integers.";

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
      title="Long Multiplication Calculator"
      description="Multiply two integers."
      breadcrumbLabel="long multiplication calculator"
    >
      <LongMultiplication_Calculator />
    </MathsCalculatorPageLayout>
  );
}
