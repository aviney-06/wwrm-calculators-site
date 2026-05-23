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

export type TimeToDecimalConfig = BaseConfig & {
  variant: "timeToDecimal";
};

export type MlToGramsConfig = BaseConfig & {
  variant: "mlToGrams";
};

export type GramsToCupsConfig = BaseConfig & {
  variant: "gramsToCups";
};

export type TbspToGramsConfig = BaseConfig & {
  variant: "tbspToGrams";
};

export type ConversionCalculatorConfig =
  | UnitConversionConfig
  | HeightCmFtInConfig
  | HeightFtInToCmConfig
  | RomanNumeralConfig
  | PixelsToInchesConfig
  | MgToMlConfig
  | TimeToDecimalConfig
  | MlToGramsConfig
  | GramsToCupsConfig
  | TbspToGramsConfig;

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

export function isTimeToDecimalConversion(
  config: ConversionCalculatorConfig,
): config is TimeToDecimalConfig {
  return config.variant === "timeToDecimal";
}

export function isMlToGramsConversion(
  config: ConversionCalculatorConfig,
): config is MlToGramsConfig {
  return config.variant === "mlToGrams";
}

export function isGramsToCupsConversion(
  config: ConversionCalculatorConfig,
): config is GramsToCupsConfig {
  return config.variant === "gramsToCups";
}

