/**
 * API integration layer for the SecurePass Python FastAPI backend.
 *
 * Endpoints:
 *   POST /generate-password
 *   POST /analyze-password
 *   GET  /health
 *
 * Set VITE_SECUREPASS_API_URL to point at the FastAPI server. When it is not
 * configured (or the request fails) we fall back to the local, offline-safe
 * implementation so the UI always works and passwords never leave the device.
 */
import { analyzePassword, generatePassword, type Analysis, type GeneratorOptions } from "./password";

const API_BASE = (import.meta.env["VITE_SECUREPASS_API_URL"] as string | undefined)?.replace(
  /\/$/,
  "",
);

export type ApiSource = "backend" | "local";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_BASE) throw new Error("SecurePass API URL is not configured");
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return (await response.json()) as T;
}

/** POST /generate-password */
export async function requestPassword(
  options: GeneratorOptions,
): Promise<{ password: string; source: ApiSource }> {
  try {
    const data = await request<{ password: string }>("/generate-password", {
      method: "POST",
      body: JSON.stringify(options),
    });
    if (data?.password) return { password: data.password, source: "backend" };
    throw new Error("Malformed response");
  } catch {
    return { password: generatePassword(options), source: "local" };
  }
}

/** POST /analyze-password */
export async function requestAnalysis(
  password: string,
): Promise<{ analysis: Analysis; source: ApiSource }> {
  try {
    const data = await request<Partial<Analysis>>("/analyze-password", {
      method: "POST",
      body: JSON.stringify({ password }),
    });
    const local = analyzePassword(password);
    return { analysis: { ...local, ...data, password }, source: "backend" };
  } catch {
    return { analysis: analyzePassword(password), source: "local" };
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
