import { PercentError_Calculator } from "@/components/Maths/PercentError/PercentError_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/percent-error-calculator";
const FALLBACK_TITLE = "Percent Error Calculator";
const FALLBACK_DESCRIPTION = "Percent error between measured and accepted (true) value.";

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
      title="Percent Error Calculator"
      description="Percent error between measured and accepted (true) value."
      breadcrumbLabel="percent error calculator"
    >
      <PercentError_Calculator />
    </MathsCalculatorPageLayout>
  );
}
