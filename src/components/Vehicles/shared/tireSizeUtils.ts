export type TireSpec = {
  widthMm: number;
  aspectRatio: number;
  rimInches: number;
};

export type TireSizeResult = {
  label: string;
  spec: TireSpec;
  sidewallMm: number;
  diameterInches: number;
  diameterMm: number;
  circumferenceInches: number;
};

export type TireCompareResult = {
  original: TireSizeResult;
  new: TireSizeResult;
  diameterDiffInches: number;
  diameterDiffPercent: number;
  /** At indicated speed, true speed ≈ indicated × this factor. */
  speedFactor: number;
  speedometerErrorPercent: number;
};

export function parseTireString(input: string): TireSpec | null {
  const m = input
    .trim()
    .toUpperCase()
    .match(/^(\d{3})\s*\/\s*(\d{2})\s*R?\s*(\d{2})$/);
  if (!m) return null;
  return {
    widthMm: Number(m[1]),
    aspectRatio: Number(m[2]),
    rimInches: Number(m[3]),
  };
}

export function validateTireSpec(spec: TireSpec): string | null {
  if (spec.widthMm < 100 || spec.widthMm > 500) {
    return "Tire width is usually between 100 and 500 mm.";
  }
  if (spec.aspectRatio < 25 || spec.aspectRatio > 90) {
    return "Aspect ratio is usually between 25 and 90.";
  }
  if (spec.rimInches < 10 || spec.rimInches > 30) {
    return "Rim size is usually between 10 and 30 inches.";
  }
  return null;
}

export function tireSizeFromSpec(spec: TireSpec, label: string): TireSizeResult {
  const sidewallMm = spec.widthMm * (spec.aspectRatio / 100);
  const diameterMm = sidewallMm * 2 + spec.rimInches * 25.4;
  const diameterInches = diameterMm / 25.4;
  const circumferenceInches = Math.PI * diameterInches;
  return {
    label,
    spec,
    sidewallMm,
    diameterInches,
    diameterMm,
    circumferenceInches,
  };
}

export function compareTireSizes(
  original: TireSpec,
  next: TireSpec,
): TireCompareResult {
  const orig = tireSizeFromSpec(original, "Original");
  const neu = tireSizeFromSpec(next, "New");
  const diameterDiffInches = neu.diameterInches - orig.diameterInches;
  const diameterDiffPercent =
    ((neu.diameterInches - orig.diameterInches) / orig.diameterInches) * 100;
  const speedFactor = neu.diameterInches / orig.diameterInches;
  const speedometerErrorPercent = (speedFactor - 1) * 100;

  return {
    original: orig,
    new: neu,
    diameterDiffInches,
    diameterDiffPercent,
    speedFactor,
    speedometerErrorPercent,
  };
}
