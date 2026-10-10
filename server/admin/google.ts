import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { appSettings } from "../db/persistentSchema.js";

const OAUTH_STATE_KEY = "google_oauth_state";
const GOOGLE_TOKEN_KEY = "google_gmail_refresh_token";
const OWNER_EMAIL = "shqawthmw060@gmail.com";

function secret() {
  return process.env.ADMIN_SESSION_SECRET ?? "";
}

function key() {
  return createHash("sha256").update(secret()).digest();
}

function encode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function decode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

export function gmailConfigured() {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_REDIRECT_URI &&
      secret(),
  );
}

export function createOAuthState() {
  const payload = JSON.stringify({
    exp: Math.floor(Date.now() / 1000) + 10 * 60,
    nonce: randomBytes(18).toString("hex"),
  });
  const encoded = encode(payload);
  return `${encoded}.${createHmac("sha256", secret()).update(encoded).digest("base64url")}`;
}

export function verifyOAuthState(value: string) {
  const [encoded, signature] = value.split(".");
  if (!encoded || !signature || !secret()) return false;
  const expected = createHmac("sha256", secret()).update(encoded).digest("base64url");
  if (expected !== signature) return false;
  try {
    const payload = JSON.parse(decode(encoded)) as { exp?: number };
    return Number(payload.exp) > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export function googleAuthorizationUrl() {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID ?? "",
    redirect_uri: process.env.GOOGLE_REDIRECT_URI ?? "",
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
    scope: "https://www.googleapis.com/auth/gmail.send",
    state: createOAuthState(),
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

function encrypt(value: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const ciphertext = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  return JSON.stringify({
    iv: iv.toString("base64url"),
    tag: cipher.getAuthTag().toString("base64url"),
    ciphertext: ciphertext.toString("base64url"),
  });
}

function decrypt(value: string) {
  const parsed = JSON.parse(value) as { iv: string; tag: string; ciphertext: string };
  const decipher = createDecipheriv("aes-256-gcm", key(), Buffer.from(parsed.iv, "base64url"));
  decipher.setAuthTag(Buffer.from(parsed.tag, "base64url"));
  return Buffer.concat([
    decipher.update(Buffer.from(parsed.ciphertext, "base64url")),
    decipher.final(),
  ]).toString("utf8");
}

export async function storeRefreshToken(token: string) {
  await db.insert(appSettings).values({
    key: GOOGLE_TOKEN_KEY,
    value: { encrypted: encrypt(token) },
    isPublic: false,
  }).onConflictDoUpdate({
    target: appSettings.key,
    set: { value: { encrypted: encrypt(token) }, isPublic: false, updatedAt: new Date() },
  });
}

async function getStoredRefreshToken() {
  if (process.env.GOOGLE_REFRESH_TOKEN) return process.env.GOOGLE_REFRESH_TOKEN;
  const rows = await db.select({ value: appSettings.value }).from(appSettings).where(eq(appSettings.key, GOOGLE_TOKEN_KEY)).limit(1);
  const encrypted = (rows[0]?.value as { encrypted?: string } | undefined)?.encrypted;
  if (!encrypted) return null;
  try { return decrypt(encrypted); } catch { return null; }
}

export async function exchangeOAuthCode(code: string) {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID ?? "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      redirect_uri: process.env.GOOGLE_REDIRECT_URI ?? "",
      grant_type: "authorization_code",
    }),
  });
  const payload = await response.json() as { refresh_token?: string; error?: string };
  if (!response.ok || !payload.refresh_token) throw new Error(payload.error ?? "Google OAuth did not return a refresh token.");
  await storeRefreshToken(payload.refresh_token);
}

function base64Url(value: string) {
  return Buffer.from(value).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export async function sendApprovalEmail(input: { attemptId: string; email: string; ipAddress: string; userAgent: string; approveUrl: string; rejectUrl: string; }) {
  const refreshToken = await getStoredRefreshToken();
  if (!refreshToken) throw new Error("Gmail is not connected to the application.");

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID ?? "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  const tokenPayload = await tokenResponse.json() as { access_token?: string; error?: string };
  if (!tokenResponse.ok || !tokenPayload.access_token) throw new Error(tokenPayload.error ?? "Unable to obtain a Gmail access token.");

  const subject = "MONSTER IPTV: طلب دخول إداري جديد (ينتهي خلال 90 ثانية)";
  const body = [
    "تم رصد محاولة دخول إلى لوحة تحكم MONSTER IPTV.",
    "",
    `البريد: ${input.email}`,
    `العنوان: ${input.ipAddress}`,
    `المتصفح: ${input.userAgent.slice(0, 180)}`,
    `المعرف: ${input.attemptId}`,
    "",
    "الموافقة لا تتجاوز كلمة المرور؛ هي تسجل قرارك فقط.",
    `موافقة: ${input.approveUrl}`,
    `رفض: ${input.rejectUrl}`,
    "",
    "ستنتهي صلاحية القرار تلقائيًا بعد 90 ثانية.",
  ].join("\n");
  const raw = [
    `To: ${process.env.GOOGLE_APPROVAL_EMAIL ?? OWNER_EMAIL}`,
    "Content-Type: text/plain; charset=utf-8",
    `Subject: ${subject}`,
    "",
    body,
  ].join("\r\n");

  const sendResponse = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${tokenPayload.access_token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ raw: base64Url(raw) }),
  });
  if (!sendResponse.ok) throw new Error(`Gmail send failed with status ${sendResponse.status}.`);
}
