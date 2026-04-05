import { buildPageMetadata } from "@/lib/metadata";
import { AnorexicBMI_Calculator } from "@/components/Health-Fitness/AnorexicBMI/AnorexicBMI_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "BMI Calculator (Recovery resources)",
  description:
    "BMI with mental health resources — not for promoting harmful goals.",
  path: "/health-fitness/anorexic-bmi-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/anorexic-bmi-calculator"
      title="BMI (with support resources)"
      description="Standard BMI math with links to eating-disorder support. If you are struggling, you are not alone."
      breadcrumbLabel="anorexic bmi calculator"
    >
      <AnorexicBMI_Calculator />
    </HealthCalculatorPageLayout>
  );
}
