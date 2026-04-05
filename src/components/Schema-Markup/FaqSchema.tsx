import { JsonLd, type JsonLdObject } from "@/components/Schema-Markup/JsonLd";

export type FaqItem = {
  question: string;
  answer: string;
};

// Builds an FAQPage object for JSON-LD (Schema.org).
export function buildFaqPageSchema(items: FaqItem[]): JsonLdObject {
  const mainEntity = items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}

type FaqSchemaProps = {
  items: FaqItem[];
};

// Renders FAQ JSON-LD via JsonLd. Use in Server or Client Components.
export function FaqSchema({ items }: FaqSchemaProps) {
  if (items.length === 0) return null;
  return <JsonLd data={buildFaqPageSchema(items)} />;
}
