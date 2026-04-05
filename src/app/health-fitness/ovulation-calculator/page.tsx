import { buildPageMetadata } from "@/lib/metadata";
import { Ovulation_Calculator } from "@/components/Health-Fitness/Ovulation/Ovulation_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "Ovulation Calculator",
  description: "Rough ovulation date from LMP and cycle length.",
  path: "/health-fitness/ovulation-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/ovulation-calculator"
      title="Ovulation Calculator"
      description="Estimates ovulation about 14 days before your next expected period."
      breadcrumbLabel="ovulation calculator"
    >
      <Ovulation_Calculator />
    </HealthCalculatorPageLayout>
  );
}
