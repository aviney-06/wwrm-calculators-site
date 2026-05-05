import { Protein_Calculator } from "@/components/Health-Fitness/Protein/Protein_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/health-fitness/protein-calculator";
const FALLBACK_TITLE = "Protein Calculator";
const FALLBACK_DESCRIPTION =
  "Estimate daily protein grams from body weight and goal.";

export async function generateMetadata() {
  return generateCalculatorPageMetadata({
    path: PATH,
    fallbackTitle: FALLBACK_TITLE,
    fallbackDescription: FALLBACK_DESCRIPTION,
  });
}

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path={PATH}
      title="Protein Calculator"
      description="Rule-of-thumb daily protein from pounds and training goal."
      breadcrumbLabel="protein calculator"
    >
      <Protein_Calculator />
    </HealthCalculatorPageLayout>
  );
}
