import { CompanyPageLayout } from "@/components/company/CompanyPageLayout";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Get in touch with All1Calculators for feedback, questions, or support.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <CompanyPageLayout
      path="/contact"
      title="Contact"
      description="We read messages when we can—thank you for helping us improve."
      breadcrumbLabel="contact"
    >
      <p>
        For general questions, feedback on a calculator, or reporting an
        issue, send an email to:
      </p>
      <p>
        <a href="mailto:contact@All1Calculators.com">
          contact@All1Calculators.com
        </a>
      </p>
    </CompanyPageLayout>
  );
}
