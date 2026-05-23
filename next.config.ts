import type { NextConfig } from "next";

type RemotePattern = NonNullable<
  NonNullable<NextConfig["images"]>["remotePatterns"]
>[number];

function strapiHostPattern(): RemotePattern | null {
  const raw = process.env.STRAPI_URL?.trim();
  if (!raw) return null;
  try {
    const u = new URL(raw);
    const protocol = u.protocol === "http:" ? "http" : "https";
    return {
      protocol,
      hostname: u.hostname,
      pathname: "/**",
    };
  } catch {
    return null;
  }
}

/**
 * Optional: comma-separated hostnames for Strapi media/CDN not covered by STRAPI_URL
 * (e.g. `cdn.example.com,xyz.cloudfront.net`).
 */
function extraImageHosts(): RemotePattern[] {
  const raw = process.env.NEXT_IMAGE_ALLOW_HOSTS?.trim();
  if (!raw) return [];
  return raw
    .split(",")
    .map((h) => h.trim())
    .filter(Boolean)
    .map((hostname) => ({
      protocol: "https" as const,
      hostname,
      pathname: "/**",
    }));
}

const remotePatterns: RemotePattern[] = [
  {
    protocol: "https",
    hostname: "images.unsplash.com",
    pathname: "/**",
  },
];

const strapiPattern = strapiHostPattern();
if (strapiPattern) {
  remotePatterns.push(strapiPattern);
}
remotePatterns.push(...extraImageHosts());

const financeLegacyRedirects = [
  ["mortgage", "mortgage-calculator"],
  ["loan", "loan-calculator"],
  ["auto-loan", "auto-loan-calculator"],
  ["inflation", "inflation-calculator"],
  ["general", "finance-calculator"],
  ["income-tax", "income-tax-calculator"],
  ["interest", "interest-calculator"],
  ["payment", "payment-calculator"],
  ["retirement", "retirement-calculator"],
  ["amortization", "amortization-calculator"],
  ["investment", "investment-calculator"],
  ["compound-interest", "compound-interest-calculator"],
  ["salary", "salary-calculator"],
  ["interest-rate", "interest-rate-calculator"],
  ["sales-tax", "sales-tax-calculator"],
].map(([from, to]) => ({
  source: `/finance/${from}`,
  destination: `/finance/${to}`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns,
    formats: ["image/avif", "image/webp"],
  },
  redirects: async () => financeLegacyRedirects,
};

export default nextConfig;
