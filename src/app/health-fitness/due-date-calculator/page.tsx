import { DueDate_Calculator } from "@/components/Health-Fitness/DueDate/DueDate_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/due-date-calculator";
const FALLBACK_TITLE = "Due Date Calculator";
const FALLBACK_DESCRIPTION =
  "Estimated due date from the first day of your last period (LMP).";

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
      title="Due Date Calculator"
      description="40 weeks (280 days) from LMP — same method as our pregnancy due date tool."
      breadcrumbLabel="due date calculator"
    >
      <DueDate_Calculator />
    </HealthCalculatorPageLayout>
  );
}
