import { fromCmToFtIn } from "@/components/Health-Fitness/shared/healthConversions";

const LB_TO_KG = 0.45359237;
const KG_TO_LB = 2.2046226218;
const MM_PER_INCH = 25.4;
const CM_PER_INCH = 2.54;
const KM_TO_MI = 0.621371192;
const FL_OZ_PER_CUP = 8;
const OZ_PER_LB = 16;
const GRAMS_PER_OZ = 28.349523125;
const ML_PER_US_FL_OZ = 29.5735295625;
const ML_PER_US_CUP = 236.5882365;
const ML_PER_TBSP = 14.7867647813;
const ML_PER_TSP = 4.92892159375;
const SQ_FT_PER_ACRE = 43560;
const SQ_FT_PER_SQ_M = 10.763910416709722;
const LB_PER_US_GALLON_WATER = 8.345404452;
const M_PER_FT = 3.280839895;
const M_PER_MILE = 1609.344;
const PSI_PER_BAR = 14.503773773;

export const conversionFunctions = {
  poundsToKilograms: (lb: number) => lb * LB_TO_KG,
  kilogramsToPounds: (kg: number) => kg * KG_TO_LB,
  poundsToOunces: (lb: number) => lb * OZ_PER_LB,
  ouncesToPounds: (oz: number) => oz / OZ_PER_LB,
  celsiusToFahrenheit: (c: number) => (c * 9) / 5 + 32,
  fahrenheitToCelsius: (f: number) => ((f - 32) * 5) / 9,
  ouncesToCups: (oz: number) => oz / FL_OZ_PER_CUP,
  mmToInches: (mm: number) => mm / MM_PER_INCH,
  inchesToCm: (inches: number) => inches * CM_PER_INCH,
  kilometersToMiles: (km: number) => km * KM_TO_MI,
  ouncesToGrams: (oz: number) => oz * GRAMS_PER_OZ,
  gramsToOunces: (g: number) => g / GRAMS_PER_OZ,
  mlToOz: (ml: number) => ml / ML_PER_US_FL_OZ,
  ozToMl: (oz: number) => oz * ML_PER_US_FL_OZ,
  squareFeetToAcres: (sqft: number) => sqft / 43560,
  minutesToHours: (minutes: number) => minutes / 60,
  mcgToMg: (mcg: number) => mcg / 1000,
  celsiusToKelvin: (c: number) => c + 273.15,
  nmToFtLb: (nm: number) => nm * 0.7375621492787279,
  quartsToCups: (qt: number) => qt * 4,
  knotsToMph: (knots: number) => knots * 1.150779448,
  acresToSquareFeet: (acres: number) => acres * SQ_FT_PER_ACRE,
  tbspToMl: (tbsp: number) => tbsp * ML_PER_TBSP,
  tspToMl: (tsp: number) => tsp * ML_PER_TSP,
  mlToTsp: (ml: number) => ml / ML_PER_TSP,
  squareMetersToSquareFeet: (sqm: number) => sqm * SQ_FT_PER_SQ_M,
  squareFeetToSquareMeters: (sqft: number) => sqft / SQ_FT_PER_SQ_M,
  kelvinToCelsius: (k: number) => k - 273.15,
  gallonsToPounds: (gal: number) => gal * LB_PER_US_GALLON_WATER,
  minutesToSeconds: (min: number) => min * 60,
  hoursToSeconds: (hr: number) => hr * 3600,
  penniesToDollars: (pennies: number) => pennies / 100,
  barToPsi: (bar: number) => bar * PSI_PER_BAR,
  cmToInches: (cm: number) => cm / CM_PER_INCH,
  metersToFeet: (m: number) => m * M_PER_FT,
  metersToMiles: (m: number) => m / M_PER_MILE,
  kelvinToFahrenheit: (k: number) => ((k - 273.15) * 9) / 5 + 32,
  fahrenheitToKelvin: (f: number) => ((f - 32) * 5) / 9 + 273.15,
} as const;

export type ConversionKey = keyof typeof conversionFunctions;

export type CmToFtInResult = {
  feet: number;
  inches: number;
  totalInches: number;
};

export function cmToFtIn(cm: number): CmToFtInResult {
  const { ft, inch } = fromCmToFtIn(cm);
  return {
    feet: ft,
    inches: inch,
    totalInches: cm / CM_PER_INCH,
  };
}

export function pixelsToInches(pixels: number, dpi: number): number | null {
  if (dpi <= 0) return null;
  return pixels / dpi;
}

/** Volume (ml) from mass (mg) at given density in mg/ml (water ≈ 1000). */
export function mgToMl(mg: number, densityMgPerMl: number): number | null {
  if (densityMgPerMl <= 0) return null;
  return mg / densityMgPerMl;
}

/** Mass (g) from volume (ml) at density in g/ml (water ≈ 1). */
export function mlToGrams(ml: number, densityGPerMl: number): number | null {
  if (densityGPerMl <= 0) return null;
  return ml * densityGPerMl;
}

/** US cups from mass (g) at density in g/ml (water ≈ 1). */
export function gramsToCups(grams: number, densityGPerMl: number): number | null {
  if (densityGPerMl <= 0) return null;
  const ml = grams / densityGPerMl;
  return ml / ML_PER_US_CUP;
}

/** Grams from US tablespoons at density in g/ml (water ≈ 1). */
export function tbspToGrams(tbsp: number, densityGPerMl: number): number | null {
  if (densityGPerMl <= 0) return null;
  return tbsp * ML_PER_TBSP * densityGPerMl;
}

/** Decimal hours from whole hours and minutes (e.g. 1h 30m → 1.5). */
export function timeToDecimalHours(hours: number, minutes: number): number {
  const h = Number.isFinite(hours) ? hours : 0;
  const m = Number.isFinite(minutes) ? minutes : 0;
  return h + m / 60;
}

const ROMAN_VALUES = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1] as const;
const ROMAN_SYMBOLS = [
  "M",
  "CM",
  "D",
  "CD",
  "C",
  "XC",
  "L",
  "XL",
  "X",
  "IX",
  "V",
  "IV",
  "I",
] as const;

const ROMAN_MAP: Record<string, number> = {
  M: 1000,
  D: 500,
  C: 100,
  L: 50,
  X: 10,
  V: 5,
  I: 1,
};

export function arabicToRoman(n: number): string | null {
  if (!Number.isInteger(n) || n < 1 || n > 3999) return null;
  let remaining = n;
  let result = "";
  for (let i = 0; i < ROMAN_VALUES.length; i++) {
    while (remaining >= ROMAN_VALUES[i]) {
      result += ROMAN_SYMBOLS[i];
      remaining -= ROMAN_VALUES[i];
    }
  }
  return result;
}

export function romanToArabic(input: string): number | null {
  const s = input.trim().toUpperCase();
  if (!/^[MDCLXVI]+$/.test(s)) return null;
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const current = ROMAN_MAP[s[i]];
    const next = ROMAN_MAP[s[i + 1]];
    if (current == null) return null;
    if (next != null && current < next) total -= current;
    else total += current;
  }
  return total > 0 && total <= 3999 ? total : null;
}
