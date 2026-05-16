import { WinningPercentage_Calculator } from "@/components/Maths/WinningPercentage/WinningPercentage_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/winning-percentage-calculator";
const FALLBACK_TITLE = "Winning Percentage Calculator";
const FALLBACK_DESCRIPTION = "Winning percentage from wins and losses.";

export async function generateMetadata() {
  return generateCalculatorPageMetadata({
    path: PATH,
    fallbackTitle: FALLBACK_TITLE,
    fallbackDescription: FALLBACK_DESCRIPTION,
  });
}

export default function Page() {
  return (
    <MathsCalculatorPageLayout
      path={PATH}
      title="Winning Percentage Calculator"
      description="Winning percentage from wins and losses."
      breadcrumbLabel="winning percentage calculator"
    >
      <WinningPercentage_Calculator />
    </MathsCalculatorPageLayout>
  );
}
