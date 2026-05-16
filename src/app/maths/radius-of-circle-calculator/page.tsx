import { RadiusOfCircle_Calculator } from "@/components/Maths/RadiusOfCircle/RadiusOfCircle_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/radius-of-circle-calculator";
const FALLBACK_TITLE = "Radius of a Circle Calculator";
const FALLBACK_DESCRIPTION = "Find radius from circumference or area.";

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
      title="Radius of a Circle Calculator"
      description="Find radius from circumference or area."
      breadcrumbLabel="radius of a circle calculator"
    >
      <RadiusOfCircle_Calculator />
    </MathsCalculatorPageLayout>
  );
}
