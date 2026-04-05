import { buildPageMetadata } from "@/lib/metadata";
import { BodyFat_Calculator } from "@/components/Health-Fitness/BodyFat/BodyFat_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "Body Fat Calculator",
  description:
    "Estimate body fat percentage using the US Navy circumference method.",
  path: "/health-fitness/body-fat-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/body-fat-calculator"
      title="Body Fat Calculator"
      description="Estimate body fat using neck, waist, and hip (women) measurements and height."
      breadcrumbLabel="body fat calculator"
    >
      <BodyFat_Calculator />
    </HealthCalculatorPageLayout>
  );
}
