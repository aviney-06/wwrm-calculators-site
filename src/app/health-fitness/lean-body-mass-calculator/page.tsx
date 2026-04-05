import { buildPageMetadata } from "@/lib/metadata";
import { LeanBodyMass_Calculator } from "@/components/Health-Fitness/LeanBodyMass/LeanBodyMass_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "Lean Body Mass Calculator",
  description: "Estimate lean body mass with the Boer formula.",
  path: "/health-fitness/lean-body-mass-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/lean-body-mass-calculator"
      title="Lean Body Mass Calculator"
      description="Boer equation from height, weight, and sex — an estimate of non-fat mass."
      breadcrumbLabel="lean body mass calculator"
    >
      <LeanBodyMass_Calculator />
    </HealthCalculatorPageLayout>
  );
}
