import { ArcLength_Calculator } from "@/components/Maths/ArcLength/ArcLength_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/arc-length-calculator";
const FALLBACK_TITLE = "Arc Length Calculator";
const FALLBACK_DESCRIPTION = "Arc length from radius and central angle in degrees.";

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
      title="Arc Length Calculator"
      description="Arc length from radius and central angle in degrees."
      breadcrumbLabel="arc length calculator"
    >
      <ArcLength_Calculator />
    </MathsCalculatorPageLayout>
  );
}
