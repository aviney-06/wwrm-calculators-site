import { ArmyBodyFat_Calculator } from "@/components/Health-Fitness/ArmyBodyFat/ArmyBodyFat_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/army-body-fat-calculator";
const FALLBACK_TITLE = "Army Body Fat Calculator";
const FALLBACK_DESCRIPTION =
  "Tape-test style body fat estimate (same circumference method as Navy).";

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
      title="Army Body Fat Calculator"
      description="U.S. military-style circumference measurements — same math as the Navy method; follow your service’s current standards."
      breadcrumbLabel="army body fat calculator"
    >
      <ArmyBodyFat_Calculator />
    </HealthCalculatorPageLayout>
  );
}
