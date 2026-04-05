import { buildPageMetadata } from "@/lib/metadata";
import { ArmyBodyFat_Calculator } from "@/components/Health-Fitness/ArmyBodyFat/ArmyBodyFat_Calculator";
import { HealthCalculatorPageLayout } from "@/components/Health-Fitness/shared/HealthCalculatorPageLayout";

export const metadata = buildPageMetadata({
  title: "Army Body Fat Calculator",
  description:
    "Tape-test style body fat estimate (same circumference method as Navy).",
  path: "/health-fitness/army-body-fat-calculator",
});

export default function Page() {
  return (
    <HealthCalculatorPageLayout
      path="/health-fitness/army-body-fat-calculator"
      title="Army Body Fat Calculator"
      description="U.S. military-style circumference measurements — same math as the Navy method; follow your service’s current standards."
      breadcrumbLabel="army body fat calculator"
    >
      <ArmyBodyFat_Calculator />
    </HealthCalculatorPageLayout>
  );
}
