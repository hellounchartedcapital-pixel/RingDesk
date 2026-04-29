import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How fast can we go live?",
    a: "Most customers go live in 48 hours from sign-up. We need your business info, common call types, and 30 minutes for setup.",
  },
  {
    q: "What happens to my existing business number?",
    a: "We use call forwarding — your number stays the same. When calls come in, they route to RingDesk if you don't answer (or always, if you prefer). Setup takes 5 minutes with your phone provider.",
  },
  {
    q: "What if it doesn't work for my business?",
    a: "Cancel anytime. No contracts, no questions. We'd rather you cancel than feel stuck.",
  },
  {
    q: "Does it handle Spanish-speaking callers?",
    a: "Yes — fully bilingual English and Spanish. Detects caller language automatically. Important for trades in Northern Colorado.",
  },
  {
    q: "Will my customers know it's AI?",
    a: "We're transparent — the receptionist identifies as a virtual assistant. In our experience, customers care about getting helped fast, not about whether the helper is human.",
  },
  {
    q: "What if I get a weird call type the AI doesn't handle?",
    a: "We tune it weekly based on real calls. If we see something new, we update your call script and you'll see the change within days. That's the 'managed' part of done-for-you.",
  },
];

export function FAQ() {
  return (
    <section className="bg-[color:var(--brand-bg-secondary)] py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-balance text-center text-3xl font-bold tracking-tight text-[color:var(--brand-slate)] sm:text-4xl lg:text-5xl">
          Frequently asked
        </h2>

        <Accordion type="single" collapsible className="mt-12 w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.q} value={`item-${i}`}>
              <AccordionTrigger className="text-[color:var(--brand-slate)]">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-[color:var(--brand-slate)]/80">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
