import { Mileage_Calculator } from "@/components/Vehicles/Mileage/Mileage_Calculator";
import { VehicleCalculatorPageLayout } from "@/components/Vehicles/shared/VehicleCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/vehicles/mileage-calculator";
const FALLBACK_TITLE = "Mileage Calculator";
const FALLBACK_DESCRIPTION =
  "Calculate fuel economy (MPG) from miles driven and gallons used, with optional fuel cost.";

export async function generateMetadata() {
  return generateCalculatorPageMetadata({
    path: PATH,
    fallbackTitle: FALLBACK_TITLE,
    fallbackDescription: FALLBACK_DESCRIPTION,
  });
}

export default function Page() {
  return (
    <VehicleCalculatorPageLayout
      path={PATH}
      title="Mileage Calculator"
      description="Calculate miles per gallon (MPG), fuel cost per mile, and total trip fuel cost from miles driven and gallons used."
      breadcrumbLabel="mileage calculator"
    >
      <Mileage_Calculator />
    </VehicleCalculatorPageLayout>
  );
}
