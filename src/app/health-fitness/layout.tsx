import type { ReactNode } from "react";

/**
 * Strapi-backed calculator pages are statically generated (SSG) at build time.
 * Optional ISR: set `STRAPI_REVALIDATE_SECONDS` to a positive number (seconds).
 */
export const dynamic = "force-static";

export default function HealthFitnessLayout({ children }: { children: ReactNode }) {
  return children;
}
