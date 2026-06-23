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
const L_PER_US_GALLON = 3.785411784;
const M_PER_FOOT = 0.3048;
const IN_PER_FT = 12;
const MONTHS_PER_YEAR = 12;
const MIN_PER_HOUR = 60;
const FT_PER_MILE = 5280;
const HOURS_PER_DAY = 24;
const CUBIC_FT_PER_CUBIC_YD = 27;
const QUARTS_PER_GALLON = 4;
const N_PER_LBF = 4.4482216152605;
const G_PER_LB = 453.59237;
const KB_PER_MB = 1024;
const GAL_PER_CUBIC_FT = 7.480519480519481;
const CUPS_PER_PINT = 2;
const NM_PER_M = 1e9;

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
  hoursToMinutes: (hr: number) => hr * MIN_PER_HOUR,
  feetToInches: (ft: number) => ft * IN_PER_FT,
  mlToCups: (ml: number) => ml / ML_PER_US_CUP,
  litersToGallons: (l: number) => l / L_PER_US_GALLON,
  monthsToYears: (months: number) => months / MONTHS_PER_YEAR,
  feetToMeters: (ft: number) => ft * M_PER_FOOT,
  msToSeconds: (ms: number) => ms / 1000,
  poundsToNewtons: (lb: number) => lb * N_PER_LBF,
  feetToMiles: (ft: number) => ft / FT_PER_MILE,
  hoursToDays: (hr: number) => hr / HOURS_PER_DAY,
  cubicYardsToCubicFeet: (yd3: number) => yd3 * CUBIC_FT_PER_CUBIC_YD,
  cubicFeetToCubicYards: (ft3: number) => ft3 / CUBIC_FT_PER_CUBIC_YD,
  poundsToGrams: (lb: number) => lb * G_PER_LB,
  quartsToGallons: (qt: number) => qt / QUARTS_PER_GALLON,
  kilobytesToMegabytes: (kb: number) => kb / KB_PER_MB,
  cubicFeetToGallons: (ft3: number) => ft3 * GAL_PER_CUBIC_FT,
  mlToTbsp: (ml: number) => ml / ML_PER_TBSP,
  pintsToCups: (pt: number) => pt * CUPS_PER_PINT,
  gallonsToQuarts: (gal: number) => gal * QUARTS_PER_GALLON,
  nanometersToMeters: (nm: number) => nm / NM_PER_M,
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

/** Moles from mass (g) and molar mass (g/mol). */
export function gramsToMoles(grams: number, molarMass: number): number | null {
  if (molarMass <= 0) return null;
  return grams / molarMass;
}

/** Pounds (mass) from US cups at given density (g/ml, water ≈ 1). */
export function cupsToPounds(cups: number, densityGPerMl: number): number | null {
  if (densityGPerMl <= 0) return null;
  const grams = cups * ML_PER_US_CUP * densityGPerMl;
  return grams / G_PER_LB;
}

/** Volume (ml) from mass (g) at given density (g/ml, water ≈ 1). */
export function gramsToMl(grams: number, densityGPerMl: number): number | null {
  if (densityGPerMl <= 0) return null;
  return grams / densityGPerMl;
}

export type TimeParts = { hours: number; minutes: number; seconds: number };