export function isTbspToGramsConversion(
  config: ConversionCalculatorConfig,
): config is TbspToGramsConfig {
  return config.variant === "tbspToGrams";
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
  {
    slug: "quarts-to-cups-calculator",
    title: "Quarts to Cups Converter",
    description:
      "Convert US liquid quarts to cups. One quart equals 4 US cups.",
    breadcrumbLabel: "quarts to cups",
    fromLabel: "Quarts",
    toLabel: "Cups",
    fromUnit: "qt",
    toUnit: "cups",
    defaultValue: "1",
    decimals: 4,
    converterKey: "quartsToCups",
    emptyHint: "Enter quarts to convert to cups.",
  },
  {
    slug: "time-to-decimal-calculator",
    title: "Time to Decimal Converter",
    description:
      "Convert hours and minutes into decimal hours for payroll, billing, and time tracking.",
    breadcrumbLabel: "time to decimal",
    variant: "timeToDecimal",
    emptyHint: "Enter hours and minutes to get decimal hours.",
  },
  {
    slug: "knots-to-mph-calculator",
    title: "Knots to Mph Converter",
    description:
      "Convert speed from knots (nautical miles per hour) to miles per hour (mph).",
    breadcrumbLabel: "knots to mph",
    fromLabel: "Knots",
    toLabel: "Miles per hour",
    fromUnit: "kn",
    toUnit: "mph",
    defaultValue: "10",
    decimals: 4,
    converterKey: "knotsToMph",
    emptyHint: "Enter knots to convert to mph.",
  },
  {
    slug: "tbsp-to-grams-calculator",
    title: "Tbsp to Grams Converter",
    description:
      "Convert US tablespoons to grams using ingredient density (g/ml). Default assumes water.",
    breadcrumbLabel: "tbsp to grams",
    variant: "tbspToGrams",
    emptyHint: "Enter tablespoons and density to estimate grams.",
  },
  {
    slug: "ml-to-tsp-calculator",
    title: "Ml to Tsp Converter",
    description:
      "Convert milliliters (ml) to US teaspoons (tsp) for cooking and baking.",
    breadcrumbLabel: "ml to tsp",
    fromLabel: "Milliliters",
    toLabel: "Teaspoons",
    fromUnit: "ml",
    toUnit: "tsp",
    defaultValue: "5",
    decimals: 4,
    converterKey: "mlToTsp",
    emptyHint: "Enter milliliters to convert to teaspoons.",
  },
  {
    slug: "grams-to-cups-calculator",
    title: "Grams to Cups Converter",
    description:
      "Convert grams to US cups using density (g/ml). Adjust density for different ingredients.",
    breadcrumbLabel: "grams to cups",
    variant: "gramsToCups",
    emptyHint: "Enter grams and density to estimate cups.",
  },
  {
    slug: "ml-to-grams-calculator",
    title: "Ml to Grams Converter",
    description:
      "Convert milliliters (ml) to grams (g) using density (g/ml). Default assumes water.",
    breadcrumbLabel: "ml to grams",
    variant: "mlToGrams",
    emptyHint: "Enter ml and density to estimate grams.",
  },
  {
    slug: "tsp-to-ml-calculator",
    title: "Tsp to Ml Converter",
    description:
      "Convert US teaspoons (tsp) to milliliters (ml) for recipes and kitchen measure.",
    breadcrumbLabel: "tsp to ml",
    fromLabel: "Teaspoons",
    toLabel: "Milliliters",
    fromUnit: "tsp",
    toUnit: "ml",
    defaultValue: "1",
    decimals: 4,
    converterKey: "tspToMl",
    emptyHint: "Enter teaspoons to convert to milliliters.",
  },
  {
    slug: "acres-to-square-feet-calculator",
    title: "Acres to Square Feet Converter",
    description:
      "Convert land area from acres to square feet. One acre equals 43,560 square feet.",
    breadcrumbLabel: "acres to square feet",
    fromLabel: "Acres",
    toLabel: "Square feet",
    fromUnit: "acres",
    toUnit: "sq ft",
    defaultValue: "1",
    decimals: 4,
    converterKey: "acresToSquareFeet",
    emptyHint: "Enter acres to convert to square feet.",
  },
  {
    slug: "tbsp-to-ml-calculator",
    title: "Tbsp to Ml Converter",
    description:
      "Convert US tablespoons (tbsp) to milliliters (ml) for cooking measurements.",
    breadcrumbLabel: "tbsp to ml",
    fromLabel: "Tablespoons",
    toLabel: "Milliliters",
    fromUnit: "tbsp",
    toUnit: "ml",
    defaultValue: "1",
    decimals: 4,
    converterKey: "tbspToMl",
    emptyHint: "Enter tablespoons to convert to milliliters.",
  },
  {
    slug: "gallons-to-pounds-calculator",
    title: "Gallons to Pounds Converter",
    description:
      "Estimate weight in pounds for US liquid gallons of water. Other liquids need different density.",
    breadcrumbLabel: "gallons to pounds",
    fromLabel: "US gallons",
    toLabel: "Pounds",
    fromUnit: "gal",
    toUnit: "lb",
    defaultValue: "1",
    decimals: 4,
    converterKey: "gallonsToPounds",
    emptyHint: "Enter gallons (water equivalent) to convert to pounds.",
  },
  {
    slug: "square-meters-to-square-feet-calculator",
    title: "Square Meters to Square Feet Converter",
    description:
      "Convert floor area from square meters (m²) to square feet (sq ft).",
    breadcrumbLabel: "square meters to square feet",
    fromLabel: "Square meters",
    toLabel: "Square feet",
    fromUnit: "m²",
    toUnit: "sq ft",
    defaultValue: "10",
    decimals: 4,
    converterKey: "squareMetersToSquareFeet",
    emptyHint: "Enter square meters to convert to square feet.",
  },
  {
    slug: "square-feet-to-square-meters-calculator",
    title: "Square Feet to Square Meters Converter",
    description:
      "Convert floor area from square feet (sq ft) to square meters (m²).",
    breadcrumbLabel: "square feet to square meters",
    fromLabel: "Square feet",
    toLabel: "Square meters",
    fromUnit: "sq ft",
    toUnit: "m²",
    defaultValue: "100",
    decimals: 4,
    converterKey: "squareFeetToSquareMeters",
    emptyHint: "Enter square feet to convert to square meters.",
  },
  {
    slug: "kelvin-to-celsius-calculator",
    title: "Kelvin to Celsius Converter",
    description:
      "Convert temperature from kelvin (K) to degrees Celsius (°C).",
    breadcrumbLabel: "kelvin to celsius",
    fromLabel: "Kelvin",
    toLabel: "Celsius",
    fromUnit: "K",
    toUnit: "°C",
    defaultValue: "273.15",
    decimals: 2,
    converterKey: "kelvinToCelsius",
    emptyHint: "Enter K to convert to °C.",
  },
  {
    slug: "minutes-to-seconds-calculator",
    title: "Minutes to Seconds Converter",
    description:
      "Convert time from minutes to seconds. One minute equals 60 seconds.",
    breadcrumbLabel: "minutes to seconds",
    fromLabel: "Minutes",
    toLabel: "Seconds",
    fromUnit: "min",
    toUnit: "sec",
    defaultValue: "1",
    decimals: 2,
    converterKey: "minutesToSeconds",
    emptyHint: "Enter minutes to convert to seconds.",
  },
  {
    slug: "hours-to-seconds-calculator",
    title: "Hours to Seconds Converter",
    description:
      "Convert time from hours to seconds. One hour equals 3,600 seconds.",
    breadcrumbLabel: "hours to seconds",
    fromLabel: "Hours",
    toLabel: "Seconds",
    fromUnit: "hr",
    toUnit: "sec",
    defaultValue: "1",
    decimals: 2,
    converterKey: "hoursToSeconds",
    emptyHint: "Enter hours to convert to seconds.",
  },
  {
    slug: "pennies-to-dollars-calculator",
    title: "Pennies to Dollars Converter",
    description:
      "Convert US cents (pennies) to dollars. One hundred pennies equal one dollar.",
    breadcrumbLabel: "pennies to dollars",
    fromLabel: "Pennies",
    toLabel: "Dollars",
    fromUnit: "¢",
    toUnit: "$",
    defaultValue: "100",
    decimals: 2,
    converterKey: "penniesToDollars",
    emptyHint: "Enter pennies to convert to dollars.",
  },
  {
    slug: "bar-to-psi-calculator",
    title: "Bar to PSI Converter",
    description:
      "Convert pressure from bar to pounds per square inch (psi) for tires and hydraulics.",
    breadcrumbLabel: "bar to psi",
    fromLabel: "Bar",
    toLabel: "PSI",
    fromUnit: "bar",
    toUnit: "psi",
    defaultValue: "1",
    decimals: 4,
    converterKey: "barToPsi",
    emptyHint: "Enter bar to convert to psi.",
  },
  {
    slug: "cm-to-inches-calculator",
    title: "Cm to Inches Converter",
    description:
      "Convert length from centimeters (cm) to inches (in) using the standard inch definition.",
    breadcrumbLabel: "cm to inches",
    fromLabel: "Centimeters",
    toLabel: "Inches",
    fromUnit: "cm",
    toUnit: "in",
    defaultValue: "2.54",
    decimals: 4,
    converterKey: "cmToInches",
    emptyHint: "Enter centimeters to convert to inches.",
  },
  {
    slug: "meters-to-feet-calculator",
    title: "Meters to Feet Converter",
    description:
      "Convert length from meters (m) to feet (ft) for height, distance, and construction.",
    breadcrumbLabel: "meters to feet",
    fromLabel: "Meters",
    toLabel: "Feet",
    fromUnit: "m",
    toUnit: "ft",
    defaultValue: "1",
    decimals: 4,
    converterKey: "metersToFeet",
    emptyHint: "Enter meters to convert to feet.",
  },
  {
    slug: "meters-to-miles-calculator",
    title: "Meters to Miles Converter",
    description:
      "Convert distance from meters (m) to miles (mi) for running, travel, and mapping.",
    breadcrumbLabel: "meters to miles",
    fromLabel: "Meters",
    toLabel: "Miles",
    fromUnit: "m",
    toUnit: "mi",
    defaultValue: "1609",
    decimals: 6,
    converterKey: "metersToMiles",
    emptyHint: "Enter meters to convert to miles.",
  },
  {
    slug: "kelvin-to-fahrenheit-calculator",
    title: "Kelvin to Fahrenheit Converter",
    description:
      "Convert temperature from kelvin (K) to degrees Fahrenheit (°F).",
    breadcrumbLabel: "kelvin to fahrenheit",
    fromLabel: "Kelvin",
    toLabel: "Fahrenheit",
    fromUnit: "K",
    toUnit: "°F",
    defaultValue: "273.15",
    decimals: 2,
    converterKey: "kelvinToFahrenheit",
    emptyHint: "Enter K to convert to °F.",
  },
  {
    slug: "fahrenheit-to-kelvin-calculator",
    title: "Fahrenheit to Kelvin Converter",
    description:
      "Convert temperature from degrees Fahrenheit (°F) to kelvin (K).",
    breadcrumbLabel: "fahrenheit to kelvin",
    fromLabel: "Fahrenheit",
    toLabel: "Kelvin",
    fromUnit: "°F",
    toUnit: "K",
    defaultValue: "32",
    decimals: 2,
    converterKey: "fahrenheitToKelvin",
    emptyHint: "Enter °F to convert to K.",
  },
];

export const CONVERSION_BY_SLUG = Object.fromEntries(
  CONVERSION_CALCULATORS.map((c) => [c.slug, c]),
) as Record<string, ConversionCalculatorConfig>;

export const CONVERSION_CALCULATOR_LINKS = CONVERSION_CALCULATORS.map((c) => ({
  href: `/conversion/${c.slug}`,
  label: c.title.replace(/ Converter$/, ""),
}));
