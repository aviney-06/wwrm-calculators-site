import { Lcd_Calculator } from "@/components/Maths/Lcd/Lcd_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/lcd-calculator";
const FALLBACK_TITLE = "LCD Calculator";
const FALLBACK_DESCRIPTION = "Least common denominator of two or three fractions.";

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
      title="LCD Calculator"
      description="Least common denominator of two or three fractions."
      breadcrumbLabel="lcd calculator"
    >
      <Lcd_Calculator />
    </MathsCalculatorPageLayout>
  );
}
