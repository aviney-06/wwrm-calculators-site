import { buildPageMetadata } from "@/lib/metadata";
import { HealthyWeight_Calculator } from "@/components/Health-Fitness/HealthyWeight/HealthyWeight_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "Healthy Weight Calculator",
  description:
    "Approximate weight range for BMI 18.5–24.9 at your height.",
  path: "/health-fitness/healthy-weight-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/healthy-weight-calculator"
      title="Healthy Weight Calculator"
      description="See a typical weight range that corresponds to a BMI between 18.5 and 24.9."
      breadcrumbLabel="healthy weight calculator"
    >
      <HealthyWeight_Calculator />
    </HealthCalculatorPageLayout>
  );
}
