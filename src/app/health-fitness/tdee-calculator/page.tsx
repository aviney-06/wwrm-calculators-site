import { buildPageMetadata } from "@/lib/metadata";
import { TDEE_Calculator } from "@/components/Health-Fitness/TDEE/TDEE_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "TDEE Calculator",
  description:
    "Total Daily Energy Expenditure using Mifflin–St Jeor and activity level.",
  path: "/health-fitness/tdee-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/tdee-calculator"
      title="TDEE Calculator"
      description="Estimate maintenance calories (TDEE) from age, sex, height, weight, and activity."
      breadcrumbLabel="tdee calculator"
    >
      <TDEE_Calculator />
    </HealthCalculatorPageLayout>
  );
}
