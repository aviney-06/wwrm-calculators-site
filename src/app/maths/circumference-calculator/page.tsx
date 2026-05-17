import { Circumference_Calculator } from "@/components/Maths/Circumference/Circumference_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/circumference-calculator";
const FALLBACK_TITLE = "Circumference Calculator";
const FALLBACK_DESCRIPTION = "Circle circumference from radius (2πr).";

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
      title="Circumference Calculator"
      description="Circle circumference from radius (2πr)."
      breadcrumbLabel="circumference calculator"
    >
      <Circumference_Calculator />
    </MathsCalculatorPageLayout>
  );
}
