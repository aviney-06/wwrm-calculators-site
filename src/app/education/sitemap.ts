import type { MetadataRoute } from "next";
import { EDUCATION_CALCULATOR_LINKS } from "@/data/calculatorCategoryLinks";

export default function sitemap(): MetadataRoute.Sitemap {
  const educationCalculators = EDUCATION_CALCULATOR_LINKS.map((link) => ({
    url: `https://www.all1calculators.com${link.href}`,
  }));

  return [
    {
      url: "https://www.all1calculators.com/education",
    },
    ...educationCalculators,
  ] as MetadataRoute.Sitemap;
}
