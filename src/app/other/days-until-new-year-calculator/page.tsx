import { DaysUntilHoliday_Calculator } from "@/components/Other/shared/DaysUntilHoliday_Calculator";
import { OtherCalculatorPageLayout } from "@/components/Other/shared/OtherCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/other/days-until-new-year-calculator";

export async function generateMetadata() {
  return generateCalculatorPageMetadata({
    path: PATH,
    fallbackTitle: "Days Until New Year Calculator",
    fallbackDescription:
      "Count down the days until New Year's Day (January 1) from today's date.",
  });
}

export default function Page() {
  return (
    <OtherCalculatorPageLayout
      path={PATH}
      title="Days Until New Year Calculator"
      description="See how many days remain until the next New Year's Day, January 1."
      breadcrumbLabel="days until new year"
    >
      <DaysUntilHoliday_Calculator
        month={1}
        day={1}
        holidayName="New Year's Day"
        emoji="🎉"
      />
    </OtherCalculatorPageLayout>
  );
}
