import { Midpoint_Calculator } from "@/components/Maths/Midpoint/Midpoint_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/midpoint-calculator";
const FALLBACK_TITLE = "Midpoint Calculator";
const FALLBACK_DESCRIPTION = "Midpoint between two points on a plane.";

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
      title="Midpoint Calculator"
      description="Midpoint between two points on a plane."
      breadcrumbLabel="midpoint calculator"
    >
      <Midpoint_Calculator />
    </MathsCalculatorPageLayout>
  );
}
