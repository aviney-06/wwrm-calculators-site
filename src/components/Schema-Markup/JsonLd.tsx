// Generic JSON-LD renderer. Use for any Schema.org (or other) structured data.
// Pass one object or many — each object gets its own <script type="application/ld+json"> tag.
// (Implemented as JsonLd.tsx instead of JSON-LD.tsx to avoid path casing issues on macOS/Windows.)
export type JsonLdObject = Record<string, unknown>;

type JsonLdProps = {
  data: JsonLdObject | JsonLdObject[];
};

export function JsonLd({ data }: JsonLdProps) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}
