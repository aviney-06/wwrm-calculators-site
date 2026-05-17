import { Triangle_Calculator } from "@/components/Maths/Triangle/Triangle_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/triangle-calculator";
const FALLBACK_TITLE = "Triangle Calculator";
const FALLBACK_DESCRIPTION = "Triangle area from base and height, or three sides (Heron).";

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
      title="Triangle Calculator"
      description="Triangle area from base and height, or three sides (Heron)."
      breadcrumbLabel="triangle calculator"
    >
      <Triangle_Calculator />
    </MathsCalculatorPageLayout>
  );
}
