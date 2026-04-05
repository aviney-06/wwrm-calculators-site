import { buildPageMetadata } from "@/lib/metadata";
import { PregnancyConception_Calculator } from "@/components/Health-Fitness/PregnancyConception/PregnancyConception_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "Pregnancy Conception Calculator",
  description:
    "Rough fertile window estimate from LMP and average cycle length.",
  path: "/health-fitness/pregnancy-conception-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/pregnancy-conception-calculator"
      title="Pregnancy Conception Calculator"
      description="Approximate fertile days from your last period and cycle length."
      breadcrumbLabel="pregnancy conception calculator"
    >
      <PregnancyConception_Calculator />
    </HealthCalculatorPageLayout>
  );
}
