import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/constants";
import { LOCATION_SLUGS } from "@/lib/locations";
import { TRADE_SLUGS } from "@/lib/trades";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const tradeRoutes: MetadataRoute.Sitemap = TRADE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/for/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const locationRoutes: MetadataRoute.Sitemap = LOCATION_SLUGS.map(
    (slug) => ({
      url: `${SITE_URL}/locations/${slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    ...tradeRoutes,
    ...locationRoutes,
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
