import { CylinderVolume_Calculator } from "@/components/Maths/CylinderVolume/CylinderVolume_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/cylinder-volume-calculator";
const FALLBACK_TITLE = "Cylinder Volume Calculator";
const FALLBACK_DESCRIPTION = "Volume of a cylinder from radius and height (πr²h).";

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
      title="Cylinder Volume Calculator"
      description="Volume of a cylinder from radius and height (πr²h)."
      breadcrumbLabel="cylinder volume calculator"
    >
      <CylinderVolume_Calculator />
    </MathsCalculatorPageLayout>
  );
}
