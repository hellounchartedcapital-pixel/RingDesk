export type FAQItem = {
  question: string;
  answer: string;
};

export const faqs: FAQItem[] = [
  {
    question: "How fast can we go live?",
    answer:
      "Most customers go live in 48 hours from sign-up. We need your business info, common call types, and 30 minutes for setup.",
  },
  {
    question: "What happens to my existing business number?",
    answer:
      "We use call forwarding — your number stays the same. When calls come in, they route to RingDesk if you don't answer (or always, if you prefer). Setup takes 5 minutes with your phone provider.",
  },
  {
    question: "What if it doesn't work for my business?",
    answer:
      "Cancel anytime. No contracts, no questions. We'd rather you cancel than feel stuck.",
  },
  {
    question: "Does it handle Spanish-speaking callers?",
    answer:
      "Yes — fully bilingual English and Spanish. Detects caller language automatically. Important for trades in Northern Colorado.",
  },
  {
    question: "Will my customers know it's AI?",
    answer:
      "We're transparent — the receptionist identifies as a virtual assistant. In our experience, customers care about getting helped fast, not about whether the helper is human.",
  },
  {
    question:
      "What if I get a weird call type the AI doesn't handle?",
    answer:
      "We tune it weekly based on real calls. If we see something new, we update your call script and you'll see the change within days. That's the 'managed' part of done-for-you.",
  },
];
