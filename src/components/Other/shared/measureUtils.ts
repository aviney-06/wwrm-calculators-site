/** Shared helpers for the Other construction / measurement calculators. */

export type LengthUnit = "in" | "ft" | "yd" | "cm" | "m";

/** Conversion factor from each unit to feet. */
export const TO_FEET: Record<LengthUnit, number> = {
  in: 1 / 12,
  ft: 1,
  yd: 3,
  cm: 0.032808399,
  m: 3.280839895,
};

export const LENGTH_UNIT_OPTIONS: { value: LengthUnit; label: string }[] = [
  { value: "in", label: "Inches" },
  { value: "ft", label: "Feet" },
  { value: "yd", label: "Yards" },
  { value: "cm", label: "Centimeters" },
  { value: "m", label: "Meters" },
];

export const GALLONS_PER_CUBIC_FOOT = 7.480519;
export const LITERS_PER_GALLON = 3.785411784;
export const CUBIC_FEET_PER_CUBIC_YARD = 27;

export function toFeet(value: number, unit: LengthUnit): number {
  return value * TO_FEET[unit];
}

/** Round to a fixed number of decimals and return a number. */
export function round(value: number, decimals = 2): number {
  const f = 10 ** decimals;
  return Math.round(value * f) / f;
}

export function fmt(value: number, decimals = 2): string {
  return round(value, decimals).toLocaleString(undefined, {
    maximumFractionDigits: decimals,
  });
}
