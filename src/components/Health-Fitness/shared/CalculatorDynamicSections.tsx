import type { ReactNode } from "react";
import Image from "next/image";
import type {
  CmsRichField,
  CmsSection,
  RichTextElementNode,
  RichTextNode,
  RichTextTextNode,
} from "@/types/calculator-cms";

export type { RichTextNode } from "@/types/calculator-cms";

export type CalculatorContentElement =
  | { type: "richtext"; blocks: RichTextNode[] }
  | { type: "html"; html: string }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
    }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
    }
  | {
      type: "box";
      title?: string;
      headingLevel?: 2 | 3 | 4 | 5 | 6;
      content: CalculatorContentElement[];
    };

export type CalculatorDynamicSection = {
  id?: string | number;
  icon?: ReactNode;
  title: string;
  elements: CalculatorContentElement[];
};

function isTextNode(node: RichTextNode): node is RichTextTextNode {
  return node.type === "text";
}

function getChildren(node: RichTextNode): RichTextNode[] {
  return "children" in node && Array.isArray(node.children) ? node.children : [];
}

function textFromNode(node: RichTextNode): string {
  if (isTextNode(node)) return node.text ?? "";
  return getChildren(node).map(textFromNode).join("");
}

function textFromBlocks(blocks?: RichTextNode[]): string {
  if (!Array.isArray(blocks)) return "";
  return blocks.map(textFromNode).join(" ").trim();
}

function headingLevelFromBlocks(blocks?: RichTextNode[]): 2 | 3 | 4 | 5 | 6 | undefined {
  if (!Array.isArray(blocks)) return undefined;
  const headingNode = blocks.find(
    (node): node is RichTextElementNode => node.type === "heading",
  );
  if (!headingNode) return undefined;
  const level = Number(headingNode.level ?? 3);
  if (!Number.isFinite(level)) return undefined;
  const safeLevel = Math.max(2, Math.min(6, Math.trunc(level))) as 2 | 3 | 4 | 5 | 6;
  return safeLevel;
}

function markText(node: RichTextTextNode, key: string): ReactNode {
  let out: ReactNode = node.text ?? "";
  if (node.code) out = <code className="rounded bg-[#eef2f7] px-1">{out}</code>;
  if (node.bold) out = <strong>{out}</strong>;
  if (node.italic) out = <em>{out}</em>;
  if (node.underline) out = <u>{out}</u>;
  if (node.strikethrough) out = <s>{out}</s>;
  return <span key={key}>{out}</span>;
}

function renderInline(nodes?: RichTextNode[], keyPrefix = "inline"): ReactNode {
  if (!Array.isArray(nodes)) return null;
  return nodes.map((node, idx) => {
    const key = `${keyPrefix}-${idx}`;
    if (isTextNode(node)) return markText(node, key);

    if (node.type === "link") {
      return (
        <a
          key={key}
          href={typeof node.url === "string" ? node.url : "#"}
          className="text-[#2374ac] underline decoration-[#2374ac]/40 underline-offset-2 hover:decoration-[#2374ac]"
        >
          {renderInline(getChildren(node), `${key}-children`)}
        </a>
      );
    }

    return <span key={key}>{renderInline(getChildren(node), `${key}-children`)}</span>;
  });
}

function renderList(node: RichTextElementNode, key: string) {
  const isOrdered = node.format === "ordered";
  const Tag = isOrdered ? "ol" : "ul";
  const children = getChildren(node);

  return (
    <Tag
      key={key}
      className={`pl-6 text-[1.1rem] text-[#1f2937] ${isOrdered ? "list-decimal" : "list-disc"}`}
    >
      {children.map((child, idx) => (
        <li key={`${key}-item-${idx}`} className="leading-relaxed">
          {renderInline(getChildren(child), `${key}-item-inline-${idx}`)}
        </li>
      ))}
    </Tag>
  );
}

