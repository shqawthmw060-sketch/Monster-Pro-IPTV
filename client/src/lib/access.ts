import { toUserError } from "@/lib/apiError";

export type AccessAccount = {
  id: string;
  displayName: string;
  macAddress: string;
  username: string;
  status: "pending" | "active" | "suspended" | "expired";
  expiresAt: string;
};

export async function getCurrentAccessAccount(): Promise<AccessAccount | null> {
  const response = await fetch("/api/access/me", {
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  if (!response.ok) return null;
  const payload = (await response.json()) as { account: AccessAccount };
  return payload.account;
}

export async function signInWithAccessDetails(input: {
  macAddress: string;
  username: string;
  password: string;
}): Promise<{ account?: AccessAccount; error?: string }> {
  const response = await fetch("/api/access/login", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(input),
  });
  const payload = (await response.json().catch(() => ({}))) as {
    account?: AccessAccount;
    error?: unknown;
  };
  if (!response.ok)
    return { error: toUserError(payload.error, "Unable to sign in.") };
  return { account: payload.account };
}

export async function signOutAccess(): Promise<void> {
  await fetch("/api/access/logout", {
    method: "POST",
    credentials: "include",
  });
}
