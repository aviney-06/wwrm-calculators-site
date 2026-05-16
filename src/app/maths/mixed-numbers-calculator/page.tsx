import { MixedNumbers_Calculator } from "@/components/Maths/MixedNumbers/MixedNumbers_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/mixed-numbers-calculator";
const FALLBACK_TITLE = "Mixed Numbers Calculator";
const FALLBACK_DESCRIPTION = "Convert a mixed number to an improper fraction and decimal.";

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
      title="Mixed Numbers Calculator"
      description="Convert a mixed number to an improper fraction and decimal."
      breadcrumbLabel="mixed numbers calculator"
    >
      <MixedNumbers_Calculator />
    </MathsCalculatorPageLayout>
  );
}
