import type { Metadata } from "next";

export const SITE_NAME = "AllOneCalculators";

export type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

// Shared Next.js Metadata for static pages: full title, description, canonical URL, Open Graph, and Twitter card.
export function buildPageMetadata({
  title,
  description,
  path,
}: BuildPageMetadataInput): Metadata {
  const origin = (
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ).replace(/\/$/, "");
  const normalized =
    path === "/" || path === ""
      ? "/"
      : path.startsWith("/")
        ? path
        : `/${path}`;
  const canonical =
    normalized === "/" ? origin : `${origin}${normalized}`;

  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
