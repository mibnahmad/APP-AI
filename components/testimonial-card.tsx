import type { Testimonial } from "@/types/wall-art";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_24px_70px_-60px_rgba(17,17,17,0.5)]">
      <p className="text-lg leading-8 text-[#111111]">“{testimonial.quote}”</p>
      <div className="mt-6">
        <p className="font-medium text-[#111111]">{testimonial.name}</p>
        <p className="text-sm text-[#6B7280]">{testimonial.role}</p>
      </div>
    </article>
  );
}
