import type { ConversionKey } from "@/components/Conversion/shared/conversionUtils";

type BaseConfig = {
  slug: string;
  title: string;
  description: string;
  breadcrumbLabel: string;
  emptyHint: string;
};

export type UnitConversionConfig = BaseConfig & {
  variant?: "unit";
  fromLabel: string;
  toLabel: string;
  fromUnit: string;
  toUnit: string;
  defaultValue: string;
  decimals?: number;
  converterKey: ConversionKey;
};

export type HeightCmFtInConfig = BaseConfig & {
  variant: "heightCmFtIn";
  defaultValue: string;
};

export type HeightFtInToCmConfig = BaseConfig & {
  variant: "heightFtInToCm";
  defaultFt: string;
  defaultIn: string;
};

export type RomanNumeralConfig = BaseConfig & {
  variant: "romanNumeral";
};

export type PixelsToInchesConfig = BaseConfig & {
  variant: "pixelsToInches";
};

export type MgToMlConfig = BaseConfig & {
  variant: "mgToMl";
};

export type ConversionCalculatorConfig =
  | UnitConversionConfig
  | HeightCmFtInConfig
  | HeightFtInToCmConfig
  | RomanNumeralConfig
  | PixelsToInchesConfig
  | MgToMlConfig;

export function isHeightCmToFtInConversion(
  config: ConversionCalculatorConfig,
): config is HeightCmFtInConfig {
  return config.variant === "heightCmFtIn";
}

export function isHeightFtInToCmConversion(
  config: ConversionCalculatorConfig,
): config is HeightFtInToCmConfig {
  return config.variant === "heightFtInToCm";
}

/** @deprecated Use isHeightCmToFtInConversion */
export const isHeightConversion = isHeightCmToFtInConversion;

export function isRomanNumeralConversion(
  config: ConversionCalculatorConfig,
): config is RomanNumeralConfig {
  return config.variant === "romanNumeral";
}

export function isPixelsToInchesConversion(
  config: ConversionCalculatorConfig,
): config is PixelsToInchesConfig {
  return config.variant === "pixelsToInches";
}

export function isMgToMlConversion(
  config: ConversionCalculatorConfig,
): config is MgToMlConfig {
  return config.variant === "mgToMl";
}

export function isUnitConversion(
  config: ConversionCalculatorConfig,
): config is UnitConversionConfig {
  return !config.variant || config.variant === "unit";
}

