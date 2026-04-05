import { buildPageMetadata } from "@/lib/metadata";
import { CaloriesBurned_Calculator } from "@/components/Health-Fitness/CaloriesBurned/CaloriesBurned_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "Calories Burned Calculator",
  description: "Rough calories burned from MET, weight, and duration.",
  path: "/health-fitness/calories-burned-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/calories-burned-calculator"
      title="Calories Burned Calculator"
      description="MET × body weight × time — useful for comparing activities, not exact energy expenditure."
      breadcrumbLabel="calories burned calculator"
    >
      <CaloriesBurned_Calculator />
    </HealthCalculatorPageLayout>
  );
}
