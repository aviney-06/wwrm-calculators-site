import { DaysUntilHoliday_Calculator } from "@/components/Other/shared/DaysUntilHoliday_Calculator";
import { OtherCalculatorPageLayout } from "@/components/Other/shared/OtherCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/other/days-until-halloween-calculator";

export async function generateMetadata() {
  return generateCalculatorPageMetadata({
    path: PATH,
    fallbackTitle: "Days Until Halloween Calculator",
    fallbackDescription:
      "Count down the days until Halloween (October 31) from today's date.",
  });
}

export default function Page() {
  return (
    <OtherCalculatorPageLayout
      path={PATH}
      title="Days Until Halloween Calculator"
      description="See how many days remain until the next Halloween, October 31."
      breadcrumbLabel="days until halloween"
    >
      <DaysUntilHoliday_Calculator
        month={10}
        day={31}
        holidayName="Halloween"
        emoji="🎃"
      />
    </OtherCalculatorPageLayout>
  );
}
