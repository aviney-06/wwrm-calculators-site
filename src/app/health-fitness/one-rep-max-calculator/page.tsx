import { buildPageMetadata } from "@/lib/metadata";
import { OneRepMax_Calculator } from "@/components/Health-Fitness/OneRepMax/OneRepMax_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "One Rep Max Calculator",
  description: "Estimate one-rep max from submax weight and reps (Epley).",
  path: "/health-fitness/one-rep-max-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/one-rep-max-calculator"
      title="One Rep Max Calculator"
      description="Estimate your 1RM from a weight you can lift for several reps."
      breadcrumbLabel="one rep max calculator"
    >
      <OneRepMax_Calculator />
    </HealthCalculatorPageLayout>
  );
}
