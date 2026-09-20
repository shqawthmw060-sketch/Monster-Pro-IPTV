import { and, eq, gt, isNull } from "drizzle-orm";
import type { Express, Request, Response } from "express";
import { db } from "../db/index.js";
import { iptvAccounts, iptvSessions, mediaItems, mediaSources } from "../db/persistentSchema.js";
import { hashSessionToken } from "../auth/credentials.js";

function cookie(request: Request, name: string): string | undefined {
  const raw = request.headers.cookie ?? "";
  const part = raw.split(";").map((entry) => entry.trim()).find((entry) => entry.startsWith(`${name}=`));
  return part ? decodeURIComponent(part.slice(name.length + 1)) : undefined;
}

async function hasActiveSession(request: Request): Promise<boolean> {
  const token = cookie(request, "monster_access");
  if (!token) return false;
  const rows = await db.select({ id: iptvSessions.id }).from(iptvSessions)
    .innerJoin(iptvAccounts, eq(iptvSessions.accountId, iptvAccounts.accountId))
    .where(and(
      eq(iptvSessions.tokenHash, hashSessionToken(token)),
      isNull(iptvSessions.revokedAt),
      gt(iptvSessions.expiresAt, new Date()),
      eq(iptvAccounts.status, "active"),
    )).limit(1);
  return rows.length > 0;
}

export function registerCatalogRoutes(app: Express) {
  app.get("/api/content/catalog", async (request: Request, response: Response) => {
    if (!(await hasActiveSession(request))) {
      response.status(401).json({ error: "Not signed in." });
      return;
    }
    const type = request.query.type === "series" ? "series" : "movie";
    const rows = await db.select({ item: mediaItems, source: mediaSources })
      .from(mediaItems)
      .innerJoin(mediaSources, and(eq(mediaSources.mediaId, mediaItems.id), eq(mediaSources.isAuthorized, true), eq(mediaSources.isActive, true)))
      .where(and(eq(mediaItems.kind, type), eq(mediaItems.isPublished, true)));
    response.json({ items: rows.map(({ item, source }) => ({
      id: item.id,
      title: item.title,
      synopsis: item.synopsis,
      posterUrl: item.posterUrl,
      backdropUrl: item.backdropUrl,
      releaseYear: item.releaseYear,
      metadata: item.metadata,
      playback: { kind: source.kind, url: source.sourceUrl, provider: source.providerName },
    })) });
  });
}
