import { Binary_Calculator } from "@/components/Maths/Binary/Binary_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/binary-calculator";
const FALLBACK_TITLE = "Binary Calculator";
const FALLBACK_DESCRIPTION = "Add, subtract, multiply, or divide binary numbers.";

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
      title="Binary Calculator"
      description="Add, subtract, multiply, or divide binary numbers."
      breadcrumbLabel="binary calculator"
    >
      <Binary_Calculator />
    </MathsCalculatorPageLayout>
  );
}
