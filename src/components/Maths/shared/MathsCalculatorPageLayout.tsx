import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/globals/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/Schema-Markup/BreadcrumbSchema";
import { getSiteUrl } from "@/lib/siteUrl";

type Props = {
  path: string;
  title: string;
  description: string;
  breadcrumbLabel: string;
  children: ReactNode;
};

export function MathsCalculatorPageLayout({
  path,
  title,
  description,
  breadcrumbLabel,
  children,
}: Props) {
  const baseUrl = getSiteUrl();

  return (
    <div className="w-full min-w-0">
      <BreadcrumbSchema
        baseUrl={baseUrl}
        items={[
          { name: "Home", href: "/" },
          { name: "Maths calculator", href: "/maths" },
          { name: title, href: path },
        ]}
      />
      <Breadcrumbs
        className="mb-3 max-md:mb-2 md:mb-5"
        items={[
          { label: "home", href: "/" },
          { label: "maths calculator", href: "/maths" },
          { label: breadcrumbLabel },
        ]}
      />
      <header className="mb-4 md:mb-10">
        <h1 className="text-[1.4rem] font-bold leading-tight tracking-tight text-[#1e293b] sm:text-[1.75rem] md:text-[2rem]">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-[0.85rem] leading-snug text-[#64748b] sm:mt-3 sm:text-[0.95rem] sm:leading-relaxed">
          {description}
        </p>
      </header>
      {children}
    </div>
  );
}
