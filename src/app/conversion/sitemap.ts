import type { MetadataRoute } from "next";
import { CONVERSION_CALCULATOR_LINKS } from "@/data/conversionCalculators";

export default function sitemap(): MetadataRoute.Sitemap {
  const conversionCalculators = CONVERSION_CALCULATOR_LINKS.map((link) => ({
    url: `https://www.all1calculators.com${link.href}`,
  }));

  return [
    {
      url: "https://www.all1calculators.com/conversion",
    },
    ...conversionCalculators,
  ] as MetadataRoute.Sitemap;
}
