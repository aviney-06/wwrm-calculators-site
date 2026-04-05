import { buildPageMetadata } from "@/lib/metadata";
import { Period_Calculator } from "@/components/Health-Fitness/Period/Period_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "Period Calculator",
  description: "Next period start date from last period and cycle length.",
  path: "/health-fitness/period-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/period-calculator"
      title="Period Calculator"
      description="Adds your average cycle length to your last period start date."
      breadcrumbLabel="period calculator"
    >
      <Period_Calculator />
    </HealthCalculatorPageLayout>
  );
}
