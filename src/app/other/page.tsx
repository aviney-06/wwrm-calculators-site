import { CategoryCalculatorIndex } from "@/components/globals/CategoryCalculatorIndex";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Other Calculators",
  description:
    "Age, date, time, hours, GPA, grade, and more general-purpose calculators.",
  path: "/other",
});

const CALCULATORS: { href: string; label: string }[] = [
  { href: "/other/age-calculator", label: "Age Calculator" },
  { href: "/other/date-calculator", label: "Date Calculator" },
  { href: "/other/time-calculator", label: "Time Calculator" },
  { href: "/other/hours-calculator", label: "Hours Calculator" },
  { href: "/other/gpa-calculator", label: "GPA Calculator" },
  { href: "/other/grade-calculator", label: "Grade Calculator" },
];

export default function OtherIndexPage() {
  return (
    <CategoryCalculatorIndex
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Other calculators" },
      ]}
      title="Other Calculators"
      description="Age, dates, time, grades, and everyday calculations."
      links={CALCULATORS}
    />
  );
}
