export type CharsetKey = "uppercase" | "lowercase" | "numbers" | "symbols";

export type GeneratorOptions = {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

export const CHARSETS: Record<CharsetKey, string> = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?/",
};

export const CHARSET_LABELS: Record<CharsetKey, string> = {
  uppercase: "Uppercase Letters (A-Z)",
  lowercase: "Lowercase Letters (a-z)",
  numbers: "Numbers (0-9)",
  symbols: "Symbols (!@#$%^&*)",
};

export type StrengthLabel = "Weak" | "Fair" | "Strong" | "Very Strong";

export type Analysis = {
  password: string;
  length: number;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumbers: boolean;
  hasSymbols: boolean;
  poolSize: number;
  entropy: number;
  score: number;
  label: StrengthLabel;
  recommendations: string[];
};

function randomInt(max: number): number {
  if (typeof globalThis.crypto?.getRandomValues === "function") {
    const buf = new Uint32Array(1);
    const limit = Math.floor(0xffffffff / max) * max;
    let value = 0;
    do {
      globalThis.crypto.getRandomValues(buf);
      value = buf[0] ?? 0;
    } while (value >= limit);
    return value % max;
  }
  return Math.floor(Math.random() * max);
}

function pick(set: string): string {
  return set.charAt(randomInt(set.length));
}

export function generatePassword(options: GeneratorOptions): string {
  const active = (Object.keys(CHARSETS) as CharsetKey[]).filter((key) => options[key]);
  if (active.length === 0) return "";

  const pool = active.map((key) => CHARSETS[key]).join("");
  const chars: string[] = active.map((key) => pick(CHARSETS[key]));

  for (let i = chars.length; i < options.length; i += 1) {
    chars.push(pick(pool));
  }

  // Fisher-Yates shuffle so the guaranteed characters aren't always first.
  for (let i = chars.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    const a = chars[i] as string;
    const b = chars[j] as string;
    chars[i] = b;
    chars[j] = a;
  }

  return chars.slice(0, options.length).join("");
}


export function scoreToLabel(score: number): StrengthLabel {
  if (score < 35) return "Weak";
  if (score < 60) return "Fair";
  if (score < 82) return "Strong";
  return "Very Strong";
}

export function analyzePassword(password: string): Analysis {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[^A-Za-z0-9]/.test(password);

  let poolSize = 0;
  if (hasUppercase) poolSize += 26;
  if (hasLowercase) poolSize += 26;
  if (hasNumbers) poolSize += 10;
  if (hasSymbols) poolSize += 24;

  const length = password.length;
  const entropy = length && poolSize ? +(length * Math.log2(poolSize)).toFixed(1) : 0;

  const variety = [hasUppercase, hasLowercase, hasNumbers, hasSymbols].filter(Boolean).length;
  let score = Math.min(100, Math.round((entropy / 110) * 100));
  if (variety <= 1 && length > 0) score = Math.min(score, 30);
  if (length > 0 && length < 8) score = Math.min(score, 25);
  if (/^(.)\1+$/.test(password)) score = Math.min(score, 8);

  const recommendations: string[] = [];
  if (length === 0) recommendations.push("Enter a password to see a security analysis.");
  if (length > 0 && length < 12) recommendations.push("Use at least 12 characters for real safety.");
  if (length >= 12 && length < 16)
    recommendations.push("16+ characters makes brute-force attacks impractical.");
  if (!hasUppercase && length > 0) recommendations.push("Add uppercase letters (A-Z).");
  if (!hasLowercase && length > 0) recommendations.push("Add lowercase letters (a-z).");
  if (!hasNumbers && length > 0) recommendations.push("Add numbers (0-9).");
  if (!hasSymbols && length > 0) recommendations.push("Add symbols such as !@#$%^&* .");
  if (recommendations.length === 0)
    recommendations.push("Excellent password. Store it in a password manager and never reuse it.");

  return {
    password,
    length,
    hasUppercase,
    hasLowercase,
    hasNumbers,
    hasSymbols,
    poolSize,
    entropy,
    score,
    label: scoreToLabel(score),
    recommendations,
  };
}

export const STRENGTH_TONE: Record<StrengthLabel, { text: string; bar: string; ring: string }> = {
  Weak: { text: "text-danger", bar: "bg-danger", ring: "border-danger/40" },
  Fair: { text: "text-warn", bar: "bg-warn", ring: "border-warn/40" },
  Strong: { text: "text-cyan", bar: "bg-cyan", ring: "border-cyan/40" },
  "Very Strong": { text: "text-success", bar: "bg-success", ring: "border-success/40" },
};
