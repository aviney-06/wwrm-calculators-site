import { buildPageMetadata } from "@/lib/metadata";
import { IdealWeight_Calculator } from "@/components/Health-Fitness/IdealWeight/IdealWeight_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "Ideal Weight Calculator",
  description: "Devine formula ideal body weight from height and sex.",
  path: "/health-fitness/ideal-weight-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/ideal-weight-calculator"
      title="Ideal Weight Calculator"
      description="Classic Devine (1974) estimate — one of many ways people discuss “ideal” weight."
      breadcrumbLabel="ideal weight calculator"
    >
      <IdealWeight_Calculator />
    </HealthCalculatorPageLayout>
  );
}
