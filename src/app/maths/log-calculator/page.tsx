import { Log_Calculator } from "@/components/Maths/Log/Log_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/log-calculator";
const FALLBACK_TITLE = "Log Calculator";
const FALLBACK_DESCRIPTION = "Natural log (ln) and common log (log₁₀).";

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
      title="Log Calculator"
      description="Natural log (ln) and common log (log₁₀)."
      breadcrumbLabel="log calculator"
    >
      <Log_Calculator />
    </MathsCalculatorPageLayout>
  );
}
