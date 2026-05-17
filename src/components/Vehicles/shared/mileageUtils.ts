export type MileageResult = {
  miles: number;
  gallons: number;
  mpg: number;
  costPerMile: number | null;
  totalFuelCost: number | null;
};

export function calculateMileage(
  miles: number,
  gallons: number,
  pricePerGallon?: number,
): { ok: true; data: MileageResult } | { ok: false; error: string } {
  if (!Number.isFinite(miles) || miles <= 0) {
    return { ok: false, error: "Enter miles driven greater than 0." };
  }
  if (!Number.isFinite(gallons) || gallons <= 0) {
    return { ok: false, error: "Enter gallons used greater than 0." };
  }

  const mpg = miles / gallons;
  let costPerMile: number | null = null;
  let totalFuelCost: number | null = null;

  if (pricePerGallon != null && Number.isFinite(pricePerGallon) && pricePerGallon >= 0) {
    totalFuelCost = gallons * pricePerGallon;
    costPerMile = totalFuelCost / miles;
  }

  return {
    ok: true,
    data: { miles, gallons, mpg, costPerMile, totalFuelCost },
  };
}
