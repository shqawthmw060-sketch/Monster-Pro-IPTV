import {
  createHash,
  randomBytes,
} from "node:crypto";
import { eq, sql } from "drizzle-orm";
import { db } from "../db/index.js";
import { appSettings } from "../db/persistentSchema.js";

const REQUEST_PREFIX = "admin_login_request:";
const REQUEST_TTL_MS = 5 * 60 * 1000;

export type AdminLoginApprovalStatus =
  | "pending"
  | "approved"
  | "blocked"
  | "expired";

export type AdminLoginApprovalRequest = {
  id: string;
  email: string;
  role: "admin" | "super_admin";
  setupComplete: boolean;
  status: AdminLoginApprovalStatus;
  createdAt: number;
  expiresAt: number;
  approvalTokenHash: string;
  browserTokenHash: string;
};

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function requestKey(id: string) {
  return `${REQUEST_PREFIX}${id}`;
}

function isApprovalRequest(
  value: unknown,
): value is AdminLoginApprovalRequest {
  if (!value || typeof value !== "object") return false;

  const request = value as Partial<AdminLoginApprovalRequest>;

  return (
    typeof request.id === "string" &&
    typeof request.email === "string" &&
    (request.role === "admin" || request.role === "super_admin") &&
    typeof request.setupComplete === "boolean" &&
    (request.status === "pending" ||
      request.status === "approved" ||
      request.status === "blocked" ||
      request.status === "expired") &&
    typeof request.createdAt === "number" &&
    typeof request.expiresAt === "number" &&
    typeof request.approvalTokenHash === "string" &&
    typeof request.browserTokenHash === "string"
  );
}

export async function createAdminLoginApproval(input: {
  email: string;
  role: "admin" | "super_admin";
  setupComplete: boolean;
}) {
  const id = randomBytes(16).toString("hex");
  const approvalToken = randomBytes(32).toString("base64url");
  const browserToken = randomBytes(32).toString("base64url");

  const now = Date.now();

  const request: AdminLoginApprovalRequest = {
    id,
    email: input.email,
    role: input.role,
    setupComplete: input.setupComplete,
    status: "pending",
    createdAt: now,
    expiresAt: now + REQUEST_TTL_MS,
    approvalTokenHash: hashToken(approvalToken),
    browserTokenHash: hashToken(browserToken),
  };

  await db
    .insert(appSettings)
    .values({
      key: requestKey(id),
      value: request,
      isPublic: false,
    });

  return {
    request,
    approvalToken,
    browserToken,
  };
}

export async function getAdminLoginApproval(id: string) {
  const result = await db
    .select({ value: appSettings.value })
    .from(appSettings)
    .where(eq(appSettings.key, requestKey(id)))
    .limit(1);

  const value = result[0]?.value;

  if (!isApprovalRequest(value)) {
    return null;
  }

  if (
    value.status === "pending" &&
    value.expiresAt <= Date.now()
  ) {
    const expired: AdminLoginApprovalRequest = {
      ...value,
      status: "expired",
    };

    await db
      .update(appSettings)
      .set({
        value: expired,
        updatedAt: new Date(),
      })
      .where(eq(appSettings.key, requestKey(id)));

    return expired;
  }

  return value;
}

export async function approveOrBlockAdminLogin(
  id: string,
  token: string,
  action: "approve" | "block",
) {
  const tokenHash = hashToken(token);

  const current = await getAdminLoginApproval(id);

  if (!current) {
    return { ok: false as const, reason: "not_found" as const };
  }

  if (current.status !== "pending") {
    return {
      ok: false as const,
      reason: current.status,
    };
  }

  if (current.approvalTokenHash !== tokenHash) {
    return { ok: false as const, reason: "invalid_token" as const };
  }

  const nextStatus =
    action === "approve" ? "approved" : "blocked";

  const updated = await db
    .update(appSettings)
    .set({
      value: {
        ...current,
        status: nextStatus,
        approvalTokenHash: "",
      },
      updatedAt: new Date(),
    })
    .where(
      sql`${appSettings.key} = ${requestKey(id)}
        AND (${appSettings.value}->>'status') = 'pending'`,
    )
    .returning({ value: appSettings.value });

  const value = updated[0]?.value;

  if (!isApprovalRequest(value)) {
    return { ok: false as const, reason: "already_processed" as const };
  }

  return {
    ok: true as const,
    status: value.status,
  };
}

export async function consumeApprovedAdminLogin(
  id: string,
  browserToken: string,
) {
  const current = await getAdminLoginApproval(id);

  if (!current) {
    return { ok: false as const, reason: "not_found" as const };
  }

  if (current.browserTokenHash !== hashToken(browserToken)) {
    return { ok: false as const, reason: "invalid_browser_token" as const };
  }

  if (current.status === "pending") {
    return { ok: true as const, status: "pending" as const };
  }

  if (current.status !== "approved") {
    return {
      ok: true as const,
      status: current.status,
    };
  }

  const consumed = await db
    .update(appSettings)
    .set({
      value: {
        ...current,
        status: "blocked",
        browserTokenHash: "",
      },
      updatedAt: new Date(),
    })
    .where(
      sql`${appSettings.key} = ${requestKey(id)}
        AND (${appSettings.value}->>'status') = 'approved'
        AND (${appSettings.value}->>'browserTokenHash') = ${current.browserTokenHash}`,
    )
    .returning({ value: appSettings.value });

  const value = consumed[0]?.value;

  if (!isApprovalRequest(value)) {
    return {
      ok: false as const,
      reason: "already_consumed" as const,
    };
  }

  return {
    ok: true as const,
    status: "approved" as const,
    email: value.email,
    role: value.role,
    setupComplete: value.setupComplete,
  };
}