function renderBlockNode(node: RichTextNode, key: string): ReactNode {
  if (isTextNode(node)) return <p key={key}>{markText(node, key)}</p>;

  const type = node.type ?? "paragraph";
  if (type === "paragraph") {
    return (
      <p key={key} className="text-[1.1rem] leading-relaxed text-[#1f2937]">
        {renderInline(getChildren(node), `${key}-inline`)}
      </p>
    );
  }

  if (type === "heading") {
    const level = Math.max(1, Math.min(6, Number(node.level ?? 2)));
    const className =
      level <= 2
        ? "text-[2rem] font-bold leading-tight text-[#419c2f]"
        : "text-[1.35rem] font-semibold leading-snug text-[#2c7f1f]";
    const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    return (
      <Tag key={key} className={className}>
        {renderInline(getChildren(node), `${key}-inline`)}
      </Tag>
    );
  }

  if (type === "list") return renderList(node, key);

  if (type === "quote") {
    return (
      <blockquote
        key={key}
        className="border-l-4 border-[#9ecf8f] pl-4 text-[1.05rem] italic text-[#334155]"
      >
        {renderInline(getChildren(node), `${key}-inline`)}
      </blockquote>
    );
  }

  if (type === "code") {
    return (
      <pre key={key} className="overflow-x-auto rounded-md bg-[#0f172a] p-4 text-[#e2e8f0]">
        <code>{textFromNode(node)}</code>
      </pre>
    );
  }

  return (
    <div key={key} className="text-[1.1rem] text-[#1f2937]">
      {renderInline(getChildren(node), `${key}-inline`)}
    </div>
  );
}

function RichTextRenderer({ blocks }: { blocks: RichTextNode[] }) {
  return <div className="space-y-4">{blocks.map((b, i) => renderBlockNode(b, `block-${i}`))}</div>;
}

/** Tailwind styles applied to TipTap-authored HTML rendered via dangerouslySetInnerHTML. */
const HTML_PROSE_CLASS = [
  "space-y-4 text-[1.1rem] leading-relaxed text-[#1f2937]",
  "[&_p]:leading-relaxed [&_p]:text-[#1f2937]",
  "[&_strong]:font-semibold [&_em]:italic",
  "[&_a]:text-[#2374ac] [&_a]:underline [&_a]:decoration-[#2374ac]/40 [&_a]:underline-offset-2 hover:[&_a]:decoration-[#2374ac]",
  "[&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_li]:leading-relaxed",
  "[&_h2]:text-[1.6rem] [&_h2]:font-bold [&_h2]:leading-snug [&_h2]:text-[#419c2f]",
  "[&_h3]:text-[1.3rem] [&_h3]:font-semibold [&_h3]:leading-snug [&_h3]:text-[#2c7f1f]",
  "[&_h4]:text-[1.15rem] [&_h4]:font-semibold [&_h4]:text-[#1f2937]",
  "[&_blockquote]:border-l-4 [&_blockquote]:border-[#9ecf8f] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#334155]",
  "[&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_table]:border-collapse [&_table]:text-left",
  "[&_th]:border [&_th]:border-[#c8ced8] [&_th]:bg-[#2374ac] [&_th]:px-4 [&_th]:py-2 [&_th]:text-center [&_th]:font-medium [&_th]:text-white",
  "[&_td]:border [&_td]:border-[#d7dee8] [&_td]:px-4 [&_td]:py-2 [&_td]:text-center [&_td]:text-[#1f2937]",
  "[&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-[#0f172a] [&_pre]:p-4 [&_pre]:text-[#e2e8f0]",
  "[&_code]:rounded [&_code]:bg-[#eef2f7] [&_code]:px-1",
].join(" ");

/** Plain text from a heading field, accepting either an HTML/plain string or Blocks. */
function headingToText(value?: CmsRichField): string {
  if (typeof value === "string") {
    return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  }
  return textFromBlocks(value);
}

/** Turn a rich field (HTML string or Blocks array) into a renderable element. */
function richFieldToElement(value?: CmsRichField): CalculatorContentElement | null {
  if (typeof value === "string") {
    const html = value.trim();
    return html ? { type: "html", html } : null;
  }
  if (Array.isArray(value) && value.length > 0) {
    return { type: "richtext", blocks: value };
  }
  return null;
}

type BoxHeadingLevel = 2 | 3 | 4 | 5 | 6;

function BoxSectionHeading({
  title,
  headingLevel,
}: {
  title: string;
  headingLevel?: BoxHeadingLevel;
}) {
  const level = headingLevel ?? 4;
  const Tag = `h${level}` as "h2" | "h3" | "h4" | "h5" | "h6";
  return (
    <Tag className="mb-3 text-[1.1rem] font-semibold leading-snug text-[#1f2937] sm:text-[1.15rem]">
      {title}
    </Tag>
  );
}

