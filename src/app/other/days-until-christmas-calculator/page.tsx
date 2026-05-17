import { DaysUntilHoliday_Calculator } from "@/components/Other/shared/DaysUntilHoliday_Calculator";
import { OtherCalculatorPageLayout } from "@/components/Other/shared/OtherCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/other/days-until-christmas-calculator";

export async function generateMetadata() {
  return generateCalculatorPageMetadata({
    path: PATH,
    fallbackTitle: "Days Until Christmas Calculator",
    fallbackDescription:
      "Count down the days until Christmas Day (December 25) from today's date.",
  });
}

export default function Page() {
  return (
    <OtherCalculatorPageLayout
      path={PATH}
      title="Days Until Christmas Calculator"
      description="See how many days remain until the next Christmas Day, December 25."
      breadcrumbLabel="days until christmas"
    >
      <DaysUntilHoliday_Calculator
        month={12}
        day={25}
        holidayName="Christmas"
        emoji="🎄"
      />
    </OtherCalculatorPageLayout>
  );
}
