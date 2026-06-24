export type TechnologyExtraToolKey =
  | "ohms-law"
  | "hex"
  | "resistor"
  | "aspect-ratio"
  | "download-time";

export type TechnologyExtraCalculator = {
  slug: string;
  title: string;
  description: string;
  breadcrumbLabel: string;
  toolKey: TechnologyExtraToolKey;
};

export const TECHNOLOGY_EXTRA_CALCULATORS: TechnologyExtraCalculator[] = [
  {
    slug: "ohms-law-calculator",
    title: "Ohm's Law Calculator",
    description: "Solve for voltage, current, or resistance when two values are known (V = I × R).",
    breadcrumbLabel: "ohms law calculator",
    toolKey: "ohms-law",
  },
  {
    slug: "hex-calculator",
    title: "Hex Calculator",
    description: "Convert between hexadecimal and decimal numbers.",
    breadcrumbLabel: "hex calculator",
    toolKey: "hex",
  },
  {
    slug: "resistor-calculator",
    title: "Resistor Calculator",
    description:
      "Equivalent resistance for resistors in series or parallel (comma-separated values in Ω).",
    breadcrumbLabel: "resistor calculator",
    toolKey: "resistor",
  },
  {
    slug: "aspect-ratio-calculator",
    title: "Aspect Ratio Calculator",
    description:
      "Simplify a width and height to an aspect ratio, or resize while keeping the same ratio.",
    breadcrumbLabel: "aspect ratio calculator",
    toolKey: "aspect-ratio",
  },
  {
    slug: "download-time-calculator",
    title: "Download Time Calculator",
    description:
      "Estimate how long a file takes to download at a given internet speed.",
    breadcrumbLabel: "download time calculator",
    toolKey: "download-time",
  },
];

export const TECHNOLOGY_EXTRA_BY_SLUG = Object.fromEntries(
  TECHNOLOGY_EXTRA_CALCULATORS.map((c) => [c.slug, c]),
) as Record<string, TechnologyExtraCalculator>;