function renderElement(element: CalculatorContentElement, key: string): ReactNode {
  if (element.type === "richtext") {
    return <RichTextRenderer key={key} blocks={element.blocks} />;
  }

  if (element.type === "html") {
    return (
      <div
        key={key}
        className={HTML_PROSE_CLASS}
        dangerouslySetInnerHTML={{ __html: element.html }}
      />
    );
  }

  if (element.type === "table") {
    return (
      <div key={key} className="overflow-x-auto rounded border border-[#d6d9de] bg-[#f8fafc]">
        <table className="w-full min-w-[22rem] border-collapse text-left">
          <thead className="bg-[#2374ac] text-white">
            <tr>
              {element.headers.map((header, idx) => (
                <th key={`${key}-head-${idx}`} className="border border-[#c8ced8] px-4 py-2 text-center text-[1rem] font-medium">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {element.rows.map((row, rowIdx) => (
              <tr key={`${key}-row-${rowIdx}`} className={rowIdx % 2 === 0 ? "bg-[#f8fafc]" : "bg-[#edf1f6]"}>
                {row.map((cell, cellIdx) => (
                  <td key={`${key}-cell-${rowIdx}-${cellIdx}`} className="border border-[#d7dee8] px-4 py-2 text-center text-[1rem] text-[#1f2937]">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (element.type === "image") {
    return (
      <figure key={key} className="flex flex-col items-center gap-2">
        <Image
          src={element.src}
          alt={element.alt}
          width={800}
          height={533}
          sizes="(max-width: 640px) 100vw, 26rem"
          className="h-auto max-h-[22rem] w-full max-w-[26rem] object-contain"
        />
        {element.caption ? (
          <figcaption className="text-center text-[0.95rem] text-[#64748b]">
            {element.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <div key={key} className="rounded border border-[#d6d9de] bg-[#f8fafc] p-4">
      {element.title ? (
        <BoxSectionHeading title={element.title} headingLevel={element.headingLevel} />
      ) : null}
      <div className="space-y-4">
        {element.content.map((nested, idx) => renderElement(nested, `${key}-nested-${idx}`))}
      </div>
    </div>
  );
}

export function mapCmsSectionsToDynamicSections(
  sections: CmsSection[] | undefined,
): CalculatorDynamicSection[] {
  if (!Array.isArray(sections)) return [];

  return sections.map((section, idx) => {
    const sectionElements: CalculatorContentElement[] = [];
    const contentElement = richFieldToElement(section.content);
    if (contentElement) {
      sectionElements.push(contentElement);
    }

    if (Array.isArray(section.subSection)) {
      for (const sub of section.subSection) {
        const title = headingToText(sub.heading);
        const subContent = richFieldToElement(sub.content);
        sectionElements.push({
          type: "box",
          title: title || undefined,
          // A subSection is an H3 in the H1->H2->H3 hierarchy. Plain-string headings
          // carry no level, so default to 3 (legacy Blocks may specify otherwise).
          headingLevel: (Array.isArray(sub.heading)
            ? headingLevelFromBlocks(sub.heading)
            : undefined) ?? 3,
          content: subContent ? [subContent] : [],
        });
      }
    }

    return {
      id: section.id ?? idx,
      title: headingToText(section.heading) || `Section ${idx + 1}`,
      elements: sectionElements,
    };
  });
}

export function CalculatorDynamicSections({
  sections,
}: {
  sections: CalculatorDynamicSection[];
}) {
  if (sections.length === 0) return null;

  return (
    <section className="mt-10 space-y-5 md:mt-12 md:space-y-6">
      {sections.map((section, idx) => (
        <article
          key={section.id ?? idx}
          className="mt-8 md:mt-14"
        >
          <h2 className="mb-4 border-l-4 border-[#419c2f] pl-3 text-[1.25rem] font-bold leading-snug text-[#2f8f25] sm:text-[1.45rem] md:text-[1.7rem]">
            {section.icon ? (
              <span className="mr-2 inline-flex align-middle text-[1.05em] text-[#419c2f]">
                {section.icon}
              </span>
            ) : null}
            <span className="align-middle">{section.title}</span>
          </h2>
          <div className="space-y-4">
            {section.elements.map((element, elementIdx) =>
              renderElement(element, `${section.id ?? idx}-element-${elementIdx}`),
            )}
          </div>
        </article>
      ))}
    </section>
  );
}
