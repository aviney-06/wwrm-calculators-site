import { TestGrade_Calculator } from "@/components/Education/TestGrade/TestGrade_Calculator";
import { EducationCalculatorPageLayout } from "@/components/Education/shared/EducationCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/education/test-grade-calculator";
const FALLBACK_TITLE = "Test Grade Calculator";
const FALLBACK_DESCRIPTION =
  "Find the final exam score you need, or convert correct answers to a test percentage and letter grade.";

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
      title="Test Grade Calculator"
      description="Calculate what you need on a final exam to reach your target grade, or convert correct answers to a test score percentage."
      breadcrumbLabel="test grade calculator"
    >
      <TestGrade_Calculator />
    </EducationCalculatorPageLayout>
  );
}
