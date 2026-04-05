import { buildPageMetadata } from "@/lib/metadata";
import { Conception_Calculator } from "@/components/Health-Fitness/Conception/Conception_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "Conception Calculator",
  description: "Rough conception date estimate from estimated due date.",
  path: "/health-fitness/conception-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/conception-calculator"
      title="Conception Calculator"
      description="Back-calculate an approximate conception date from a due date (266 days earlier)."
      breadcrumbLabel="conception calculator"
    >
      <Conception_Calculator />
    </HealthCalculatorPageLayout>
  );
}
