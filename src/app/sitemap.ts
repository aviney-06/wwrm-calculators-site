import type { MetadataRoute } from "next";
import healthFitnessSitemap from "@/app/health-fitness/sitemap";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://www.wwrm.com",
            // lastModified: new Date(),
            // changeFrequency: "yearly",
            // priority: 1,
        },
        ...healthFitnessSitemap(),
    ];
}