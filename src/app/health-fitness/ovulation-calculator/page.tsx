import { Ovulation_Calculator } from "@/components/Health-Fitness/Ovulation/Ovulation_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/ovulation-calculator";
const FALLBACK_TITLE = "Ovulation Calculator";
const FALLBACK_DESCRIPTION =
  "Rough ovulation date from LMP and cycle length.";

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
      title="Ovulation Calculator"
      description="Estimates ovulation about 14 days before your next expected period."
      breadcrumbLabel="ovulation calculator"
    >
      <Ovulation_Calculator />
    </HealthCalculatorPageLayout>
  );
}
