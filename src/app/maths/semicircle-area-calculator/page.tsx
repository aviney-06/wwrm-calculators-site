import { SemicircleArea_Calculator } from "@/components/Maths/SemicircleArea/SemicircleArea_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/semicircle-area-calculator";
const FALLBACK_TITLE = "Semicircle Area Calculator";
const FALLBACK_DESCRIPTION = "Area of a semicircle from radius (½πr²).";

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
      title="Semicircle Area Calculator"
      description="Area of a semicircle from radius (½πr²)."
      breadcrumbLabel="semicircle area calculator"
    >
      <SemicircleArea_Calculator />
    </MathsCalculatorPageLayout>
  );
}
