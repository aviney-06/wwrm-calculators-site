import { CompanyPageLayout } from "@/components/company/CompanyPageLayout";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Terms of Service",
  description:
    "Terms governing your use of AllOneCalculators and our calculator tools.",
  path: "/terms",
});

export default function TermsPage() {
  const year = new Date().getFullYear();
  return (
    <CompanyPageLayout
      path="/terms"
      title="Terms of Service"
      description="Please read these terms before using our tools."
      breadcrumbLabel="terms"
    >
      <p className="text-[13px] text-[#64748b]">Last updated {year}.</p>
      <h2>Use of the service</h2>
      <p>
        AllOneCalculators is provided &ldquo;as is&rdquo; for personal,
        non-commercial use. We may change or discontinue features at any time.
      </p>
      <h2>Not professional advice</h2>
      <p>
        Results are estimates for information only. They are not medical,
        financial, legal, or other professional advice. You are responsible for
        how you use the output.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, we are not liable for any
        damages arising from your use of the site or reliance on calculator
        results.
      </p>
      <h2>Contact</h2>
      <p>
        Questions? See our <a href="/contact">Contact</a> page.
      </p>
    </CompanyPageLayout>
  );
}
