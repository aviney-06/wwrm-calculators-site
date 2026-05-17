import type { MetadataRoute } from "next";
import healthFitnessSitemap from "@/app/health-fitness/sitemap";
import mathsSitemap from "@/app/maths/sitemap";
import technologySitemap from "@/app/technology/sitemap";
import conversionSitemap from "@/app/conversion/sitemap";
import vehiclesSitemap from "@/app/vehicles/sitemap";
import educationSitemap from "@/app/education/sitemap";
import otherSitemap from "@/app/other/sitemap";

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
        ...technologySitemap(),
        ...conversionSitemap(),
        ...vehiclesSitemap(),
        ...educationSitemap(),
        ...otherSitemap(),
    ];
}