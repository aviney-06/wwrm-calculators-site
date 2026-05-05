import { OneRepMax_Calculator } from "@/components/Health-Fitness/OneRepMax/OneRepMax_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/one-rep-max-calculator";
const FALLBACK_TITLE = "One Rep Max Calculator";
const FALLBACK_DESCRIPTION =
  "Estimate one-rep max from submax weight and reps (Epley).";

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
      title="One Rep Max Calculator"
      description="Estimate your 1RM from a weight you can lift for several reps."
      breadcrumbLabel="one rep max calculator"
    >
      <OneRepMax_Calculator />
    </HealthCalculatorPageLayout>
  );
}
