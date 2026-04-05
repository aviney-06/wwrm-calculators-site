import { buildPageMetadata } from "@/lib/metadata";
import { Sleep_Calculator } from "@/components/Health-Fitness/Sleep/Sleep_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "Sleep Calculator",
  description: "Bedtime or wake times aligned with ~90-minute sleep cycles.",
  path: "/health-fitness/sleep-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/sleep-calculator"
      title="Sleep Calculator"
      description="Suggests times based on full sleep cycles and a few minutes to fall asleep."
      breadcrumbLabel="sleep calculator"
    >
      <Sleep_Calculator />
    </HealthCalculatorPageLayout>
  );
}
