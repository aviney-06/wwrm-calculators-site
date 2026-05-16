import { Kinetic_Calculator } from "@/components/Maths/Kinetic/Kinetic_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/kinetic-energy-calculator";
const FALLBACK_TITLE = "Kinetic Energy Calculator";
const FALLBACK_DESCRIPTION = "Kinetic energy from mass and velocity (KE = ½mv²).";

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
      title="Kinetic Energy Calculator"
      description="Kinetic energy from mass and velocity (KE = ½mv²)."
      breadcrumbLabel="kinetic energy calculator"
    >
      <Kinetic_Calculator />
    </MathsCalculatorPageLayout>
  );
}
