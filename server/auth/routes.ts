import { randomUUID } from "node:crypto";
import { and, eq, gt, isNull } from "drizzle-orm";
import type { Express, Request, Response } from "express";
import { db } from "../db";
import { iptvAccounts, iptvSessions } from "../db/persistentSchema";
import {
  createSessionToken,
  hashPassword,
  hashSessionToken,
  isValidMacAddress,
  normalizeMacAddress,
  verifyPassword,
} from "./credentials";

const SESSION_COOKIE = "monster_access";
const SESSION_DAYS = 30;

function parseCookies(request: Request): Record<string, string> {
  const raw = request.headers.cookie ?? "";
  return Object.fromEntries(
    raw
      .split(";")
      .map((part) => part.trim().split("="))
      .filter(([key, value]) => key && value)
      .map(([key, ...value]) => [key, decodeURIComponent(value.join("="))]),
  );
}

function setSessionCookie(response: Response, token: string, expiresAt: Date) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  response.setHeader(
    "Set-Cookie",
    `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(
      (expiresAt.getTime() - Date.now()) / 1000,
    )}${secure}`,
  );
}

function clearSessionCookie(response: Response) {
  response.setHeader("Set-Cookie", `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
}

function publicAccount(account: typeof iptvAccounts.$inferSelect) {
  return {
    id: account.accountId,
    displayName: account.displayName,
    macAddress: account.macAddress,
    username: account.username,
    status: account.status,
    expiresAt: account.expiresAt,
  };
}

export function registerAccessRoutes(app: Express) {
  app.use((request, _response, next) => {
    if (request.path.startsWith("/api/")) next();
    else next();
  });

  app.post("/api/access/login", async (request, response) => {
    try {
      const macAddress = normalizeMacAddress(String(request.body?.macAddress ?? ""));
      const username = String(request.body?.username ?? "").trim();
      const password = String(request.body?.password ?? "");

      if (!isValidMacAddress(macAddress) || username.length < 3 || password.length < 1) {
        response.status(400).json({ error: "MAC Address, username, and password are required." });
        return;
      }

      const account = await db.query.iptvAccounts.findFirst({
        where: eq(iptvAccounts.username, username),
      });

      if (!account || account.macAddress !== macAddress || !(await verifyPassword(password, account.passwordHash))) {
        response.status(401).json({ error: "The access details are not valid." });
        return;
      }

      const now = new Date();
      if (account.status !== "active" || !account.expiresAt || account.expiresAt <= now) {
        response.status(403).json({
          error: account.status === "pending" ? "This account is awaiting activation." : "This subscription is not active.",
          status: account.status,
        });
        return;
      }

      const expiresAt = new Date(now.getTime() + SESSION_DAYS * 24 * 60 * 60 * 1000);
      const token = createSessionToken();
        await db.insert(iptvSessions).values({
        accountId: account.accountId,
        tokenHash: hashSessionToken(token),
        expiresAt,
      });
      setSessionCookie(response, token, expiresAt);
      response.json({ account: publicAccount(account) });
    } catch (error) {
      console.error("access login failed", error instanceof Error ? error.message : "unknown error");
      response.status(500).json({ error: "Unable to complete sign in right now." });
    }
  });

  app.get("/api/access/me", async (request, response) => {
    try {
      const token = parseCookies(request)[SESSION_COOKIE];
      if (!token) {
        response.status(401).json({ error: "Not signed in." });
        return;
      }

      const [sessionRow] = await db
        .select({ session: iptvSessions, account: iptvAccounts })
        .from(iptvSessions)
        .innerJoin(iptvAccounts, eq(iptvSessions.accountId, iptvAccounts.accountId))
        .where(and(
          eq(iptvSessions.tokenHash, hashSessionToken(token)),
          isNull(iptvSessions.revokedAt),
          gt(iptvSessions.expiresAt, new Date()),
        ))
        .limit(1);

      if (!sessionRow || sessionRow.account.status !== "active" || !sessionRow.account.expiresAt || sessionRow.account.expiresAt <= new Date()) {
        clearSessionCookie(response);
        response.status(401).json({ error: "Session expired." });
        return;
      }

      response.json({ account: publicAccount(sessionRow.account) });
    } catch (error) {
      console.error("access session lookup failed", error instanceof Error ? error.message : "unknown error");
      response.status(500).json({ error: "Unable to check the session right now." });
    }
  });

  app.post("/api/access/logout", async (request, response) => {
    try {
      const token = parseCookies(request)[SESSION_COOKIE];
      if (token) {
        await db.update(iptvSessions)
          .set({ revokedAt: new Date() })
          .where(eq(iptvSessions.tokenHash, hashSessionToken(token)));
      }
      clearSessionCookie(response);
      response.status(204).end();
    } catch (error) {
      console.error("access logout failed", error instanceof Error ? error.message : "unknown error");
      response.status(500).json({ error: "Unable to sign out right now." });
    }
  });

  app.post("/api/admin/access-accounts", async (request, response) => {
    try {
      const provisioningKey = process.env.ADMIN_PROVISIONING_KEY;
      const suppliedKey = request.header("x-admin-provisioning-key");
      if (!provisioningKey || !suppliedKey || suppliedKey !== provisioningKey) {
        response.status(403).json({ error: "Admin provisioning is not configured or not authorized." });
        return;
      }

      const provisionerUserId = process.env.OWNER_OPEN_ID;
      if (!provisionerUserId) {
        response.status(500).json({ error: "Account provisioning is not configured." });
        return;
      }

      const displayName = String(request.body?.displayName ?? "").trim();
      const macAddress = normalizeMacAddress(String(request.body?.macAddress ?? ""));
      const username = String(request.body?.username ?? "").trim();
      const password = String(request.body?.password ?? "");
      const expiresAtRaw = String(request.body?.expiresAt ?? "");
      const expiresAt = new Date(expiresAtRaw);

      if (!displayName || !isValidMacAddress(macAddress) || username.length < 3 || password.length < 8 || Number.isNaN(expiresAt.getTime())) {
        response.status(400).json({ error: "Display name, valid MAC, username, password, and expiry are required." });
        return;
      }

      const [account] = await db.insert(iptvAccounts).values({
        accountId: randomUUID(),
        userId: provisionerUserId,
        displayName,
        macAddress,
        username,
        passwordHash: await hashPassword(password),
        status: "active",
        expiresAt,
      }).returning();

      response.status(201).json({ account: publicAccount(account) });
    } catch (error) {
      console.error("access account provisioning failed", error instanceof Error ? error.message : "unknown error");
      response.status(500).json({ error: "Unable to provision the account." });
    }
  });
}
