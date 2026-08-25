/**
 * MONSTER IPTV client error boundary: API errors are normalized to renderable text.
 * Never pass server error objects directly into JSX state.
 */
export function toUserError(value: unknown, fallback: string): string {
  if (typeof value === "string" && value.trim()) return value;
  if (value instanceof Error && value.message.trim()) return value.message;
  if (value && typeof value === "object") {
    const candidate = value as { message?: unknown; error?: unknown; code?: unknown };
    if (typeof candidate.message === "string" && candidate.message.trim()) return candidate.message;
    if (typeof candidate.error === "string" && candidate.error.trim()) return candidate.error;
    if (candidate.error && candidate.error !== value) return toUserError(candidate.error, fallback);
    if (typeof candidate.code === "string" && candidate.code.trim()) return `${candidate.code}: ${fallback}`;
  }
  return fallback;
}
