import { Area_Calculator } from "@/components/Maths/Area/Area_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/area-calculator";
const FALLBACK_TITLE = "Area Calculator";
const FALLBACK_DESCRIPTION = "Area of a rectangle, triangle, or circle.";

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
      title="Area Calculator"
      description="Area of a rectangle, triangle, or circle."
      breadcrumbLabel="area calculator"
    >
      <Area_Calculator />
    </MathsCalculatorPageLayout>
  );
}
