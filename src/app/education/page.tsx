import { CategoryCalculatorIndex } from "@/components/globals/CategoryCalculatorIndex";
import { BreadcrumbSchema } from "@/components/Schema-Markup/BreadcrumbSchema";
import { EDUCATION_CALCULATOR_LINKS } from "@/data/calculatorCategoryLinks";
import { buildPageMetadata } from "@/lib/metadata";
import { getSiteUrl } from "@/lib/siteUrl";

export const metadata = buildPageMetadata({
  title: "Education Calculators",
  description:
    "GPA, grade, and test score calculators for students and teachers.",
  path: "/education",
});

export default function EducationIndexPage() {
  const baseUrl = getSiteUrl();

  return (
    <>
      <BreadcrumbSchema
        baseUrl={baseUrl}
        items={[
          { name: "calculators", href: "/" },
          { name: "education calculator", href: "/education" },
        ]}
      />
      <CategoryCalculatorIndex
        breadcrumbItems={[
          { label: "calculators", href: "/" },
          { label: "education calculator" },
        ]}
        title="Education Calculator"
        description="Free online education calculators for GPA, course grades, and test scores."
        links={EDUCATION_CALCULATOR_LINKS}
      />
    </>
  );
}
