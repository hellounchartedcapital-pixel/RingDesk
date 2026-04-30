export const SITE_URL = "https://ringdesk.co";
export const SITE_NAME = "RingDesk";

export const SITE_TITLE_DEFAULT =
  "RingDesk — AI receptionist for trades in Northern Colorado";
export const HOME_TITLE =
  "AI receptionist for trades in Northern Colorado | RingDesk";
export const SITE_DESCRIPTION =
  "AI receptionist for plumbers, HVAC, electricians, and trades in Northern Colorado. Installed and tuned by a real person. Stop missing service calls — $249/mo flat, cancel anytime.";

export const OG_IMAGE_PATH = "/og-image.png";
export const OG_IMAGE_ALT = "RingDesk — AI receptionist for trades";

export const RINGDESK_PHONE = "+1-970-528-8725";

// Variants of the phone number for UI use. Keep these in sync with
// RINGDESK_PHONE above (which is the JSON-LD canonical form).
export const RINGDESK_PHONE_TEL = "+19705288725"; // for tel: hrefs
export const RINGDESK_PHONE_DISPLAY = "(970) 528-8725"; // for visible text

// Booking URL — historically Calendly, now Cal.com (event type ai-discovery,
// 15 min). Symbol name kept as CALENDLY_URL so importers don't have to change.
// The Vapi assistant also uses this URL as the human fallback when handing off.
export const CALENDLY_URL = "https://cal.com/ringdesk/ai-discovery";

export const STRIPE_STANDARD_URL =
  "https://buy.stripe.com/cNicN79cp8yQe8ibT104800";
export const STRIPE_PREMIUM_URL =
  "https://buy.stripe.com/dRm00l60d7uM3tE2ir04801";

export const CONTACT_EMAIL = "tony@ringdesk.co";

// Pilot scarcity. Update these as slots fill — pricing.tsx composes the
// rendered scarcity sentence from these values plus PILOT_SLOT_BREAKDOWN.
export const PILOT_SLOTS_REMAINING = 3;
export const PILOT_TARGET_TRADES = "plumbing, HVAC, and electrical";
export const PILOT_SLOT_BREAKDOWN = "1 plumbing, 1 HVAC, 1 electrical";
export const PILOT_GEO = "US-based";

// Canonical CTA label used wherever the booking action is exposed
// (header links, hero buttons, pricing fallback link, final-CTA buttons).
// Prose copy that happens to contain the phrase verbatim — like the
// final-CTA section heading — is intentionally NOT routed through this
// constant; only repeated CTA elements are.
export const BOOKING_CTA_LABEL = "Book a 15-min call";
