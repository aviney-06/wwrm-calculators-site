import { TireSize_Calculator } from "@/components/Vehicles/TireSize/TireSize_Calculator";
import { VehicleCalculatorPageLayout } from "@/components/Vehicles/shared/VehicleCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/vehicles/tire-size-calculator";
const FALLBACK_TITLE = "Tire Size Calculator";
const FALLBACK_DESCRIPTION =
  "Compare tire sizes, overall diameter, and speedometer error when changing wheels or tires.";

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
      title="Tire Size Calculator"
      description="Compare original and new tire sizes (e.g. 265/70R17). See overall diameter, circumference, and speedometer error."
      breadcrumbLabel="tire size calculator"
    >
      <TireSize_Calculator />
    </VehicleCalculatorPageLayout>
  );
}
