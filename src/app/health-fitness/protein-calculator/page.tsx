import { buildPageMetadata } from "@/lib/metadata";
import { Protein_Calculator } from "@/components/Health-Fitness/Protein/Protein_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "Protein Calculator",
  description: "Estimate daily protein grams from body weight and goal.",
  path: "/health-fitness/protein-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/protein-calculator"
      title="Protein Calculator"
      description="Rule-of-thumb daily protein from pounds and training goal."
      breadcrumbLabel="protein calculator"
    >
      <Protein_Calculator />
    </HealthCalculatorPageLayout>
  );
}
