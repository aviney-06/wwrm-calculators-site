import { SphereVolume_Calculator } from "@/components/Maths/SphereVolume/SphereVolume_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/sphere-volume-calculator";
const FALLBACK_TITLE = "Sphere Volume Calculator";
const FALLBACK_DESCRIPTION = "Volume of a sphere from radius (⁴⁄₃πr³).";

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
      title="Sphere Volume Calculator"
      description="Volume of a sphere from radius (⁴⁄₃πr³)."
      breadcrumbLabel="sphere volume calculator"
    >
      <SphereVolume_Calculator />
    </MathsCalculatorPageLayout>
  );
}
