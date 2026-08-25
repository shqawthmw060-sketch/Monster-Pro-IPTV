import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", ["user", "admin", "super_admin"]);
export const mediaKind = pgEnum("media_kind", ["channel", "movie", "series", "episode"]);
export const sourceKind = pgEnum("source_kind", ["hls", "dash", "file", "external"]);
export const subscriptionStatus = pgEnum("subscription_status", ["trialing", "active", "past_due", "canceled", "expired"]);
export const accessAccountStatus = pgEnum("access_account_status", ["pending", "active", "suspended", "expired"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  displayName: text("display_name"),
  role: userRole("role").notNull().default("user"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  isKids: boolean("is_kids").notNull().default(false),
  pinHash: text("pin_hash"),
  ageRatingLimit: integer("age_rating_limit"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  kind: mediaKind("kind"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const mediaItems = pgTable("media_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  kind: mediaKind("kind").notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  synopsis: text("synopsis"),
  posterUrl: text("poster_url"),
  backdropUrl: text("backdrop_url"),
  language: text("language"),
  country: text("country"),
  ageRating: integer("age_rating"),
  releaseYear: integer("release_year"),
  durationSeconds: integer("duration_seconds"),
  isPublished: boolean("is_published").notNull().default(false),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  publishedKindIndex: uniqueIndex("media_items_slug_kind_idx").on(table.slug, table.kind),
}));

export const mediaCategories = pgTable("media_categories", {
  mediaId: uuid("media_id").notNull().references(() => mediaItems.id, { onDelete: "cascade" }),
  categoryId: uuid("category_id").notNull().references(() => categories.id, { onDelete: "cascade" }),
}, (table) => ({
  pairIndex: uniqueIndex("media_categories_pair_idx").on(table.mediaId, table.categoryId),
}));

export const mediaSources = pgTable("media_sources", {
  id: uuid("id").defaultRandom().primaryKey(),
  mediaId: uuid("media_id").notNull().references(() => mediaItems.id, { onDelete: "cascade" }),
  kind: sourceKind("kind").notNull(),
  sourceUrl: text("source_url").notNull(),
  providerName: text("provider_name").notNull(),
  isAuthorized: boolean("is_authorized").notNull().default(false),
  isActive: boolean("is_active").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const devices = pgTable("devices", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  deviceType: text("device_type").notNull(),
  lastSeenAt: timestamp("last_seen_at", { withTimezone: true }),
  revokedAt: timestamp("revoked_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const favorites = pgTable("favorites", {
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  mediaId: uuid("media_id").notNull().references(() => mediaItems.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  pairIndex: uniqueIndex("favorites_pair_idx").on(table.userId, table.mediaId),
}));

export const watchlist = pgTable("watchlist", {
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  mediaId: uuid("media_id").notNull().references(() => mediaItems.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  pairIndex: uniqueIndex("watchlist_pair_idx").on(table.userId, table.mediaId),
}));

export const watchProgress = pgTable("watch_progress", {
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  mediaId: uuid("media_id").notNull().references(() => mediaItems.id, { onDelete: "cascade" }),
  positionSeconds: integer("position_seconds").notNull().default(0),
  completed: boolean("completed").notNull().default(false),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  pairIndex: uniqueIndex("watch_progress_pair_idx").on(table.userId, table.mediaId),
}));

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  provider: text("provider").notNull(),
  providerSubscriptionId: text("provider_subscription_id").unique(),
  planCode: text("plan_code").notNull(),
  status: subscriptionStatus("status").notNull(),
  currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const iptvAccounts = pgTable("iptv_accounts", {
  accountId: text("account_id").primaryKey(),
  userId: text("user_id").notNull(),
  displayName: text("display_name").notNull(),
  macAddress: text("mac_address").notNull(),
  username: text("username").notNull(),
  passwordHash: text("password_hash").notNull(),
  status: accessAccountStatus("status").notNull().default("pending"),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  macAddressIndex: uniqueIndex("iptv_accounts_mac_address_idx").on(table.macAddress),
  usernameIndex: uniqueIndex("iptv_accounts_username_idx").on(table.username),
}));

export const iptvSessions = pgTable("iptv_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  accountId: text("account_id").notNull().references(() => iptvAccounts.accountId, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  revokedAt: timestamp("revoked_at", { withTimezone: true }),
});

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  actorUserId: uuid("actor_user_id").references(() => users.id, { onDelete: "set null" }),
  action: text("action").notNull(),
  resourceType: text("resource_type").notNull(),
  resourceId: text("resource_id"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const appSettings = pgTable("app_settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").$type<unknown>().notNull(),
  isPublic: boolean("is_public").notNull().default(false),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const schema = {
  users, profiles, categories, mediaItems, mediaCategories, mediaSources,
  devices, favorites, watchlist, watchProgress, subscriptions, iptvAccounts, iptvSessions,
  auditLogs, appSettings,
};
