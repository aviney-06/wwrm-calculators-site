import { CompanyPageLayout } from "@/components/company/CompanyPageLayout";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "About Us",
  description:
    "Learn about AllOneCalculators — free online calculators for health, finance, maths, and more.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <CompanyPageLayout
      path="/about"
      title="About Us"
      description="Free tools for everyday number problems."
      breadcrumbLabel="about"
    >
      <p>
        AllOneCalculators offers fast, free online calculators across health &
        fitness, finance, maths, and general topics. Our goal is to make
        reliable estimates and conversions easy to use in your browser—no
        sign-up required.
      </p>
      <p>
        We improve pages over time and welcome feedback on accuracy and
        clarity. Calculators are for informational use; always consult a
        professional when decisions depend on your situation.
      </p>
    </CompanyPageLayout>
  );
}
