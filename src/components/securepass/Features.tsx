import { EyeOff, Gauge, Settings2, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Secure Generation",
    body: "Generate strong randomized passwords backed by the browser's cryptographic randomness.",
  },
  {
    icon: Gauge,
    title: "Password Strength Analysis",
    body: "Analyze password strength and identify weaknesses with entropy-based scoring.",
  },
  {
    icon: Settings2,
    title: "Customizable Passwords",
    body: "Control length from 6 to 32 characters and pick exactly which character types to include.",
  },
  {
    icon: EyeOff,
    title: "Privacy Focused",
    body: "Passwords are never stored, logged, or transmitted anywhere outside your session.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-cyan">/ features</span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Everything you need to stay safe</h2>
        </header>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="glass-card group p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-cyan/20 to-violet/20 text-cyan transition-transform duration-300 group-hover:scale-110">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
