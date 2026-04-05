import { buildPageMetadata } from "@/lib/metadata";
import { WeightWatchers_Calculator } from "@/components/Health-Fitness/WeightWatchers/WeightWatchers_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "Weight Watchers Points Calculator",
  description: "Unofficial PointsPlus-style estimate from macros.",
  path: "/health-fitness/weight-watchers-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/weight-watchers-calculator"
      title="Weight Watchers Points Calculator"
      description="Approximate legacy PointsPlus-style points from protein, carbs, fat, and fiber — not affiliated with WW."
      breadcrumbLabel="weight watchers points calculator"
    >
      <WeightWatchers_Calculator />
    </HealthCalculatorPageLayout>
  );
}
