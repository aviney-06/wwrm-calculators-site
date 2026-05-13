import type { MetadataRoute } from "next";
import { HEALTH_FITNESS_CALCULATOR_LINKS } from "@/data/calculatorCategoryLinks";
 
export default function sitemap(): MetadataRoute.Sitemap {

    const healthFitnessCalculators = HEALTH_FITNESS_CALCULATOR_LINKS.map((link) => ({
      url: `https://www.all1calculators.com${link.href}`,
    //   lastModified: new Date(),
    //   changeFrequency: "yearly",
    //   priority: 0.8,
    }));

    const sitemap = [
      {
        url: "https://www.all1calculators.com/health-fitness",
        // lastModified: new Date(),
        // changeFrequency: "yearly",
        // priority: 0.8,
      },
      ...healthFitnessCalculators,
    ];

    return sitemap as MetadataRoute.Sitemap;
}