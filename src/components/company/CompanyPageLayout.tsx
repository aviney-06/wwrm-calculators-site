import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/globals/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/Schema-Markup/BreadcrumbSchema";

type Props = {
  path: string;
  title: string;
  description?: string;
  breadcrumbLabel: string;
  children: ReactNode;
};

export function CompanyPageLayout({
  path,
  title,
  description,
  breadcrumbLabel,
  children,
}: Props) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return (
    <div className="w-full min-w-0">
      <BreadcrumbSchema
        baseUrl={baseUrl}
        items={[
          { name: "Home", href: "/" },
          { name: title, href: path },
        ]}
      />
      <Breadcrumbs
        className="mb-3 max-md:mb-2 md:mb-5"
        items={[
          { label: "home", href: "/" },
          { label: breadcrumbLabel },
        ]}
      />
      <header className="mb-6 md:mb-8">
        <h1 className="text-[1.4rem] font-bold leading-tight tracking-tight text-[#1e293b] sm:text-[1.75rem] md:text-[2rem]">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-[0.85rem] leading-snug text-[#64748b] sm:mt-3 sm:text-[0.95rem] sm:leading-relaxed">
            {description}
          </p>
        ) : null}
      </header>
      <div className="max-w-2xl space-y-4 text-[15px] leading-relaxed text-[#334155] [&_a]:font-medium [&_a]:text-[#2374ac] [&_a]:underline-offset-2 [&_a]:hover:underline [&_h2]:mb-2 [&_h2]:mt-8 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-[#1e293b] [&_h2]:first:mt-0 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
        {children}
      </div>
    </div>
  );
}
