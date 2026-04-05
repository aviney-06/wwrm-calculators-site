import { CategoryCalculatorIndex } from "@/components/globals/CategoryCalculatorIndex";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Maths Calculator",
  description:
    "Scientific, fraction, percentage, triangle, statistics, and more free maths tools.",
  path: "/maths",
});

const CALCULATORS: { href: string; label: string }[] = [
  { href: "/maths/scientific-calculator", label: "Scientific Calculator" },
  { href: "/maths/fraction-calculator", label: "Fraction Calculator" },
  { href: "/maths/percentage-calculator", label: "Percentage Calculator" },
  { href: "/maths/triangle-calculator", label: "Triangle Calculator" },
  {
    href: "/maths/standard-deviation-calculator",
    label: "Standard Deviation Calculator",
  },
  { href: "/maths/random-number-generator", label: "Random Number Generator" },
];

export default function MathsIndexPage() {
  return (
    <CategoryCalculatorIndex
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Maths calculator" },
      ]}
      title="Maths Calculator"
      description="Scientific, fractions, percentages, geometry, and more."
      links={CALCULATORS}
    />
  );
}
