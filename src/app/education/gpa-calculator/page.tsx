import { Gpa_Calculator } from "@/components/Education/Gpa/Gpa_Calculator";
import { EducationCalculatorPageLayout } from "@/components/Education/shared/EducationCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/education/gpa-calculator";
const FALLBACK_TITLE = "GPA Calculator";
const FALLBACK_DESCRIPTION =
  "Calculate semester or cumulative GPA on a 4.0 scale from letter grades and credit hours.";

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
      title="GPA Calculator"
      description="Calculate your GPA on a 4.0 scale from letter grades and credit hours. Add multiple courses for semester or cumulative GPA."
      breadcrumbLabel="gpa calculator"
    >
      <Gpa_Calculator />
    </EducationCalculatorPageLayout>
  );
}
