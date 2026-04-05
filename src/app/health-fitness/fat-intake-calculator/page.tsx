import { buildPageMetadata } from "@/lib/metadata";
import { FatIntake_Calculator } from "@/components/Health-Fitness/FatIntake/FatIntake_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "Fat Intake Calculator",
  description: "Grams of fat per day from calories and fat percentage.",
  path: "/health-fitness/fat-intake-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/fat-intake-calculator"
      title="Fat Intake Calculator"
      description="At 9 calories per gram of fat — split your calorie target by fat percentage."
      breadcrumbLabel="fat intake calculator"
    >
      <FatIntake_Calculator />
    </HealthCalculatorPageLayout>
  );
}
