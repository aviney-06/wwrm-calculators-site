import { SectorArea_Calculator } from "@/components/Maths/SectorArea/SectorArea_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/sector-area-calculator";
const FALLBACK_TITLE = "Sector Area Calculator";
const FALLBACK_DESCRIPTION = "Area of a circle sector from radius and central angle in degrees.";

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
      title="Sector Area Calculator"
      description="Area of a circle sector from radius and central angle in degrees."
      breadcrumbLabel="sector area calculator"
    >
      <SectorArea_Calculator />
    </MathsCalculatorPageLayout>
  );
}
