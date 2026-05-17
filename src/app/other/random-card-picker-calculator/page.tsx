import { RandomCardPicker_Calculator } from "@/components/Other/RandomCardPicker/RandomCardPicker_Calculator";
import { OtherCalculatorPageLayout } from "@/components/Other/shared/OtherCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/other/random-card-picker-calculator";

export async function generateMetadata() {
  return generateCalculatorPageMetadata({
    path: PATH,
    fallbackTitle: "Random Card Picker",
    fallbackDescription:
      "Draw random playing cards from a standard 52-card deck with no duplicates.",
  });
}

export default function Page() {
  return (
    <OtherCalculatorPageLayout
      path={PATH}
      title="Random Card Picker"
      description="Pick random cards from a standard 52-card deck. Draw one or several cards without duplicates."
      breadcrumbLabel="random card picker"
    >
      <RandomCardPicker_Calculator />
    </OtherCalculatorPageLayout>
  );
}
