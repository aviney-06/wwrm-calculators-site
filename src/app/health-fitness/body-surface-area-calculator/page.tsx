import { buildPageMetadata } from "@/lib/metadata";
import { BSA_Calculator } from "@/components/Health-Fitness/BSA/BSA_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "Body Surface Area Calculator",
  description: "BSA in m² using the Mosteller formula from height and weight.",
  path: "/health-fitness/body-surface-area-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/body-surface-area-calculator"
      title="Body Surface Area Calculator"
      description="Mosteller body surface area from height and weight."
      breadcrumbLabel="body surface area calculator"
    >
      <BSA_Calculator />
    </HealthCalculatorPageLayout>
  );
}
