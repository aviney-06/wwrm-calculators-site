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
  | "calculus"
  | "confidence-interval"
  | "inverse-function"
  | "probability"
  | "sum"
  | "domain"
  | "limit"
  | "acceleration"
  | "velocity"
  | "force"
  | "mass"
  | "watt"
  | "sample-size"
  | "big-number";

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
  {
    slug: "confidence-interval-calculator",
    title: "Confidence Interval Calculator",
    description:
      "Find the confidence interval for a sample mean from the standard deviation, sample size, and confidence level.",
    breadcrumbLabel: "confidence interval calculator",
    toolKey: "confidence-interval",
  },
  {
    slug: "inverse-function-calculator",
    title: "Inverse Function Calculator",
    description:
      "Find the inverse of a linear function f(x) = ax + b and evaluate it at any value.",
    breadcrumbLabel: "inverse function calculator",
    toolKey: "inverse-function",
  },
  {
    slug: "probability-calculator",
    title: "Probability Calculator",
    description:
      "Calculate the probability of two independent events, including their union, intersection, and complements.",
    breadcrumbLabel: "probability calculator",
    toolKey: "probability",
  },
  {
    slug: "sum-calculator",
    title: "Sum Calculator",
    description:
      "Add up a list of numbers and see the total, count, mean, minimum, and maximum.",
    breadcrumbLabel: "sum calculator",
    toolKey: "sum",
  },
  {
    slug: "domain-calculator",
    title: "Domain Calculator",
    description:
      "Find the domain of polynomial, square root, rational, and logarithmic functions in interval notation.",
    breadcrumbLabel: "domain calculator",
    toolKey: "domain",
  },
  {
    slug: "limit-calculator",
    title: "Limit Calculator",
    description:
      "Estimate the limit of a rational function as x approaches a value, including removable discontinuities.",
    breadcrumbLabel: "limit calculator",
    toolKey: "limit",
  },
  {
    slug: "acceleration-calculator",
    title: "Acceleration Calculator",
    description:
      "Calculate acceleration from the change in velocity over time (a = Δv ÷ t).",
    breadcrumbLabel: "acceleration calculator",
    toolKey: "acceleration",
  },
  {
    slug: "velocity-calculator",
    title: "Velocity Calculator",
    description:
      "Calculate average velocity from displacement and time (v = d ÷ t).",
    breadcrumbLabel: "velocity calculator",
    toolKey: "velocity",
  },
  {
    slug: "force-calculator",
    title: "Force Calculator",
    description:
      "Calculate force from mass and acceleration using Newton's second law (F = m × a).",
    breadcrumbLabel: "force calculator",
    toolKey: "force",
  },
  {
    slug: "mass-calculator",
    title: "Mass Calculator",
    description:
      "Calculate mass from force and acceleration (m = F ÷ a).",
    breadcrumbLabel: "mass calculator",
    toolKey: "mass",
  },
  {
    slug: "watt-calculator",
    title: "Watt Calculator",
    description:
      "Calculate power in watts from energy and time, or from voltage and current.",
    breadcrumbLabel: "watt calculator",
    toolKey: "watt",
  },
  {
    slug: "sample-size-calculator",
    title: "Sample Size Calculator",
    description:
      "Find the survey sample size you need for a given confidence level, margin of error, and population.",
    breadcrumbLabel: "sample size calculator",
    toolKey: "sample-size",
  },
  {
    slug: "big-number-calculator",
    title: "Big Number Calculator",
    description:
      "Add, subtract, multiply, divide, and exponentiate very large integers with exact precision.",
    breadcrumbLabel: "big number calculator",
    toolKey: "big-number",
  },
];

export const MATHS_EXTRA_BY_SLUG = Object.fromEntries(
  MATHS_EXTRA_CALCULATORS.map((c) => [c.slug, c]),
) as Record<string, MathsExtraCalculator>;
