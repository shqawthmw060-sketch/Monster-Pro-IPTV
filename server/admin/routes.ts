import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import type { Express, Request, Response } from "express";
import { and, count, eq } from "drizzle-orm";
import { db } from "../db/index.js";
import {
  appSettings,
  adminLoginAttempts,
  auditLogs,
  devices,
  iptvAccounts,
  mediaItems,
  mediaSources,
  subscriptions,
  users,
} from "../db/persistentSchema.js";
import {
  exchangeOAuthCode,
  gmailConfigured,
  googleAuthorizationUrl,
  sendApprovalEmail,
  verifyOAuthState,
} from "./google.js";
import {
  createSessionToken,
  hashPassword,
  isValidMacAddress,
  normalizeMacAddress,
  verifyPassword,
} from "../auth/credentials.js";

type AdminRole = "admin" | "super_admin";

type AdminSession = {
  email: string;
  role: AdminRole;
  exp: number;
  nonce: string;
};

type StoredAdminCredentials = {
  email: string;
  passwordHash: string;
  role: AdminRole;
  setupComplete: boolean;
};

const COOKIE = "monster_admin";
const MAX_AGE = 8 * 60 * 60;
const SETTINGS_KEY = "admin_credentials";
const APPROVAL_SECONDS = 90;

function hashDecisionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function requestIp(request: Request) {
  return String(request.headers["x-forwarded-for"] ?? request.socket.remoteAddress ?? "unknown")
    .split(",")[0]
    .trim()
    .slice(0, 128);
}

function publicOrigin(request: Request) {
  const configured = process.env.PUBLIC_APP_URL?.replace(/\/$/, "");
  if (configured) return configured;
  const protocol = request.headers["x-forwarded-proto"] ?? request.protocol;
  return `${protocol}://${request.get("host")}`;
}

