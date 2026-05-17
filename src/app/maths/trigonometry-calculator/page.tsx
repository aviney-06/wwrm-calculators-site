import { Trigonometry_Calculator } from "@/components/Maths/Trigonometry/Trigonometry_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/trigonometry-calculator";
const FALLBACK_TITLE = "Trigonometry Calculator";
const FALLBACK_DESCRIPTION = "sin, cos, and tan for an angle in degrees.";

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
      title="Trigonometry Calculator"
      description="sin, cos, and tan for an angle in degrees."
      breadcrumbLabel="trigonometry calculator"
    >
      <Trigonometry_Calculator />
    </MathsCalculatorPageLayout>
  );
}
