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

export type NumberToWordsConfig = BaseConfig & {
  variant: "numberToWords";
};

export type GramsToMolesConfig = BaseConfig & {
  variant: "gramsToMoles";
};

export type GeneralConverterConfig = BaseConfig & {
  variant: "general";
};

export type RomanNumeralDateConfig = BaseConfig & {
  variant: "romanNumeralDate";
};

export type ShoeSizeConfig = BaseConfig & {
  variant: "shoeSize";
};

export type McgToIuConfig = BaseConfig & {
  variant: "mcgToIu";
};

export type DecimalToTimeConfig = BaseConfig & {
  variant: "decimalToTime";
};

export type CupsToPoundsConfig = BaseConfig & {
  variant: "cupsToPounds";
};

export type GramsToMlConfig = BaseConfig & {
  variant: "gramsToMl";
};

export type MmolToMgdlConfig = BaseConfig & {
  variant: "mmolToMgdl";
};

export type MilitaryTimeConfig = BaseConfig & {
  variant: "militaryTime";
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
  | TbspToGramsConfig
  | NumberToWordsConfig
  | GramsToMolesConfig
  | GeneralConverterConfig
  | RomanNumeralDateConfig
  | ShoeSizeConfig
  | McgToIuConfig
  | DecimalToTimeConfig
  | CupsToPoundsConfig
  | GramsToMlConfig
  | MmolToMgdlConfig
  | MilitaryTimeConfig;

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

export function isNumberToWordsConversion(
  config: ConversionCalculatorConfig,
): config is NumberToWordsConfig {
  return config.variant === "numberToWords";
}

export function isGramsToMolesConversion(
  config: ConversionCalculatorConfig,
): config is GramsToMolesConfig {
  return config.variant === "gramsToMoles";
}

export function isGeneralConversion(
  config: ConversionCalculatorConfig,
): config is GeneralConverterConfig {
  return config.variant === "general";
}

export function isRomanNumeralDateConversion(
  config: ConversionCalculatorConfig,
): config is RomanNumeralDateConfig {
  return config.variant === "romanNumeralDate";
}

export function isShoeSizeConversion(
  config: ConversionCalculatorConfig,
): config is ShoeSizeConfig {
  return config.variant === "shoeSize";
}

export function isMcgToIuConversion(
  config: ConversionCalculatorConfig,
): config is McgToIuConfig {
  return config.variant === "mcgToIu";
}

export function isDecimalToTimeConversion(
  config: ConversionCalculatorConfig,
): config is DecimalToTimeConfig {
  return config.variant === "decimalToTime";
}

export function isCupsToPoundsConversion(
  config: ConversionCalculatorConfig,
): config is CupsToPoundsConfig {
  return config.variant === "cupsToPounds";
}

export function isGramsToMlConversion(
  config: ConversionCalculatorConfig,
): config is GramsToMlConfig {
  return config.variant === "gramsToMl";
}

export function isMmolToMgdlConversion(
  config: ConversionCalculatorConfig,
): config is MmolToMgdlConfig {
  return config.variant === "mmolToMgdl";
}

export function isMilitaryTimeConversion(
  config: ConversionCalculatorConfig,
): config is MilitaryTimeConfig {
  return config.variant === "militaryTime";
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
  {
    slug: "conversion-calculator",
    title: "Conversion Calculator",
    description:
      "Free all-in-one unit converter for length, weight, temperature, volume, time, area, and speed.",
    breadcrumbLabel: "conversion calculator",
    variant: "general",
    emptyHint: "Choose a measurement and units, then enter a value to convert.",
  },
  {
    slug: "convertidor-de-lbs-a-kg",
    title: "Convertidor de Lbs a Kg",
    description:
      "Convierte el peso de libras (lb) a kilogramos (kg) con el factor de conversión estándar.",
    breadcrumbLabel: "convertidor de lbs a kg",
    fromLabel: "Libras",
    toLabel: "Kilogramos",
    fromUnit: "lb",
    toUnit: "kg",
    defaultValue: "1",
    decimals: 4,
    converterKey: "poundsToKilograms",
    emptyHint: "Ingresa libras para convertir a kilogramos.",
  },
  {
    slug: "numbers-to-words-calculator",
    title: "Numbers to Words Converter",
    description:
      "Convert numbers into written English words for checks, invoices, and documents.",
    breadcrumbLabel: "numbers to words",
    variant: "numberToWords",
    emptyHint: "Enter a number to convert to words.",
  },
  {
    slug: "hours-to-minutes-calculator",
    title: "Hours to Minutes Converter",
    description:
      "Convert time from hours to minutes. One hour equals 60 minutes.",
    breadcrumbLabel: "hours to minutes",
    fromLabel: "Hours",
    toLabel: "Minutes",
    fromUnit: "hr",
    toUnit: "min",
    defaultValue: "1",
    decimals: 2,
    converterKey: "hoursToMinutes",
    emptyHint: "Enter hours to convert to minutes.",
  },
  {
    slug: "ml-to-cups-calculator",
    title: "Ml to Cups Converter",
    description:
      "Convert volume from milliliters (ml) to US cups for cooking and baking.",
    breadcrumbLabel: "ml to cups",
    fromLabel: "Milliliters",
    toLabel: "Cups",
    fromUnit: "ml",
    toUnit: "cups",
    defaultValue: "240",
    decimals: 4,
    converterKey: "mlToCups",
    emptyHint: "Enter milliliters to convert to cups.",
  },
  {
    slug: "feet-to-inches-calculator",
    title: "Feet to Inches Converter",
    description:
      "Convert length from feet (ft) to inches (in). One foot equals 12 inches.",
    breadcrumbLabel: "feet to inches",
    fromLabel: "Feet",
    toLabel: "Inches",
    fromUnit: "ft",
    toUnit: "in",
    defaultValue: "1",
    decimals: 4,
    converterKey: "feetToInches",
    emptyHint: "Enter feet to convert to inches.",
  },
  {
    slug: "grams-to-moles-calculator",
    title: "Grams to Moles Converter",
    description:
      "Convert mass in grams to moles using a substance's molar mass (g/mol).",
    breadcrumbLabel: "grams to moles",
    variant: "gramsToMoles",
    emptyHint: "Enter grams and molar mass to estimate moles.",
  },
  {
    slug: "l-to-gal-calculator",
    title: "Liters to Gallons Converter",
    description:
      "Convert volume from liters (L) to US gallons (gal) for fuel and liquids.",
    breadcrumbLabel: "liters to gallons",
    fromLabel: "Liters",
    toLabel: "US gallons",
    fromUnit: "L",
    toUnit: "gal",
    defaultValue: "1",
    decimals: 4,
    converterKey: "litersToGallons",
    emptyHint: "Enter liters to convert to gallons.",
  },
  {
    slug: "months-to-years-calculator",
    title: "Months to Years Converter",
    description:
      "Convert time from months to years. Twelve months equal one year.",
    breadcrumbLabel: "months to years",
    fromLabel: "Months",
    toLabel: "Years",
    fromUnit: "months",
    toUnit: "years",
    defaultValue: "12",
    decimals: 4,
    converterKey: "monthsToYears",
    emptyHint: "Enter months to convert to years.",
  },
  {
    slug: "ft-to-m-calculator",
    title: "Feet to Meters Converter",
    description:
      "Convert length from feet (ft) to meters (m) for height, distance, and construction.",
    breadcrumbLabel: "feet to meters",
    fromLabel: "Feet",
    toLabel: "Meters",
    fromUnit: "ft",
    toUnit: "m",
    defaultValue: "1",
    decimals: 4,
    converterKey: "feetToMeters",
    emptyHint: "Enter feet to convert to meters.",
  },
  {
    slug: "roman-numeral-date-converter",
    title: "Roman Numeral Date Converter",
    description:
      "Convert a calendar date into Roman numerals for tattoos, anniversaries, and engravings.",
    breadcrumbLabel: "roman numeral date",
    variant: "romanNumeralDate",
    emptyHint: "Pick a date to convert to Roman numerals.",
  },
  {
    slug: "minutes-to-decimal-calculator",
    title: "Minutes to Decimal Converter",
    description:
      "Convert minutes into decimal hours for payroll, billing, and time tracking.",
    breadcrumbLabel: "minutes to decimal",
    fromLabel: "Minutes",
    toLabel: "Decimal hours",
    fromUnit: "min",
    toUnit: "hr",
    defaultValue: "30",
    decimals: 4,
    converterKey: "minutesToHours",
    emptyHint: "Enter minutes to convert to decimal hours.",
  },
  {
    slug: "ms-to-seconds-calculator",
    title: "Ms to Seconds Converter",
    description:
      "Convert time from milliseconds (ms) to seconds (s). One second equals 1,000 ms.",
    breadcrumbLabel: "ms to seconds",
    fromLabel: "Milliseconds",
    toLabel: "Seconds",
    fromUnit: "ms",
    toUnit: "s",
    defaultValue: "1000",
    decimals: 4,
    converterKey: "msToSeconds",
    emptyHint: "Enter milliseconds to convert to seconds.",
  },
  {
    slug: "shoe-size-converter",
    title: "Shoe Size Converter",
    description:
      "Convert shoe sizes between US, UK, EU, and centimeters for men and women.",
    breadcrumbLabel: "shoe size",
    variant: "shoeSize",
    emptyHint: "Enter a shoe size to convert across systems.",
  },
  {
    slug: "mcg-to-iu-calculator",
    title: "Mcg to IU Converter",
    description:
      "Convert micrograms (mcg) to international units (IU) for vitamins A, D, and E.",
    breadcrumbLabel: "mcg to iu",
    variant: "mcgToIu",
    emptyHint: "Choose a vitamin and enter mcg to get IU.",
  },
  {
    slug: "lbs-to-newton-calculator",
    title: "Lbs to Newton Converter",
    description:
      "Convert force from pounds-force (lbf) to newtons (N) for physics and engineering.",
    breadcrumbLabel: "lbs to newton",
    fromLabel: "Pounds-force",
    toLabel: "Newtons",
    fromUnit: "lbf",
    toUnit: "N",
    defaultValue: "1",
    decimals: 4,
    converterKey: "poundsToNewtons",
    emptyHint: "Enter pounds-force to convert to newtons.",
  },
  {
    slug: "feet-to-miles-calculator",
    title: "Feet to Miles Converter",
    description:
      "Convert distance from feet (ft) to miles (mi). One mile equals 5,280 feet.",
    breadcrumbLabel: "feet to miles",
    fromLabel: "Feet",
    toLabel: "Miles",
    fromUnit: "ft",
    toUnit: "mi",
    defaultValue: "5280",
    decimals: 6,
    converterKey: "feetToMiles",
    emptyHint: "Enter feet to convert to miles.",
  },
  {
    slug: "hours-to-days-calculator",
    title: "Hours to Days Converter",
    description:
      "Convert time from hours to days. One day equals 24 hours.",
    breadcrumbLabel: "hours to days",
    fromLabel: "Hours",
    toLabel: "Days",
    fromUnit: "hr",
    toUnit: "days",
    defaultValue: "24",
    decimals: 4,
    converterKey: "hoursToDays",
    emptyHint: "Enter hours to convert to days.",
  },
  {
    slug: "decimal-to-time-calculator",
    title: "Decimal to Time Converter",
    description:
      "Convert decimal hours into hours, minutes, and seconds for timesheets and scheduling.",
    breadcrumbLabel: "decimal to time",
    variant: "decimalToTime",
    emptyHint: "Enter decimal hours to get hours, minutes, and seconds.",
  },
  {
    slug: "cubic-yards-to-cubic-feet-calculator",
    title: "Cubic Yards to Cubic Feet Converter",
    description:
      "Convert volume from cubic yards (yd³) to cubic feet (ft³). One cubic yard equals 27 cubic feet.",
    breadcrumbLabel: "cubic yards to cubic feet",
    fromLabel: "Cubic yards",
    toLabel: "Cubic feet",
    fromUnit: "yd³",
    toUnit: "ft³",
    defaultValue: "1",
    decimals: 4,
    converterKey: "cubicYardsToCubicFeet",
    emptyHint: "Enter cubic yards to convert to cubic feet.",
  },
  {
    slug: "lbs-to-g-calculator",
    title: "Lbs to G Converter",
    description:
      "Convert weight from pounds (lb) to grams (g) using the standard conversion factor.",
    breadcrumbLabel: "lbs to g",
    fromLabel: "Pounds",
    toLabel: "Grams",
    fromUnit: "lb",
    toUnit: "g",
    defaultValue: "1",
    decimals: 4,
    converterKey: "poundsToGrams",
    emptyHint: "Enter pounds to convert to grams.",
  },
  {
    slug: "cups-to-pounds-calculator",
    title: "Cups to Pounds Converter",
    description:
      "Convert US cups to pounds using ingredient density (g/ml). Default assumes water.",
    breadcrumbLabel: "cups to pounds",
    variant: "cupsToPounds",
    emptyHint: "Enter cups and density to estimate pounds.",
  },
  {
    slug: "quarts-to-gallons-calculator",
    title: "Quarts to Gallons Converter",
    description:
      "Convert US liquid quarts to gallons. Four quarts equal one US gallon.",
    breadcrumbLabel: "quarts to gallons",
    fromLabel: "Quarts",
    toLabel: "Gallons",
    fromUnit: "qt",
    toUnit: "gal",
    defaultValue: "4",
    decimals: 4,
    converterKey: "quartsToGallons",
    emptyHint: "Enter quarts to convert to gallons.",
  },
  {
    slug: "cubic-feet-to-cubic-yards-calculator",
    title: "Cubic Feet to Cubic Yards Converter",
    description:
      "Convert volume from cubic feet (ft³) to cubic yards (yd³). Twenty-seven cubic feet equal one cubic yard.",
    breadcrumbLabel: "cubic feet to cubic yards",
    fromLabel: "Cubic feet",
    toLabel: "Cubic yards",
    fromUnit: "ft³",
    toUnit: "yd³",
    defaultValue: "27",
    decimals: 6,
    converterKey: "cubicFeetToCubicYards",
    emptyHint: "Enter cubic feet to convert to cubic yards.",
  },
  {
    slug: "grams-in-ml-calculator",
    title: "Grams in Ml Converter",
    description:
      "Convert grams (g) to milliliters (ml) using density (g/ml). Default assumes water.",
    breadcrumbLabel: "grams in ml",
    variant: "gramsToMl",
    emptyHint: "Enter grams and density to estimate milliliters.",
  },
  {
    slug: "kilobytes-to-megabytes-calculator",
    title: "Kilobytes to Megabytes Converter",
    description:
      "Convert digital storage from kilobytes (KB) to megabytes (MB) using 1 MB = 1024 KB.",
    breadcrumbLabel: "kilobytes to megabytes",
    fromLabel: "Kilobytes",
    toLabel: "Megabytes",
    fromUnit: "KB",
    toUnit: "MB",
    defaultValue: "1024",
    decimals: 6,
    converterKey: "kilobytesToMegabytes",
    emptyHint: "Enter kilobytes to convert to megabytes.",
  },
  {
    slug: "cubic-feet-to-gallons-calculator",
    title: "Cubic Feet to Gallons Converter",
    description:
      "Convert volume from cubic feet (ft³) to US gallons. One cubic foot ≈ 7.48 gallons.",
    breadcrumbLabel: "cubic feet to gallons",
    fromLabel: "Cubic feet",
    toLabel: "US gallons",
    fromUnit: "ft³",
    toUnit: "gal",
    defaultValue: "1",
    decimals: 4,
    converterKey: "cubicFeetToGallons",
    emptyHint: "Enter cubic feet to convert to gallons.",
  },
  {
    slug: "ml-to-tbsp-calculator",
    title: "Ml to Tbsp Converter",
    description:
      "Convert volume from milliliters (ml) to US tablespoons (tbsp) for cooking and baking.",
    breadcrumbLabel: "ml to tbsp",
    fromLabel: "Milliliters",
    toLabel: "Tablespoons",
    fromUnit: "ml",
    toUnit: "tbsp",
    defaultValue: "15",
    decimals: 4,
    converterKey: "mlToTbsp",
    emptyHint: "Enter milliliters to convert to tablespoons.",
  },
  {
    slug: "pints-to-cups-calculator",
    title: "Pints to Cups Converter",
    description:
      "Convert US liquid pints to cups. One US pint equals 2 cups.",
    breadcrumbLabel: "pints to cups",
    fromLabel: "Pints",
    toLabel: "Cups",
    fromUnit: "pt",
    toUnit: "cups",
    defaultValue: "1",
    decimals: 4,
    converterKey: "pintsToCups",
    emptyHint: "Enter pints to convert to cups.",
  },
  {
    slug: "cm-to-ft-in-calculator",
    title: "Cm to Ft In Converter",
    description:
      "Convert length from centimeters (cm) to feet (ft) and inches (in).",
    breadcrumbLabel: "cm to ft in",
    variant: "heightCmFtIn",
    defaultValue: "170",
    emptyHint: "Enter centimeters to convert to feet and inches.",
  },
  {
    slug: "pounds-to-grams-calculator",
    title: "Pounds to Grams Converter",
    description:
      "Convert weight from pounds (lb) to grams (g) using the standard conversion factor.",
    breadcrumbLabel: "pounds to grams",
    fromLabel: "Pounds",
    toLabel: "Grams",
    fromUnit: "lb",
    toUnit: "g",
    defaultValue: "1",
    decimals: 4,
    converterKey: "poundsToGrams",
    emptyHint: "Enter pounds to convert to grams.",
  },
  {
    slug: "nm-to-m-calculator",
    title: "Nm to M Converter",
    description:
      "Convert length from nanometers (nm) to meters (m). One meter equals one billion nanometers.",
    breadcrumbLabel: "nm to m",
    fromLabel: "Nanometers",
    toLabel: "Meters",
    fromUnit: "nm",
    toUnit: "m",
    defaultValue: "500",
    decimals: 12,
    converterKey: "nanometersToMeters",
    emptyHint: "Enter nanometers to convert to meters.",
  },
  {
    slug: "gallons-to-quarts-calculator",
    title: "Gallons to Quarts Converter",
    description:
      "Convert US liquid gallons to quarts. One US gallon equals 4 quarts.",
    breadcrumbLabel: "gallons to quarts",
    fromLabel: "Gallons",
    toLabel: "Quarts",
    fromUnit: "gal",
    toUnit: "qt",
    defaultValue: "1",
    decimals: 4,
    converterKey: "gallonsToQuarts",
    emptyHint: "Enter gallons to convert to quarts.",
  },
  {
    slug: "mmol-l-to-mg-dl-calculator",
    title: "Mmol/L to Mg/dL Converter",
    description:
      "Convert blood concentrations from mmol/L to mg/dL for glucose, cholesterol, and triglycerides.",
    breadcrumbLabel: "mmol/l to mg/dl",
    variant: "mmolToMgdl",
    emptyHint: "Choose a substance and enter mmol/L to get mg/dL.",
  },
  {
    slug: "military-time-converter",
    title: "Military Time Converter",
    description:
      "Convert between 12-hour clock time (AM/PM) and 24-hour military time, and back again.",
    breadcrumbLabel: "military time converter",
    variant: "militaryTime",
    emptyHint: "Enter a time to convert between 12-hour and 24-hour formats.",
  },
];

export const CONVERSION_BY_SLUG = Object.fromEntries(
  CONVERSION_CALCULATORS.map((c) => [c.slug, c]),
) as Record<string, ConversionCalculatorConfig>;

export const CONVERSION_CALCULATOR_LINKS = CONVERSION_CALCULATORS.map((c) => ({
  href: `/conversion/${c.slug}`,
  label: c.title.replace(/ Converter$/, ""),
}));
