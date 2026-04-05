/** Get the site URL from the environment variable or the default site origin. */
export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "https://www.all1calculators.com"
  ).replace(/\/$/, "");
}
