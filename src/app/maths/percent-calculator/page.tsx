import { Percent_Calculator } from "@/components/Maths/Percent/Percent_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/percent-calculator";
const FALLBACK_TITLE = "Percent Calculator";
const FALLBACK_DESCRIPTION = "Find X% of Y or what percent one number is of another.";

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
      title="Percent Calculator"
      description="Find X% of Y or what percent one number is of another."
      breadcrumbLabel="percent calculator"
    >
      <Percent_Calculator />
    </MathsCalculatorPageLayout>
  );
}
