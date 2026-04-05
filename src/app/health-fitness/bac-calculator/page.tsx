import { buildPageMetadata } from "@/lib/metadata";
import { BAC_Calculator } from "@/components/Health-Fitness/BAC/BAC_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "BAC Calculator",
  description: "Very rough blood alcohol trend estimate — not for legal use.",
  path: "/health-fitness/bac-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/bac-calculator"
      title="BAC Calculator"
      description="Educational only — never drink and drive; legal limits vary."
      breadcrumbLabel="bac calculator"
    >
      <BAC_Calculator />
    </HealthCalculatorPageLayout>
  );
}
