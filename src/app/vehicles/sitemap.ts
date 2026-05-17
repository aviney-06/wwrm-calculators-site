import type { MetadataRoute } from "next";
import { VEHICLES_CALCULATOR_LINKS } from "@/data/calculatorCategoryLinks";

export default function sitemap(): MetadataRoute.Sitemap {
  const vehicleCalculators = VEHICLES_CALCULATOR_LINKS.map((link) => ({
    url: `https://www.all1calculators.com${link.href}`,
  }));

  return [
    {
      url: "https://www.all1calculators.com/vehicles",
    },
    ...vehicleCalculators,
  ] as MetadataRoute.Sitemap;
}
