import { CompanyPageLayout } from "@/components/company/CompanyPageLayout";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Cookie Policy",
  description:
    "How AllOneCalculators uses cookies and similar technologies.",
  path: "/cookies",
});

export default function CookiesPage() {
  const year = new Date().getFullYear();
  return (
    <CompanyPageLayout
      path="/cookies"
      title="Cookie Policy"
      description="What cookies are and how we may use them."
      breadcrumbLabel="cookies"
    >
      <p className="text-[13px] text-[#64748b]">Last updated {year}.</p>
      <h2>Cookies</h2>
      <p>
        Cookies are small files stored on your device. We may use essential
        cookies so the site works, and optional cookies for analytics or
        preferences where applicable.
      </p>
      <h2>Your choices</h2>
      <p>
        You can control cookies through your browser settings. Blocking some
        cookies may affect how parts of the site behave.
      </p>
      <h2>More information</h2>
      <p>
        For how we handle personal data, see our{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>
    </CompanyPageLayout>
  );
}
