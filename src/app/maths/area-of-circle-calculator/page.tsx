import { AreaOfCircle_Calculator } from "@/components/Maths/AreaOfCircle/AreaOfCircle_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/area-of-circle-calculator";
const FALLBACK_TITLE = "Area of a Circle Calculator";
const FALLBACK_DESCRIPTION = "Circle area from radius (πr²).";

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
      title="Area of a Circle Calculator"
      description="Circle area from radius (πr²)."
      breadcrumbLabel="area of a circle calculator"
    >
      <AreaOfCircle_Calculator />
    </MathsCalculatorPageLayout>
  );
}
