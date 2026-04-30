export type FAQ = {
  question: string;
  answer: string;
};

export type ValueProp = {
  title: string;
  description: string;
};

// Fields shared by every trade entry — both the fully-built ones
// (rendered as a /for/[slug] page) and the coming-soon stubs (rendered
// only as a non-link card on the homepage).
type TradeContentBase = {
  slug: string;
  displayName: string;
  displayNameSingular: string;
  category: string;
  cardSummary: string;
  metaTitle: string;
  metaDescription: string;
};

export type TradeContent = TradeContentBase & {
  comingSoon?: false;
  heroHeadline: string;
  heroSubheadline: string;
  valueProps: ValueProp[];
  commonCallTypes: string[];
  avgJobValueText: string;
  testimonialPlaceholder: string;
  faqs: FAQ[];
};

export type TradeStub = TradeContentBase & {
  comingSoon: true;
};

export type AnyTrade = TradeContent | TradeStub;

export const TRADES: Record<string, AnyTrade> = {
  plumbers: {
    slug: "plumbers",
    displayName: "Plumbers",
    displayNameSingular: "Plumber",
    category: "Plumbing",
    cardSummary:
      "Tuned for emergency triage, water-heater quotes, and service-area calls.",
    heroHeadline: "Stop losing $400 plumbing calls to your competitor.",
    heroSubheadline:
      "RingDesk is an AI receptionist installed and tuned for plumbing businesses. We answer every call 24/7, qualify emergencies, schedule service calls, and text you the urgent ones. Built for the trade where every missed call is a customer calling the next plumber on the list.",
    valueProps: [
      {
        title: "Emergency triage that doesn't drop the ball",
        description:
          "Burst pipes don't wait for office hours. We identify emergency calls instantly, capture the address and severity, and text you in under 60 seconds so you can dispatch fast — even at 2 AM.",
      },
      {
        title: "Quote requests answered intelligently",
        description:
          "We don't pretend to know your pricing. The receptionist gathers job scope, photos when available, location, and timing — so when you call back, you have everything you need to quote in one shot.",
      },
      {
        title: "Service area + scheduling without the back-and-forth",
        description:
          "Customers want to know if you serve their zip and when you can come. We answer service area questions, capture preferred time windows, and book directly to your calendar if you want.",
      },
    ],
    commonCallTypes: [
      "Burst pipe / water leak emergency",
      "Water heater not working",
      "Drain backup or sewer line",
      "New install quote (toilet, faucet, water heater)",
      "Routine service or inspection booking",
      "Service area + pricing questions",
    ],
    avgJobValueText:
      "The average plumbing service call in Northern Colorado runs $250-$800. Emergency after-hours calls and water heater installs run $1,200-$3,500. Every missed call is a real shot at four-figure revenue.",
    testimonialPlaceholder:
      "[Pilot customer testimonial — coming soon. Want to be the first plumber on this page?]",
    faqs: [
      {
        question: "Can the AI handle emergency calls correctly?",
        answer:
          "Yes. We tune the receptionist specifically to identify emergency keywords (burst, leaking, flooding, no water, sewage) and prioritize them. Emergency calls trigger an immediate SMS to your phone with the caller's number, address, and a one-line summary so you can dispatch in under 60 seconds.",
      },
      {
        question: "What if the customer wants pricing on the spot?",
        answer:
          "We don't quote on the AI's behalf. The receptionist explains that pricing depends on the specific job, gathers detailed scope, and books a callback or estimate visit. You quote — we capture and qualify.",
      },
      {
        question: "Will the AI book me to jobs I can't take?",
        answer:
          "We configure your service area, hours, and any blackout dates during setup. The receptionist knows what you do and don't take, and routes accordingly. If a customer is outside your service area, the receptionist takes the message but flags it as out-of-area so you can decide.",
      },
      {
        question: "Can it handle calls in Spanish?",
        answer:
          "Yes — fully bilingual English and Spanish. Detects caller language automatically. Important for trades in Northern Colorado.",
      },
    ],
    metaTitle:
      "AI Receptionist for Plumbers in Northern Colorado | RingDesk",
    metaDescription:
      "AI receptionist built for plumbing businesses in Northern Colorado. Answers every call 24/7, triages emergencies, captures quote requests. $249/mo flat. Cancel anytime.",
  },
  hvac: {
    slug: "hvac",
    displayName: "HVAC Contractors",
    displayNameSingular: "HVAC Contractor",
    category: "HVAC",
    cardSummary:
      "Tuned for AC outages, no-heat emergencies, and seasonal demand spikes.",
    heroHeadline: "Stop losing service calls every time the AC goes out.",
    heroSubheadline:
      "RingDesk is an AI receptionist installed and tuned for HVAC contractors. We answer every call 24/7, qualify emergencies, capture service requests, and text you the urgent ones. Built for the trade where summer heatwaves and winter cold snaps mean every missed call is a customer calling your competitor.",
    valueProps: [
      {
        title: "Heatwave and cold-snap surge handling",
        description:
          "When temperatures spike, your phone explodes. We answer every single call simultaneously — no busy signals, no voicemail. We triage by urgency so you handle the no-AC emergencies first.",
      },
      {
        title: "Maintenance scheduling without losing momentum",
        description:
          "Spring tune-ups and fall maintenance are recurring revenue you can't afford to drop. We book maintenance appointments directly to your calendar and follow up with customers who don't book the first time.",
      },
      {
        title: "Unit info captured before you arrive",
        description:
          "We ask the right qualifying questions: brand, age, last service, what's wrong. By the time you arrive, the customer feels heard and you have what you need to diagnose quickly.",
      },
    ],
    commonCallTypes: [
      "AC not cooling / no heat emergency",
      "Furnace or AC unit replacement quote",
      "Annual maintenance / tune-up scheduling",
      "Strange noises or smells from system",
      "Thermostat or air handler issues",
      "Indoor air quality / filter questions",
    ],
    avgJobValueText:
      "The average HVAC service call in Northern Colorado runs $300-$1,200. Full unit replacements run $5,000-$15,000+. A heatwave week can put 20 emergency calls in your queue — every missed call is a real opportunity.",
    testimonialPlaceholder:
      "[Pilot customer testimonial — coming soon. Want to be the first HVAC contractor on this page?]",
    faqs: [
      {
        question:
          "Can the AI tell the difference between an emergency and routine maintenance?",
        answer:
          "Yes. The receptionist identifies emergency keywords (no heat in winter, no AC in summer, gas smell, system not turning on) and triages accordingly. Emergencies get immediate SMS alerts to you. Routine maintenance gets booked or queued for callback.",
      },
      {
        question:
          "Will it know how to handle commercial vs residential calls?",
        answer:
          "We configure your service mix during setup. If you only do residential, the receptionist routes commercial leads to a separate workflow (or politely declines). Same for the reverse.",
      },
      {
        question: "Can it sell maintenance plans?",
        answer:
          "Not directly — we don't have the AI try to close. But we can configure the receptionist to mention your maintenance plan when relevant and capture interest, which gives you a warm callback list.",
      },
      {
        question:
          "What about manufacturer-specific questions (Carrier, Trane, Lennox, etc.)?",
        answer:
          "We capture brand and model number on the call. The receptionist doesn't pretend to be a technician, but we get you the information you need before you call back or arrive.",
      },
    ],
    metaTitle:
      "AI Receptionist for HVAC Contractors in Northern Colorado | RingDesk",
    metaDescription:
      "AI receptionist built for HVAC contractors in Northern Colorado. Answers every call 24/7, triages no-AC and no-heat emergencies, books maintenance. $249/mo flat.",
  },
  electricians: {
    slug: "electricians",
    displayName: "Electricians",
    displayNameSingular: "Electrician",
    category: "Electrical",
    comingSoon: true,
    cardSummary:
      "Coming soon — tuned for panel upgrades, outage emergencies, and service-call quoting.",
    metaTitle:
      "AI Receptionist for Electricians in Northern Colorado | RingDesk",
    metaDescription:
      "AI receptionist for electricians in Northern Colorado. Built for outage emergencies, panel upgrades, and service-call quoting. $249/mo flat. Coming soon.",
  },
  roofers: {
    slug: "roofers",
    displayName: "Roofers",
    displayNameSingular: "Roofer",
    category: "Roofing",
    comingSoon: true,
    cardSummary:
      "Coming soon — tuned for storm-damage triage, inspection scheduling, and insurance-claim calls.",
    metaTitle:
      "AI Receptionist for Roofers in Northern Colorado | RingDesk",
    metaDescription:
      "AI receptionist for roofing companies in Northern Colorado. Built for storm-damage triage and inspection scheduling. $249/mo flat. Coming soon.",
  },
  "garage-door": {
    slug: "garage-door",
    displayName: "Garage Door Companies",
    displayNameSingular: "Garage Door Tech",
    category: "Garage Door",
    comingSoon: true,
    cardSummary:
      "Coming soon — tuned for stuck-door emergencies, opener replacements, and same-day service.",
    metaTitle:
      "AI Receptionist for Garage Door Companies in Northern Colorado | RingDesk",
    metaDescription:
      "AI receptionist for garage door companies in Northern Colorado. Built for stuck-door emergencies and same-day service. $249/mo flat. Coming soon.",
  },
  landscaping: {
    slug: "landscaping",
    displayName: "Landscaping Companies",
    displayNameSingular: "Landscaper",
    category: "Landscaping",
    comingSoon: true,
    cardSummary:
      "Coming soon — tuned for seasonal scheduling, quote intake, and recurring-service booking.",
    metaTitle:
      "AI Receptionist for Landscaping Companies in Northern Colorado | RingDesk",
    metaDescription:
      "AI receptionist for landscaping companies in Northern Colorado. Built for seasonal scheduling and quote intake. $249/mo flat. Coming soon.",
  },
};

export const TRADE_SLUGS = Object.keys(TRADES);

export const ACTIVE_TRADE_SLUGS = TRADE_SLUGS.filter(
  (slug) => !TRADES[slug].comingSoon,
);

export function getTrade(slug: string): AnyTrade | undefined {
  return TRADES[slug];
}

// Returns the active (non-stub) trades other than the given slug.
export function getOtherTrades(slug: string): TradeContent[] {
  return ACTIVE_TRADE_SLUGS.filter((s) => s !== slug)
    .map((s) => TRADES[s])
    .filter((t): t is TradeContent => !t.comingSoon);
}
