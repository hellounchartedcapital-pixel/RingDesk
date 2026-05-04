// Content for /for/[trade]/[city] combo pages. Keyed by
// `${tradeSlug}-${citySlug}`. The route in src/app/for/[trade]/[city]/page.tsx
// looks the entry up by composite key after validating both slugs against
// ACTIVE_TRADE_SLUGS and LOCATION_SLUGS, so any combo missing from this map
// falls through to a 404 (dynamicParams = false on the route).

export type ComboFAQ = {
  question: string;
  answer: string;
};

export type TradeLocationContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** Two paragraphs of opening copy, separated by a blank line. */
  opening: string;
  /** Two paragraphs of "why this trade in this city" copy. */
  whySpecific: string;
  /** Bullet-list copy for the "what we handle" block. */
  whatWeHandle: string[];
  faqs: ComboFAQ[];
};

export const TRADE_LOCATIONS: Record<string, TradeLocationContent> = {
  "plumbers-loveland": {
    metaTitle:
      "AI Receptionist for Plumbers in Loveland, CO | RingDesk",
    metaDescription:
      "RingDesk answers every call for Loveland plumbers, books jobs 24/7, and texts urgent leads to your phone. Done-for-you setup. $249/mo.",
    h1: "Answer Every Plumbing Call in Loveland — Even When You're Under a Sink",
    opening: `Loveland's a tough town for a plumber's phone. You've got the older homes east of Highway 287 with their original galvanized lines, the newer builds out by Centerra and Boyd Lake demanding same-week appointments, and a steady stream of emergency calls from St. Vrain Valley homeowners discovering a leak the moment they want to relax. Every one of those calls is either a paying job or a missed paying job — and most plumbers we talk to in the Loveland area lose 5 to 10 of them a week to voicemail.

RingDesk answers your phone in your name, qualifies the lead, books the appointment, and texts the urgent ones to you within seconds. Your truck stays on the job. Your phone stops costing you money.`,
    whySpecific: `Most Loveland plumbing shops are 1-15 person operations — owner-operators, small family businesses, a handful of two-truck shops competing with the bigger Fort Collins and Greeley names. The economics are tight. Every missed call is a job that goes to a competitor, and the answering services built for franchise contractors charge per-minute rates that don't make sense for your volume.

We built RingDesk specifically for shops like yours. Flat monthly pricing. No per-call charges. No long contracts. The receptionist knows your service area, your hours, your pricing structure, and the difference between a clogged toilet and a burst pipe — because we tune it to your business before it ever takes a call.`,
    whatWeHandle: [
      "New service requests (water heaters, drain clearing, fixture installs, repipes)",
      "Emergency triage — broken main, no hot water, sewer backup — texted to you immediately with caller name, address, and the urgency level",
      "Routine appointment booking via your Cal.com calendar",
      "After-hours coverage (because pipes don't break 9 to 5)",
      "Quote requests routed correctly so you can call back when you're off the truck",
    ],
    faqs: [
      {
        question:
          "What service area do you cover for Loveland plumbing calls?",
        answer:
          "The receptionist is tuned to your specific service area. Most Loveland plumbers we work with cover Loveland, Berthoud, Johnstown, Windsor, and parts of Fort Collins and Greeley. We configure the boundaries during setup and the AI quotes accurately based on your radius.",
      },
      {
        question:
          "How does RingDesk know what's a plumbing emergency vs. a routine call?",
        answer:
          "We tune the receptionist with your specific emergency criteria — flooding, no water, sewer backup, gas smell, water heater out in winter. When those keywords come up, you get an immediate text with caller details. Routine calls get booked into your normal appointment slots without bothering you.",
      },
      {
        question: "Can I still take calls myself when I want to?",
        answer:
          "Yes. RingDesk only answers when you don't pick up — typically after 4-6 rings. If you're in your truck and want to grab a call, you grab it. The AI is your safety net, not a wall.",
      },
      {
        question: "How long does setup take for a Loveland plumbing shop?",
        answer:
          "We have you live within 48 hours. We listen to a few of your existing voicemails, learn your pricing and service area, build the receptionist, and run test calls with you before going live. No DIY configuration on your end.",
      },
    ],
  },

  "plumbers-fort-collins": {
    metaTitle:
      "AI Receptionist for Plumbers in Fort Collins, CO | RingDesk",
    metaDescription:
      "RingDesk answers every call for Fort Collins plumbers, books jobs 24/7, and texts urgent leads to your phone. Done-for-you setup. $249/mo.",
    h1: "Stop Losing Fort Collins Plumbing Jobs to Voicemail",
    opening: `Fort Collins has more plumbing demand than plumbers to handle it. Between the CSU rental stock, the older Old Town homes with their cast iron stacks, the newer subdivisions out by Harmony Road and the Front Range trail corridor, and a steady stream of homeowners flowing in from the Front Range, the calls don't stop. The shops that grow are the ones that answer the phone. The shops that stagnate are the ones that don't.

Most Fort Collins plumbers we've talked to lose 5 to 10 calls a week to voicemail. At an average job value of $400, that's $2,000 to $4,000 a week walking to a competitor. RingDesk answers every one of those calls in your name, qualifies the lead, books the appointment, and texts you the urgent ones in seconds.`,
    whySpecific: `The Fort Collins market is competitive. You're up against established names with marketing budgets and call centers, plus a steady drip of newer shops trying to break in. The owner-operators and small-team shops we work with don't have the volume to justify a $4,000/mo receptionist service or the time to train one. They lose calls because they're under a sink, on a roof venting a stack, or asleep when the after-hours phone rings.

RingDesk is built for that gap. Flat $249/mo. We install and tune the receptionist for your specific business — your service area, your pricing, your service mix, your emergency criteria — before it ever takes a customer call. You get the answering capacity of a much bigger operation without the overhead.`,
    whatWeHandle: [
      "New service inquiries from Fort Collins, Timnath, Wellington, Laporte, and the surrounding service area",
      "Emergency triage with text alerts that include caller name, address, and the issue",
      "Appointment booking through your existing calendar",
      "24/7 coverage with no per-call or per-minute charges",
      "Quote requests captured cleanly so you can call back when you're off the job",
    ],
    faqs: [
      {
        question:
          "Does RingDesk understand Fort Collins-specific plumbing issues?",
        answer:
          "We tune the receptionist with your specific call types — slab leaks, polybutylene replacement, frozen lines, sewer scope requests, water softener installs — based on what your shop actually handles. The AI quotes from your scripts, not generic ones.",
      },
      {
        question:
          "Can RingDesk handle calls from outside Fort Collins city limits?",
        answer:
          "Yes. The receptionist is configured with your full service area. If you cover Fort Collins, Timnath, Wellington, Laporte, and parts of Loveland and Windsor, the AI handles all of those callers correctly. If a caller is outside your area, the AI politely says so and offers a callback.",
      },
      {
        question:
          "How is this different from a national answering service like PATLive or Ruby?",
        answer:
          "Two things. First, national services charge per minute, which kills your margins on long calls. RingDesk is flat $249/mo. Second, national services use generic scripts and untrained receptionists. We tune the AI to your specific Fort Collins shop, your specific pricing, and your specific service area. It sounds like it works for you because it does.",
      },
      {
        question: "What happens if I sign up and don't like it?",
        answer:
          "Cancel anytime. No contract. We'll work with you for the first 30 days to make sure the receptionist sounds right, books correctly, and triages emergencies the way you want. If it's not working, we end it cleanly.",
      },
    ],
  },

  "hvac-loveland": {
    metaTitle:
      "AI Receptionist for HVAC in Loveland, CO | RingDesk",
    metaDescription:
      "RingDesk answers every call for Loveland HVAC contractors, books jobs 24/7, and texts urgent leads instantly. Done-for-you setup. $249/mo.",
    h1: "Loveland HVAC Calls Don't Wait. Neither Should Your Phone.",
    opening: `HVAC in Loveland means you're busy in two seasons and slammed in two. Summer brings the AC service calls — units overworked from the Front Range heat, condensers iced over, capacitors failing in 95-degree weather. Winter brings the heating calls — furnaces failing on the first cold snap, no-heat emergencies at 6am, homeowners panicking when the temperature drops. In between, you're scheduling tune-ups and chasing replacement quotes.

The phone rings constantly. And every call you miss is one of three things: a tune-up that gets scheduled with someone else, a service call that becomes a no-heat emergency for a competitor, or a $10K replacement quote that walks. RingDesk answers every call in your name, qualifies the urgency, books the appointment, and texts you the emergencies in seconds.`,
    whySpecific: `Loveland HVAC shops are mostly 1-15 person operations — owner-techs, small family businesses, a handful of mid-sized shops that cover Loveland, Berthoud, Johnstown, and parts of Fort Collins and Greeley. The market is steady but the margins are tight. A no-heat emergency at midnight on a Sunday in January is the difference between a $400 service call and a $400 service call going to a competitor.

We built RingDesk for that reality. Flat $249/mo. The receptionist knows your service area, your seasonal pricing, your maintenance plan structure, and the difference between a thermostat issue and a compressor failure. Done-for-you setup means we tune all of that for your specific Loveland shop before the AI takes a single customer call.`,
    whatWeHandle: [
      "New service requests (no heat, no AC, repairs, maintenance, replacements)",
      "Emergency triage — no heat in winter, no AC in extreme heat, gas smell, CO alarm — texted to you immediately with caller name, address, and equipment type if known",
      "Tune-up and maintenance plan booking through your calendar",
      "After-hours and weekend coverage (because furnaces always fail on Sunday nights)",
      "Quote requests for replacement systems routed cleanly for follow-up",
    ],
    faqs: [
      {
        question:
          "Does RingDesk handle HVAC emergencies appropriately for Loveland weather?",
        answer:
          "We tune the receptionist's emergency criteria specifically for HVAC — no heat below 50°F outdoor temps, no AC above 90°F, gas leaks, CO detector alarms, frozen heat pumps. When those come up, you get an immediate text with caller name, address, and equipment details so you can dispatch correctly.",
      },
      {
        question: "Can RingDesk quote replacement systems?",
        answer:
          "No, and we recommend against trying. Replacement quotes need a load calculation, equipment selection, and a real conversation. The AI captures the lead cleanly — homeowner name, address, equipment age, system type, budget if mentioned — and routes it to you for follow-up. You close the deal; the AI just makes sure you don't lose it to voicemail.",
      },
      {
        question:
          "What service area do you cover for Loveland HVAC contractors?",
        answer:
          "Whatever you cover. Most Loveland HVAC shops we work with serve Loveland, Berthoud, Johnstown, Windsor, parts of Fort Collins, and parts of Greeley. We configure your service boundaries during setup so the AI quotes accurately and routes out-of-area callers correctly.",
      },
      {
        question: "How fast can you set up a Loveland HVAC shop?",
        answer:
          "48 hours from signup to live. We listen to your existing voicemails, learn your pricing and service area, build and tune the receptionist for your specific shop, and run test calls with you before going live.",
      },
    ],
  },

  "hvac-fort-collins": {
    metaTitle:
      "AI Receptionist for HVAC in Fort Collins, CO | RingDesk",
    metaDescription:
      "RingDesk answers every call for Fort Collins HVAC contractors, books jobs 24/7, and texts urgent leads in seconds. Done-for-you. $249/mo.",
    h1: "Fort Collins HVAC Calls Are Time-Sensitive. RingDesk Makes Sure You Get Them.",
    opening: `Fort Collins HVAC demand has two pressures: the seasonal swings and the steady residential growth. Hot summers stress AC systems across the Harmony corridor and the newer south-side subdivisions. Cold snaps hit hard on the older Old Town homes still running their original furnaces. And the constant flow of new construction and homeowner replacements means a steady stream of quote calls between the emergency rushes.

Every call your phone takes is either a job booked or a job lost. The shops that grow in Fort Collins are the ones that answer the phone every time. RingDesk makes sure you do — answering every call in your name, qualifying urgency, booking appointments, and texting you the emergencies in seconds.`,
    whySpecific: `The Fort Collins HVAC market is dense and competitive. You're up against established names with marketing budgets, big-shop call centers, plus a wave of newer entrants competing on price. The owner-operators and small-team shops we work with don't have the volume to justify a full-time office staff and don't have the time to train a part-time receptionist. They lose calls because they're on a roof, in a crawlspace, or sleeping when the after-hours emergency comes in.

RingDesk closes that gap. Flat $249/mo, done-for-you setup, tuned to your specific Fort Collins shop — your service area, your seasonal pricing, your maintenance plans, your emergency triage criteria. You get the answering capacity of a much larger shop without the overhead.`,
    whatWeHandle: [
      "New service requests across Fort Collins, Timnath, Wellington, Laporte, and the surrounding area",
      "Emergency triage with immediate text alerts (caller, address, equipment, urgency)",
      "Tune-up and maintenance plan booking through your existing calendar",
      "24/7 coverage with no per-call or per-minute charges",
      "Replacement quote leads captured cleanly for your follow-up",
    ],
    faqs: [
      {
        question:
          "Will RingDesk understand Fort Collins-specific HVAC issues?",
        answer:
          "We tune the receptionist for your specific service mix — heat pumps in newer subdivisions, older furnace replacements in Old Town, ductless mini-split installs, indoor air quality calls, the whole spread. The AI uses your scripts and your terminology, not generic HVAC language.",
      },
      {
        question:
          "How does RingDesk handle calls during a heatwave or cold snap rush?",
        answer:
          "The system scales — there's no busy signal, no caller waiting on hold for a human. Every caller gets answered immediately. During emergency volume spikes, you get a text feed of incoming emergencies in real time so you can prioritize dispatches without watching your phone.",
      },
      {
        question:
          "Can I integrate RingDesk with my existing dispatching software?",
        answer:
          "Today, RingDesk books appointments through your calendar (Cal.com or Google Calendar) and texts you full lead details for follow-up. We don't have direct integrations with dispatching platforms like ServiceTitan, Housecall Pro, or Jobber yet. If that's a hard requirement for you, mention it on your discovery call — we'll tell you honestly whether what we have today works for your workflow.",
      },
      {
        question: "What if my call volume changes seasonally?",
        answer:
          "The pricing doesn't change with volume. $249/mo whether the AI takes 50 calls a month or 500. That's part of why this works for HVAC specifically — your call volume is seasonal and you shouldn't pay extra during your busy months.",
      },
    ],
  },
};

export function getTradeLocation(
  tradeSlug: string,
  citySlug: string,
): TradeLocationContent | undefined {
  return TRADE_LOCATIONS[`${tradeSlug}-${citySlug}`];
}
