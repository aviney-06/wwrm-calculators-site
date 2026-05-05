import { cache } from "react";
import {
  mapCmsSectionsToDynamicSections,
  type CalculatorDynamicSection,
} from "@/components/Health-Fitness/shared/CalculatorDynamicSections";
import type { CmsSection, RichTextNode } from "@/types/calculator-cms";

type StrapiCalculatorAttributes = {
  title?: string;
  subTitle?: RichTextNode[];
  metaTitle?: string;
  metaDescription?: string;
  sections?: CmsSection[];
};

type StrapiResponse = {
  data?: Array<{
    id: number;
    title?: string;
    subTitle?: RichTextNode[];
    metaTitle?: string;
    metaDescription?: string;
    sections?: CmsSection[];
    attributes?: StrapiCalculatorAttributes;
  }>;
};

export type CalculatorPageContent = {
  title: string;
  description: string;
  dynamicSections: CalculatorDynamicSection[];
  metaTitle?: string;
  metaDescription?: string;
};

function normalizeStrapiBaseUrl(rawUrl: string): string {
  const parsed = new URL(rawUrl);
  parsed.pathname = parsed.pathname.replace(/\/admin\/?$/, "");
  return parsed.toString().replace(/\/$/, "");
}

function textFromRichTextNodes(nodes?: RichTextNode[]): string {
  if (!Array.isArray(nodes)) return "";

  const isTextNode = (node: RichTextNode): node is RichTextNode & { text?: string } =>
    node.type === "text";

  const flatten = (node: RichTextNode): string => {
    if (isTextNode(node)) {
      return typeof node.text === "string" ? node.text : "";
    }
    const children = "children" in node && Array.isArray(node.children) ? node.children : [];
    return children.map(flatten).join(" ");
  };

  return nodes
    .map(flatten)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * SSG by default (`false` = cache forever until redeploy).
 * Set `STRAPI_REVALIDATE_SECONDS` to a positive integer for ISR (e.g. `3600`).
 */
function strapiFetchRevalidate(): false | number {
  const raw = process.env.STRAPI_REVALIDATE_SECONDS?.trim();
  if (!raw || raw === "false" || raw === "0") {
    return false;
  }
  const sec = Number.parseInt(raw, 10);
  if (Number.isFinite(sec) && sec > 0) {
    return sec;
  }
  return false;
}

async function fetchCalculatorPageContentBySlug(
  slug: string,
): Promise<CalculatorPageContent | null> {
  const strapiUrl = process.env.STRAPI_URL;
  const strapiToken = process.env.STRAPI_TOKEN;
  if (!strapiUrl || !strapiToken) return null;

  const baseUrl = normalizeStrapiBaseUrl(strapiUrl);
  const endpoint = new URL("/api/calculators", baseUrl);
  endpoint.searchParams.set("filters[slug][$eq]", slug);
  endpoint.searchParams.set("populate[sections][populate]", "*");

  const revalidate = strapiFetchRevalidate();
  const response = await fetch(endpoint.toString(), {
    headers: {
      Authorization: `Bearer ${strapiToken}`,
    },
    next: { revalidate },
  });

  if (!response.ok) return null;

  const json = (await response.json()) as StrapiResponse;
  const first = json.data?.[0];
  if (!first) return null;
  // Strapi v4 returns fields in attributes; v5 returns them directly on each data item.
  const attrs: StrapiCalculatorAttributes = first.attributes ?? first;

  return {
    title: attrs.title ?? "",
    description: textFromRichTextNodes(attrs.subTitle),
    dynamicSections: mapCmsSectionsToDynamicSections(attrs.sections),
    metaTitle: attrs.metaTitle,
    metaDescription: attrs.metaDescription,
  };
}

/** Per-request dedupe: safe to call from both `generateMetadata` and a server layout. */
export const getCalculatorPageContentBySlug = cache(fetchCalculatorPageContentBySlug);
