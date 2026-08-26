import { ClipboardCheck, SlidersHorizontal, Sparkles } from "lucide-react";

const STEPS = [
  {
    icon: SlidersHorizontal,
    title: "Customize your password",
    body: "Choose the length and the character sets that match the site's requirements.",
  },
  {
    icon: Sparkles,
    title: "Generate a secure password",
    body: "SecurePass builds a random password and scores its entropy instantly.",
  },
  {
    icon: ClipboardCheck,
    title: "Copy and use it safely",
    body: "Copy in one tap and store it in your password manager — nothing is retained here.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-violet">
            / how it works
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Three steps to a stronger login</h2>
        </header>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, body }, index) => (
            <li key={title} className="glass-card relative p-6 pt-8">
              <span className="absolute -top-4 left-6 grid size-10 place-items-center rounded-xl bg-gradient-to-br from-cyan to-violet font-display font-bold text-primary-foreground">
                {index + 1}
              </span>
              <Icon className="size-5 text-cyan" />
              <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
