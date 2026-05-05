import { Conception_Calculator } from "@/components/Health-Fitness/Conception/Conception_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/conception-calculator";
const FALLBACK_TITLE = "Conception Calculator";
const FALLBACK_DESCRIPTION =
  "Rough conception date estimate from estimated due date.";

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
      title="Conception Calculator"
      description="Back-calculate an approximate conception date from a due date (266 days earlier)."
      breadcrumbLabel="conception calculator"
    >
      <Conception_Calculator />
    </HealthCalculatorPageLayout>
  );
}
