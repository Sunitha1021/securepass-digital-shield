import { STRENGTH_TONE, type StrengthLabel } from "@/lib/password";
import { cn } from "@/lib/utils";

const STEPS: StrengthLabel[] = ["Weak", "Fair", "Strong", "Very Strong"];

export function StrengthMeter({
  score,
  label,
  compact = false,
}: {
  score: number;
  label: StrengthLabel;
  compact?: boolean;
}) {
  const tone = STRENGTH_TONE[label];
  const activeIndex = STEPS.indexOf(label);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Password strength</span>
        <span className={cn("font-display font-semibold", tone.text)}>
          {label} · {score}%
        </span>
      </div>
      <div
        className="flex gap-1.5"
        role="meter"
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Password strength: ${label}`}
      >
        {STEPS.map((step, i) => (
          <div key={step} className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-700",
                i <= activeIndex ? tone.bar : "bg-transparent",
              )}
              style={{ width: i <= activeIndex ? "100%" : "0%" }}
            />
          </div>
        ))}
      </div>
      {!compact && (
        <div className="flex justify-between text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {STEPS.map((step) => (
            <span key={step}>{step}</span>
          ))}
        </div>
      )}
    </div>
  );
}
