import { CirclePerimeter_Calculator } from "@/components/Maths/CirclePerimeter/CirclePerimeter_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/circle-perimeter-calculator";
const FALLBACK_TITLE = "Circle Perimeter Calculator";
const FALLBACK_DESCRIPTION = "Perimeter (circumference) of a circle from radius.";

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
      title="Circle Perimeter Calculator"
      description="Perimeter (circumference) of a circle from radius."
      breadcrumbLabel="circle perimeter calculator"
    >
      <CirclePerimeter_Calculator />
    </MathsCalculatorPageLayout>
  );
}
