import { buildPageMetadata } from "@/lib/metadata";
import { TargetHeartRate_Calculator } from "@/components/Health-Fitness/TargetHeartRate/TargetHeartRate_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "Target Heart Rate Calculator",
  description: "Training zones from age and optional resting heart rate.",
  path: "/health-fitness/target-heart-rate-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/target-heart-rate-calculator"
      title="Target Heart Rate Calculator"
      description="Heart rate zones using 220 − age, or Karvonen if you add resting HR."
      breadcrumbLabel="target heart rate calculator"
    >
      <TargetHeartRate_Calculator />
    </HealthCalculatorPageLayout>
  );
}
