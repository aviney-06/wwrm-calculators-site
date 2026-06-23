export type GeneralUnit = {
  id: string;
  label: string;
  symbol: string;
  /** Multiplier to the category's base unit (ignored for temperature). */
  toBase: number;
};

export type GeneralCategory = {
  id: string;
  label: string;
  units: GeneralUnit[];
};

/**
 * Linear measurement categories (value × fromBase ÷ toBase). Temperature is handled
 * separately in {@link convertGeneral} because its conversions are affine, not linear.
 */
export const GENERAL_CATEGORIES: GeneralCategory[] = [
  {
    id: "length",
    label: "Length",
    units: [
      { id: "mm", label: "Millimeters", symbol: "mm", toBase: 0.001 },
      { id: "cm", label: "Centimeters", symbol: "cm", toBase: 0.01 },
      { id: "m", label: "Meters", symbol: "m", toBase: 1 },
      { id: "km", label: "Kilometers", symbol: "km", toBase: 1000 },
      { id: "in", label: "Inches", symbol: "in", toBase: 0.0254 },
      { id: "ft", label: "Feet", symbol: "ft", toBase: 0.3048 },
      { id: "yd", label: "Yards", symbol: "yd", toBase: 0.9144 },
      { id: "mi", label: "Miles", symbol: "mi", toBase: 1609.344 },
    ],
  },
  {
    id: "weight",
    label: "Weight & Mass",
    units: [
      { id: "mg", label: "Milligrams", symbol: "mg", toBase: 0.001 },
      { id: "g", label: "Grams", symbol: "g", toBase: 1 },
      { id: "kg", label: "Kilograms", symbol: "kg", toBase: 1000 },
      { id: "t", label: "Metric tonnes", symbol: "t", toBase: 1_000_000 },
      { id: "oz", label: "Ounces", symbol: "oz", toBase: 28.349523125 },
      { id: "lb", label: "Pounds", symbol: "lb", toBase: 453.59237 },
      { id: "st", label: "Stones", symbol: "st", toBase: 6350.29318 },
    ],
  },
  {
    id: "temperature",
    label: "Temperature",
    units: [
      { id: "c", label: "Celsius", symbol: "°C", toBase: 1 },
      { id: "f", label: "Fahrenheit", symbol: "°F", toBase: 1 },
      { id: "k", label: "Kelvin", symbol: "K", toBase: 1 },
    ],
  },
  {
    id: "volume",
    label: "Volume",
    units: [
      { id: "ml", label: "Milliliters", symbol: "ml", toBase: 0.001 },
      { id: "l", label: "Liters", symbol: "L", toBase: 1 },
      { id: "tsp", label: "US teaspoons", symbol: "tsp", toBase: 0.00492892159375 },
      { id: "tbsp", label: "US tablespoons", symbol: "tbsp", toBase: 0.0147867647813 },
      { id: "floz", label: "US fluid ounces", symbol: "fl oz", toBase: 0.0295735295625 },
      { id: "cup", label: "US cups", symbol: "cups", toBase: 0.2365882365 },
      { id: "pt", label: "US pints", symbol: "pt", toBase: 0.473176473 },
      { id: "qt", label: "US quarts", symbol: "qt", toBase: 0.946352946 },
      { id: "gal", label: "US gallons", symbol: "gal", toBase: 3.785411784 },
    ],
  },
  {
    id: "time",
    label: "Time",
    units: [
      { id: "s", label: "Seconds", symbol: "s", toBase: 1 },
      { id: "min", label: "Minutes", symbol: "min", toBase: 60 },
      { id: "hr", label: "Hours", symbol: "hr", toBase: 3600 },
      { id: "day", label: "Days", symbol: "days", toBase: 86_400 },
      { id: "week", label: "Weeks", symbol: "weeks", toBase: 604_800 },
      { id: "month", label: "Months", symbol: "months", toBase: 2_629_800 },
      { id: "year", label: "Years", symbol: "years", toBase: 31_557_600 },
    ],
  },
  {
    id: "area",
    label: "Area",
    units: [
      { id: "cm2", label: "Square centimeters", symbol: "cm²", toBase: 0.0001 },
      { id: "m2", label: "Square meters", symbol: "m²", toBase: 1 },
      { id: "ha", label: "Hectares", symbol: "ha", toBase: 10_000 },
      { id: "km2", label: "Square kilometers", symbol: "km²", toBase: 1_000_000 },
      { id: "in2", label: "Square inches", symbol: "in²", toBase: 0.00064516 },
      { id: "ft2", label: "Square feet", symbol: "ft²", toBase: 0.09290304 },
      { id: "yd2", label: "Square yards", symbol: "yd²", toBase: 0.83612736 },
      { id: "acre", label: "Acres", symbol: "acres", toBase: 4046.8564224 },
      { id: "mi2", label: "Square miles", symbol: "mi²", toBase: 2_589_988.110336 },
    ],
  },
  {
    id: "speed",
    label: "Speed",
    units: [
      { id: "mps", label: "Meters per second", symbol: "m/s", toBase: 1 },
      { id: "kmh", label: "Kilometers per hour", symbol: "km/h", toBase: 0.27777777778 },
      { id: "mph", label: "Miles per hour", symbol: "mph", toBase: 0.44704 },
      { id: "kn", label: "Knots", symbol: "kn", toBase: 0.51444444444 },
      { id: "fps", label: "Feet per second", symbol: "ft/s", toBase: 0.3048 },
    ],
  },
];

export const GENERAL_CATEGORY_BY_ID = new Map(
  GENERAL_CATEGORIES.map((c) => [c.id, c]),
);

function toCelsius(value: number, fromId: string): number {
  if (fromId === "f") return ((value - 32) * 5) / 9;
  if (fromId === "k") return value - 273.15;
  return value;
}

function fromCelsius(celsius: number, toId: string): number {
  if (toId === "f") return (celsius * 9) / 5 + 32;
  if (toId === "k") return celsius + 273.15;
  return celsius;
}

export function convertGeneral(
  value: number,
  categoryId: string,
  fromId: string,
  toId: string,
): number | null {
  const category = GENERAL_CATEGORY_BY_ID.get(categoryId);
  if (!category) return null;

  if (categoryId === "temperature") {
    return fromCelsius(toCelsius(value, fromId), toId);
  }

  const from = category.units.find((u) => u.id === fromId);
  const to = category.units.find((u) => u.id === toId);
  if (!from || !to) return null;
  return (value * from.toBase) / to.toBase;
}
