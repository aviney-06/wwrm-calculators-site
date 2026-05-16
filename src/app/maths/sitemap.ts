import type { MetadataRoute } from "next";
import { MATHS_CALCULATOR_LINKS } from "@/data/calculatorCategoryLinks";
 
export default function sitemap(): MetadataRoute.Sitemap {

    const mathsCalculators = MATHS_CALCULATOR_LINKS.map((link) => ({
      url: `https://www.all1calculators.com${link.href}`,
    //   lastModified: new Date(),
    //   changeFrequency: "yearly",
    //   priority: 0.8,
    }));

    const sitemap = [
      {
        url: "https://www.all1calculators.com/maths",
        // lastModified: new Date(),
        // changeFrequency: "yearly",
        // priority: 0.8,
      },
      ...mathsCalculators,
    ];

    return sitemap as MetadataRoute.Sitemap;
}