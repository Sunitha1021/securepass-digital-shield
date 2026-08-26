import { Fingerprint, KeyRound, Lock, ScanLine, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const SIGNALS = [
  { icon: Lock, label: "AES-grade randomness" },
  { icon: ScanLine, label: "Entropy scoring" },
  { icon: Fingerprint, label: "Zero storage" },
];

export function Hero() {
  return (
    <section id="home" className="relative pt-36 pb-20 sm:pt-44 lg:pb-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            <Sparkles className="size-3.5 text-cyan" />
            Smart password security
          </span>
          <h1 className="mt-6 font-display text-4xl leading-[1.05] font-bold sm:text-5xl lg:text-6xl">
            Generate Strong. <br />
            <span className="gradient-text">Stay Secure.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Create secure, customizable passwords and analyze their strength instantly. SecurePass
            helps you build stronger digital security.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="cyber">
              <a href="#generator">
                <KeyRound className="size-4" />
                Generate Password
              </a>
            </Button>
            <Button asChild size="lg" variant="outlineGlow">
              <a href="#checker">
                <ShieldCheck className="size-4" />
                Check Password
              </a>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            {SIGNALS.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2">
                <Icon className="size-4 text-cyan" /> {label}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="animate-float-slow glass-card glow-ring relative overflow-hidden p-6">
            <div className="animate-scan pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cyan/20 to-transparent" />
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                vault_scan
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-success">
                <span className="size-1.5 rounded-full bg-success" /> secure
              </span>
            </div>
            <div className="mt-6 rounded-xl border border-glass-border bg-background/40 p-4 font-mono text-sm break-all">
              <span className="text-cyan">k9</span>
              <span className="text-foreground">$Vr</span>
              <span className="text-violet">7mQ</span>
              <span className="text-foreground">x!Lz</span>
              <span className="text-cyan">28</span>
              <span className="text-foreground">#Pd</span>
            </div>
            <div className="mt-6 space-y-3">
              {[
                { label: "Entropy", value: "128 bits", width: "94%" },
                { label: "Variety", value: "4 / 4 sets", width: "100%" },
                { label: "Crack time", value: "> 3B years", width: "88%" },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{row.label}</span>
                    <span className="text-foreground">{row.value}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan to-violet"
                      style={{ width: row.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-glass-border bg-glass px-4 py-3 text-xs backdrop-blur-xl sm:block">
            <p className="font-display font-semibold">Locally analyzed</p>
            <p className="text-muted-foreground">Nothing ever leaves your device</p>
          </div>
        </div>
      </div>
    </section>
  );
}
