import { Distance_Calculator } from "@/components/Maths/Distance/Distance_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/distance-calculator";
const FALLBACK_TITLE = "Distance Calculator";
const FALLBACK_DESCRIPTION = "Distance between two points (x₁,y₁) and (x₂,y₂).";

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
      title="Distance Calculator"
      description="Distance between two points (x₁,y₁) and (x₂,y₂)."
      breadcrumbLabel="distance calculator"
    >
      <Distance_Calculator />
    </MathsCalculatorPageLayout>
  );
}
