"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

export const Accordion = AccordionPrimitive.Root;
export const AccordionItem = AccordionPrimitive.Item;

export function AccordionTrigger({
  children,
  ...props
}: AccordionPrimitive.AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className="group flex w-full items-center justify-between py-4 text-left text-sm"
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 text-[#777777] transition group-data-[state=open]:rotate-180" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  children,
  ...props
}: AccordionPrimitive.AccordionContentProps) {
  return (
    <AccordionPrimitive.Content className="overflow-hidden text-sm text-[#777777]" {...props}>
      <div className="pb-4">{children}</div>
    </AccordionPrimitive.Content>
  );
}
