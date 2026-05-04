import {
  CONTACT_EMAIL,
  OG_IMAGE_PATH,
  RINGDESK_PHONE,
  SITE_URL,
} from "@/lib/constants";
import { faqs } from "@/lib/faq";
import type { FAQ } from "@/lib/trades";

const BUSINESS_ID = `${SITE_URL}/#business`;

const localBusiness = {
  "@type": "LocalBusiness",
  "@id": BUSINESS_ID,
  name: "RingDesk",
  description:
    "AI receptionist service for small businesses, especially trades, in Northern Colorado.",
  url: SITE_URL,
  telephone: RINGDESK_PHONE,
  email: CONTACT_EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Castle Pines",
    addressRegion: "CO",
    postalCode: "80108",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Berthoud" },
    { "@type": "City", name: "Loveland" },
    { "@type": "City", name: "Fort Collins" },
    { "@type": "City", name: "Greeley" },
    { "@type": "City", name: "Longmont" },
    { "@type": "City", name: "Johnstown" },
    { "@type": "City", name: "Windsor" },
    { "@type": "State", name: "Colorado" },
  ],
  priceRange: "$249-$499",
  image: `${SITE_URL}${OG_IMAGE_PATH}`,
  logo: `${SITE_URL}/ringdesk-logo.png`,
  sameAs: [],
};

function service({
  id,
  name,
  description,
  price,
}: {
  id: string;
  name: string;
  description: string;
  price: string;
}) {
  return {
    "@type": "Service",
    "@id": `${SITE_URL}/#${id}`,
    name,
    description,
    provider: { "@id": BUSINESS_ID },
    areaServed: "Northern Colorado",
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price,
        priceCurrency: "USD",
        billingIncrement: 1,
        unitCode: "MON",
      },
    },
  };
}

const standardService = service({
  id: "service-standard",
  name: "RingDesk Standard",
  description:
    "Fully managed AI receptionist with daily call summaries and monthly tuning reviews.",
  price: "249",
});

const premiumService = service({
  id: "service-premium",
  name: "RingDesk Premium",
  description:
    "Premium managed AI receptionist with weekly tuning sessions, priority response, and custom workflows.",
  price: "499",
});

export function buildFaqPageSchema(items: FAQ[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Sitewide @graph rendered from the root layout. Intentionally does NOT
// include FAQPage — Google's guidance is that FAQPage should only appear
// on pages where the FAQ is actually rendered, so each page that shows
// FAQs (homepage, trade pages) injects its own FAQPage separately.
export const SITE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [localBusiness, standardService, premiumService],
};

export const HOME_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [buildFaqPageSchema(faqs)],
};

export function buildTradePageSchema(items: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [buildFaqPageSchema(items)],
  };
}

// `url` is optional so intermediate breadcrumbs without a real index
// page (e.g. "Locations" between Home and a city slug) can still appear
// in the trail by name only — schema.org allows this and Google parses it.
export type BreadcrumbItem = { name: string; url?: string };

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const entry: {
        "@type": "ListItem";
        position: number;
        name: string;
        item?: string;
      } = {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
      };
      if (item.url) entry.item = item.url;
      return entry;
    }),
  };
}

// Combo-page Service entity — narrow Service @id'd to the trade+city pair so
// it doesn't collide with the generic Standard/Premium services emitted from
// the layout. Used on /for/[trade]/[city].
export function buildComboServiceSchema({
  tradeSlug,
  citySlug,
  tradeName,
  cityName,
  url,
}: {
  tradeSlug: string;
  citySlug: string;
  tradeName: string;
  cityName: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/#service-${tradeSlug}-${citySlug}`,
    name: `AI Receptionist for ${tradeName} in ${cityName}, CO`,
    description: `Done-for-you AI receptionist tuned for ${tradeName.toLowerCase()} in ${cityName}, Colorado. Answers every call, qualifies leads, books appointments, and texts urgent jobs to your phone.`,
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "City", name: cityName },
    url,
    offers: {
      "@type": "Offer",
      price: "249",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "249",
        priceCurrency: "USD",
        billingIncrement: 1,
        unitCode: "MON",
      },
    },
  };
}

export function buildLocationBusinessSchema({
  slug,
  city,
  url,
}: {
  slug: string;
  city: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#business-${slug}`,
        name: `RingDesk — ${city}`,
        description: `AI receptionist service for trades businesses in ${city}, Colorado.`,
        url,
        telephone: RINGDESK_PHONE,
        email: CONTACT_EMAIL,
        address: {
          "@type": "PostalAddress",
          addressLocality: city,
          addressRegion: "CO",
          addressCountry: "US",
        },
        areaServed: { "@type": "City", name: city },
        priceRange: "$249-$499",
        image: `${SITE_URL}${OG_IMAGE_PATH}`,
        logo: `${SITE_URL}/ringdesk-logo.png`,
        parentOrganization: { "@id": BUSINESS_ID },
      },
    ],
  };
}
