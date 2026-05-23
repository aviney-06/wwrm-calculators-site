export type OtherExtraToolKey =
  | "tip"
  | "concrete"
  | "love"
  | "date-add"
  | "birthday"
  | "powerball"
  | "minecraft-circle"
  | "btu"
  | "birth-year"
  | "electricity";

export type OtherExtraCalculator = {
  slug: string;
  title: string;
  description: string;
  breadcrumbLabel: string;
  toolKey: OtherExtraToolKey;
  /** For date-add tools */
  days?: number;
  periodLabel?: string;
};

export const OTHER_EXTRA_CALCULATORS: OtherExtraCalculator[] = [
  {
    slug: "tip-calculator",
    title: "Tip Calculator",
    description:
      "Calculate tip amount, total bill, and cost per person when splitting the check.",
    breadcrumbLabel: "tip calculator",
    toolKey: "tip",
  },
  {
    slug: "concrete-calculator",
    title: "Concrete Calculator",
    description:
      "Estimate cubic yards of concrete for a slab from length, width, and depth.",
    breadcrumbLabel: "concrete calculator",
    toolKey: "concrete",
  },
  {
    slug: "love-calculator",
    title: "Love Calculator",
    description:
      "Fun name compatibility percentage — for entertainment only, not scientific.",
    breadcrumbLabel: "love calculator",
    toolKey: "love",
  },
  {
    slug: "days-from-today-week-calculator",
    title: "7 Day / Week From Today",
    description: "What date is 7 days (one week) from a start date?",
    breadcrumbLabel: "7 day calculator",
    toolKey: "date-add",
    days: 7,
    periodLabel: "1 week",
  },
  {
    slug: "days-from-today-30-day-calculator",
    title: "30 Day From Today",
    description: "What date is 30 days from a start date?",
    breadcrumbLabel: "30 day calculator",
    toolKey: "date-add",
    days: 30,
    periodLabel: "30 days",
  },
  {
    slug: "days-from-today-45-day-calculator",
    title: "45 Day From Today",
    description: "What date is 45 days from a start date?",
    breadcrumbLabel: "45 day calculator",
    toolKey: "date-add",
    days: 45,
    periodLabel: "45 days",
  },
  {
    slug: "days-from-today-90-day-calculator",
    title: "90 Day From Today",
    description: "What date is 90 days from a start date?",
    breadcrumbLabel: "90 day calculator",
    toolKey: "date-add",
    days: 90,
    periodLabel: "90 days",
  },
  {
    slug: "days-from-today-180-day-calculator",
    title: "180 Day From Today",
    description: "What date is 180 days from a start date?",
    breadcrumbLabel: "180 day calculator",
    toolKey: "date-add",
    days: 180,
    periodLabel: "180 days",
  },
  {
    slug: "birthday-countdown-calculator",
    title: "Birthday Countdown",
    description: "Count how many days until your next birthday.",
    breadcrumbLabel: "birthday countdown",
    toolKey: "birthday",
  },
  {
    slug: "powerball-number-generator",
    title: "Powerball Number Generator",
    description:
      "Generate random Powerball-style numbers: 5 white balls (1–69) and 1 red ball (1–26).",
    breadcrumbLabel: "powerball generator",
    toolKey: "powerball",
  },
  {
    slug: "minecraft-circle-calculator",
    title: "Minecraft Circle Calculator",
    description:
      "Estimate how many blocks you need to build a filled circle in Minecraft.",
    breadcrumbLabel: "minecraft circle calculator",
    toolKey: "minecraft-circle",
  },
  {
    slug: "btu-calculator",
    title: "BTU Calculator",
    description:
      "Estimate cooling BTU per hour from room square footage and ceiling height.",
    breadcrumbLabel: "btu calculator",
    toolKey: "btu",
  },
  {
    slug: "birth-year-calculator",
    title: "Birth Year Calculator",
    description: "Find your approximate age from your birth year.",
    breadcrumbLabel: "birth year calculator",
    toolKey: "birth-year",
  },
  {
    slug: "electricity-calculator",
    title: "Electricity Calculator",
    description:
      "Estimate daily kWh usage and electricity cost from watts, hours, and $/kWh rate.",
    breadcrumbLabel: "electricity calculator",
    toolKey: "electricity",
  },
];

export const OTHER_EXTRA_BY_SLUG = Object.fromEntries(
  OTHER_EXTRA_CALCULATORS.map((c) => [c.slug, c]),
) as Record<string, OtherExtraCalculator>;
