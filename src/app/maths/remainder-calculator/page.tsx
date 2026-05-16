import { Remainder_Calculator } from "@/components/Maths/Remainder/Remainder_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/remainder-calculator";
const FALLBACK_TITLE = "Remainder Calculator";
const FALLBACK_DESCRIPTION = "Remainder when dividing one integer by another.";

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
      title="Remainder Calculator"
      description="Remainder when dividing one integer by another."
      breadcrumbLabel="remainder calculator"
    >
      <Remainder_Calculator />
    </MathsCalculatorPageLayout>
  );
}
