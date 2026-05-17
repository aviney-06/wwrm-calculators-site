import { CircleDiameter_Calculator } from "@/components/Maths/CircleDiameter/CircleDiameter_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/circle-diameter-calculator";
const FALLBACK_TITLE = "Circle Diameter Calculator";
const FALLBACK_DESCRIPTION = "Diameter from radius or circumference.";

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
      title="Circle Diameter Calculator"
      description="Diameter from radius or circumference."
      breadcrumbLabel="circle diameter calculator"
    >
      <CircleDiameter_Calculator />
    </MathsCalculatorPageLayout>
  );
}
