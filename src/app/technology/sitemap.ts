import type { MetadataRoute } from "next";
import { TECHNOLOGY_CALCULATOR_LINKS } from "@/data/calculatorCategoryLinks";

export default function sitemap(): MetadataRoute.Sitemap {
  const technologyCalculators = TECHNOLOGY_CALCULATOR_LINKS.map((link) => ({
    url: `https://www.all1calculators.com${link.href}`,
  }));

  return [
    {
      url: "https://www.all1calculators.com/technology",
    },
    ...technologyCalculators,
  ] as MetadataRoute.Sitemap;
}
