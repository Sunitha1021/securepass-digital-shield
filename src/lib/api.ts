/**
 * API integration layer for the SecurePass Python FastAPI backend.
 *
 * Endpoints:
 *   POST /generate-password
 *   POST /analyze-password
 *   GET  /health
 *
 * The base URL comes from VITE_SECUREPASS_API_URL (see .env). When it is not
 * configured — or the backend is unreachable — we fall back to the local,
 * offline-safe implementation so the UI always works and no password leaves
 * the device. Nothing is ever persisted.
 */
import {
  analyzePassword,
  generatePassword,
  scoreToLabel,
  type Analysis,
  type GeneratorOptions,
  type StrengthLabel,
} from "./password";

const API_BASE = (
  (import.meta.env["VITE_SECUREPASS_API_URL"] as string | undefined) ?? ""
).replace(/\/$/, "");

export const apiConfigured = API_BASE.length > 0;

export type ApiSource = "backend" | "local";

/** Shape returned by both FastAPI password endpoints. */
type BackendPayload = {
  password?: string;
  length?: number;
  score?: number;
  strength?: string;
  entropy?: number;
  has_lowercase?: boolean;
  has_uppercase?: boolean;
  has_number?: boolean;
  has_symbol?: boolean;
  recommendations?: string[];
};

export type ApiResult = {
  analysis: Analysis;
  source: ApiSource;
  /** Present when the backend call failed and we fell back to local analysis. */
  error?: string;
};

const LABELS: StrengthLabel[] = ["Weak", "Fair", "Strong", "Very Strong"];

function normalizeLabel(strength: string | undefined, score: number): StrengthLabel {
  if (strength) {
    const match = LABELS.find((label) => label.toLowerCase() === strength.trim().toLowerCase());
    if (match) return match;
    const lower = strength.toLowerCase();
    if (lower.includes("very")) return "Very Strong";
    if (lower.includes("strong")) return "Strong";
    if (lower.includes("fair") || lower.includes("medium") || lower.includes("moderate"))
      return "Fair";
    if (lower.includes("weak")) return "Weak";
  }
  return scoreToLabel(score);
}

/** Backends may score 0-4, 0-5 or 0-100 — normalize to a 0-100 percentage. */
function normalizeScore(score: number | undefined, fallback: number): number {
  if (typeof score !== "number" || Number.isNaN(score)) return fallback;
  const value = score <= 10 ? (score / 5) * 100 : score;
  return Math.max(0, Math.min(100, Math.round(value)));
}

/** Merge a backend payload onto the local analysis (local values are fallbacks). */
function toAnalysis(payload: BackendPayload, password: string): Analysis {
  const local = analyzePassword(password);
  const score = normalizeScore(payload.score, local.score);
  return {
    password,
    length: typeof payload.length === "number" ? payload.length : local.length,
    hasUppercase: payload.has_uppercase ?? local.hasUppercase,
    hasLowercase: payload.has_lowercase ?? local.hasLowercase,
    hasNumbers: payload.has_number ?? local.hasNumbers,
    hasSymbols: payload.has_symbol ?? local.hasSymbols,
    poolSize: local.poolSize,
    entropy:
      typeof payload.entropy === "number" ? +payload.entropy.toFixed(1) : local.entropy,
    score,
    label: normalizeLabel(payload.strength, score),
    recommendations:
      payload.recommendations && payload.recommendations.length > 0
        ? payload.recommendations
        : local.recommendations,
  };
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Unexpected error contacting the SecurePass API";
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!apiConfigured) throw new Error("SecurePass API URL is not configured");
  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    });
  } catch {
    throw new Error("Cannot reach the SecurePass API. Is the FastAPI server running?");
  }
  if (!response.ok) {
    throw new Error(`SecurePass API error (${response.status} ${response.statusText})`);
  }
  return (await response.json()) as T;
}

/** POST /generate-password */
export async function requestPassword(options: GeneratorOptions): Promise<ApiResult> {
  try {
    const data = await request<BackendPayload>("/generate-password", {
      method: "POST",
      body: JSON.stringify({
        length: options.length,
        uppercase: options.uppercase,
        lowercase: options.lowercase,
        numbers: options.numbers,
        symbols: options.symbols,
      }),
    });
    if (!data?.password) throw new Error("Malformed response from /generate-password");
    return { analysis: toAnalysis(data, data.password), source: "backend" };
  } catch (error) {
    const password = generatePassword(options);
    return {
      analysis: analyzePassword(password),
      source: "local",
      error: errorMessage(error),
    };
  }
}

/** POST /analyze-password */
export async function requestAnalysis(password: string): Promise<ApiResult> {
  try {
    const data = await request<BackendPayload>("/analyze-password", {
      method: "POST",
      body: JSON.stringify({ password }),
    });
    return { analysis: toAnalysis(data, password), source: "backend" };
  } catch (error) {
    return { analysis: analyzePassword(password), source: "local", error: errorMessage(error) };
  }
}

/** GET /health */
export async function checkHealth(): Promise<{ online: boolean }> {
  try {
    await request<{ status?: string }>("/health", { method: "GET" });
    return { online: true };
  } catch {
    return { online: false };
  }
}
