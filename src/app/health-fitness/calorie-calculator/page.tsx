import { buildPageMetadata } from "@/lib/metadata";
import { Calorie_Calculator } from "@/components/Health-Fitness/Calorie/Calorie_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "Calorie Calculator",
  description:
    "Daily maintenance calories from your stats and activity level.",
  path: "/health-fitness/calorie-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/calorie-calculator"
      title="Calorie Calculator"
      description="Estimate how many calories you burn per day at maintenance (same method as TDEE)."
      breadcrumbLabel="calorie calculator"
    >
      <Calorie_Calculator />
    </HealthCalculatorPageLayout>
  );
}
