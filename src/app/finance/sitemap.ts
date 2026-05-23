import type { MetadataRoute } from "next";
import { FINANCE_CALCULATOR_LINKS } from "@/data/calculatorCategoryLinks";

export default function sitemap(): MetadataRoute.Sitemap {
  const financeCalculators = FINANCE_CALCULATOR_LINKS.map((link) => ({
    url: `https://www.all1calculators.com${link.href}`,
  }));

  return [
    {
      url: "https://www.all1calculators.com/finance",
    },
    ...financeCalculators,
  ] as MetadataRoute.Sitemap;
}
