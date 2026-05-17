import { Graph_Calculator } from "@/components/Maths/Graph/Graph_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/maths/graph-calculator";
const FALLBACK_TITLE = "Graph Calculator";
const FALLBACK_DESCRIPTION = "Plot values for y = mx + b or y = ax².";

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
      title="Graph Calculator"
      description="Plot values for y = mx + b or y = ax²."
      breadcrumbLabel="graph calculator"
    >
      <Graph_Calculator />
    </MathsCalculatorPageLayout>
  );
}