export const CONVERSION_CALCULATORS: ConversionCalculatorConfig[] = [
  {
    slug: "pounds-to-kilograms-calculator",
    title: "Pounds to Kilograms Converter",
    description:
      "Convert weight from pounds (lb) to kilograms (kg) using the standard conversion factor.",
    breadcrumbLabel: "pounds to kilograms",
    fromLabel: "Pounds",
    toLabel: "Kilograms",
    fromUnit: "lb",
    toUnit: "kg",
    defaultValue: "1",
    decimals: 4,
    converterKey: "poundsToKilograms",
    emptyHint: "Enter pounds to convert to kilograms.",
  },
  {
    slug: "kilograms-to-pounds-calculator",
    title: "Kilograms to Pounds Converter",
    description:
      "Convert weight from kilograms (kg) to pounds (lb) using the standard conversion factor.",
    breadcrumbLabel: "kilograms to pounds",
    fromLabel: "Kilograms",
    toLabel: "Pounds",
    fromUnit: "kg",
    toUnit: "lb",
    defaultValue: "1",
    decimals: 4,
    converterKey: "kilogramsToPounds",
    emptyHint: "Enter kilograms to convert to pounds.",
  },
  {
    slug: "pounds-to-ounces-calculator",
    title: "Pounds to Ounces Converter",
    description:
      "Convert weight from pounds (lb) to ounces (oz). One pound equals 16 ounces.",
    breadcrumbLabel: "pounds to ounces",
    fromLabel: "Pounds",
    toLabel: "Ounces",
    fromUnit: "lb",
    toUnit: "oz",
    defaultValue: "1",
    decimals: 4,
    converterKey: "poundsToOunces",
    emptyHint: "Enter pounds to convert to ounces.",
  },
  {
    slug: "ounces-to-pounds-calculator",
    title: "Ounces to Pounds Converter",
    description:
      "Convert weight from avoirdupois ounces (oz) to pounds (lb). Sixteen ounces equal one pound.",
    breadcrumbLabel: "ounces to pounds",
    fromLabel: "Ounces",
    toLabel: "Pounds",
    fromUnit: "oz",
    toUnit: "lb",
    defaultValue: "16",
    decimals: 4,
    converterKey: "ouncesToPounds",
    emptyHint: "Enter ounces to convert to pounds.",
  },
  {
    slug: "height-cm-to-in-and-ft-calculator",
    title: "Height Cm to In and Ft Converter",
    description:
      "Convert height from centimeters (cm) to feet (ft) and inches (in) for body height and everyday use.",
    breadcrumbLabel: "height cm to in and ft",
    variant: "heightCmFtIn",
    defaultValue: "170",
    emptyHint: "Enter height in cm to convert to feet and inches.",
  },
  {
    slug: "height-ft-to-cm-calculator",
    title: "Height Ft to Cm Converter",
    description:
      "Convert height from feet (ft) and inches (in) to centimeters (cm) for body height and everyday use.",
    breadcrumbLabel: "height ft to cm",
    variant: "heightFtInToCm",
    defaultFt: "5",
    defaultIn: "7",
    emptyHint: "Enter height in feet and inches to convert to cm.",
  },
  {
    slug: "inches-to-cm-calculator",
    title: "Inches to Cm Converter",
    description:
      "Convert length from inches (in) to centimeters (cm) using the standard inch definition.",
    breadcrumbLabel: "inches to cm",
    fromLabel: "Inches",
    toLabel: "Centimeters",
    fromUnit: "in",
    toUnit: "cm",
    defaultValue: "1",
    decimals: 4,
    converterKey: "inchesToCm",
    emptyHint: "Enter inches to convert to centimeters.",
  },
  {
    slug: "ounces-to-grams-calculator",
    title: "Ounces to Grams Converter",
    description:
      "Convert weight from avoirdupois ounces (oz) to grams (g) for cooking and shipping.",
    breadcrumbLabel: "ounces to grams",
    fromLabel: "Ounces",
    toLabel: "Grams",
    fromUnit: "oz",
    toUnit: "g",
    defaultValue: "1",
    decimals: 4,
    converterKey: "ouncesToGrams",
    emptyHint: "Enter ounces to convert to grams.",
  },
  {
    slug: "grams-to-ounces-calculator",
    title: "Grams to Ounces Converter",
    description:
      "Convert weight from grams (g) to avoirdupois ounces (oz) for recipes and packaging.",
    breadcrumbLabel: "grams to ounces",
    fromLabel: "Grams",
    toLabel: "Ounces",
    fromUnit: "g",
    toUnit: "oz",
    defaultValue: "28.35",
    decimals: 4,
    converterKey: "gramsToOunces",
    emptyHint: "Enter grams to convert to ounces.",
  },
  {
    slug: "ml-to-oz-calculator",
    title: "Ml to Oz Converter",
    description:
      "Convert volume from milliliters (ml) to US fluid ounces (fl oz) for cooking and liquids.",
    breadcrumbLabel: "ml to oz",
    fromLabel: "Milliliters",
    toLabel: "Fluid ounces",
    fromUnit: "ml",
    toUnit: "fl oz",
    defaultValue: "240",
    decimals: 4,
    converterKey: "mlToOz",
    emptyHint: "Enter milliliters to convert to fluid ounces.",
  },
  {
    slug: "oz-to-ml-calculator",
    title: "Oz to Ml Converter",
    description:
      "Convert volume from US fluid ounces (fl oz) to milliliters (ml) for recipes and beverages.",
    breadcrumbLabel: "oz to ml",
    fromLabel: "Fluid ounces",
    toLabel: "Milliliters",
    fromUnit: "fl oz",
    toUnit: "ml",
    defaultValue: "8",
    decimals: 4,
    converterKey: "ozToMl",
    emptyHint: "Enter fluid ounces to convert to milliliters.",
  },
  {
    slug: "celsius-to-fahrenheit-calculator",
    title: "Celsius to Fahrenheit Converter",
    description:
      "Convert temperatures from degrees Celsius (°C) to degrees Fahrenheit (°F).",
    breadcrumbLabel: "celsius to fahrenheit",
    fromLabel: "Celsius",
    toLabel: "Fahrenheit",
    fromUnit: "°C",
    toUnit: "°F",
    defaultValue: "0",
    decimals: 2,
    converterKey: "celsiusToFahrenheit",
    emptyHint: "Enter °C to convert to °F.",
  },
  {
    slug: "fahrenheit-to-celsius-calculator",
    title: "Fahrenheit to Celsius Converter",
    description:
      "Convert temperatures from degrees Fahrenheit (°F) to degrees Celsius (°C).",
    breadcrumbLabel: "fahrenheit to celsius",
    fromLabel: "Fahrenheit",
    toLabel: "Celsius",
    fromUnit: "°F",
    toUnit: "°C",
    defaultValue: "32",
    decimals: 2,
    converterKey: "fahrenheitToCelsius",
    emptyHint: "Enter °F to convert to °C.",
  },
  {
    slug: "ounces-to-cups-calculator",
    title: "Ounces to Cups Converter",
    description:
      "Convert US fluid ounces (fl oz) to cups for cooking and baking (8 fl oz = 1 cup).",
    breadcrumbLabel: "ounces to cups",
    fromLabel: "Fluid ounces",
    toLabel: "Cups",
    fromUnit: "fl oz",
    toUnit: "cups",
    defaultValue: "8",
    decimals: 4,
    converterKey: "ouncesToCups",
    emptyHint: "Enter US fluid ounces to convert to cups.",
  },
  {
    slug: "mm-to-inches-calculator",
    title: "Mm to Inches Converter",
    description:
      "Convert millimeters (mm) to inches (in) using the international inch definition.",
    breadcrumbLabel: "mm to inches",
    fromLabel: "Millimeters",
    toLabel: "Inches",
    fromUnit: "mm",
    toUnit: "in",
    defaultValue: "25.4",
    decimals: 4,
    converterKey: "mmToInches",
    emptyHint: "Enter millimeters to convert to inches.",
  },
  {
    slug: "kilometers-to-miles-calculator",
    title: "Kilometers to Miles Converter",
    description:
      "Convert distance from kilometers (km) to miles (mi) for travel and fitness.",
    breadcrumbLabel: "kilometers to miles",
    fromLabel: "Kilometers",
    toLabel: "Miles",
    fromUnit: "km",
    toUnit: "mi",
    defaultValue: "1",
    decimals: 4,
    converterKey: "kilometersToMiles",
    emptyHint: "Enter kilometers to convert to miles.",
  },
  {
    slug: "square-feet-to-acres-calculator",
    title: "Square Feet to Acres Converter",
    description:
      "Convert land area from square feet (sq ft) to acres. One acre equals 43,560 sq ft.",
    breadcrumbLabel: "square feet to acres",
    fromLabel: "Square feet",
    toLabel: "Acres",
    fromUnit: "sq ft",
    toUnit: "acres",
    defaultValue: "43560",
    decimals: 6,
    converterKey: "squareFeetToAcres",
    emptyHint: "Enter square feet to convert to acres.",
  },
  {
    slug: "minutes-to-hours-calculator",
    title: "Minutes to Hours Converter",
    description:
      "Convert time from minutes to hours and decimal hours for scheduling and payroll.",
    breadcrumbLabel: "minutes to hours",
    fromLabel: "Minutes",
    toLabel: "Hours",
    fromUnit: "min",
    toUnit: "hr",
    defaultValue: "60",
    decimals: 4,
    converterKey: "minutesToHours",
    emptyHint: "Enter minutes to convert to hours.",
  },
  {
    slug: "pixels-to-inches-calculator",
    title: "Pixels to Inches Converter",
    description:
      "Convert digital pixels to physical inches using DPI (dots per inch) for screens and print.",
    breadcrumbLabel: "pixels to inches",
    variant: "pixelsToInches",
    emptyHint: "Enter pixels and DPI to convert to inches.",
  },
  {
    slug: "mg-to-ml-calculator",
    title: "Mg to Ml Converter",
    description:
      "Convert milligrams (mg) to milliliters (ml) using substance density (mg/ml). Default assumes water.",
    breadcrumbLabel: "mg to ml",
    variant: "mgToMl",
    emptyHint: "Enter mg and density to estimate ml.",
  },
  {
    slug: "roman-numeral-converter",
    title: "Roman Numeral Converter",
    description:
      "Convert Arabic numbers (1–3999) to Roman numerals and Roman numerals back to numbers.",
    breadcrumbLabel: "roman numeral converter",
    variant: "romanNumeral",
    emptyHint: "Enter a number or Roman numeral to convert.",
  },
  {
    slug: "nm-to-ft-lb-calculator",
    title: "Nm to Ft-Lb Converter",
    description:
      "Convert torque from newton-meters (N·m) to foot-pounds (ft·lb) for automotive and engineering.",
    breadcrumbLabel: "nm to ft lb",
    fromLabel: "Newton-meters",
    toLabel: "Foot-pounds",
    fromUnit: "N·m",
    toUnit: "ft·lb",
    defaultValue: "1",
    decimals: 4,
    converterKey: "nmToFtLb",
    emptyHint: "Enter N·m to convert to ft·lb.",
  },
  {
    slug: "mcg-to-mg-calculator",
    title: "Mcg to Mg Converter",
    description:
      "Convert micrograms (mcg or μg) to milligrams (mg). One mg equals 1,000 mcg.",
    breadcrumbLabel: "mcg to mg",
    fromLabel: "Micrograms",
    toLabel: "Milligrams",
    fromUnit: "mcg",
    toUnit: "mg",
    defaultValue: "1000",
    decimals: 4,
    converterKey: "mcgToMg",
    emptyHint: "Enter mcg to convert to mg.",
  },
  {
    slug: "celsius-to-kelvin-calculator",
    title: "Celsius to Kelvin Converter",
    description:
      "Convert temperature from degrees Celsius (°C) to kelvin (K) for science and engineering.",
    breadcrumbLabel: "celsius to kelvin",
    fromLabel: "Celsius",
    toLabel: "Kelvin",
    fromUnit: "°C",
    toUnit: "K",
    defaultValue: "0",
    decimals: 2,
    converterKey: "celsiusToKelvin",
    emptyHint: "Enter °C to convert to K.",
  },
];

export const CONVERSION_BY_SLUG = Object.fromEntries(
  CONVERSION_CALCULATORS.map((c) => [c.slug, c]),
) as Record<string, ConversionCalculatorConfig>;

export const CONVERSION_CALCULATOR_LINKS = CONVERSION_CALCULATORS.map((c) => ({
  href: `/conversion/${c.slug}`,
  label: c.title.replace(/ Converter$/, ""),
}));
