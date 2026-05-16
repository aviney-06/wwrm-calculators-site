import { Hypotenuse_Calculator } from "@/components/Maths/Hypotenuse/Hypotenuse_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/hypotenuse-calculator";
const FALLBACK_TITLE = "Hypotenuse Calculator";
const FALLBACK_DESCRIPTION = "Find the hypotenuse of a right triangle from two legs.";

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
      title="Hypotenuse Calculator"
      description="Find the hypotenuse of a right triangle from two legs."
      breadcrumbLabel="hypotenuse calculator"
    >
      <Hypotenuse_Calculator />
    </MathsCalculatorPageLayout>
  );
}
