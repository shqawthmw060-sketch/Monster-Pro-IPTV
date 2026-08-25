import { createHmac, timingSafeEqual } from "node:crypto";
import type { Express, Request, Response } from "express";
import { count, eq } from "drizzle-orm";
import { db } from "../db";
import { auditLogs, devices, iptvAccounts, mediaItems, subscriptions, users } from "../db/persistentSchema";
import { createSessionToken, verifyPassword } from "../auth/credentials";

type AdminRole = "admin" | "super_admin";
type AdminSession = { email: string; role: AdminRole; exp: number; nonce: string };
const COOKIE = "monster_admin";
const MAX_AGE = 8 * 60 * 60;

function secret() { return process.env.ADMIN_SESSION_SECRET ?? ""; }
function sign(value: string) { return createHmac("sha256", secret()).update(value).digest("base64url"); }
function encode(session: AdminSession) {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}
function decode(value?: string): AdminSession | null {
  if (!value || !secret()) return null;
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return null;
  const expected = sign(payload);
  if (expected.length !== signature.length || !timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as AdminSession;
    if ((session.role !== "admin" && session.role !== "super_admin") || session.exp <= Math.floor(Date.now() / 1000)) return null;
    return session;
  } catch { return null; }
}
function cookies(request: Request) {
  return Object.fromEntries((request.headers.cookie ?? "").split(";").map((part) => part.trim().split("=")).filter(([key, value]) => key && value).map(([key, ...value]) => [key, decodeURIComponent(value.join("="))]));
}
function setCookie(response: Response, value: string) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  response.setHeader("Set-Cookie", `${COOKIE}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE}${secure}`);
}
function clearCookie(response: Response) { response.setHeader("Set-Cookie", `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`); }

export function getAdminSession(request: Request): AdminSession | null { return decode(cookies(request)[COOKIE]); }
export function requireAdmin(request: Request, response: Response): AdminSession | null {
  const session = getAdminSession(request);
  if (!session) response.status(401).json({ error: "Administrative sign-in required." });
  return session;
}

export function registerAdminRoutes(app: Express) {
  app.post("/api/admin/login", async (request, response) => {
    const configuredEmail = String(process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
    const configuredHash = String(process.env.ADMIN_PASSWORD_HASH ?? "");
    const configuredRole = process.env.ADMIN_ROLE === "super_admin" ? "super_admin" : "admin";
    const email = String(request.body?.email ?? "").trim().toLowerCase();
    const password = String(request.body?.password ?? "");
    if (!configuredEmail || !configuredHash || !secret()) {
      response.status(503).json({ error: "Administrative sign-in is not configured." });
      return;
    }
    let credentialsValid = false;
    try {
      credentialsValid = email === configuredEmail && await verifyPassword(password, configuredHash);
    } catch {
      credentialsValid = false;
    }
    if (!credentialsValid) {
      response.status(401).json({ error: "The administrative credentials are not valid." });
      return;
    }
    const session: AdminSession = { email, role: configuredRole, exp: Math.floor(Date.now() / 1000) + MAX_AGE, nonce: createSessionToken() };
    setCookie(response, encode(session));
    response.json({ admin: { email: session.email, role: session.role } });
  });
  app.get("/api/admin/overview", async (request, response) => {
    if (!requireAdmin(request, response)) return;
    try {
      const [usersCount, devicesCount, moviesCount, seriesCount, accountsCount, subscriptionsCount, auditCount] = await Promise.all([
        db.select({ value: count() }).from(users),
        db.select({ value: count() }).from(devices),
        db.select({ value: count() }).from(mediaItems).where(eq(mediaItems.kind, "movie")),
        db.select({ value: count() }).from(mediaItems).where(eq(mediaItems.kind, "series")),
        db.select({ value: count() }).from(iptvAccounts),
        db.select({ value: count() }).from(subscriptions),
        db.select({ value: count() }).from(auditLogs),
      ]);
      response.json({ connected: true, counts: { users: usersCount[0]?.value ?? 0, devices: devicesCount[0]?.value ?? 0, movies: moviesCount[0]?.value ?? 0, series: seriesCount[0]?.value ?? 0, accessAccounts: accountsCount[0]?.value ?? 0, subscriptions: subscriptionsCount[0]?.value ?? 0, auditEvents: auditCount[0]?.value ?? 0 } });
    } catch (error) {
      console.error("admin overview failed", error instanceof Error ? error.message : "unknown error");
      response.status(503).json({ connected: false, error: "Admin data is not available right now." });
    }
  });
  app.get("/api/admin/me", (request, response) => {
    const session = getAdminSession(request);
    if (!session) { response.status(401).json({ error: "Administrative sign-in required." }); return; }
    response.json({ admin: { email: session.email, role: session.role } });
  });
  app.post("/api/admin/logout", (_request, response) => { clearCookie(response); response.status(204).end(); });
}
