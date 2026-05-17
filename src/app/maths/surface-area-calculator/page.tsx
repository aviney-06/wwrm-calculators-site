import { SurfaceArea_Calculator } from "@/components/Maths/SurfaceArea/SurfaceArea_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/surface-area-calculator";
const FALLBACK_TITLE = "Surface Area Calculator";
const FALLBACK_DESCRIPTION = "Surface area of a box, cylinder, or sphere.";

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
      title="Surface Area Calculator"
      description="Surface area of a box, cylinder, or sphere."
      breadcrumbLabel="surface area calculator"
    >
      <SurfaceArea_Calculator />
    </MathsCalculatorPageLayout>
  );
}
