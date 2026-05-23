export function simplifyRadical(n: number): string | null {
  if (!Number.isFinite(n) || n < 0) return null;
  if (n === 0) return "0";
  let coeff = 1;
  let rad = Math.floor(n);
  for (let i = 2; i * i <= rad; i++) {
    while (rad % (i * i) === 0) {
      rad /= i * i;
      coeff *= i;
    }
  }
  if (coeff === 1 && rad === 1) return "1";
  if (rad === 1) return String(coeff);
  if (coeff === 1) return `√${rad}`;
  return `${coeff}√${rad}`;
}
