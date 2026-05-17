import { ConeVolume_Calculator } from "@/components/Maths/ConeVolume/ConeVolume_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/cone-volume-calculator";
const FALLBACK_TITLE = "Cone Volume Calculator";
const FALLBACK_DESCRIPTION = "Volume of a cone from radius and height (⅓πr²h).";

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
      title="Cone Volume Calculator"
      description="Volume of a cone from radius and height (⅓πr²h)."
      breadcrumbLabel="cone volume calculator"
    >
      <ConeVolume_Calculator />
    </MathsCalculatorPageLayout>
  );
}
