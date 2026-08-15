/**
 * @file libraryContracts.ts
 * @description Unified TypeScript interfaces and DTOs for Favorites, Watchlist, Watch History, and Continue Watching.
 */

import 'server-only';

export type ContentType = 'channel' | 'movie' | 'series' | 'episode';

export interface LibraryItemDto {
  id: string;
  contentType: ContentType;
  title: string;
  artwork?: string;
  backdrop?: string;
  genre?: string[];
  addedAt: string;
  availability: {
    isEntitled: boolean;
    isPremium: boolean;
    visibility: 'FREE' | 'BASIC' | 'PREMIUM';
  };
}

export interface WatchProgressDto {
  contentId: string;
  contentType: ContentType;
  positionSeconds: number;
  durationSeconds: number;
  progressPercentage: number;
  updatedAt: string;
}

export interface WatchHistoryItemDto {
  historyId: string;
  contentId: string;
  contentType: ContentType;
  title: string;
  artwork?: string;
  lastWatchedAt: string;
}

export interface PaginatedLibraryResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
