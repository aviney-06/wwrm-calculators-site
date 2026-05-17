import { Grade_Calculator } from "@/components/Education/Grade/Grade_Calculator";
import { EducationCalculatorPageLayout } from "@/components/Education/shared/EducationCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/education/grade-calculator";
const FALLBACK_TITLE = "Grade Calculator";
const FALLBACK_DESCRIPTION =
  "Calculate your overall course grade from weighted assignment scores.";

export async function generateMetadata() {
  return generateCalculatorPageMetadata({
    path: PATH,
    fallbackTitle: FALLBACK_TITLE,
    fallbackDescription: FALLBACK_DESCRIPTION,
  });
}

export default function Page() {
  return (
    <EducationCalculatorPageLayout
      path={PATH}
      title="Grade Calculator"
      description="Calculate your weighted course grade from assignment scores and weights. See your percentage and letter grade."
      breadcrumbLabel="grade calculator"
    >
      <Grade_Calculator />
    </EducationCalculatorPageLayout>
  );
}
