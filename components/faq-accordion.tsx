import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqItems as defaultItems } from "@/lib/wall-art-data";
import type { FAQItem } from "@/types/wall-art";

export function FAQAccordion({ items = defaultItems }: { items?: FAQItem[] }) {
  return (
    <Accordion type="single" collapsible className="rounded-[2rem] border border-black/8 bg-white px-6 shadow-[0_25px_80px_-60px_rgba(17,17,17,0.4)]">
      {items.map((faq, index) => (
        <AccordionItem
          value={`item-${index + 1}`}
          key={faq.question}
          className="border-b border-black/8 last:border-b-0"
        >
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
