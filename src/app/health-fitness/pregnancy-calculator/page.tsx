import { buildPageMetadata } from "@/lib/metadata";
import { Pregnancy_Calculator } from "@/components/Health-Fitness/Pregnancy/Pregnancy_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "Pregnancy Calculator",
  description:
    "Estimate due date from the first day of your last menstrual period.",
  path: "/health-fitness/pregnancy-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/pregnancy-calculator"
      title="Pregnancy Calculator"
      description="Estimated due date using 40 weeks (280 days) from LMP — for planning, not medical diagnosis."
      breadcrumbLabel="pregnancy calculator"
    >
      <Pregnancy_Calculator />
    </HealthCalculatorPageLayout>
  );
}
