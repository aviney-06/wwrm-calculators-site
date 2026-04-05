import { JsonLd, type JsonLdObject } from "@/components/Schema-Markup/JsonLd";

export type BreadcrumbSchemaItem = {
  name: string;
  href?: string;
};

type BuildOptions = {
  baseUrl: string;
};

// Builds a BreadcrumbList object for JSON-LD (Schema.org).
export function buildBreadcrumbListSchema(
  items: BreadcrumbSchemaItem[],
  { baseUrl }: BuildOptions,
): JsonLdObject {
  const origin = baseUrl.replace(/\/$/, "");

  const itemListElement = items.map((crumb, i) => {
    const position = i + 1;
    const entry: Record<string, unknown> = {
      "@type": "ListItem",
      position,
      name: crumb.name,
    };

    if (crumb.href !== undefined && crumb.href !== "") {
      const item =
        crumb.href.startsWith("http://") || crumb.href.startsWith("https://")
          ? crumb.href
          : `${origin}${crumb.href.startsWith("/") ? crumb.href : `/${crumb.href}`}`;
      entry.item = item;
    }

    return entry;
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

type BreadcrumbSchemaProps = BuildOptions & {
  items: BreadcrumbSchemaItem[];
};

// Renders breadcrumb JSON-LD via JsonLd. Use in Server or Client Components.
export function BreadcrumbSchema({ items, baseUrl }: BreadcrumbSchemaProps) {
  return (
    <JsonLd data={buildBreadcrumbListSchema(items, { baseUrl })} />
  );
}
