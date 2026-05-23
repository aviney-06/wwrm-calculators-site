export function addDaysToDate(base: Date, days: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

export function formatDateLong(d: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

export function daysUntilBirthday(month: number, day: number, from = new Date()) {
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  let target = new Date(from.getFullYear(), month - 1, day);
  if (target.getTime() < today.getTime()) {
    target = new Date(from.getFullYear() + 1, month - 1, day);
  }
  const days = Math.round((target.getTime() - today.getTime()) / 86400000);
  return { days, target, isToday: days === 0 };
}

/** Fun deterministic “compatibility” score from two names (not scientific). */
export function loveCompatibility(nameA: string, nameB: string): number {
  const combined = `${nameA.trim().toLowerCase()}|${nameB.trim().toLowerCase()}`;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = (hash * 31 + combined.charCodeAt(i)) % 10000;
  }
  return (hash % 91) + 10;
}

export function concreteCubicYards(
  lengthFt: number,
  widthFt: number,
  depthIn: number,
): number {
  const cubicFt = lengthFt * widthFt * (depthIn / 12);
  return cubicFt / 27;
}

export function minecraftCirclePoints(radius: number): { x: number; z: number }[] {
  if (radius < 1) return [];
  const points: { x: number; z: number }[] = [];
  const seen = new Set<string>();
  for (let x = -radius; x <= radius; x++) {
    for (let z = -radius; z <= radius; z++) {
      if (x * x + z * z <= radius * radius + radius) {
        const key = `${x},${z}`;
        if (!seen.has(key)) {
          seen.add(key);
          points.push({ x, z });
        }
      }
    }
  }
  return points;
}

export function pickPowerball(): { white: number[]; red: number } {
  const pool = Array.from({ length: 69 }, (_, i) => i + 1);
  const white: number[] = [];
  for (let i = 0; i < 5; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    white.push(pool.splice(idx, 1)[0]!);
  }
  white.sort((a, b) => a - b);
  const red = Math.floor(Math.random() * 26) + 1;
  return { white, red };
}
