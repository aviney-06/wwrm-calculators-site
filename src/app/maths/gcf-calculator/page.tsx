import { Gcf_Calculator } from "@/components/Maths/Gcf/Gcf_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/gcf-calculator";
const FALLBACK_TITLE = "GCF Calculator";
const FALLBACK_DESCRIPTION = "Greatest common factor of two integers.";

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
      title="GCF Calculator"
      description="Greatest common factor of two integers."
      breadcrumbLabel="gcf calculator"
    >
      <Gcf_Calculator />
    </MathsCalculatorPageLayout>
  );
}
