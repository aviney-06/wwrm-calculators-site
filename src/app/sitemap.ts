import type { MetadataRoute } from "next";
import healthFitnessSitemap from "@/app/health-fitness/sitemap";
import mathsSitemap from "@/app/maths/sitemap";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://www.all1calculators.com",
            // lastModified: new Date(),
            // changeFrequency: "yearly",
            // priority: 1,
        },
        ...healthFitnessSitemap(),
        ...mathsSitemap(),
    ];
}