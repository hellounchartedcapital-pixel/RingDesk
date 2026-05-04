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
      "AI Receptionist & Answering Service in Loveland, CO | RingDesk",
    metaDescription:
      "AI receptionist for Loveland, CO trades. A real person installs and tunes it. Answers 24/7, qualifies leads, texts you the urgent ones. $249/mo.",
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
  },
};

export const LOCATION_SLUGS = Object.keys(LOCATIONS);

export function getLocation(slug: string): LocationContent | undefined {
  return LOCATIONS[slug];
}
