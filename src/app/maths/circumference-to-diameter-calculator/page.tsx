import { CircumferenceToDiameter_Calculator } from "@/components/Maths/CircumferenceToDiameter/CircumferenceToDiameter_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/circumference-to-diameter-calculator";
const FALLBACK_TITLE = "Circumference to Diameter Calculator";
const FALLBACK_DESCRIPTION = "Find diameter from circumference (d = C / π).";

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
      title="Circumference to Diameter Calculator"
      description="Find diameter from circumference (d = C / π)."
      breadcrumbLabel="circumference to diameter calculator"
    >
      <CircumferenceToDiameter_Calculator />
    </MathsCalculatorPageLayout>
  );
}
