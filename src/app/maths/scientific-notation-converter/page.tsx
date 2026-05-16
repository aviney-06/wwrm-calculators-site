import { ScientificNotation_Calculator } from "@/components/Maths/ScientificNotation/ScientificNotation_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/scientific-notation-converter";
const FALLBACK_TITLE = "Scientific Notation Converter";
const FALLBACK_DESCRIPTION = "Convert between decimal and scientific notation.";

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
      title="Scientific Notation Converter"
      description="Convert between decimal and scientific notation."
      breadcrumbLabel="scientific notation converter"
    >
      <ScientificNotation_Calculator />
    </MathsCalculatorPageLayout>
  );
}
