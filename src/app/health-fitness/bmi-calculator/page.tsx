import { buildPageMetadata } from "@/lib/metadata";
import { BMI_Calculator } from "@/components/Health-Fitness/BMI/BMI_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "BMI Calculator",
  description:
    "Check your Body Mass Index (BMI) using your height and weight.",
  path: "/health-fitness/bmi-calculator",
});

export default function BMICalculatorPage() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/bmi-calculator"
      title="BMI Calculator"
      description="Check your Body Mass Index (BMI) using your height and weight."
      breadcrumbLabel="bmi calculator"
    >
      <BMI_Calculator />
    </HealthCalculatorPageLayout>
  );
}
