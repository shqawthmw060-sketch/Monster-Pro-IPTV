/**
 * MONSTER IPTV - Application Constants
 *
 * Centralized constants for routes, locales, API endpoints, and app metadata.
 */

// ============================================================================
// APP METADATA
// ============================================================================

export const APP_NAME = "MONSTER IPTV";
export const APP_VERSION = "1.0.0";
export const APP_DESCRIPTION =
  "Premium IPTV streaming platform with live TV, movies, and series";

// ============================================================================
// ROUTES - USER APPLICATION
// ============================================================================

export const ROUTES = {
  // Public routes
  HOME: "/",
  LOGIN: "/login",

  // Main application routes
  DASHBOARD: "/home",
  LIVE: "/live",
  IPTV: "/iptv",
  MOVIES: "/movies",
  SERIES: "/series",
  SPORTS: "/sports",
  SEARCH: "/search",
  FAVORITES: "/favorites",
  WATCHLIST: "/watchlist",
  CONTINUE_WATCHING: "/continue",
  PROFILE: "/profile",
  SETTINGS: "/settings",
  PLAYER: "/player",

  // Detail routes
  MOVIE_DETAIL: "/movies/:id",
  SERIES_DETAIL: "/series/:id",
  EPISODE_DETAIL:
    "/series/:seriesId/season/:seasonNumber/episode/:episodeNumber",
  CHANNEL_DETAIL: "/iptv/:id",
} as const;

// ============================================================================
// ROUTES - CONTROL HUB (ADMIN)
// ============================================================================

export const CONTROL_ROUTES = {
  // Control Hub routes (reserved for future implementation)
  CONTROL: "/control",
  CONTROL_LOGIN: "/control/login",
  CONTROL_DASHBOARD: "/control/dashboard",
  CONTROL_USERS: "/control/users",
  CONTROL_CONTENT: "/control/content",
  CONTROL_SUBSCRIPTIONS: "/control/subscriptions",
  CONTROL_ANALYTICS: "/control/analytics",
  CONTROL_SETTINGS: "/control/settings",
} as const;

// ============================================================================
// LOCALIZATION
// ============================================================================

export const SUPPORTED_LANGUAGES = {
  AR: "ar",
  EN: "en",
} as const;

export const LANGUAGE_NAMES = {
  ar: "العربية",
  en: "English",
} as const;

export const DEFAULT_LANGUAGE = "ar";

// ============================================================================
// PAGINATION
// ============================================================================

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 1,
} as const;

// ============================================================================
// VIDEO QUALITY OPTIONS
// ============================================================================

export const VIDEO_QUALITIES = {
  "360p": { label: "360p", value: "360p", bitrate: "500k" },
  "720p": { label: "720p", value: "720p", bitrate: "2500k" },
  "1080p": { label: "1080p", value: "1080p", bitrate: "5000k" },
  "4K": { label: "4K", value: "4K", bitrate: "15000k" },
} as const;

export const DEFAULT_VIDEO_QUALITY = "720p";

// ============================================================================
// CONTENT CATEGORIES
// ============================================================================

export const CONTENT_CATEGORIES = {
  LIVE_TV: "live-tv",
  MOVIES: "movies",
  SERIES: "series",
  SPORTS: "sports",
  DOCUMENTARIES: "documentaries",
  KIDS: "kids",
  NEWS: "news",
  ENTERTAINMENT: "entertainment",
  MUSIC: "music",
  EDUCATIONAL: "educational",
} as const;

// ============================================================================
// SUBSCRIPTION PLANS
// ============================================================================

export const SUBSCRIPTION_TIERS = {
  FREE: "free",
  BASIC: "basic",
  PREMIUM: "premium",
  ULTIMATE: "ultimate",
} as const;

