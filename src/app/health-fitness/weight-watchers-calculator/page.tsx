import { WeightWatchers_Calculator } from "@/components/Health-Fitness/WeightWatchers/WeightWatchers_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/weight-watchers-calculator";
const FALLBACK_TITLE = "Weight Watchers Points Calculator";
const FALLBACK_DESCRIPTION =
  "Unofficial PointsPlus-style estimate from macros.";

export async function generateMetadata() {
  return generateCalculatorPageMetadata({
    path: PATH,
    fallbackTitle: FALLBACK_TITLE,
    fallbackDescription: FALLBACK_DESCRIPTION,
  });
}

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path={PATH}
      title="Weight Watchers Points Calculator"
      description="Approximate legacy PointsPlus-style points from protein, carbs, fat, and fiber — not affiliated with WW."
      breadcrumbLabel="weight watchers points calculator"
    >
      <WeightWatchers_Calculator />
    </HealthCalculatorPageLayout>
  );
}
