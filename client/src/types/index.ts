/**
 * MONSTER IPTV - Core Type Definitions
 *
 * This file contains all foundational TypeScript types for MONSTER IPTV.
 * These types are not connected to a real database yet - they serve as
 * the architectural blueprint for future implementation.
 */

// ============================================================================
// USER & AUTHENTICATION
// ============================================================================

export interface User {
  id: string;
  email: string;
  username: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  lastLogin?: Date;
  role: UserRole;
}

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  MODERATOR = "moderator",
}

export interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  language: Language;
  timezone: string;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  theme: Theme;
  notifications: boolean;
  autoPlay: boolean;
  quality: VideoQuality;
  subtitles: boolean;
  subtitleLanguage: Language;
}

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

export enum Language {
  ARABIC = "ar",
  ENGLISH = "en",
}

export enum VideoQuality {
  LOW = "360p",
  MEDIUM = "720p",
  HIGH = "1080p",
  ULTRA = "4K",
}

// ============================================================================
// DEVICES & SUBSCRIPTIONS
// ============================================================================

export interface Device {
  id: string;
  userId: string;
  name: string;
  deviceType: DeviceType;
  osType: OSType;
  osVersion: string;
  appVersion: string;
  isActive: boolean;
  lastUsedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum DeviceType {
  MOBILE = "mobile",
  TABLET = "tablet",
  DESKTOP = "desktop",
  TV = "tv",
  SMARTTV = "smarttv",
}

export enum OSType {
  IOS = "ios",
  ANDROID = "android",
  WINDOWS = "windows",
  MACOS = "macos",
  LINUX = "linux",
  TVOS = "tvos",
  WEBOS = "webos",
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  status: SubscriptionStatus;
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum SubscriptionStatus {
  ACTIVE = "active",
  EXPIRED = "expired",
  CANCELLED = "cancelled",
  PENDING = "pending",
  SUSPENDED = "suspended",
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  billingCycle: BillingCycle;
  maxDevices: number;
  maxQuality: VideoQuality;
  features: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum BillingCycle {
  MONTHLY = "monthly",
  QUARTERLY = "quarterly",
  ANNUAL = "annual",
}

// ============================================================================
// CONTENT: CHANNELS, MOVIES, SERIES
// ============================================================================

export interface Channel {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  banner?: string;
  category: Category;
  streamUrl: string;
  epg?: EPGData[];
  isLive: boolean;
  viewers?: number;
  language: Language;
  region: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EPGData {
  id: string;
  channelId: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  thumbnail?: string;
}

export interface Movie {
  id: string;
  title: string;
  slug: string;
  description: string;
  poster: string;
  backdrop: string;
  releaseDate: Date;
  duration: number; // in minutes
  rating: number; // 0-10
  ratingCount: number;
  genres: string[];
  director: string;
  cast: string[];
  language: Language;
  subtitles: Language[];
  streamUrl: string;
  quality: VideoQuality;
  contentRating: ContentRating;
  createdAt: Date;
  updatedAt: Date;
}

export interface Series {
  id: string;
  title: string;
  slug: string;
  description: string;
  poster: string;
  backdrop: string;
  releaseDate: Date;
  endDate?: Date;
  rating: number; // 0-10
  ratingCount: number;
  genres: string[];
  creator: string;
  cast: string[];
  language: Language;
  subtitles: Language[];
  contentRating: ContentRating;
  totalSeasons: number;
  totalEpisodes: number;
  status: SeriesStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum SeriesStatus {
  ONGOING = "ongoing",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  UPCOMING = "upcoming",
}

export interface Season {
  id: string;
  seriesId: string;
  seasonNumber: number;
  title: string;
  description?: string;
  poster?: string;
  releaseDate: Date;
  totalEpisodes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Episode {
  id: string;
  seasonId: string;
  seriesId: string;
  episodeNumber: number;
  title: string;
  description: string;
  thumbnail: string;
  duration: number; // in minutes
  releaseDate: Date;
  streamUrl: string;
  quality: VideoQuality;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum ContentRating {
  G = "G",
  PG = "PG",
  PG_13 = "PG-13",
  R = "R",
  NC_17 = "NC-17",
  UNRATED = "Unrated",
}

// ============================================================================
// USER INTERACTIONS
// ============================================================================

export interface Favorite {
  id: string;
  userId: string;
  contentType: ContentType;
  contentId: string;
  createdAt: Date;
}

export enum ContentType {
  CHANNEL = "channel",
  MOVIE = "movie",
  SERIES = "series",
  EPISODE = "episode",
}

export interface WatchHistory {
  id: string;
  userId: string;
  contentType: ContentType;
  contentId: string;
  watchedAt: Date;
  duration: number; // in seconds
  totalDuration: number; // in seconds
  deviceId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContinueWatching {
  id: string;
  userId: string;
  contentType: ContentType;
  contentId: string;
  currentTime: number; // in seconds
  totalDuration: number; // in seconds
  thumbnail?: string;
  title: string;
  lastWatchedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum NotificationType {
  NEW_EPISODE = "new_episode",
  NEW_MOVIE = "new_movie",
  SUBSCRIPTION_EXPIRING = "subscription_expiring",
  SUBSCRIPTION_EXPIRED = "subscription_expired",
  SYSTEM = "system",
  PROMOTIONAL = "promotional",
}

// ============================================================================
// ADMIN & SYSTEM
// ============================================================================

export interface AdminUser extends User {
  permissions: AdminPermission[];
  lastActivityAt: Date;
}

export enum AdminPermission {
  MANAGE_USERS = "manage_users",
  MANAGE_CONTENT = "manage_content",
  MANAGE_SUBSCRIPTIONS = "manage_subscriptions",
  VIEW_ANALYTICS = "view_analytics",
  MANAGE_ADMINS = "manage_admins",
  SYSTEM_SETTINGS = "system_settings",
}

export interface AuditLog {
  id: string;
  adminId: string;
  action: AuditAction;
  entityType: string;
  entityId: string;
  changes: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}

export enum AuditAction {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LOGIN = "login",
  LOGOUT = "logout",
  PERMISSION_CHANGE = "permission_change",
}

export interface AppSettings {
  id: string;
  key: string;
  value: string | number | boolean | Record<string, any>;
  description?: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FeatureFlag {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
  rolloutPercentage: number; // 0-100
  targetUsers?: string[]; // User IDs for gradual rollout
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: {
    timestamp: Date;
    version: string;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
