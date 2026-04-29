const steps = [
  {
    number: "1",
    title: "We set it up for your business in 48 hours.",
    body: "Send us your business details. We configure your AI receptionist, port your number, and write your custom call script.",
  },
  {
    number: "2",
    title: "Your AI receptionist answers every call 24/7.",
    body: "Qualifies leads, captures details, books service calls, and texts you the urgent ones in real-time.",
  },
  {
    number: "3",
    title: "We tune it weekly based on real calls.",
    body: "We listen to actual calls, refine responses, add new question types, and send you a weekly performance report.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-[color:var(--brand-slate)] sm:text-4xl lg:text-5xl">
            How RingDesk works
          </h2>
          <p className="mt-4 text-lg text-[color:var(--brand-muted)]">
            Three steps. We do the work. You stop losing jobs.
          </p>
        </div>

        <ol className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {steps.map((step) => (
            <li key={step.number} className="flex flex-col">
              <span className="text-sm font-semibold uppercase tracking-widest text-[color:var(--brand-indigo)]">
                Step {step.number}
              </span>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-[color:var(--brand-slate)]">
                {step.number}. {step.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[color:var(--brand-muted)]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