export const SUBSCRIPTION_FEATURES = {
  free: {
    maxDevices: 1,
    maxQuality: "720p",
    adSupported: true,
    offlineDownload: false,
  },
  basic: {
    maxDevices: 2,
    maxQuality: "1080p",
    adSupported: false,
    offlineDownload: false,
  },
  premium: {
    maxDevices: 4,
    maxQuality: "4K",
    adSupported: false,
    offlineDownload: true,
  },
  ultimate: {
    maxDevices: 6,
    maxQuality: "4K",
    adSupported: false,
    offlineDownload: true,
  },
} as const;

// ============================================================================
// CACHE CONFIGURATION
// ============================================================================

export const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 30 * 60 * 1000, // 30 minutes
  LONG: 24 * 60 * 60 * 1000, // 24 hours
} as const;

// ============================================================================
// API CONFIGURATION
// ============================================================================

export const API_CONFIG = {
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

// ============================================================================
// STORAGE KEYS
// ============================================================================

export const STORAGE_KEYS = {
  // User
  USER_TOKEN: "monster_user_token",
  USER_REFRESH_TOKEN: "monster_refresh_token",
  USER_PROFILE: "monster_user_profile",

  // Preferences
  THEME: "monster_theme",
  LANGUAGE: "monster_language",
  VIDEO_QUALITY: "monster_video_quality",

  // Content
  WATCH_HISTORY: "monster_watch_history",
  FAVORITES: "monster_favorites",
  CONTINUE_WATCHING: "monster_continue_watching",

  // Cache
  CHANNELS_CACHE: "monster_channels_cache",
  MOVIES_CACHE: "monster_movies_cache",
  SERIES_CACHE: "monster_series_cache",
} as const;

// ============================================================================
// NOTIFICATION SETTINGS
// ============================================================================

export const NOTIFICATION_DEFAULTS = {
  NEW_EPISODE: true,
  NEW_MOVIE: true,
  SUBSCRIPTION_EXPIRING: true,
  PROMOTIONAL: false,
} as const;

// ============================================================================
// DEVICE LIMITS
// ============================================================================

export const DEVICE_LIMITS = {
  MAX_DEVICES_FREE: 1,
  MAX_DEVICES_BASIC: 2,
  MAX_DEVICES_PREMIUM: 4,
  MAX_DEVICES_ULTIMATE: 6,
  DEVICE_NAME_MAX_LENGTH: 50,
} as const;

// ============================================================================
// CONTENT LIMITS
// ============================================================================

export const CONTENT_LIMITS = {
  MAX_FAVORITES: 1000,
  MAX_WATCHLIST: 500,
  SEARCH_MIN_CHARS: 2,
  SEARCH_MAX_CHARS: 100,
  DESCRIPTION_MAX_LENGTH: 500,
} as const;

// ============================================================================
// ERROR CODES
// ============================================================================

export const ERROR_CODES = {
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  SERVER_ERROR: "SERVER_ERROR",
  NETWORK_ERROR: "NETWORK_ERROR",
  TIMEOUT: "TIMEOUT",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  SUBSCRIPTION_REQUIRED: "SUBSCRIPTION_REQUIRED",
  DEVICE_LIMIT_EXCEEDED: "DEVICE_LIMIT_EXCEEDED",
} as const;

// ============================================================================
// FEATURE FLAGS (RESERVED FOR FUTURE USE)
// ============================================================================

export const FEATURE_FLAGS = {
  ENABLE_LIVE_TV: true,
  ENABLE_MOVIES: true,
  ENABLE_SERIES: true,
  ENABLE_SPORTS: true,
  ENABLE_SEARCH: true,
  ENABLE_FAVORITES: true,
  ENABLE_WATCH_HISTORY: true,
  ENABLE_OFFLINE_DOWNLOAD: false, // Premium feature
  ENABLE_SOCIAL_SHARING: false,
  ENABLE_RECOMMENDATIONS: false,
} as const;

// ============================================================================
// REGEX PATTERNS
// ============================================================================

export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/,
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  PHONE: /^[+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
} as const;
