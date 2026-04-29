import {
  CONTACT_EMAIL,
  OG_IMAGE_PATH,
  RINGDESK_PHONE,
  SITE_URL,
} from "@/lib/constants";
import { faqs } from "@/lib/faq";

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

const faqPage = {
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export const SITE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [localBusiness, standardService, premiumService, faqPage],
};
