import { FuelCost_Calculator } from "@/components/Vehicles/FuelCost/FuelCost_Calculator";
import { VehicleCalculatorPageLayout } from "@/components/Vehicles/shared/VehicleCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/vehicles/fuel-cost-calculator";

export async function generateMetadata() {
  return generateCalculatorPageMetadata({
    path: PATH,
    fallbackTitle: "Fuel Cost Calculator",
    fallbackDescription:
      "Estimate trip fuel cost from distance, MPG, and price per gallon.",
  });
}

export default function Page() {
  return (
    <VehicleCalculatorPageLayout
      path={PATH}
      title="Fuel Cost Calculator"
      description="Estimate how much fuel will cost for a trip using distance in miles, vehicle MPG, and current price per gallon."
      breadcrumbLabel="fuel cost calculator"
    >
      <FuelCost_Calculator />
    </VehicleCalculatorPageLayout>
  );
}
