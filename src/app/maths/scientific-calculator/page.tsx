import { ScientificCalculator } from "@/components/Maths/ScientificCalculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Scientific Calculator",
  description:
    "Free online scientific calculator with trig, logs, powers, memory, and mathjs evaluation.",
  path: "/maths/scientific-calculator",
});

export default function Page() {
  return (
    <MathsCalculatorPageLayout
      path="/maths/scientific-calculator"
      title="Scientific Calculator"
      description="Trigonometry, logarithms, powers, roots, memory, and standard arithmetic — powered by mathjs."
      breadcrumbLabel="scientific calculator"
    >
      <ScientificCalculator />
    </MathsCalculatorPageLayout>
  );
}
