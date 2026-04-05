import { CategoryCalculatorIndex } from "@/components/globals/CategoryCalculatorIndex";
import { OTHER_CALCULATOR_LINKS } from "@/data/calculatorCategoryLinks";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Other Calculators",
  description:
    "Age, date, time, hours, GPA, grade, and more general-purpose calculators.",
  path: "/other",
});

export default function OtherIndexPage() {
  return (
    <CategoryCalculatorIndex
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Other calculators" },
      ]}
      title="Other Calculators"
      description="Age, dates, time, grades, and everyday calculations."
      links={OTHER_CALCULATOR_LINKS}
    />
  );
}
