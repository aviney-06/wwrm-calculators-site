/** Mifflin–St Jeor BMR (kcal/day). Height cm, weight kg. */
export function mifflinBmrKgCm(
  kg: number,
  cm: number,
  age: number,
  male: boolean,
): number {
  const s = male ? 5 : -161;
  return 10 * kg + 6.25 * cm - 5 * age + s;
}
