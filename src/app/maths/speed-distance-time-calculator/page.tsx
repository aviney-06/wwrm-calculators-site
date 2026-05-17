import { SpeedDistanceTime_Calculator } from "@/components/Maths/SpeedDistanceTime/SpeedDistanceTime_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/speed-distance-time-calculator";
const FALLBACK_TITLE = "Speed Distance Time Calculator";
const FALLBACK_DESCRIPTION = "Find speed, distance, or time when you know the other two.";

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
      title="Speed Distance Time Calculator"
      description="Find speed, distance, or time when you know the other two."
      breadcrumbLabel="speed distance time calculator"
    >
      <SpeedDistanceTime_Calculator />
    </MathsCalculatorPageLayout>
  );
}
