/** Parse comma, space, or newline separated numbers. */
export function parseNumberList(raw: string): number[] {
  const parts = raw
    .split(/[\s,;]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const nums = parts.map((p) => Number.parseFloat(p));
  if (nums.some((n) => Number.isNaN(n))) return [];
  return nums;
}

export function formatNum(n: number, decimals = 4): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Number(n.toFixed(decimals));
  return String(rounded);
}

export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs((a * b) / gcd(a, b));
}

export function lcmList(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((acc, v) => lcm(acc, v), Math.abs(values[0]!));
}

/** n choose r */
export function combinations(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  if (r === 0 || r === n) return 1;
  r = Math.min(r, n - r);
  let num = 1;
  let den = 1;
  for (let i = 1; i <= r; i++) {
    num *= n - r + i;
    den *= i;
  }
  return num / den;
}

/** All positive divisors of n. */
export function allFactors(n: number): number[] {
  const abs = Math.abs(Math.round(n));
  if (abs < 1) return [];
  const out: number[] = [];
  for (let i = 1; i * i <= abs; i++) {
    if (abs % i === 0) {
      out.push(i);
      const j = abs / i;
      if (j !== i) out.push(j);
    }
  }
  return out.sort((a, b) => a - b);
}

/** Count significant figures in a numeric string (simplified rules). */
export function countSignificantFigures(raw: string): number | null {
  const s = raw.trim().replace(/,/g, "");
  if (!s || !/^-?\d*\.?\d+(?:[eE][+-]?\d+)?$/.test(s)) return null;
  const normalized = s.toLowerCase();
  if (normalized.includes("e")) {
    const [mantissa] = normalized.split("e");
    return countSignificantFigures(mantissa ?? normalized);
  }
  const neg = normalized.startsWith("-");
  let t = neg ? normalized.slice(1) : normalized;
  if (!t.includes(".")) {
    t = t.replace(/^0+/, "") || "0";
    return t.replace(/0+$/, "").length || 1;
  }
  const [intPart, fracPart = ""] = t.split(".");
  const intSig = intPart.replace(/^0+/, "");
  if (intSig.length > 0) {
    return intSig.length + fracPart.replace(/0+$/, "").length;
  }
  const fracTrim = fracPart.replace(/^0+/, "");
  return fracTrim.length;
}

export function primeFactors(n: number): number[] {
  const abs = Math.abs(Math.round(n));
  if (abs < 2) return [];
  const factors: number[] = [];
  let x = abs;
  for (let p = 2; p * p <= x; p++) {
    while (x % p === 0) {
      factors.push(p);
      x = Math.floor(x / p);
    }
  }
  if (x > 1) factors.push(x);
  return factors;
}

export function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

export function simplifyFraction(num: number, den: number): { num: number; den: number } {
  if (den === 0) return { num: 0, den: 0 };
  const sign = den < 0 ? -1 : 1;
  const n = num * sign;
  const d = Math.abs(den);
  const g = gcd(n, d);
  return { num: n / g, den: d / g };
}

export function fractionToString(num: number, den: number): string {
  if (den === 0) return "undefined";
  const { num: n, den: d } = simplifyFraction(num, den);
  if (d === 1) return String(n);
  return `${n}/${d}`;
}

/** Best rational approximation for a decimal (denominator capped). */
export function decimalToFraction(
  decimal: number,
  maxDen = 10_000,
): { num: number; den: number } {
  if (!Number.isFinite(decimal)) return { num: 0, den: 0 };
  const sign = decimal < 0 ? -1 : 1;
  const x = Math.abs(decimal);
  let bestNum = Math.round(x);
  let bestDen = 1;
  let bestErr = Math.abs(x - bestNum);
  for (let den = 1; den <= maxDen; den++) {
    const num = Math.round(x * den);
    const err = Math.abs(x - num / den);
    if (err < bestErr) {
      bestErr = err;
      bestNum = num;
      bestDen = den;
    }
  }
  return simplifyFraction(sign * bestNum, bestDen);
}

export function statsFromList(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  const n = values.length;
  const sum = values.reduce((a, b) => a + b, 0);
  const mean = sum / n;
  const mid = Math.floor(n / 2);
  const median =
    n % 2 === 0 ? (sorted[mid - 1]! + sorted[mid]!) / 2 : sorted[mid]!;
  const freq = new Map<number, number>();
  for (const v of values) freq.set(v, (freq.get(v) ?? 0) + 1);
  let mode: number[] = [];
  let maxFreq = 0;
  for (const [val, count] of freq) {
    if (count > maxFreq) {
      maxFreq = count;
      mode = [val];
    } else if (count === maxFreq) {
      mode.push(val);
    }
  }
  const variance =
    values.reduce((acc, v) => acc + (v - mean) ** 2, 0) / (n > 1 ? n - 1 : 1);
  const sampleSd = Math.sqrt(variance);
  const populationVariance =
    values.reduce((acc, v) => acc + (v - mean) ** 2, 0) / n;
  const populationSd = Math.sqrt(populationVariance);
  return { mean, median, mode, sampleSd, populationSd, n, sum };
}
