import { buildPageMetadata } from "@/lib/metadata";
import { BMR_Calculator } from "@/components/Health-Fitness/BMR/BMR_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "BMR Calculator",
  description: "Basal metabolic rate using the Mifflin–St Jeor equation.",
  path: "/health-fitness/bmr-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/bmr-calculator"
      title="BMR Calculator"
      description="Resting metabolic rate — calories you’d burn at complete rest (Mifflin–St Jeor)."
      breadcrumbLabel="bmr calculator"
    >
      <BMR_Calculator />
    </HealthCalculatorPageLayout>
  );
}
