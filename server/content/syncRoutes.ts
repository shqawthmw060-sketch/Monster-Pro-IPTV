import { and, eq } from "drizzle-orm";
import type { Express, Request, Response } from "express";
import { db } from "../db/index.js";
import { mediaItems, mediaSources } from "../db/persistentSchema.js";

const contentSyncKey = process.env.CONTENT_SYNC_KEY;

type SyncItem = {
  contentType: "movie" | "series" | "episode";
  externalId: string;
  title: string;
  overview?: string;
  posterUrl?: string;
  backdropUrl?: string;
  releaseDate?: string;
  seasonNumber?: number;
  episodeNumber?: number;
  playback: {
    kind: "embed" | "external";
    url: string;
    source: string;
    licenseName: string;
    licenseUrl: string;
    attributionText?: string;
  };
};

type SyncPayload = { version: 1; generatedAt: string; items: SyncItem[] };

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 150) || "media-item";
}

function isHttpsUrl(value: unknown): value is string {
  try {
    return typeof value === "string" && new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function parsePayload(body: unknown): SyncPayload | null {
  if (!body || typeof body !== "object") return null;
  const candidate = body as Partial<SyncPayload>;
  if (candidate.version !== 1 || typeof candidate.generatedAt !== "string" || !Array.isArray(candidate.items)) return null;
  for (const item of candidate.items) {
    if (!item || !["movie", "series", "episode"].includes(item.contentType) || typeof item.externalId !== "string" || typeof item.title !== "string") return null;
    if (!item.playback || !["embed", "external"].includes(item.playback.kind) || typeof item.playback.source !== "string" ||
      !isHttpsUrl(item.playback.url) || typeof item.playback.licenseName !== "string" || !isHttpsUrl(item.playback.licenseUrl)) return null;
  }
  return candidate as SyncPayload;
}

export function registerContentSyncRoutes(app: Express) {
  app.post("/api/content/sync", async (request: Request, response: Response) => {
    if (!contentSyncKey || request.header("x-content-sync-key") !== contentSyncKey) {
      response.status(401).json({ error: "Unauthorized content sync." });
      return;
    }
    const payload = parsePayload(request.body);
    if (!payload || payload.items.length > 500) {
      response.status(400).json({ error: "Invalid sync payload." });
      return;
    }

    try {
      let upserted = 0;
      for (const item of payload.items) {
        const slug = slugify(`${item.contentType}-${item.externalId}`);
        const metadata = {
          sourceExternalId: item.externalId,
          syncVersion: payload.version,
          syncedAt: payload.generatedAt,
          seasonNumber: item.seasonNumber,
          episodeNumber: item.episodeNumber,
          licenseName: item.playback.licenseName,
          licenseUrl: item.playback.licenseUrl,
          attributionText: item.playback.attributionText,
        } satisfies Record<string, unknown>;
        const [media] = await db.insert(mediaItems).values({
          kind: item.contentType,
          title: item.title,
          slug,
          synopsis: item.overview,
          posterUrl: item.posterUrl,
          backdropUrl: item.backdropUrl,
          releaseYear: item.releaseDate ? Number(item.releaseDate.slice(0, 4)) || undefined : undefined,
          isPublished: true,
          metadata,
          updatedAt: new Date(),
        }).onConflictDoUpdate({ target: mediaItems.slug, set: {
          title: item.title,
          synopsis: item.overview,
          posterUrl: item.posterUrl,
          backdropUrl: item.backdropUrl,
          releaseYear: item.releaseDate ? Number(item.releaseDate.slice(0, 4)) || undefined : undefined,
          isPublished: true,
          metadata,
          updatedAt: new Date(),
        } }).returning({ id: mediaItems.id });
        if (!media) continue;
        const existing = await db.select({ id: mediaSources.id }).from(mediaSources).where(and(
          eq(mediaSources.mediaId, media.id),
          eq(mediaSources.sourceUrl, item.playback.url),
        )).limit(1);
        if (existing[0]) {
          await db.update(mediaSources).set({
            kind: "external",
            providerName: item.playback.source,
            isAuthorized: true,
            isActive: true,
          }).where(eq(mediaSources.id, existing[0].id));
        } else {
          await db.insert(mediaSources).values({
            mediaId: media.id,
            kind: "external",
            sourceUrl: item.playback.url,
            providerName: item.playback.source,
            isAuthorized: true,
            isActive: true,
          });
        }
        upserted += 1;
      }
      response.json({ ok: true, upserted, version: payload.version });
    } catch (error) {
      console.error("content sync failed", error instanceof Error ? error.message : "unknown error");
      response.status(500).json({ error: "Content sync failed." });
    }
  });
}
