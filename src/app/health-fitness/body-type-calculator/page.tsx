import { BodyType_Calculator } from "@/components/Health-Fitness/BodyType/BodyType_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/body-type-calculator";
const FALLBACK_TITLE = "Body Type Calculator";
const FALLBACK_DESCRIPTION =
  "Informal ectomorph / mesomorph / endomorph style quiz.";

export async function generateMetadata() {
  return generateCalculatorPageMetadata({
    path: PATH,
    fallbackTitle: FALLBACK_TITLE,
    fallbackDescription: FALLBACK_DESCRIPTION,
  });
}

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path={PATH}
      title="Body Type Calculator"
      description="A short quiz for fun — not a clinical assessment of body composition."
      breadcrumbLabel="Body type calculator"
    >
      <BodyType_Calculator />
    </HealthCalculatorPageLayout>
  );
}
