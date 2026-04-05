import { JsonLd, type JsonLdObject } from "@/components/Schema-Markup/JsonLd";

/** Publisher node for {@code WebPage.publisher} (e.g. college, org, brand). */
export type WebPagePublisher = {
  "@type": "CollegeOrUniversity" | "Organization" | "Person" | string;
  name: string;
};

export type WebPageSchemaInput = {
  /** Page title / headline for structured data. */
  name: string;
  description?: string;
  publisher?: WebPagePublisher;
  /** License URL, e.g. Creative Commons deed. */
  license?: string;
};

/** Builds a {@code WebPage} object for JSON-LD (Schema.org). */
export function buildWebPageSchema(input: WebPageSchemaInput): JsonLdObject {
  const out: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
  };

  if (input.description !== undefined && input.description !== "") {
    out.description = input.description;
  }
  if (input.publisher !== undefined) {
    out.publisher = input.publisher;
  }
  if (input.license !== undefined && input.license !== "") {
    out.license = input.license;
  }

  return out;
}

type PageSchemaProps = {
  page: WebPageSchemaInput;
};

/** Renders WebPage JSON-LD via {@link JsonLd}. Use in Server or Client Components. */
export function PageSchema({ page }: PageSchemaProps) {
  if (!page.name?.trim()) return null;
  return <JsonLd data={buildWebPageSchema(page)} />;
}
