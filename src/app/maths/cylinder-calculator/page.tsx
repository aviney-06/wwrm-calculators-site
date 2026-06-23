import { Cylinder_Calculator } from "@/components/Maths/Cylinder/Cylinder_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/cylinder-calculator";
const FALLBACK_TITLE = "Cylinder Calculator";
const FALLBACK_DESCRIPTION =
  "Calculate the volume, base area, lateral surface area, and total surface area of a cylinder from its radius and height.";

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
      title="Cylinder Calculator"
      description="Calculate the volume, base area, lateral surface area, and total surface area of a cylinder from its radius and height."
      breadcrumbLabel="cylinder calculator"
    >
      <Cylinder_Calculator />
    </MathsCalculatorPageLayout>
  );
}
