import Link from "next/link";
import { CompanyPageLayout } from "@/components/company/CompanyPageLayout";
import { HTML_SITEMAP_SECTIONS } from "@/data/htmlSitemapSections";
import { buildPageMetadata } from "@/lib/metadata";

const PATH = "/html-sitemap";

export const metadata = buildPageMetadata({
  title: "Site Map",
  description:
    "All All1Calculators pages: health & fitness, finance, math, other tools, and site links.",
  path: PATH,
});

export default function HtmlSitemapPage() {
  return (
    <CompanyPageLayout
      path={PATH}
      title="Site Map"
      description="All free online calculators in one place."
      breadcrumbLabel="site map"
      contentWidth="wide"
    >
      <div className="border-t border-primary/20 pt-6 md:pt-8">
        {HTML_SITEMAP_SECTIONS.map((section, idx) => (
          <section
            key={section.title}
            className="mb-12 border-b border-neutral-3 pb-12 last:mb-0 last:border-b-0 last:pb-0"
            aria-labelledby={`sitemap-heading-${idx}`}
          >
            <h2 id={`sitemap-heading-${idx}`} className="!mb-2">
              <span className="text-lg font-medium">{section.title}</span>
            </h2>
            <nav
              className="text-[15px] leading-[1.75] text-[#334155] md:text-base md:leading-8"
              aria-label={section.title}
            >
              {section.links.map((link, i) => (
                <span key={link.href}>
                  {i > 0 ? (
                    <span className="select-none px-2 text-neutral-1/30 md:px-2.5" aria-hidden>
                      |
                    </span>
                  ) : null}
                  <Link href={link.href}>{link.label}</Link>
                </span>
              ))}
            </nav>
          </section>
        ))}
      </div>
    </CompanyPageLayout>
  );
}
