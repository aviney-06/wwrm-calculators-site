import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { getCalculatorPageContentBySlug } from "@/lib/strapiCalculators";

export type CalculatorPageSeoInput = {
  path: string;
  /** When Strapi `slug` differs from the last segment of `path`. */
  cmsSlug?: string;
  fallbackTitle: string;
  fallbackDescription: string;
};

/**
 * Strapi-backed title/description for calculator routes (shared with {@link getCalculatorPageContentBySlug} via React `cache`).
 */
export async function generateCalculatorPageMetadata({
  path,
  cmsSlug,
  fallbackTitle,
  fallbackDescription,
}: CalculatorPageSeoInput): Promise<Metadata> {
  const slug =
    cmsSlug?.trim() ||
    path
      .split("/")
      .filter(Boolean)
      .at(-1) ||
    "";
  const pageContent = slug ? await getCalculatorPageContentBySlug(slug) : null;

  return buildPageMetadata({
    title: pageContent?.metaTitle || pageContent?.title || fallbackTitle,
    description:
      pageContent?.metaDescription || pageContent?.description || fallbackDescription,
    path,
  });
}
