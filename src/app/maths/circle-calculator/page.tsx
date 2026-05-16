import { Circle_Calculator } from "@/components/Maths/Circle/Circle_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/circle-calculator";
const FALLBACK_TITLE = "Circle Calculator";
const FALLBACK_DESCRIPTION = "Diameter, circumference, and area from radius.";

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
      title="Circle Calculator"
      description="Diameter, circumference, and area from radius."
      breadcrumbLabel="circle calculator"
    >
      <Circle_Calculator />
    </MathsCalculatorPageLayout>
  );
}
