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
  | "electricity"
  | "age"
  | "time-add"
  | "date-shift"
  | "time-duration"
  | "work-hours"
  | "day-counter"
  | "square-footage"
  | "time-card"
  | "hours"
  | "day-of-week"
  | "hours-minutes"
  | "days-between"
  | "time-zone"
  | "sunrise-sunset"
  | "feet-inches"
  | "gravel"
  | "cubic-yards"
  | "tank-volume"
  | "stair"
  | "board-foot"
  | "roof-pitch"
  | "cubic-feet"
  | "mulch"
  | "tile"
  | "dog-size"
  | "dew-point";

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
  {
    slug: "age-calculator",
    title: "Age Calculator",
    description:
      "Calculate your exact age in years, months, and days from your date of birth.",
    breadcrumbLabel: "age calculator",
    toolKey: "age",
  },
  {
    slug: "time-calculator",
    title: "Time Calculator",
    description:
      "Add or subtract two amounts of time in hours, minutes, and seconds.",
    breadcrumbLabel: "time calculator",
    toolKey: "time-add",
  },
  {
    slug: "date-calculator",
    title: "Date Calculator",
    description:
      "Add or subtract days, weeks, months, or years from any date to find a new date.",
    breadcrumbLabel: "date calculator",
    toolKey: "date-shift",
  },
  {
    slug: "time-duration-calculator",
    title: "Time Duration Calculator",
    description:
      "Find the duration between two dates and times in days, hours, and minutes.",
    breadcrumbLabel: "time duration calculator",
    toolKey: "time-duration",
  },
  {
    slug: "work-hours-calculator",
    title: "Work Hours Calculator",
    description:
      "Calculate hours worked in a shift from clock in/out times, breaks, and an optional pay rate.",
    breadcrumbLabel: "work hours calculator",
    toolKey: "work-hours",
  },
  {
    slug: "day-counter",
    title: "Day Counter",
    description:
      "Count the total days, weekdays, and weekend days between two dates.",
    breadcrumbLabel: "day counter",
    toolKey: "day-counter",
  },
  {
    slug: "square-footage-calculator",
    title: "Square Footage Calculator",
    description:
      "Calculate the area of a room or space in square feet, yards, and meters, with optional cost.",
    breadcrumbLabel: "square footage calculator",
    toolKey: "square-footage",
  },
  {
    slug: "time-card-calculator",
    title: "Time Card Calculator",
    description:
      "Add up a weekly time card from daily clock in/out times and breaks, with total pay.",
    breadcrumbLabel: "time card calculator",
    toolKey: "time-card",
  },
  {
    slug: "hours-calculator",
    title: "Hours Calculator",
    description:
      "Calculate the number of hours and minutes between a start time and an end time.",
    breadcrumbLabel: "hours calculator",
    toolKey: "hours",
  },
  {
    slug: "day-of-the-week-calculator",
    title: "Day of the Week Calculator",
    description:
      "Find out what day of the week any date falls on, plus the day and week of the year.",
    breadcrumbLabel: "day of the week calculator",
    toolKey: "day-of-week",
  },
  {
    slug: "hours-and-minutes-calculator",
    title: "Hours and Minutes Calculator",
    description:
      "Add up multiple hours and minutes entries to get a total time and decimal hours.",
    breadcrumbLabel: "hours and minutes calculator",
    toolKey: "hours-minutes",
  },
  {
    slug: "days-between-dates-calculator",
    title: "Days Between Dates",
    description:
      "Calculate the number of days, weeks, months, and years between two dates.",
    breadcrumbLabel: "days between dates",
    toolKey: "days-between",
  },
  {
    slug: "time-zone-calculator",
    title: "Time Zone Calculator",
    description:
      "Convert a date and time from one time zone to another, with daylight saving applied.",
    breadcrumbLabel: "time zone calculator",
    toolKey: "time-zone",
  },
  {
    slug: "sunrise-sunset-calculator",
    title: "Sunrise Sunset Calculator",
    description:
      "Estimate sunrise, sunset, and day length for any latitude, longitude, and date.",
    breadcrumbLabel: "sunrise sunset calculator",
    toolKey: "sunrise-sunset",
  },
  {
    slug: "feet-and-inches-calculator",
    title: "Feet and Inches Calculator",
    description:
      "Add or subtract measurements in feet and inches, with total inches and decimal feet.",
    breadcrumbLabel: "feet and inches calculator",
    toolKey: "feet-inches",
  },
  {
    slug: "gravel-calculator",
    title: "Gravel Calculator",
    description:
      "Estimate how much gravel you need in cubic yards and tons from an area and depth.",
    breadcrumbLabel: "gravel calculator",
    toolKey: "gravel",
  },
  {
    slug: "cubic-yards-calculator",
    title: "Cubic Yards Calculator",
    description:
      "Calculate the volume of a space in cubic yards from length, width, and depth.",
    breadcrumbLabel: "cubic yards calculator",
    toolKey: "cubic-yards",
  },
  {
    slug: "tank-volume-calculator",
    title: "Tank Volume Calculator",
    description:
      "Calculate the capacity of a cylindrical or rectangular tank in gallons, liters, and cubic feet.",
    breadcrumbLabel: "tank volume calculator",
    toolKey: "tank-volume",
  },
  {
    slug: "stair-calculator",
    title: "Stair Calculator",
    description:
      "Work out riser height, total run, stringer length, and stair angle from total rise and steps.",
    breadcrumbLabel: "stair calculator",
    toolKey: "stair",
  },
  {
    slug: "board-foot-calculator",
    title: "Board Foot Calculator",
    description:
      "Calculate board feet of lumber from thickness, width, length, and quantity, with optional cost.",
    breadcrumbLabel: "board foot calculator",
    toolKey: "board-foot",
  },
  {
    slug: "roof-pitch-calculator",
    title: "Roof Pitch Calculator",
    description:
      "Find roof pitch as an x:12 ratio, angle in degrees, grade percentage, and slope factor.",
    breadcrumbLabel: "roof pitch calculator",
    toolKey: "roof-pitch",
  },
  {
    slug: "cubic-feet-calculator",
    title: "Cubic Feet Calculator",
    description:
      "Calculate the volume of a space in cubic feet, cubic yards, and gallons from its dimensions.",
    breadcrumbLabel: "cubic feet calculator",
    toolKey: "cubic-feet",
  },
  {
    slug: "mulch-calculator",
    title: "Mulch Calculator",
    description:
      "Estimate how much mulch you need in cubic yards and 2 cubic foot bags from an area and depth.",
    breadcrumbLabel: "mulch calculator",
    toolKey: "mulch",
  },
  {
    slug: "tile-calculator",
    title: "Tile Calculator",
    description:
      "Calculate how many tiles you need to cover an area, including a waste allowance.",
    breadcrumbLabel: "tile calculator",
    toolKey: "tile",
  },
  {
    slug: "dog-size-calculator",
    title: "Dog Size Calculator",
    description:
      "Estimate a puppy's adult weight from its current weight and age.",
    breadcrumbLabel: "dog size calculator",
    toolKey: "dog-size",
  },
  {
    slug: "dew-point-calculator",
    title: "Dew Point Calculator",
    description:
      "Calculate the dew point from air temperature and relative humidity using the Magnus formula.",
    breadcrumbLabel: "dew point calculator",
    toolKey: "dew-point",
  },
];

export const OTHER_EXTRA_BY_SLUG = Object.fromEntries(
  OTHER_EXTRA_CALCULATORS.map((c) => [c.slug, c]),
) as Record<string, OtherExtraCalculator>;
