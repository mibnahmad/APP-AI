"use client";

import { useState } from "react";
import { newsletterContent } from "@/lib/wall-art-data";
import { useStore } from "@/components/providers/store-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const { pushToast } = useStore();

  return (
    <section className="rounded-[2.5rem] border border-black/8 bg-white p-8 shadow-[0_24px_70px_-60px_rgba(17,17,17,0.45)] md:p-10">
      <p className="text-xs uppercase tracking-[0.24em] text-[#6B7280]">{newsletterContent.eyebrow}</p>
      <div className="mt-4 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <h2 className="font-serif text-4xl text-[#111111] md:text-5xl">{newsletterContent.title}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6B7280]">{newsletterContent.description}</p>
        </div>
        <form
          className="flex w-full max-w-xl flex-col gap-3 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            if (!email.trim()) {
              pushToast("Enter an email to join the list");
              return;
            }
            pushToast("Newsletter signup is mocked for this MVP", "success");
            setEmail("");
          }}
        >
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={newsletterContent.placeholder}
            aria-label="Email address"
            className="h-12 min-w-[260px]"
          />
          <Button className="h-12">{newsletterContent.buttonLabel}</Button>
        </form>
      </div>
    </section>
  );
}
