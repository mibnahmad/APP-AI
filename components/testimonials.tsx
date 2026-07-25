const testimonials = [
  {
    quote: "Our living room looks like a boutique hotel suite. The print quality is exceptional.",
    name: "Ava M.",
  },
  {
    quote: "The curation is refined and timeless. Every piece feels collectible.",
    name: "Daniel R.",
  },
  {
    quote: "Premium packaging, fast shipping, and absolutely stunning room impact.",
    name: "Sophia K.",
  },
];

export function Testimonials() {
  return (
    <section>
      <h2 className="mb-8 font-serif text-4xl">Client Testimonials</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((item) => (
          <article key={item.name} className="rounded-3xl border border-black/8 bg-white p-6">
            <p className="text-[#777777]">“{item.quote}”</p>
            <p className="mt-5 text-sm">{item.name}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
