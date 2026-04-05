/** US Navy / Army-style tape test — inches */
export function navyBodyFatMale(
  heightIn: number,
  waistIn: number,
  neckIn: number,
): number {
  return (
    86.010 * Math.log10(waistIn - neckIn) -
    70.041 * Math.log10(heightIn) +
    36.76
  );
}

export function navyBodyFatFemale(
  heightIn: number,
  waistIn: number,
  neckIn: number,
  hipIn: number,
): number {
  return (
    163.205 * Math.log10(waistIn + hipIn - neckIn) -
    97.684 * Math.log10(heightIn) -
    78.387
  );
}

/** Boer LBM (kg) — height cm */
export function leanBodyMassBoer(kg: number, cm: number, male: boolean): number {
  if (male) {
    return 0.407 * kg + 0.267 * cm - 19.2;
  }
  return 0.252 * kg + 0.473 * cm - 48.3;
}

/** Devine (1974) ideal weight — kg, height cm */
export function idealWeightDevineKg(cm: number, male: boolean): number {
  const hIn = cm / 2.54;
  const over = Math.max(0, hIn - 60);
  const kg = male ? 50 + 2.3 * over : 45.5 + 2.3 * over;
  return Math.round(kg * 10) / 10;
}
