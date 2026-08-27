import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2, Lock, ShieldAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { analyzePassword, type Analysis } from "@/lib/password";
import { requestAnalysis } from "@/lib/api";
import { toast } from "sonner";
import { AnalysisCard } from "./AnalysisCard";
import { StrengthMeter } from "./StrengthMeter";

export function Checker() {
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis>(() => analyzePassword(""));

  // Debounced POST /analyze-password. Passwords are sent to the analysis
  // endpoint only and are never persisted anywhere.
  useEffect(() => {
    if (!value) {
      setLoading(false);
      setAnalysis(analyzePassword(""));
      return;
    }
    let active = true;
    setLoading(true);
    const timer = setTimeout(() => {
      void requestAnalysis(value).then((result) => {
        if (!active) return;
        setAnalysis(result.analysis);
        setLoading(false);
        if (result.error) {
          toast.error(result.error, { description: "Showing on-device analysis instead." });
        }
      });
    }, 400);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [value]);

  const checks = [
    { label: "Uppercase letters", ok: analysis.hasUppercase },
    { label: "Lowercase letters", ok: analysis.hasLowercase },
    { label: "Numbers", ok: analysis.hasNumbers },
    { label: "Symbols", ok: analysis.hasSymbols },
    { label: "12+ characters", ok: analysis.length >= 12 },
  ];

  return (
    <section id="checker" className="relative py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-violet">
            / checker
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Audit an existing password</h2>
          <p className="mt-3 text-muted-foreground">
            Paste a password to measure entropy, detect weak patterns, and get concrete hardening
            steps.
          </p>
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="glass-card p-6 sm:p-8">
            <Label htmlFor="check-password">Password to analyze</Label>
            <div className="mt-3 flex gap-2">
              <Input
                id="check-password"
                type={visible ? "text" : "password"}
                autoComplete="off"
                placeholder="Type or paste a password…"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                className="h-12 font-mono"
              />
              <Button
                variant="subtle"
                size="icon"
                className="h-12 w-12"
                onClick={() => setVisible((v) => !v)}
                aria-label={visible ? "Hide password" : "Show password"}
              >
                {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </Button>
            </div>

            <div className="mt-7">
              <StrengthMeter score={analysis.score} label={analysis.label} />
              {loading && (
                <p className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <Loader2 className="size-3.5 animate-spin" /> Analyzing password…
                </p>
              )}
            </div>

            <ul className="mt-7 grid gap-2 sm:grid-cols-2">
              {checks.map((check) => (
                <li
                  key={check.label}
                  className="flex items-center gap-2 rounded-lg border border-glass-border bg-background/40 px-3 py-2 text-sm"
                >
                  <span
                    className={
                      check.ok
                        ? "size-2 rounded-full bg-success"
                        : "size-2 rounded-full bg-muted-foreground/50"
                    }
                  />
                  <span className={check.ok ? "" : "text-muted-foreground"}>{check.label}</span>
                </li>
              ))}
            </ul>

            <p className="mt-7 inline-flex items-start gap-2 rounded-xl border border-cyan/30 bg-cyan/5 p-4 text-sm text-muted-foreground">
              <Lock className="mt-0.5 size-4 shrink-0 text-cyan" />
              Your password is analyzed locally and is never stored.
            </p>
          </div>

          <div className="space-y-6">
            <AnalysisCard analysis={analysis} title="Security Analysis" />
            <div className="glass-card flex items-start gap-3 p-6 text-sm text-muted-foreground">
              <ShieldAlert className="mt-0.5 size-4 shrink-0 text-warn" />
              Never reuse passwords across accounts. Pair unique passwords with two-factor
              authentication for the strongest protection.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
