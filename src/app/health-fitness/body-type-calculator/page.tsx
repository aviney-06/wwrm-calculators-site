import { buildPageMetadata } from "@/lib/metadata";
import { BodyType_Calculator } from "@/components/Health-Fitness/BodyType/BodyType_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "Body Type Calculator",
  description: "Informal ectomorph / mesomorph / endomorph style quiz.",
  path: "/health-fitness/body-type-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/body-type-calculator"
      title="Body Type Calculator"
      description="A short quiz for fun — not a clinical assessment of body composition."
      breadcrumbLabel="Body type calculator"
    >
      <BodyType_Calculator />
    </HealthCalculatorPageLayout>
  );
}
