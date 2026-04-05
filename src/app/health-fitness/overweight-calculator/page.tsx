import { buildPageMetadata } from "@/lib/metadata";
import { Overweight_Calculator } from "@/components/Health-Fitness/Overweight/Overweight_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "Overweight Calculator",
  description:
    "Approximate weight change to reach BMI 25 from height and current weight.",
  path: "/health-fitness/overweight-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/overweight-calculator"
      title="Overweight Calculator"
      description="For adults with BMI above 25, estimate pounds or kilograms to reach BMI 25."
      breadcrumbLabel="overweight calculator"
    >
      <Overweight_Calculator />
    </HealthCalculatorPageLayout>
  );
}
