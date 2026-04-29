import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/faq";

export function FAQ() {
  return (
    <section className="bg-[color:var(--brand-bg-secondary)] py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-balance text-center text-3xl font-bold tracking-tight text-[color:var(--brand-slate)] sm:text-4xl lg:text-5xl">
          Frequently asked
        </h2>

        <Accordion type="single" collapsible className="mt-12 w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.question} value={`item-${i}`}>
              <AccordionTrigger className="text-[color:var(--brand-slate)]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[color:var(--brand-slate)]/80">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
