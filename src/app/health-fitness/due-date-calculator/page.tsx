import { buildPageMetadata } from "@/lib/metadata";
import { DueDate_Calculator } from "@/components/Health-Fitness/DueDate/DueDate_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "Due Date Calculator",
  description:
    "Estimated due date from the first day of your last period (LMP).",
  path: "/health-fitness/due-date-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/due-date-calculator"
      title="Due Date Calculator"
      description="40 weeks (280 days) from LMP — same method as our pregnancy due date tool."
      breadcrumbLabel="due date calculator"
    >
      <DueDate_Calculator />
    </HealthCalculatorPageLayout>
  );
}
