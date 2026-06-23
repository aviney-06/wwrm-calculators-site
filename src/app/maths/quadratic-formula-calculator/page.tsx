import { Quadratic_Calculator } from "@/components/Maths/Quadratic/Quadratic_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/quadratic-formula-calculator";
const FALLBACK_TITLE = "Quadratic Formula Calculator";
const FALLBACK_DESCRIPTION =
  "Solve any quadratic equation ax² + bx + c = 0 for its real or complex roots, discriminant, and vertex.";

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
      title="Quadratic Formula Calculator"
      description="Solve any quadratic equation ax² + bx + c = 0 for its real or complex roots, discriminant, and vertex."
      breadcrumbLabel="quadratic formula calculator"
    >
      <Quadratic_Calculator />
    </MathsCalculatorPageLayout>
  );
}
