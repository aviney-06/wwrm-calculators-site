import { SquareFootageCircle_Calculator } from "@/components/Maths/SquareFootageCircle/SquareFootageCircle_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/square-footage-circle-calculator";
const FALLBACK_TITLE = "Square Footage of a Circle Calculator";
const FALLBACK_DESCRIPTION = "Circle area in square feet from radius in feet.";

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
      title="Square Footage of a Circle Calculator"
      description="Circle area in square feet from radius in feet."
      breadcrumbLabel="square footage circle calculator"
    >
      <SquareFootageCircle_Calculator />
    </MathsCalculatorPageLayout>
  );
}
