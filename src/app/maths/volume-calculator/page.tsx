import { Volume_Calculator } from "@/components/Maths/Volume/Volume_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/volume-calculator";
const FALLBACK_TITLE = "Volume Calculator";
const FALLBACK_DESCRIPTION = "Volume of a box, cylinder, or sphere.";

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
      title="Volume Calculator"
      description="Volume of a box, cylinder, or sphere."
      breadcrumbLabel="volume calculator"
    >
      <Volume_Calculator />
    </MathsCalculatorPageLayout>
  );
}
