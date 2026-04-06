import { CompanyPageLayout } from "@/components/company/CompanyPageLayout";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "How AllOneCalculators handles information when you use our website and calculators.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <CompanyPageLayout
      path="/privacy"
      title="Privacy Policy"
      description="How we handle information when you use this site."
      breadcrumbLabel="privacy"
    >
      <PrivacyBody />
    </CompanyPageLayout>
  );
}

function PrivacyBody() {
  const year = new Date().getFullYear();
  return (
    <>
      <p className="text-[13px] text-[#64748b]">Last updated {year}.</p>
      <h2>What we collect</h2>
      <p>
        Like most sites, our hosting and analytics may process technical data
        such as your IP address, browser type, and pages viewed. We do not
        sell your personal information.
      </p>
      <h2>Cookies</h2>
      <p>
        We may use cookies or similar technologies for basic site operation
        and to understand traffic. See our{" "}
        <a href="/cookies">Cookie Policy</a> for details.
      </p>
      <h2>Third parties</h2>
      <p>
        Embedded content (for example ads or maps, if present) may set their
        own cookies under their policies.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about privacy? Reach us via the{" "}
        <a href="/contact">Contact</a> page.
      </p>
    </>
  );
}
