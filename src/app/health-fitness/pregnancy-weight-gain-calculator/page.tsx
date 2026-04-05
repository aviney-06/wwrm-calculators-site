import { buildPageMetadata } from "@/lib/metadata";
import { PregnancyWeightGain_Calculator } from "@/components/Health-Fitness/PregnancyWeightGain/PregnancyWeightGain_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "Pregnancy Weight Gain Calculator",
  description:
    "IOM-style recommended total weight gain range from pre-pregnancy BMI.",
  path: "/health-fitness/pregnancy-weight-gain-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/pregnancy-weight-gain-calculator"
      title="Pregnancy Weight Gain Calculator"
      description="Total gain guidelines by pre-pregnancy BMI category (singleton pregnancy)."
      breadcrumbLabel="pregnancy weight gain calculator"
    >
      <PregnancyWeightGain_Calculator />
    </HealthCalculatorPageLayout>
  );
}
