import { buildPageMetadata } from "@/lib/metadata";
import { Pace_Calculator } from "@/components/Health-Fitness/Pace/Pace_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "Pace Calculator",
  description: "Calculate pace per mile or kilometer from distance and time.",
  path: "/health-fitness/pace-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/pace-calculator"
      title="Pace Calculator"
      description="Enter distance and time to get pace per mile or per kilometer."
      breadcrumbLabel="pace calculator"
    >
      <Pace_Calculator />
    </HealthCalculatorPageLayout>
  );
}
