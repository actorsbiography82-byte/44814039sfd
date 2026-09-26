import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/portfolioData";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteConfig.url;

  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-09-19T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
