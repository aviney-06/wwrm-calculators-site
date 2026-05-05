import { PregnancyConception_Calculator } from "@/components/Health-Fitness/PregnancyConception/PregnancyConception_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/pregnancy-conception-calculator";
const FALLBACK_TITLE = "Pregnancy Conception Calculator";
const FALLBACK_DESCRIPTION =
  "Rough fertile window estimate from LMP and average cycle length.";

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
      title="Pregnancy Conception Calculator"
      description="Approximate fertile days from your last period and cycle length."
      breadcrumbLabel="pregnancy conception calculator"
    >
      <PregnancyConception_Calculator />
    </HealthCalculatorPageLayout>
  );
}
