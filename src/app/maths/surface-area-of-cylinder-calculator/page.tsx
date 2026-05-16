import { SurfaceAreaCylinder_Calculator } from "@/components/Maths/SurfaceAreaCylinder/SurfaceAreaCylinder_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/surface-area-of-cylinder-calculator";
const FALLBACK_TITLE = "Surface Area of a Cylinder Calculator";
const FALLBACK_DESCRIPTION = "Cylinder surface area from radius and height (2πr(r+h)).";

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
      title="Surface Area of a Cylinder Calculator"
      description="Cylinder surface area from radius and height (2πr(r+h))."
      breadcrumbLabel="surface area of cylinder calculator"
    >
      <SurfaceAreaCylinder_Calculator />
    </MathsCalculatorPageLayout>
  );
}