function secret() {
  return process.env.ADMIN_SESSION_SECRET ?? "";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

function encode(session: AdminSession) {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function decode(value?: string): AdminSession | null {
  if (!value || !secret()) return null;

  const [payload, signature] = value.split(".");

  if (!payload || !signature) return null;

  const expected = sign(payload);

  if (
    expected.length !== signature.length ||
    !timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
  ) {
    return null;
  }

  try {
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as AdminSession;

    if (
      (session.role !== "admin" && session.role !== "super_admin") ||
      session.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

function cookies(request: Request) {
  return Object.fromEntries(
    (request.headers.cookie ?? "")
      .split(";")
      .map((part) => part.trim().split("="))
      .filter(([key, value]) => key && value)
      .map(([key, ...value]) => [
        key,
        decodeURIComponent(value.join("=")),
      ]),
  );
}

function setCookie(response: Response, value: string) {
  const secure =
    process.env.NODE_ENV === "production" ? "; Secure" : "";

  response.setHeader(
    "Set-Cookie",
    `${COOKIE}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE}${secure}`,
  );
}

function clearCookie(response: Response) {
  response.setHeader(
    "Set-Cookie",
    `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
  );
}

export function getAdminSession(
  request: Request,
): AdminSession | null {
  return decode(cookies(request)[COOKIE]);
}

export function requireAdmin(
  request: Request,
  response: Response,
): AdminSession | null {
  const session = getAdminSession(request);

  if (!session) {
    response
      .status(401)
      .json({ error: "Administrative sign-in required." });
  }

  return session;
}

async function getStoredAdminCredentials(): Promise<StoredAdminCredentials | null> {
  try {
    const result = await db
      .select({ value: appSettings.value })
      .from(appSettings)
      .where(eq(appSettings.key, SETTINGS_KEY))
      .limit(1);

    const value = result[0]?.value;

    if (!value || typeof value !== "object") {
      return null;
    }

    const stored = value as Partial<StoredAdminCredentials>;

    if (
      typeof stored.email !== "string" ||
      typeof stored.passwordHash !== "string" ||
      (stored.role !== "admin" && stored.role !== "super_admin")
    ) {
      return null;
    }

    return {
      email: stored.email,
      passwordHash: stored.passwordHash,
      role: stored.role,
      setupComplete: stored.setupComplete === true,
    };
  } catch {
    return null;
  }
}

async function saveAdminCredentials(
  credentials: StoredAdminCredentials,
) {
  await db
    .insert(appSettings)
    .values({
      key: SETTINGS_KEY,
      value: credentials,
      isPublic: false,
    })
    .onConflictDoUpdate({
      target: appSettings.key,
      set: {
        value: credentials,
        isPublic: false,
        updatedAt: new Date(),
      },
    });
}

export function registerAdminRoutes(app: Express) {
  app.get("/api/admin/google/start", (request, response) => {
    if (!gmailConfigured()) {
      response.status(503).send("Google Gmail integration is not configured.");
      return;
    }
    response.redirect(googleAuthorizationUrl());
  });

  app.get("/api/admin/google/callback", async (request, response) => {
    const code = String(request.query.code ?? "");
    const state = String(request.query.state ?? "");
    if (!code || !verifyOAuthState(state)) {
      response.status(400).send("Invalid or expired Google authorization.");
      return;
    }
    try {
      await exchangeOAuthCode(code);
      response.type("html").send("<h1>Gmail connected</h1><p>You can close this window and return to MONSTER IPTV.</p>");
    } catch {
      response.status(502).send("Unable to connect Gmail right now.");
    }
  });

  app.get("/api/admin/access-decision", async (request, response) => {
    const token = String(request.query.token ?? "");
    const action = request.query.action === "approve" ? "approved" : request.query.action === "reject" ? "rejected" : null;
    if (!token || !action) {
      response.status(400).send("Invalid decision link.");
      return;
    }
    try {
      const rows = await db.select().from(adminLoginAttempts)
        .where(eq(adminLoginAttempts.decisionTokenHash, hashDecisionToken(token)))
        .limit(1);
      const attempt = rows[0];
      if (!attempt) {
        response.status(410).send("This decision link has expired or was already used.");
        return;
      }
      if (attempt.status === "pending" && attempt.expiresAt <= new Date()) {
        await db.update(adminLoginAttempts).set({ status: "expired", decidedAt: new Date() }).where(eq(adminLoginAttempts.id, attempt.id));
      }
      if (attempt.status !== "pending" || attempt.expiresAt <= new Date()) {
        response.status(410).send("This decision link has expired or was already used.");
        return;
      }
      await db.update(adminLoginAttempts).set({ status: action, decidedAt: new Date() }).where(eq(adminLoginAttempts.id, attempt.id));
      await db.insert(auditLogs).values({ action: `admin_login_${action}`, resourceType: "admin_login_attempt", resourceId: attempt.id, metadata: { email: attempt.email, ipAddress: attempt.ipAddress } });
      response.type("html").send(`<h1>Decision recorded</h1><p>This login attempt was ${action}. The link cannot be reused.</p>`);
    } catch {
      response.status(503).send("Unable to save the decision right now.");
    }
  });

  app.post("/api/admin/login", async (request, response) => {
    const bootstrapEmail = String(
      process.env.ADMIN_EMAIL ?? "",
    )
      .trim()
      .toLowerCase();

    const bootstrapHash = String(
      process.env.ADMIN_PASSWORD_HASH ?? "",
    ).trim();

    const bootstrapRole =
      process.env.ADMIN_ROLE === "super_admin"
        ? "super_admin"
        : "admin";

    const email = String(request.body?.email ?? "")
      .trim()
      .toLowerCase();

    const password = String(request.body?.password ?? "");

    if (!secret()) {
      response.status(503).json({
        error: "Administrative sign-in is not configured.",
      });
      return;
    }

    let stored = await getStoredAdminCredentials();

    let credentialsValid = false;
    let role: AdminRole = bootstrapRole;

    // Explicit Vercel credentials are authoritative. This allows the owner to
    // rotate credentials without being locked out by an older Neon setup row.
    if (bootstrapEmail && bootstrapHash) {
      credentialsValid =
        email === bootstrapEmail &&
        (await verifyPassword(password, bootstrapHash));

      role = bootstrapRole;
    } else if (stored?.setupComplete) {
      credentialsValid =
        email === stored.email &&
        (await verifyPassword(password, stored.passwordHash));

      role = stored.role;
    } else {
      response.status(503).json({
        error: "Administrative sign-in is not configured.",
      });
      return;
    }

    if (!credentialsValid) {
      if (gmailConfigured()) {
        const token = randomBytes(32).toString("base64url");
        const expiresAt = new Date(Date.now() + APPROVAL_SECONDS * 1000);
        try {
          const [attempt] = await db.insert(adminLoginAttempts).values({
            email,
            ipAddress: requestIp(request),
            userAgent: String(request.headers["user-agent"] ?? "unknown").slice(0, 500),
            status: "pending",
            decisionTokenHash: hashDecisionToken(token),
            expiresAt,
          }).returning({ id: adminLoginAttempts.id });
          const origin = publicOrigin(request);
          await sendApprovalEmail({
            attemptId: attempt.id,
            email,
            ipAddress: requestIp(request),
            userAgent: String(request.headers["user-agent"] ?? "unknown"),
            approveUrl: `${origin}/api/admin/access-decision?action=approve&token=${encodeURIComponent(token)}`,
            rejectUrl: `${origin}/api/admin/access-decision?action=reject&token=${encodeURIComponent(token)}`,
          });
        } catch (error) {
          console.error("admin login approval notification failed", error instanceof Error ? error.message : "unknown error");
        }
      }
      response.status(401).json({
        error: "The administrative credentials are not valid.",
      });
      return;
    }

    const session: AdminSession = {
      email,
      role,
      exp: Math.floor(Date.now() / 1000) + MAX_AGE,
      nonce: createSessionToken(),
    };

    setCookie(response, encode(session));

    response.json({
      admin: {
        email: session.email,
        role: session.role,
      },
      needsSetup: !stored?.setupComplete,
    });
  });

  app.post("/api/admin/setup", async (request, response) => {
    const session = requireAdmin(request, response);

    if (!session) return;

    const existing = await getStoredAdminCredentials();

    if (existing?.setupComplete) {
      response.status(409).json({
        error: "Initial administrator setup has already been completed.",
      });
      return;
    }

    const email = String(request.body?.email ?? "")
      .trim()
      .toLowerCase();

    const password = String(request.body?.password ?? "");
    const confirmPassword = String(
      request.body?.confirmPassword ?? "",
    );

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      response.status(400).json({
        error: "Enter a valid administrator email.",
      });
      return;
    }

    if (password.length < 10) {
      response.status(400).json({
        error: "The administrator password must be at least 10 characters.",
      });
      return;
    }

    if (password !== confirmPassword) {
      response.status(400).json({
        error: "The password confirmation does not match.",
      });
      return;
    }

    try {
      const passwordHash = await hashPassword(password);

      const credentials: StoredAdminCredentials = {
        email,
        passwordHash,
        role: session.role,
        setupComplete: true,
      };

      await saveAdminCredentials(credentials);

      const newSession: AdminSession = {
        email,
        role: session.role,
        exp: Math.floor(Date.now() / 1000) + MAX_AGE,
        nonce: createSessionToken(),
      };

      setCookie(response, encode(newSession));

      response.json({
        admin: {
          email: newSession.email,
          role: newSession.role,
        },
        setupComplete: true,
      });
    } catch (error) {
      console.error(
        "admin setup failed",
        error instanceof Error ? error.message : "unknown error",
      );

      response.status(503).json({
        error: "Unable to save the administrator account right now.",
      });
    }
  });

  app.post("/api/admin/content", async (request, response) => {
    if (!requireAdmin(request, response)) return;

    const kind = ["movie", "series", "channel"].includes(request.body?.kind)
      ? request.body.kind
      : null;
    const generatedTitle = `${kind === "movie" ? "Movie" : kind === "series" ? "Series" : "Channel"} ${Date.now()}`;
    const title = String(request.body?.title ?? generatedTitle).trim();
    const slug = `${kind}-${Date.now()}-${randomBytes(3).toString("hex")}`;
    const sourceUrl = String(request.body?.sourceUrl ?? "").trim();
    const providerName = String(request.body?.providerName ?? "Admin supplied").trim();

    if (!kind || !/^https?:\/\//i.test(sourceUrl) || !providerName) {
      response.status(400).json({ error: "اختر النوع وأدخل رابط المحتوى." });
      return;
    }
    if (request.body?.isAuthorized !== true) {
      response.status(400).json({ error: "يجب تأكيد أن مصدر المحتوى قانوني ومصرح بعرضه." });
      return;
    }

    try {
      const [item] = await db.insert(mediaItems).values({
        kind,
        title,
        slug,
        synopsis: String(request.body?.synopsis ?? "").trim() || null,
        posterUrl: String(request.body?.posterUrl ?? "").trim() || null,
        isPublished: true,
      }).returning({ id: mediaItems.id });
      await db.insert(mediaSources).values({
        mediaId: item.id,
        kind: "external",
        sourceUrl,
        providerName,
        isAuthorized: true,
        isActive: true,
      });
      await db.insert(auditLogs).values({ action: "admin_content_created", resourceType: "media_item", resourceId: item.id, metadata: { kind, title, providerName } });
      response.status(201).json({ id: item.id, message: "Content saved." });
    } catch (error) {
      console.error("admin content creation failed", error instanceof Error ? error.message : "unknown error");
      response.status(409).json({ error: "تعذر حفظ المحتوى. تأكد أن الـ Slug غير مستخدم." });
    }
  });

  app.post("/api/admin/access-accounts", async (request, response) => {
    if (!requireAdmin(request, response)) return;
    const displayName = String(request.body?.displayName ?? "").trim();
    const phoneNumber = String(request.body?.phoneNumber ?? "").replace(/[^0-9+]/g, "").trim();
    const requestedMac = normalizeMacAddress(String(request.body?.macAddress ?? ""));
    const username = String(request.body?.username ?? "").trim();
    const generatedMac = randomBytes(6).toString("hex").toUpperCase();
    const macAddress = requestedMac || generatedMac;
    const password = String(request.body?.password ?? "") || randomBytes(9).toString("base64url");
    const expiresAt = request.body?.expiresAt ? new Date(String(request.body.expiresAt)) : null;
    if (!displayName || !/^\+?[1-9][0-9]{8,14}$/.test(phoneNumber) || !isValidMacAddress(macAddress) || username.length < 3 || (expiresAt && Number.isNaN(expiresAt.getTime()))) {
      response.status(400).json({ error: "بيانات الاشتراك غير مكتملة أو غير صحيحة." });
      return;
    }
    try {
      const accountId = `acct_${randomBytes(12).toString("hex")}`;
      await db.insert(iptvAccounts).values({ accountId, userId: accountId, displayName, phoneNumber, macAddress, username, passwordHash: await hashPassword(password), status: "active", expiresAt });
      await db.insert(auditLogs).values({ action: "admin_access_account_created", resourceType: "iptv_account", resourceId: accountId, metadata: { username, macAddress } });
      response.status(201).json({ accountId, phoneNumber, macAddress, username, password, message: "Subscription created." });
    } catch (error) {
      console.error("admin access account creation failed", error instanceof Error ? error.message : "unknown error");
      response.status(409).json({ error: "تعذر إنشاء الاشتراك. تحقق من عدم تكرار MAC أو Username." });
    }
  });

  app.post("/api/admin/settings", async (request, response) => {
    if (!requireAdmin(request, response)) return;
    const visual = request.body?.visual && typeof request.body.visual === "object" ? request.body.visual : {};
    const links = request.body?.links && typeof request.body.links === "object" ? request.body.links : {};
    await db.insert(appSettings).values({ key: "public_links", value: links, isPublic: true }).onConflictDoUpdate({ target: appSettings.key, set: { value: links, isPublic: true, updatedAt: new Date() } });
    await db.insert(appSettings).values({ key: "visual_assets", value: visual, isPublic: true }).onConflictDoUpdate({ target: appSettings.key, set: { value: visual, isPublic: true, updatedAt: new Date() } });
    await db.insert(auditLogs).values({ action: "admin_settings_updated", resourceType: "app_settings", resourceId: "public_links,visual_assets" });
    response.json({ message: "Settings saved." });
  });

  app.get("/api/admin/overview", async (request, response) => {
    if (!requireAdmin(request, response)) return;

    try {
      const [
        usersCount,
        devicesCount,
        moviesCount,
        seriesCount,
        accountsCount,
        subscriptionsCount,
        auditCount,
      ] = await Promise.all([
        db.select({ value: count() }).from(users).catch(() => [{ value: 0 }]),
        db.select({ value: count() }).from(devices).catch(() => [{ value: 0 }]),
        db
          .select({ value: count() })
          .from(mediaItems)
          .where(eq(mediaItems.kind, "movie")).catch(() => [{ value: 0 }]),
        db
          .select({ value: count() })
          .from(mediaItems)
          .where(eq(mediaItems.kind, "series")).catch(() => [{ value: 0 }]),
        db.select({ value: count() }).from(iptvAccounts).catch(() => [{ value: 0 }]),
        db.select({ value: count() }).from(subscriptions).catch(() => [{ value: 0 }]),
        db.select({ value: count() }).from(auditLogs).catch(() => [{ value: 0 }]),
      ]);

      response.json({
        connected: true,
        counts: {
          users: usersCount[0]?.value ?? 0,
          devices: devicesCount[0]?.value ?? 0,
          movies: moviesCount[0]?.value ?? 0,
          series: seriesCount[0]?.value ?? 0,
          accessAccounts: accountsCount[0]?.value ?? 0,
          subscriptions: subscriptionsCount[0]?.value ?? 0,
          auditEvents: auditCount[0]?.value ?? 0,
        },
      });
    } catch (error) {
      console.error(
        "admin overview failed",
        error instanceof Error ? error.message : "unknown error",
      );

      response.status(503).json({
        connected: false,
        error: "Admin data is not available right now.",
      });
    }
  });

  app.get("/api/admin/me", async (request, response) => {
    const session = getAdminSession(request);

    if (!session) {
      response
        .status(401)
        .json({ error: "Administrative sign-in required." });
      return;
    }

    const stored = await getStoredAdminCredentials();

    response.json({
      admin: {
        email: session.email,
        role: session.role,
      },
      needsSetup: !stored?.setupComplete,
    });
  });

  app.post("/api/admin/logout", (_request, response) => {
    clearCookie(response);
    response.status(204).end();
  });
}
