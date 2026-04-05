export function toKg(lbs: number) {
  return lbs * 0.45359237;
}

export function toLbs(kg: number) {
  return kg / 0.45359237;
}

export function toCm(ft: number, inches: number) {
  return (ft * 12 + inches) * 2.54;
}

export function fromCmToFtIn(cm: number): { ft: number; inch: number } {
  if (cm <= 0) return { ft: 0, inch: 0 };
  const totalIn = cm / 2.54;
  const ft = Math.floor(totalIn / 12);
  let inch = totalIn - ft * 12;
  inch = Math.round(inch * 10) / 10;
  return { ft, inch };
}

export function inchesFromFtIn(ft: number, inch: number) {
  return ft * 12 + inch;
}

export function bmiFromImperial(lb: number, heightIn: number) {
  return (703 * lb) / (heightIn * heightIn);
}

export function bmiFromMetric(kg: number, heightCm: number) {
  const m = heightCm / 100;
  return kg / (m * m);
}
