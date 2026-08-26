import { ActivityIcon, CaseSensitive, Hash, Lightbulb, Ruler, ShieldCheck } from "lucide-react";
import { STRENGTH_TONE, type Analysis } from "@/lib/password";
import { cn } from "@/lib/utils";

export function AnalysisCard({ analysis, title }: { analysis: Analysis; title: string }) {
  const tone = STRENGTH_TONE[analysis.label];
  const types = [
    { label: "A-Z", active: analysis.hasUppercase },
    { label: "a-z", active: analysis.hasLowercase },
    { label: "0-9", active: analysis.hasNumbers },
    { label: "!@#", active: analysis.hasSymbols },
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="inline-flex items-center gap-2 font-display text-base font-semibold">
        <ShieldCheck className="size-4 text-cyan" /> {title}
      </h3>

      <div className="mt-5 flex items-center gap-4">
        <div
          className={cn(
            "grid size-20 shrink-0 place-items-center rounded-full border-2",
            tone.ring,
          )}
          style={{
            background: `conic-gradient(var(--cyan) ${analysis.score}%, transparent 0)`,
          }}
        >
          <div className="grid size-16 place-items-center rounded-full bg-card">
            <span className={cn("font-display text-xl font-bold", tone.text)}>
              {analysis.score}
            </span>
          </div>
        </div>
        <div>
          <p className={cn("font-display text-lg font-semibold", tone.text)}>{analysis.label}</p>
          <p className="text-sm text-muted-foreground">Strength score out of 100</p>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3">
        <Stat icon={ActivityIcon} label="Entropy" value={`${analysis.entropy} bits`} />
        <Stat icon={Ruler} label="Length" value={`${analysis.length} chars`} />
        <Stat icon={Hash} label="Character pool" value={`${analysis.poolSize}`} />
        <Stat
          icon={CaseSensitive}
          label="Types used"
          value={`${types.filter((t) => t.active).length} / 4`}
        />
      </dl>

      <div className="mt-5 flex flex-wrap gap-2">
        {types.map((type) => (
          <span
            key={type.label}
            className={cn(
              "rounded-lg border px-2.5 py-1 font-mono text-xs transition-colors",
              type.active
                ? "border-cyan/50 bg-cyan/10 text-cyan"
                : "border-glass-border text-muted-foreground",
            )}
          >
            {type.label}
          </span>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-glass-border bg-background/40 p-4">
        <p className="inline-flex items-center gap-2 text-sm font-medium">
          <Lightbulb className="size-4 text-warn" /> Security recommendation
        </p>
        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
          {analysis.recommendations.map((rec) => (
            <li key={rec} className="flex gap-2">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan" />
              {rec}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Hash;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-glass-border bg-background/40 p-3">
      <dt className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className="size-3.5" /> {label}
      </dt>
      <dd className="mt-1 font-mono text-sm">{value}</dd>
    </div>
  );
}
