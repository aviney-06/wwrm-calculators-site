import type { MetadataRoute } from "next";
import { OTHER_CALCULATOR_LINKS } from "@/data/calculatorCategoryLinks";

export default function sitemap(): MetadataRoute.Sitemap {
  const otherCalculators = OTHER_CALCULATOR_LINKS.map((link) => ({
    url: `https://www.all1calculators.com${link.href}`,
  }));

  return [
    {
      url: "https://www.all1calculators.com/other",
    },
    ...otherCalculators,
  ] as MetadataRoute.Sitemap;
}
