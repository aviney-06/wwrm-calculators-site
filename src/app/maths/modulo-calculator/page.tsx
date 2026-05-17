import { Modulo_Calculator } from "@/components/Maths/Modulo/Modulo_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/modulo-calculator";
const FALLBACK_TITLE = "Modulo Calculator";
const FALLBACK_DESCRIPTION = "Modulo (remainder) of a ÷ b.";

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
      title="Modulo Calculator"
      description="Modulo (remainder) of a ÷ b."
      breadcrumbLabel="modulo calculator"
    >
      <Modulo_Calculator />
    </MathsCalculatorPageLayout>
  );
}
