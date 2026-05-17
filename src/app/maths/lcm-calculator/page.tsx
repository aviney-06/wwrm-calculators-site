import { Lcm_Calculator } from "@/components/Maths/Lcm/Lcm_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/lcm-calculator";
const FALLBACK_TITLE = "LCM Calculator";
const FALLBACK_DESCRIPTION = "Least common multiple of two integers.";

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
      title="LCM Calculator"
      description="Least common multiple of two integers."
      breadcrumbLabel="lcm calculator"
    >
      <Lcm_Calculator />
    </MathsCalculatorPageLayout>
  );
}
