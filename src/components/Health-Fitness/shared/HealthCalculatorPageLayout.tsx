import type { ReactNode } from "react";
import {
  CalculatorDynamicSections,
  type CalculatorDynamicSection,
} from "@/components/Health-Fitness/shared/CalculatorDynamicSections";
import { Breadcrumbs } from "@/components/globals/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/Schema-Markup/BreadcrumbSchema";
import { getSiteUrl } from "@/lib/siteUrl";
import { getCalculatorPageContentBySlug } from "@/lib/strapiCalculators";

type Props = {
  /** URL pathname for this page, e.g. {@code /health-fitness/bmi-calculator} */
  path: string;
  /** Strapi `slug` when it differs from the last segment of `path` (e.g. locales). */
  cmsSlug?: string;
  title: string;
  description: string;
  breadcrumbLabel: string;
  children: ReactNode;
  dynamicSections?: CalculatorDynamicSection[];
};

export async function HealthCalculatorPageLayout({
  path,
  cmsSlug,
  title,
  description,
  breadcrumbLabel,
  children,
  dynamicSections = [],
}: Props) {
  const baseUrl = getSiteUrl();
  const slug =
    cmsSlug?.trim() ||
    path
      .split("/")
      .filter(Boolean)
      .at(-1) ||
    "";
  const pageContent = slug ? await getCalculatorPageContentBySlug(slug) : null;
  const effectiveTitle = pageContent?.title || title;
  const effectiveDescription = pageContent?.description || description;
  const effectiveSections =
    pageContent && pageContent.dynamicSections.length > 0
      ? pageContent.dynamicSections
      : dynamicSections;

  return (
    <div className="w-full min-w-0">
      <BreadcrumbSchema
        baseUrl={baseUrl}
        items={[
          { name: "Calculators", href: "/" },
          { name: "Health calculator", href: "/health-fitness" },
          { name: effectiveTitle, href: path },
        ]}
      />
      <Breadcrumbs
        className="mb-3 max-md:mb-2 md:mb-5"
        items={[
          { label: "home", href: "/" },
          { label: "health calculator", href: "/health-fitness" },
          { label: breadcrumbLabel },
        ]}
      />
      <header className="mb-4 md:mb-10">
        <h1 className="text-[1.4rem] font-bold leading-tight tracking-tight text-[#1e293b] sm:text-[1.75rem] md:text-[2rem]">
          {effectiveTitle}
        </h1>
        <p className="mt-2 max-w-2xl text-[0.85rem] leading-snug text-[#64748b] sm:mt-3 sm:text-[0.95rem] sm:leading-relaxed">
          {effectiveDescription}
        </p>
      </header>
      {children}
      <CalculatorDynamicSections sections={effectiveSections} />
    </div>
  );
}
