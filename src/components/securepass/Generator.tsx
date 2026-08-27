import { useCallback, useEffect, useMemo, useState } from "react";
import { Copy, Eye, EyeOff, KeyRound, Loader2, RefreshCw, Trash2, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { StrengthMeter } from "./StrengthMeter";
import { AnalysisCard } from "./AnalysisCard";
import {
  analyzePassword,
  CHARSET_LABELS,
  type CharsetKey,
  type GeneratorOptions,
} from "@/lib/password";
import { requestPassword } from "@/lib/api";

const CHARSET_KEYS: CharsetKey[] = ["uppercase", "lowercase", "numbers", "symbols"];

export function Generator() {
  const [options, setOptions] = useState<GeneratorOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [history, setHistory] = useState<{ value: string; at: string }[]>([]);

  const anyCharset = CHARSET_KEYS.some((key) => options[key]);
  const analysis = useMemo(() => analyzePassword(password), [password]);

  const generate = useCallback(
    async (opts: GeneratorOptions, silent = false) => {
      if (!CHARSET_KEYS.some((key) => opts[key])) {
        toast.error("Select at least one character type");
        return;
      }
      setLoading(true);
      const { password: next } = await requestPassword(opts);
      // Small delay keeps the loading animation legible.
      await new Promise((resolve) => setTimeout(resolve, 260));
      setPassword(next);
      setHistory((prev) =>
        [
          { value: next, at: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
          ...prev,
        ].slice(0, 6),
      );
      setLoading(false);
      if (!silent) toast.success("New secure password generated");
    },
    [],
  );

  useEffect(() => {
    void generate(
      { length: 16, uppercase: true, lowercase: true, numbers: true, symbols: true },
      true,
    );
  }, [generate]);

  const copy = async (value: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Password copied to clipboard");
    } catch {
      toast.error("Clipboard unavailable in this browser");
    }
  };

  return (
    <section id="generator" className="relative py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-cyan">
            / generator
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Build your next password</h2>
          <p className="mt-3 text-muted-foreground">
            Fine-tune length and character sets, then generate cryptographically random passwords in
            one click.
          </p>
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="glass-card p-6 sm:p-8">
            <Label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Generated password
            </Label>
            <div className="mt-3 flex flex-col gap-3 rounded-xl border border-glass-border bg-background/50 p-4 sm:flex-row sm:items-center">
              <p
                className="min-w-0 flex-1 font-mono text-lg break-all sm:text-xl"
                aria-live="polite"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="size-4 animate-spin" /> generating…
                  </span>
                ) : visible ? (
                  password || "—"
                ) : (
                  "•".repeat(password.length || 12)
                )}
              </p>
              <div className="flex shrink-0 gap-2">
                <Button
                  variant="subtle"
                  size="icon"
                  onClick={() => setVisible((v) => !v)}
                  aria-label={visible ? "Hide password" : "Show password"}
                >
                  {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </Button>
                <Button
                  variant="subtle"
                  size="icon"
                  onClick={() => copy(password)}
                  aria-label="Copy password"
                >
                  <Copy className="size-4" />
                </Button>
                <Button
                  variant="subtle"
                  size="icon"
                  onClick={() => void generate(options)}
                  aria-label="Regenerate password"
                >
                  <RefreshCw className={loading ? "size-4 animate-spin" : "size-4"} />
                </Button>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between">
                <Label htmlFor="length" className="text-sm">
                  Password length
                </Label>
                <span className="font-mono text-sm text-cyan">{options.length} chars</span>
              </div>
              <Slider
                id="length"
                className="mt-4"
                min={6}
                max={32}
                step={1}
                value={[options.length]}
                onValueChange={(value) => setOptions((o) => ({ ...o, length: value[0] ?? o.length }))}
              />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>6</span>
                <span>32</span>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {CHARSET_KEYS.map((key) => (
                <label
                  key={key}
                  htmlFor={key}
                  className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-glass-border bg-background/40 px-4 py-3 transition-colors hover:border-cyan/40"
                >
                  <span className="text-sm">{CHARSET_LABELS[key]}</span>
                  <Switch
                    id={key}
                    checked={options[key]}
                    onCheckedChange={(checked) => setOptions((o) => ({ ...o, [key]: checked }))}
                  />
                </label>
              ))}
            </div>

            <div className="mt-8">
              <StrengthMeter score={analysis.score} label={analysis.label} />
            </div>

            <Button
              variant="cyber"
              size="xl"
              className="mt-8 w-full"
              disabled={loading || !anyCharset}
              onClick={() => void generate(options)}
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Wand2 className="size-4" />
              )}
              Generate Secure Password
            </Button>
          </div>

          <div className="space-y-6">
            <AnalysisCard analysis={analysis} title="Password Analysis" />

            <div className="glass-card p-6">
              <div className="flex items-center justify-between">
                <h3 className="inline-flex items-center gap-2 font-display text-base font-semibold">
                  <KeyRound className="size-4 text-cyan" /> Generation history
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setHistory([]);
                    toast.success("History cleared");
                  }}
                  disabled={history.length === 0}
                >
                  <Trash2 className="size-3.5" /> Clear
                </Button>
              </div>
              <ul className="mt-4 space-y-2">
                {history.length === 0 && (
                  <li className="text-sm text-muted-foreground">
                    Generated passwords appear here for this session only.
                  </li>
                )}
                {history.map((item, i) => (
                  <li
                    key={`${item.value}-${i}`}
                    className="flex items-center gap-3 rounded-lg border border-glass-border bg-background/40 px-3 py-2"
                  >
                    <span className="min-w-0 flex-1 truncate font-mono text-xs">{item.value}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">{item.at}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7"
                      onClick={() => copy(item.value)}
                      aria-label="Copy password from history"
                    >
                      <Copy className="size-3.5" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
