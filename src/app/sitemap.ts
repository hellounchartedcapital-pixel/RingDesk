import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/constants";
import { LOCATION_SLUGS } from "@/lib/locations";
import { ACTIVE_TRADE_SLUGS } from "@/lib/trades";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Iterate ACTIVE_TRADE_SLUGS, not TRADE_SLUGS — coming-soon stubs are
  // intentionally excluded from generateStaticParams in /for/[trade], so
  // listing them here would point search engines at routes that 404.
  const tradeRoutes: MetadataRoute.Sitemap = ACTIVE_TRADE_SLUGS.map(
    (slug) => ({
      url: `${SITE_URL}/for/${slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

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
