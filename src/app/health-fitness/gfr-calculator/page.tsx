import { buildPageMetadata } from "@/lib/metadata";
import { GFR_Calculator } from "@/components/Health-Fitness/GFR/GFR_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "GFR Calculator",
  description:
    "Estimated glomerular filtration rate (MDRD) from creatinine, age, and sex.",
  path: "/health-fitness/gfr-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/gfr-calculator"
      title="GFR Calculator"
      description="Adult eGFR estimate (MDRD-style). Use lab values from your clinician."
      breadcrumbLabel="gfr calculator"
    >
      <GFR_Calculator />
    </HealthCalculatorPageLayout>
  );
}
