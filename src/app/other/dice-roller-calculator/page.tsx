import { DiceRoller_Calculator } from "@/components/Other/DiceRoller/DiceRoller_Calculator";
import { OtherCalculatorPageLayout } from "@/components/Other/shared/OtherCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/other/dice-roller-calculator";

export async function generateMetadata() {
  return generateCalculatorPageMetadata({
    path: PATH,
    fallbackTitle: "Dice Roller",
    fallbackDescription:
      "Roll virtual dice — choose how many dice and sides (D6, D20, and more).",
  });
}

export default function Page() {
  return (
    <OtherCalculatorPageLayout
      path={PATH}
      title="Dice Roller"
      description="Roll one or more virtual dice. Pick standard D6, D20, or other side counts and see each roll plus the total."
      breadcrumbLabel="dice roller"
    >
      <DiceRoller_Calculator />
    </OtherCalculatorPageLayout>
  );
}
