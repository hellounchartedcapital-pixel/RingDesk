export type LocationFAQ = {
  question: string;
  answer: string;
};

export type LocationContent = {
  slug: string;
  displayName: string;
  fullName: string;
  region: string;
  population: string;
  nearbyAreas: string[];
  localContext: string;
  whyTradesHere: string;
  localKeywords: string[];
  testimonialPlaceholder: string;
  metaTitle: string;
  metaDescription: string;
  faqs: LocationFAQ[];
};

export const LOCATIONS: Record<string, LocationContent> = {
  loveland: {
    slug: "loveland",
    displayName: "Loveland",
    fullName: "Loveland, Colorado",
    region: "Northern Colorado",
    population: "Around 80,000",
    nearbyAreas: [
      "Berthoud",
      "Fort Collins",
      "Windsor",
      "Johnstown",
      "Greeley",
    ],
    localContext:
      "Loveland sits in the heart of Northern Colorado's growth corridor between Fort Collins and Longmont. The trades scene here is busy: rapid residential development, aging infrastructure in older neighborhoods, and a growing commercial sector along I-25. Local plumbers, HVAC contractors, and electricians often run lean operations where missing calls means losing jobs to competitors three exits up the highway.",
    whyTradesHere:
      "Loveland trades businesses face a specific challenge: customers expect responsive, local service, but most owners are in the field most of the day. By the time you check voicemail, the homeowner has already called the next contractor. RingDesk answers every call as you, qualifies the lead, and texts you the ones that need immediate attention — so you never lose a Loveland customer to a Fort Collins competitor again.",
    localKeywords: [
      "answering service Loveland",
      "phone answering service Loveland CO",
      "AI receptionist Loveland",
      "Loveland virtual receptionist",
      "missed call recovery Loveland",
    ],
    testimonialPlaceholder:
      "[Loveland-based pilot customer testimonial — coming soon. Want to be the first Loveland trades business featured here?]",
    metaTitle:
      "AI Receptionist for Loveland, CO Trades | RingDesk",
    metaDescription:
      "AI receptionist for Loveland, CO trades. A real person installs and tunes it. Answers 24/7, qualifies leads, texts you the urgent ones. $249/mo.",
    faqs: [
      {
        question: "What service area does RingDesk cover in Loveland?",
        answer:
          "RingDesk is configured to your specific service area. Most Loveland trades businesses we work with cover Loveland proper, Berthoud, Johnstown, Windsor, and parts of Fort Collins and Greeley. We set the service boundaries during your 48-hour setup so the AI quotes correctly and routes out-of-area callers to a polite callback.",
      },
      {
        question:
          "Why does a local AI receptionist matter for Loveland businesses specifically?",
        answer:
          "Two reasons. First, the AI is tuned to your service area — it knows the difference between a Loveland address and a Greeley one and quotes service correctly. Second, when the AI texts you a lead, it's instant — you find out about the no-heat emergency in Berthoud while it's still a $400 service call instead of an $8,000 emergency replacement.",
      },
      {
        question: "What types of Loveland businesses use RingDesk?",
        answer:
          "Today, most of our customers are plumbing and HVAC shops across Northern Colorado. We're built to work for any trades business with a heavy phone load — electricians, garage door, roofers, landscapers. If you're outside our usual focus, we'll tell you on the discovery call whether we're the right fit.",
      },
      {
        question:
          "How fast can RingDesk be live for a Loveland business?",
        answer:
          "48 hours from signup to live. We don't ask you to configure anything — we listen to your existing voicemails, learn your service area and pricing, build and tune the receptionist, and run test calls with you before launch.",
      },
    ],
  },
  "fort-collins": {
    slug: "fort-collins",
    displayName: "Fort Collins",
    fullName: "Fort Collins, Colorado",
    region: "Northern Colorado",
    population: "Around 175,000",
    nearbyAreas: [
      "Loveland",
      "Windsor",
      "Wellington",
      "Timnath",
      "Laporte",
    ],
    localContext:
      "Fort Collins is the largest city in Northern Colorado and home to Colorado State University. The trades scene reflects the mix: a steady stream of student rental turnover work, growing residential developments in the south and east, and an established commercial sector. Trades businesses serving Old Town, Midtown, and the surrounding HOAs juggle high call volume with tight schedules.",
    whyTradesHere:
      "Fort Collins trades businesses deal with serious call volume — student-housing churn, weather-driven HVAC spikes, and a homeowner base that uses Google reviews as a first filter. Missing calls doesn't just lose individual jobs; it tanks your review pipeline. RingDesk answers every call, qualifies the request, and gives you the daily call summary you need to maintain a five-star reputation in a competitive market.",
    localKeywords: [
      "answering service Fort Collins",
      "phone answering service Fort Collins CO",
      "AI receptionist Fort Collins",
      "Fort Collins virtual receptionist",
      "missed call recovery Fort Collins",
    ],
    testimonialPlaceholder:
      "[Fort Collins-based pilot customer testimonial — coming soon. Want to be the first Fort Collins trades business featured here?]",
    metaTitle:
      "AI Receptionist for Fort Collins, CO Trades | RingDesk",
    metaDescription:
      "AI receptionist for Fort Collins, CO trades. A real person installs and tunes it. Answers 24/7, qualifies leads, captures details. $249/mo.",
    faqs: [
      {
        question:
          "What service area does RingDesk cover in Fort Collins?",
        answer:
          "RingDesk configures to your specific service area. Most Fort Collins trades shops we work with cover Fort Collins proper, Timnath, Wellington, Laporte, and parts of Loveland and Windsor. We set those boundaries during your 48-hour setup so the AI quotes correctly for in-area callers and routes out-of-area calls to a clean callback.",
      },
      {
        question:
          "Why does a Fort Collins-specific AI receptionist matter?",
        answer:
          "Fort Collins has heavy demand and dense competition. The shops that grow are the ones that answer the phone every time. A receptionist tuned to Fort Collins — your service area, your pricing structure, your local trade language — converts more calls than a generic national service that doesn't know the difference between Old Town and Harmony Road.",
      },
      {
        question: "What types of Fort Collins businesses use RingDesk?",
        answer:
          "Today, most of our customers are plumbing and HVAC shops across Northern Colorado. We're built to work for any trades business with a heavy phone load — electricians, garage door, roofers, landscapers. If you're a Fort Collins trades business losing 5+ calls a week to voicemail, mention your industry on the discovery call and we'll tell you whether we can serve you well.",
      },
      {
        question:
          "How does RingDesk work with the seasonal call volume swings in Fort Collins?",
        answer:
          "Flat monthly pricing — $249/mo whether the AI takes 50 calls a month or 500. The system scales automatically during heatwaves, cold snaps, and storm spikes. You never pay more during your busiest months.",
      },
    ],
  },
};

export const LOCATION_SLUGS = Object.keys(LOCATIONS);

export function getLocation(slug: string): LocationContent | undefined {
  return LOCATIONS[slug];
}
