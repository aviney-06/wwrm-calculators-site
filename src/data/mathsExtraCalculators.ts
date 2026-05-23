export type MathsExtraToolKey =
  | "variance"
  | "quartile"
  | "square"
  | "integral"
  | "rectangular-prism"
  | "root"
  | "density"
  | "simplify"
  | "exponent"
  | "calculus";

export type MathsExtraCalculator = {
  slug: string;
  title: string;
  description: string;
  breadcrumbLabel: string;
  toolKey: MathsExtraToolKey;
};

export const MATHS_EXTRA_CALCULATORS: MathsExtraCalculator[] = [
  {
    slug: "variance-calculator",
    title: "Variance Calculator",
    description: "Sample and population variance from a list of numbers.",
    breadcrumbLabel: "variance calculator",
    toolKey: "variance",
  },
  {
    slug: "quartile-calculator",
    title: "Quartile Calculator",
    description: "Find Q1, Q2 (median), and Q3 for a data set.",
    breadcrumbLabel: "quartile calculator",
    toolKey: "quartile",
  },
  {
    slug: "square-calculator",
    title: "Square Calculator",
    description: "Area, perimeter, and diagonal of a square from side length.",
    breadcrumbLabel: "square calculator",
    toolKey: "square",
  },
  {
    slug: "integral-calculator",
    title: "Integral Calculator",
    description: "Definite integral of c·xⁿ between limits a and b.",
    breadcrumbLabel: "integral calculator",
    toolKey: "integral",
  },
  {
    slug: "rectangular-prism-calculator",
    title: "Rectangular Prism Calculator",
    description: "Volume and surface area of a rectangular prism (box).",
    breadcrumbLabel: "rectangular prism calculator",
    toolKey: "rectangular-prism",
  },
  {
    slug: "root-calculator",
    title: "Root Calculator",
    description: "Calculate the nth root of a non-negative number.",
    breadcrumbLabel: "root calculator",
    toolKey: "root",
  },
  {
    slug: "density-calculator",
    title: "Density Calculator",
    description: "Calculate density from mass and volume (ρ = m ÷ V).",
    breadcrumbLabel: "density calculator",
    toolKey: "density",
  },
  {
    slug: "simplify-calculator",
    title: "Simplify Calculator",
    description:
      "Simplify square roots into a√b form. For fractions, use the Fraction Simplify Calculator.",
    breadcrumbLabel: "simplify calculator",
    toolKey: "simplify",
  },
  {
    slug: "exponent-calculator",
    title: "Exponent Calculator",
    description: "Compute base raised to an exponent (power).",
    breadcrumbLabel: "exponent calculator",
    toolKey: "exponent",
  },
  {
    slug: "calculus-calculator",
    title: "Calculus Calculator",
    description:
      "Derivative of c·xⁿ using the power rule, evaluated at a point x.",
    breadcrumbLabel: "calculus calculator",
    toolKey: "calculus",
  },
];

export const MATHS_EXTRA_BY_SLUG = Object.fromEntries(
  MATHS_EXTRA_CALCULATORS.map((c) => [c.slug, c]),
) as Record<string, MathsExtraCalculator>;