/** Decimal hours → whole hours, minutes, seconds (e.g. 2.5 → 2h 30m 0s). */
export function decimalToTime(decimalHours: number): TimeParts {
  const totalSeconds = Math.round(Math.abs(decimalHours) * 3600);
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

/** Micrograms per IU for common fat-soluble vitamins. IU = mcg ÷ (mcg per IU). */
export const MCG_PER_IU: Record<string, { label: string; factor: number }> = {
  vitaminA: { label: "Vitamin A (retinol)", factor: 0.3 },
  vitaminD: { label: "Vitamin D", factor: 0.025 },
  vitaminE: { label: "Vitamin E (natural)", factor: 0.67 },
};

export function mcgToIu(mcg: number, mcgPerIu: number): number | null {
  if (mcgPerIu <= 0) return null;
  return mcg / mcgPerIu;
}

/** mg/dL per mmol/L for common blood panels. mg/dL = mmol/L × factor. */
export const MMOL_TO_MGDL: Record<string, { label: string; factor: number }> = {
  glucose: { label: "Glucose", factor: 18.0182 },
  cholesterol: { label: "Cholesterol (total / HDL / LDL)", factor: 38.67 },
  triglycerides: { label: "Triglycerides", factor: 88.57 },
};

export function mmolToMgdl(mmol: number, factor: number): number | null {
  if (factor <= 0) return null;
  return mmol * factor;
}

export type ShoeGender = "men" | "women";
export type ShoeSystem = "us" | "uk" | "eu" | "cm";
export type ShoeSizes = { us: number; uk: number; eu: number; cm: number };

/** Offsets relative to the US size for each gender (approximate, brand-dependent). */
const SHOE_OFFSETS: Record<ShoeGender, { uk: number; eu: number; cm: number }> = {
  men: { uk: -1, eu: 33, cm: 18 },
  women: { uk: -2, eu: 30, cm: 16.5 },
};

/** Convert a shoe size from any system to all four systems (approximate). */
export function convertShoeSize(
  value: number,
  gender: ShoeGender,
  from: ShoeSystem,
): ShoeSizes | null {
  if (!Number.isFinite(value)) return null;
  const offsets = SHOE_OFFSETS[gender];
  let us: number;
  switch (from) {
    case "us":
      us = value;
      break;
    case "uk":
      us = value - offsets.uk;
      break;
    case "eu":
      us = value - offsets.eu;
      break;
    case "cm":
      us = value - offsets.cm;
      break;
  }
  const roundHalf = (n: number) => Math.round(n * 2) / 2;
  return {
    us: roundHalf(us),
    uk: roundHalf(us + offsets.uk),
    eu: roundHalf(us + offsets.eu),
    cm: Math.round((us + offsets.cm) * 10) / 10,
  };
}

const NUMBER_WORDS_ONES = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
] as const;

const NUMBER_WORDS_TENS = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
] as const;

const NUMBER_WORDS_SCALES = [
  "",
  "thousand",
  "million",
  "billion",
  "trillion",
  "quadrillion",
] as const;

function threeDigitGroupToWords(n: number): string {
  const parts: string[] = [];
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;
  if (hundreds > 0) {
    parts.push(`${NUMBER_WORDS_ONES[hundreds]} hundred`);
  }
  if (rest > 0) {
    if (rest < 20) {
      parts.push(NUMBER_WORDS_ONES[rest]);
    } else {
      const tens = Math.floor(rest / 10);
      const ones = rest % 10;
      parts.push(
        ones > 0
          ? `${NUMBER_WORDS_TENS[tens]}-${NUMBER_WORDS_ONES[ones]}`
          : NUMBER_WORDS_TENS[tens],
      );
    }
  }
  return parts.join(" ");
}

/**
 * Convert a number to English words. Supports integers up to the quadrillions and
 * an optional decimal portion (read digit-by-digit, e.g. 1.5 → "one point five").
 */
export function numberToWords(input: number): string | null {
  if (!Number.isFinite(input)) return null;

  const negative = input < 0;
  const absolute = Math.abs(input);
  const integerPart = Math.trunc(absolute);

  if (integerPart >= 1e18) return null;

  let integerWords: string;
  if (integerPart === 0) {
    integerWords = "zero";
  } else {
    const groups: number[] = [];
    let remaining = integerPart;
    while (remaining > 0) {
      groups.push(remaining % 1000);
      remaining = Math.floor(remaining / 1000);
    }
    const chunks: string[] = [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const group = groups[i];
      if (group === 0) continue;
      const scale = NUMBER_WORDS_SCALES[i];
      chunks.push(
        scale ? `${threeDigitGroupToWords(group)} ${scale}` : threeDigitGroupToWords(group),
      );
    }
    integerWords = chunks.join(" ");
  }

  // Read the decimal portion digit-by-digit from the original string to avoid float noise.
  let decimalWords = "";
  const text = String(absolute);
  const dotIndex = text.indexOf(".");
  if (dotIndex !== -1) {
    const digits = text.slice(dotIndex + 1).replace(/0+$/, "");
    if (digits.length > 0) {
      const spoken = digits
        .split("")
        .map((d) => NUMBER_WORDS_ONES[Number(d)])
        .join(" ");
      decimalWords = ` point ${spoken}`;
    }
  }

  const words = `${negative ? "negative " : ""}${integerWords}${decimalWords}`;
  return words.charAt(0).toUpperCase() + words.slice(1);
}
